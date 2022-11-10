import { Maybe, OrArray } from "../types/common.types";
import { Chain } from "../constants/chains";
import { chainIdOrNull } from "./chainIdByRawValue";

export const chainIdOrDefault = (chainIdRaw: Maybe<OrArray<string>>): Chain => {
  return chainIdOrNull(chainIdRaw) || Chain.Ethereum;
};
