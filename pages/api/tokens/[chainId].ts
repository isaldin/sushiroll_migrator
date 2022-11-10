import type { NextApiRequest, NextApiResponse } from "next";
import { chainIdOrNull } from "../../../utils/chainIdByRawValue";
import { tokensByChain } from "../../../constants/tokens-data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const chainId = chainIdOrNull(req.query.chainId);
  res.status(200).json(tokensByChain(chainId));
};

export default handler;
