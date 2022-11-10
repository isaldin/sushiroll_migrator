import UniswapV3Positions from "./UniswapV3Positions.json";
import { ContractName } from "../contracts";
import { JsonFragment } from "@ethersproject/abi";

const abisMap: { [key in ContractName]: ReadonlyArray<JsonFragment> } = {
  UniswapV3Positions,
};

export default abisMap;
