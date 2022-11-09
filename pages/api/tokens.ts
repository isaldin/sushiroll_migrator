import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
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
      eip2612: true,
      tags: ["tokens"],
    },
    {
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      logoURI:
        "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      eip2612: true,
      tags: ["tokens", "PEG:USD"],
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      tags: ["tokens", "PEG:USD"],
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
  ]);
};

export default handler;
