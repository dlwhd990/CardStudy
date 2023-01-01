import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function likeAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folderId } = req.query;
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("like");

    if (req.method === "DELETE") {
      await collection.deleteOne({
        likedUserId: userData.sub,
        folderId,
      });

      // isLiked => 현재 좋아요 상태인지 판별
      res.json({ success: true, isLiked: false });
    }
  } catch (err) {
    res.json({ success: false });
  }
}

export default likeAPI;
