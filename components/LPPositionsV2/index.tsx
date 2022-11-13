import React, { useCallback, useEffect, useState } from "react";
import useContract from "../../hooks/useContract";
import { isAddress } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, Contract, ethers } from "ethers";
import abisMap from "../../configs/abi";
import { chainIdOrNull } from "../../utils/chainIdByRawValue";
import { Nullable } from "../../types/common.types";
import { MAX_INT_STRING, ZERO_ADDRESS } from "../../constants/blockchain";
import TokensForm from "./components/TokensForm";
import Button from "../ common/Button";
import Input from "../ common/Input";
import calcTokensAmountsInPool from "../../utils/calcTokensAmountsInPool";
import Spinner from "../ common/Spinner";
import { TransactionResponse, Web3Provider } from "@ethersproject/providers";
import { signERC2612Permit } from "../../lib/eth-permit-forked/eth-permit";

const MIGRATE_DEADLINE_SECONDS = 100;
const TOKEN_A_STORAGE_KEY = "TOKEN_A_KEY";
const TOKEN_B_STORAGE_KEY = "TOKEN_B_KEY";

type LPPositionsV2Props = {
  //
};

const LPPositionsV2: React.FC<LPPositionsV2Props> = (props) => {
  const [tokenA, setTokenA] = useState<string>(
    localStorage.getItem(TOKEN_A_STORAGE_KEY) || ""
  );
  const [tokenB, setTokenB] = useState<string>(
    localStorage.getItem(TOKEN_B_STORAGE_KEY) || ""
  );

  const [tokenAContract, setTokenAContract] =
    useState<Nullable<Contract>>(null);
  const [tokenBContract, setTokenBContract] =
    useState<Nullable<Contract>>(null);
  const [block, setBlock] = useState<number>();
  const factoryContract = useContract("UniswapV2Factory");
  const sushiRollContract = useContract("SushiRoll");
  const [pairContract, setPairContract] = useState<Nullable<Contract>>(null);
  const {
    library,
    chainId: chainIdRaw,
    account: address,
  } = useWeb3React<Web3Provider>();
  const [poolData, setPoolData] = useState<
    Nullable<{
      poolAddress: string;
      tokenA: string;
      tokenB: string;
      tokenASupply: BigNumber;
      tokenBSupply: BigNumber;
      totalLPSupply: BigNumber;
      userLPAmount: BigNumber;
      lpDecimals: number;
    }>
  >(null);
  const [lpToMigrating, setLpToMigrating] = useState<string>("0");
  const [minReturnA, setMinReturnA] = useState<BigNumber>(BigNumber.from(0));
  const [minReturnB, setMinReturnB] = useState<BigNumber>(BigNumber.from(0));
  const [approveInProgress, setApproveInProgress] = useState(false);

  useEffect(() => {
    if (!library) {
      setBlock(undefined);
      return;
    }
    library.getBlockNumber().then(setBlock);
    library?.on("block", setBlock);

    return () => {
      library.removeListener("block", setBlock);
      setBlock(undefined);
    };
  }, [chainIdRaw, library]);

  useEffect(() => {
    if (!library || !isAddress(tokenA)) {
      setTokenAContract(null);
      return;
    }

    const tokenContract = new ethers.Contract(
      tokenA,
      abisMap["ERC20"],
      library?.getSigner()
    );
    setTokenAContract(tokenContract);
  }, [tokenA, library]);

  useEffect(() => {
    if (!library || !isAddress(tokenB)) {
      setTokenBContract(null);
      return;
    }

    const tokenContract = new ethers.Contract(
      tokenB,
      abisMap["ERC20"],
      library?.getSigner()
    );
    setTokenBContract(tokenContract);
  }, [tokenB, library]);

  useEffect(() => {
    if (!poolData) {
      setLpToMigrating("0");
    } else {
      setLpToMigrating(
        ethers.utils.formatUnits(poolData.userLPAmount, poolData.lpDecimals)
      );
    }
  }, [poolData]);

  useEffect(() => {
    if (!lpToMigrating || lpToMigrating === "0" || !poolData) {
      setMinReturnA(BigNumber.from(0));
      setMinReturnB(BigNumber.from(0));
      return;
    }

    const [minAReturn, minBReturn] = calcTokensAmountsInPool({
      totalLpAmount: poolData.totalLPSupply,
      userLpAmount: ethers.utils.parseUnits(lpToMigrating, poolData.lpDecimals),
      tokenAInPoolAmount: poolData.tokenASupply,
      tokenBInPoolAmount: poolData.tokenBSupply,
    });

    setMinReturnA(minAReturn);
    setMinReturnB(minBReturn);
  }, [lpToMigrating, poolData]);

  const fetchAmounts = useCallback(async () => {
    const chainId = chainIdOrNull(chainIdRaw);
    if (
      !chainId ||
      !factoryContract ||
      !sushiRollContract ||
      !tokenAContract ||
      !tokenBContract ||
      !isAddress(tokenA) ||
      !isAddress(tokenB)
    ) {
      console.log({
        chainId,
        factoryContract,
        sushiRollContract,
        tokenAContract,
        tokenBContract,
        isA: isAddress(tokenA),
        isB: isAddress(tokenB),
      });
      alert("Check entered data");
      return;
    }

    setPairContract(null);
    setPoolData(null);

    const poolAddress = await factoryContract.getPair(tokenA, tokenB);
    const pairContract = new ethers.Contract(
      poolAddress,
      abisMap["UniswapV2Pair"],
      library?.getSigner()
    );
    if (!pairContract || pairContract.address.toLowerCase() === ZERO_ADDRESS) {
      alert("Pair not found");
      return;
    }
    setPairContract(pairContract);

    const decimals = (await pairContract.decimals()) as number;
    const totalSupply = (await pairContract.totalSupply()) as BigNumber;
    const [tokenATotalAmount, tokenBTotalAmount] =
      (await pairContract.getReserves()) as [BigNumber, BigNumber];
    const userLpTokensAmount = (await pairContract.balanceOf(
      address
    )) as BigNumber;
    const token0 = await pairContract.token0();
    const token1 = await pairContract.token1();

    setPoolData({
      poolAddress,
      userLPAmount: userLpTokensAmount,
      lpDecimals: decimals,
      totalLPSupply: totalSupply,
      tokenASupply: tokenATotalAmount,
      tokenBSupply: tokenBTotalAmount,
      tokenA: token0,
      tokenB: token1,
    });
  }, [
    block,
    factoryContract,
    sushiRollContract,
    tokenAContract,
    tokenBContract,
    address,
  ]);

  const processTx = async (tx: TransactionResponse): Promise<void> => {
    try {
      setApproveInProgress(true);
      const receipt = await tx.wait();
      alert(receipt.status);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setApproveInProgress(false);
      setPoolData(null);
    }
  };

  const migrateWithApproves = async () => {
    if (
      !poolData ||
      !tokenAContract ||
      !tokenBContract ||
      !pairContract ||
      !sushiRollContract
    ) {
      return;
    }

    const approveTx = async (contract: Contract): Promise<void> => {
      try {
        const tx = await contract.approve(
          sushiRollContract.address,
          MAX_INT_STRING
        );
        console.log({ hash: tx.hash });
        const receipt = await tx.wait();
        console.log({ receipt });
        if (!receipt?.status) {
          throw new Error("Failed");
        }

        return void 0;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    };

    // in ideal world we should check existed allowance first
    try {
      setApproveInProgress(true);
      await approveTx(tokenAContract);
      await approveTx(tokenBContract);
      await approveTx(pairContract);
    } catch (_) {
      return;
    } finally {
      setApproveInProgress(false);
    }

    const migrateTx = await sushiRollContract.migrate(
      poolData.tokenA,
      poolData.tokenB,
      ethers.utils.parseUnits(lpToMigrating, poolData.lpDecimals),
      minReturnA,
      minReturnB,
      Math.floor(Date.now() / 1000) + MIGRATE_DEADLINE_SECONDS
    );
    await processTx(migrateTx);
  };

  const migrateWithPermit = async () => {
    if (!poolData || !sushiRollContract || !address) {
      return;
    }

    const lpAmount = ethers.utils.parseUnits(
      lpToMigrating,
      poolData.lpDecimals
    );

    const deadline = Math.floor(Date.now() / 1000) + MIGRATE_DEADLINE_SECONDS;

    const { r, s, v } = await signERC2612Permit(
      library?.provider,
      poolData.poolAddress,
      address,
      sushiRollContract.address,
      lpAmount.toString(),
      deadline
    );

    const migrateWithPermitTx = await sushiRollContract.migrateWithPermit(
      poolData.tokenA,
      poolData.tokenB,
      lpAmount,
      minReturnA,
      minReturnB,
      deadline,
      v,
      ethers.utils.arrayify(r),
      ethers.utils.arrayify(s)
    );
    await processTx(migrateWithPermitTx);
  };

  return (
    <div className="p-8 flex-col max-w-xl">
      <div>
        <TokensForm
          tokenA={tokenA}
          tokenB={tokenB}
          tokenAChanged={(address) => {
            localStorage.setItem(TOKEN_A_STORAGE_KEY, address);
            setTokenA(isAddress(address) ? address : "");
          }}
          tokenBChanged={(address) => {
            localStorage.setItem(TOKEN_B_STORAGE_KEY, address);
            setTokenB(isAddress(address) ? address : "");
          }}
        />
      </div>
      {poolData && (
        <div className="pt-4">
          <Input
            type="number"
            label={`Available ${ethers.utils.formatUnits(
              poolData.userLPAmount,
              poolData.lpDecimals
            )} LP tokens`}
            placeholder="LP to migrating"
            value={lpToMigrating}
            onChange={setLpToMigrating}
          />
          <div className="pt-4">
            <Input
              label="Min return A"
              value={minReturnA.toString()}
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="pt-4">
            <Input
              label="Min return B"
              value={minReturnB.toString()}
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      )}
      {approveInProgress && (
        <div className="pt-4">
          <Spinner />
        </div>
      )}
      {!approveInProgress && (
        <div className="pt-8 flex flex-1 justify-end">
          <Button onClick={fetchAmounts}>Check amounts</Button>
          <Button onClick={migrateWithApproves}>Migrate</Button>
          <Button onClick={migrateWithPermit}>Migrate with permit</Button>
        </div>
      )}
    </div>
  );
};

export default LPPositionsV2;
