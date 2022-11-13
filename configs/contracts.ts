import { Chain } from "../constants/chains";

export type ContractName =
  | "UniswapV3Positions"
  | "UniswapV3Factory"
  | "UniswapV2Factory"
  | "UniswapV2Pair"
  | "SushiRoll"
  | "ERC20";

const contractAddressesMap: {
  [key in Chain]: { [key in ContractName]: string };
} = {
  [Chain.Ethereum]: {
    UniswapV3Positions: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    UniswapV3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    UniswapV2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    SushiRoll: "0x16e58463eb9792bc236d8860f5bc69a81e26e32b",
    UniswapV2Pair: "",
    ERC20: "",
  },
  [Chain.Goerli]: {
    UniswapV3Positions: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
    UniswapV3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    UniswapV2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    SushiRoll: "0xCaAbdD9Cf4b61813D4a52f980d6BC1B713FE66F5",
    UniswapV2Pair: "",
    ERC20: "",
  },
};

export default contractAddressesMap;
