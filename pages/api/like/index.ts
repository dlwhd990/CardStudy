import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function likeUploadAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("like");

    const { _id, title, like, userId, userName, problemCount } =
      req.body.folder;

    await collection.insertOne({
      folderId: _id.toString(),
      title,
      like,
      likedUserId: userData.sub,
      likedUserName: req.body.userName,
      authorId: userId,
      authorName: userName,
      problemCount,
      date: new Date().getTime(),
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default likeUploadAPI;
