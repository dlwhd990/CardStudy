import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function getUserFolder(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("folder");
    const result = await collection.find({ userId: userData.sub }).toArray();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default getUserFolder;
