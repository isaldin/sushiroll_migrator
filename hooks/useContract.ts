import contractAddressesMap, { ContractName } from "../configs/contracts";
import { Chain } from "../constants/chains";
import { useMemo } from "react";
import abisMap from "../configs/abi";
import { ethers } from "ethers";
import { Nullable } from "../types/common.types";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const useContract = (contract: ContractName, chain: Nullable<Chain>) => {
  const { library } = useWeb3React<Web3Provider>();

  return useMemo(() => {
    if (!library || !chain) {
      return null;
    }

    const addressRaw = contractAddressesMap[chain][contract];
    const address = addressRaw && addressRaw !== "" && addressRaw;

    if (!address) {
      return null;
    }

    const abi = abisMap[contract];
    const signer = library?.getSigner();

    return new ethers.Contract(address, abi, signer);
  }, [library, contract, chain]);
};

export default useContract;
