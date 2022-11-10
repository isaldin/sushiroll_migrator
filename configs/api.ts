import { Chain } from "../constants/chains";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api`;

const api = {
  tokens: (chainId: Chain) => `${baseUrl}/tokens/${chainId}`,
  token: (chainId: Chain, address: string) =>
    `${baseUrl}/token/${chainId}/${address}`,
};

export default api;
