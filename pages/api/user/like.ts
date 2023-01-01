import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function loadUserLikeList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("like");
    const result = await collection
      .find({ likedUserId: userData.sub })
      .toArray();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default loadUserLikeList;
