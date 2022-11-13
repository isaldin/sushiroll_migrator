import { BigNumber, FixedNumber } from "ethers";

const calcTokensAmountsInPool = (params: {
  totalLpAmount: BigNumber;
  userLpAmount: BigNumber;
  tokenAInPoolAmount: BigNumber;
  tokenBInPoolAmount: BigNumber;
}): [BigNumber, BigNumber] => {
  const {
    totalLpAmount,
    userLpAmount,
    tokenAInPoolAmount,
    tokenBInPoolAmount,
  } = params;

  if (totalLpAmount.isZero()) {
    return [BigNumber.from(0), BigNumber.from(0)];
  }

  const lpRatio = FixedNumber.from(userLpAmount).divUnsafe(
    FixedNumber.from(totalLpAmount)
  );

  const userTokenAAmount = lpRatio.mulUnsafe(
    FixedNumber.from(tokenAInPoolAmount)
  );
  const userTokenBAmount = lpRatio.mulUnsafe(
    FixedNumber.from(tokenBInPoolAmount)
  );

  return [
    // I have no idea what is wrong with FixedNumber
    BigNumber.from(userTokenAAmount.floor().toString().replace(".0", "")),
    BigNumber.from(userTokenBAmount.floor().toString().replace(".0", "")),
  ];
};

export default calcTokensAmountsInPool;
