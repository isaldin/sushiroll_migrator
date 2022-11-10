import { Token } from "../types/token.type";
import { Chain } from "./chains";
import { Maybe, Nullable } from "../types/common.types";

const tokensData: Array<Token> = [
  {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    logoURI:
      "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
  {
    symbol: "1INCH",
    name: "1INCH Token",
    decimals: 18,
    address: "0x111111111117dc0aa78b770fa6a738034120c302",
    logoURI:
      "https://tokens.1inch.io/0x111111111117dc0aa78b770fa6a738034120c302.png",
  },
  {
    symbol: "AAVE",
    name: "Aave Token",
    decimals: 18,
    address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    logoURI:
      "https://tokens.1inch.io/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    decimals: 18,
    address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    logoURI:
      "https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    logoURI:
      "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    logoURI:
      "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  },
  {
    symbol: "WBTC",
    name: "Wrapped BTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
    logoURI:
      "https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    logoURI:
      "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  },
  {
    symbol: "BUSD",
    name: "Binance USD",
    decimals: 18,
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    logoURI:
      "https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
  },
  {
    symbol: "MANA",
    name: "Mana",
    address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png",
  },
  {
    symbol: "CRV",
    name: "Curve DAO Token",
    decimals: 18,
    address: "0xd533a949740bb3306d119cc777fa900ba034cd52",
    logoURI:
      "https://tokens.1inch.io/0xd533a949740bb3306d119cc777fa900ba034cd52.png",
  },
  {
    symbol: "renBTC",
    name: "renBTC",
    decimals: 8,
    address: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
    logoURI:
      "https://tokens.1inch.io/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    logoURI:
      "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
  },
];

export const tokensByChain = (chain: Nullable<Chain>): Array<Token> => {
  if (chain === Chain.Ethereum) {
    return tokensData;
  } else if (chain === Chain.Goerli) {
    return tokensData.map(processForChain(chain));
  }

  return [];
};

export const tokensByChainAndAddress = (
  chainId: Chain,
  address: string
): Maybe<Token> => {
  return tokensByChain(chainId).find(
    (item) => item.address.toLowerCase() === address.toLowerCase()
  );
};

const processForChain =
  (chainId: Chain) =>
  (token: Token): Token => {
    const goerliReplaces: { [key: Token["symbol"]]: Token["address"] } = {
      WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    };

    const addressForGoerli =
      chainId === Chain.Goerli && goerliReplaces[token.symbol.toUpperCase()];
    if (addressForGoerli) {
      token = {
        ...token,
        address: addressForGoerli,
      };
    }

    return token;
  };
