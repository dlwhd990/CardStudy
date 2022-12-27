import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../util/verifyToken";

async function loginCheck(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const mongodbURI = process.env.MONGODB_URI || "";
    const result = verifyToken(req);
    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const collection = db.collection("user");
    const userData = await collection.findOne({ userId: result.sub });
    res.status(200).json({ ...userData, success: true });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false });
  }
}

export default loginCheck;
