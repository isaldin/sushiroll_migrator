import { NextApiRequest, NextApiResponse } from "next";
import { tokensByChainAndAddress } from "../../../../constants/tokens-data";
import { chainIdOrNull } from "../../../../utils/chainIdByRawValue";
import { isAddress } from "ethers/lib/utils";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { chainId: chainIdRaw, address } = req.query;

  const chainId = chainIdOrNull(chainIdRaw);
  if (!chainId || typeof address !== "string" || !isAddress(address)) {
    res.status(404);
    return;
  }

  const token = tokensByChainAndAddress(chainId, address);
  if (!token) {
    res.status(404);
    return;
  }

  res.status(200).json(token);
};

export default handler;
