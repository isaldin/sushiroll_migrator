import { Nullable } from "../types/common.types";

export enum Chain {
  Ethereum = 1,
  Goerli = 5,
}

export const getChainById = (id: number): Nullable<Chain> => {
  // @ts-ignore
  return chainsMap[id] || null;
};

const chainsMap: { [key in Chain]: Chain } = {
  [Chain.Ethereum]: Chain.Ethereum,
  [Chain.Goerli]: Chain.Goerli,
};
