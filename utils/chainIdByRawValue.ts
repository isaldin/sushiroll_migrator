import { Maybe, Nullable, OrArray } from "../types/common.types";
import { Chain, getChainById } from "../constants/chains";

export const chainIdOrNull = (
  chainIdRaw: Maybe<OrArray<string> | number>
): Nullable<Chain> => {
  if (!chainIdRaw || Array.isArray(chainIdRaw)) {
    return null;
  }

  const chainById = getChainById(parseInt(`${chainIdRaw}`));
  if (chainById) {
    return chainById;
  }

  return null;
};
