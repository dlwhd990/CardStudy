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

    // 삭제
    if (req.method === "DELETE") {
      await collection.deleteOne({
        likedUserId: userData.sub,
        folderId,
      });

      res.json({ success: true });
    }

    // 초기 북마크 여부 판별
    if (req.method === "GET") {
      const response = await collection.findOne({ folderId });
      if (response) {
        res.json({ success: true, isLiked: true });
      } else {
        res.json({ success: true, isLiked: false });
      }
    }
  } catch (err) {
    res.json({ success: false });
  }
}

export default likeAPI;
