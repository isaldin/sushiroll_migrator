import UniswapV3Positions from "./UniswapV3Positions.json";
import UniswapV3Factory from "./UniswapV3Factory.json";
import UniswapV2Factory from "./UniswapV2Factory.json";
import UniswapV2Pair from "./UniswapV2Pair.json";
import ERC20 from "./ERC20.json";

import SushiRoll from "./SushiRoll.json";
import { ContractName } from "../contracts";
import { JsonFragment } from "@ethersproject/abi";

const abisMap: { [key in ContractName]: ReadonlyArray<JsonFragment> } = {
  UniswapV3Positions,
  UniswapV3Factory,
  UniswapV2Factory,
  UniswapV2Pair,
  SushiRoll,
  ERC20,
};

export default abisMap;
