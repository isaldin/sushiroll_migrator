import { Chain } from "../constants/chains";

export type ContractName = "UniswapV3Positions";

const contractAddressesMap: {
  [key in Chain]: { [key in ContractName]: string };
} = {
  [Chain.Ethereum]: {
    UniswapV3Positions: "",
  },
  [Chain.Goerli]: {
    UniswapV3Positions: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
  },
};

export default contractAddressesMap;
