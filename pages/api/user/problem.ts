import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../../util/verifyToken";

async function getUserProblem(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;
  try {
    const userData = verifyToken(req);
    const mongodbURI = process.env.MONGODB_URI || "";
    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const collection = db.collection("problem");
    const result = await collection.find({ userId: userData.sub }).toArray();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default getUserProblem;
