import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function uploadFolder(req: NextApiRequest, res: NextApiResponse) {
  // POST 요청 = 추가 (upload)
  if (req.method === "POST") {
    try {
      const userData = verifyToken(req);
      const db = await connectToDatabase();
      const collection = db.collection("folder");
      await collection.insertOne({
        title: req.body.title,
        like: 0,
        userId: userData.sub,
        userName: req.body.userName,
        date: new Date().getTime(),
        problemCount: 0,
        public: true,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      res.json({ success: false });
    }
  }
}

export default uploadFolder;
