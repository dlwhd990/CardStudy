import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../../util/verifyToken";

async function folderIdAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    let folderId: string;
    if (typeof req.query.folderId === "string") {
      folderId = req.query.folderId;
    } else {
      folderId = "";
    }
    const userData = verifyToken(req);
    const mongodbURI = process.env.MONGODB_URI || "";
    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const collection = db.collection("folder");

    // 삭제
    if (req.method === "DELETE") {
      await collection.deleteOne({
        userId: userData.sub,
        _id: new ObjectId(folderId),
      });

      res.json({ success: true });
    }

    // 변경 (update)
    else if (req.method === "PATCH") {
      await collection.updateOne(
        {
          userId: userData.sub,
          _id: new ObjectId(folderId),
        },
        {
          $set: { title: req.body.title },
        }
      );

      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

export default folderIdAPI;
