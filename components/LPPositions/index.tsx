import React, { useEffect, useState } from "react";
import useContract from "../../hooks/useContract";
import { isAddress } from "ethers/lib/utils";
import { Nullable } from "../../types/common.types";
import TokenOwnRow from "./components/TokenOwnedRow";
import { BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";

type LPPositionsProps = {
  //
};

const LPPositions: React.FC<LPPositionsProps> = (props) => {
  const [isFetching, setFetching] = useState<boolean>(false);
  const [token1, setToken1] = useState<string>(
    localStorage.getItem("Token1") || ""
  );
  const [token2, setToken2] = useState<string>(
    localStorage.getItem("Token2") || ""
  );
  const [lpPosition, setLPPosition] = useState<Nullable<string>>(null);
  const [tokenAmount1, setTokenAmount1] = useState(0);
  const [tokenAmount2, setTokenAmount2] = useState(0);

  const { account: address } = useWeb3React();
  const contract = useContract("UniswapV3Positions");

  useEffect(() => {
    localStorage.setItem("Token1", token1);
    localStorage.setItem("Token2", token2);
  }, [token1, token2]);

  const fetchPosition = async () => {
    if (
      !contract ||
      !address ||
      isFetching ||
      !isAddress(token1) ||
      !isAddress(token2)
    ) {
      return;
    }

    setLPPosition(null);
    setTokenAmount1(0);
    setTokenAmount2(0);
    setFetching(true);

    const tokensAmount = await contract.balanceOf(address);
    if (tokensAmount === 0) {
      setFetching(false);
      return;
    }

    for (let i = 0; i < tokensAmount; i++) {
      const token = await contract.tokenByIndex(i);
      const positions = await contract.positions(token);

      const positionTokens = [
        positions.token0?.toLowerCase(),
        positions.token1?.toLowerCase(),
      ];
      if (
        positionTokens.includes(token1.toLowerCase()) &&
        positionTokens.includes(token2.toLowerCase())
      ) {
        const picUri = await contract.tokenURI(token);
        const jsonData = ((data: string) => {
          let result = null;
          try {
            result = JSON.parse(
              atob(data.replace("data:application/json;base64,", ""))
            );
          } catch (_) {}
          return result;
        })(picUri);
        setLPPosition(jsonData?.image);
        if (typeof positions?.tokensOwed0?.toString === "function") {
          setTokenAmount1(positions.tokensOwed0.toString());
        }
        if (typeof positions?.tokensOwed1?.toString === "function") {
          setTokenAmount2(positions.tokensOwed1.toString());
        }

        break;
      }
    }

    setFetching(false);
  };

  return (
    <div className="flex flex-1">
      {lpPosition && (
        <div>
          <div className="flex p-8">
            <img src={lpPosition} alt="" />
          </div>
          {isAddress(token1) && (
            <TokenOwnRow
              tokenAddress={token1}
              amountInWeis={BigNumber.from(tokenAmount1)}
            />
          )}
          {isAddress(token2) && (
            <TokenOwnRow
              tokenAddress={token2}
              amountInWeis={BigNumber.from(tokenAmount2)}
            />
          )}
        </div>
      )}
      {!lpPosition && !isFetching && (
        <div className="p-4 flex flex-1 items-center justify-center">
          not found
        </div>
      )}
      {!lpPosition && isFetching && (
        <div className="p-4 flex flex-1 items-center justify-center">
          loading
        </div>
      )}
      <div className="p-4 flex flex-1 flex-col justify-start">
        <div className="flex-1">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            First token
          </label>
          <input
            type="text"
            id="token1"
            onChange={(e) => {
              setToken1(e.target.value);
            }}
            value={token1}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0xdeadbeaf"
            required
          />
        </div>
        <div className="flex-1 mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Second token
          </label>
          <input
            type="text"
            id="token2"
            onChange={(e) => {
              setToken2(e.target.value);
            }}
            value={token2}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0xdeadbeaf"
            required
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={fetchPosition}
            disabled={isFetching}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Get position
          </button>
        </div>
      </div>
    </div>
  );
};

export default LPPositions;
