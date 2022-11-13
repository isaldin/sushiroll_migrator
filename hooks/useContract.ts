import contractAddressesMap, { ContractName } from "../configs/contracts";
import { useMemo } from "react";
import abisMap from "../configs/abi";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { chainIdOrNull } from "../utils/chainIdByRawValue";

const useContract = (contract: ContractName, customAddress?: string) => {
  const { chainId: chainIdRaw, library } = useWeb3React<Web3Provider>();
  const chainId = chainIdOrNull(chainIdRaw);

  return useMemo(() => {
    if (!library || !chainId) {
      return null;
    }

    const addressRaw = contractAddressesMap[chainId][contract];
    const address =
      customAddress || (addressRaw && addressRaw !== "" && addressRaw);

    if (!address) {
      return null;
    }

    const abi = abisMap[contract];
    const signer = library?.getSigner();

    return new ethers.Contract(address, abi, signer);
  }, [library, contract, chainId]);
};

export default useContract;
