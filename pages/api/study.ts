import { NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";

function uploadStudy(req: NextApiRequestQuery, res: NextApiResponse) {
  if (req.method !== "POST") return;
}
