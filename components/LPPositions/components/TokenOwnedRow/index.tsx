import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import api from "../../../../configs/api";
import { Nullable } from "../../../../types/common.types";
import { Token } from "../../../../types/token.type";
import { useWeb3React } from "@web3-react/core";

type TokenOwnedRowProps = {
  tokenAddress: string;
  amountInWeis: BigNumber;
};

const TokenOwnRow: React.FC<TokenOwnedRowProps> = (props) => {
  const { chainId } = useWeb3React();
  const [token, setToken] = useState<Nullable<Token>>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!chainId) {
        return null;
      }
      const _token = await fetch(api.token(chainId, props.tokenAddress)).then(
        (res) => res.json()
      );

      setToken(_token);
    };

    fetchToken();
  }, [chainId, props.tokenAddress]);

  if (!chainId || !token) {
    return null;
  }

  return (
    <div>
      You have {formatUnits(props.amountInWeis, token.decimals)} {token.symbol}
    </div>
  );
};

export default TokenOwnRow;
