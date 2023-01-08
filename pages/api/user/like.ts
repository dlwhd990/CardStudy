import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function loadUserLikeList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  try {
    const result = [];
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("like");
    const folderCollection = db.collection("folder");
    const likeList = await collection.find({ userId: userData.sub }).toArray();
    likeList.sort((a, b) => b.date - a.date);

    for await (const like of likeList) {
      const matchedFolder = await folderCollection.findOne({
        _id: new ObjectId(like.folderId),
      });
      result.push(matchedFolder);
    }

    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default loadUserLikeList;
