import React, { useEffect, useState } from "react";
import Input from "../../../ common/Input";

type TokensFormProps = {
  tokenAChanged: (address: string) => void;
  tokenBChanged: (address: string) => void;
  tokenA: string;
  tokenB: string;
};

const TokensForm: React.FC<TokensFormProps> = (props) => {
  const [tokenA, setTokenA] = useState<string>(props.tokenA);
  const [tokenB, setTokenB] = useState<string>(props.tokenB);

  useEffect(() => {
    props.tokenAChanged(tokenA);
  }, [tokenA, props]);

  useEffect(() => {
    props.tokenBChanged(tokenB);
  }, [tokenB, props]);

  return (
    <div className="flex flex-1 flex-col justify-start">
      <div className="flex-1">
        <label
          htmlFor="token1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          First token
        </label>
        <Input
          type="text"
          id="token1"
          onChange={(value) => {
            setTokenA(value);
          }}
          value={tokenA}
          placeholder="0xdeadbeaf"
        />
      </div>
      <div className="flex-1 mt-4">
        <label
          htmlFor="token2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Second token
        </label>
        <Input
          type="text"
          id="token2"
          onChange={(value) => {
            setTokenB(value);
          }}
          value={tokenB}
          placeholder="0xdeadbeaf"
        />
      </div>
    </div>
  );
};

export default TokensForm;
