import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function folderIdAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    let folderId: string;
    if (typeof req.query.folderId === "string") {
      folderId = req.query.folderId;
    } else {
      folderId = "";
    }

    const db = await connectToDatabase();
    const collection = db.collection("folder");

    // 삭제
    if (req.method === "DELETE") {
      const userData = verifyToken(req);
      await collection.deleteOne({
        userId: userData.sub,
        _id: new ObjectId(folderId),
      });

      const problemCollection = db.collection("problem");
      await problemCollection.deleteMany({ folderId });

      res.json({ success: true });
    }

    // 변경 (update)
    else if (req.method === "PATCH") {
      const userData = verifyToken(req);
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

    // 폴더 ID로 폴더 찾기
    else if (req.method === "GET") {
      console.log("SDFASDSA");
      const result = await collection.findOne({
        _id: new ObjectId(folderId),
      });

      res.json({ success: true, result });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

export default folderIdAPI;
