import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../../util/verifyToken";

async function uploadFolder(req: NextApiRequest, res: NextApiResponse) {
  // POST 요청 = 추가 (upload)
  if (req.method === "POST") {
    try {
      const userData = verifyToken(req);
      const mongodbURI = process.env.MONGODB_URI || "";
      const client = await MongoClient.connect(mongodbURI);
      const db = client.db();
      const collection = db.collection("folder");
      await collection.insertOne({
        title: req.body.title,
        like: 0,
        userId: userData.sub,
        date: new Date().getTime(),
        public: true,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      res.json({ success: false });
    }
  }
}

export default uploadFolder;
