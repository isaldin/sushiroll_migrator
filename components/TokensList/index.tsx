import React, { useEffect, useState } from "react";
import classname from "classnames";
("classnames");
import api from "../../configs/api";
import CopyButton from "../ common/CopyButton";

type TokensListProps = {
  //
};

type Token = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
};

const TokensList: React.FC<TokensListProps> = (props) => {
  const [tokens, setTokens] = useState<Array<Token>>([]);

  useEffect(() => {
    fetch(`${api.baseUrl}/${api.endpoints.tokens}`)
      .then((res) => res.json())
      .then((tokens) => {
        setTokens(tokens);
      });
  }, []);

  return (
    <div>
      {tokens.map((token) => (
        <div
          key={token.address}
          className={classname(
            "flex items-center p-4 m-2",
            "border-solid border-2 border-sky-500",
            "hover:bg-sky-600 hover:cursor-pointer justify-evenly"
          )}
        >
          <div className="justify-center flex flex-col items-center">
            <img className="h-10 w-10" src={token.logoURI} alt="" />
            <div className="mt-0.5">{token.symbol}</div>
          </div>
          <div className="ml-4 flex-1">
            <div className="font-bold text-slate-200">{token.name}</div>
            <div>{token.address}</div>
          </div>
          <CopyButton
            onClick={() => navigator.clipboard.writeText(token.address)}
          />
        </div>
      ))}
    </div>
  );
};

export default TokensList;
