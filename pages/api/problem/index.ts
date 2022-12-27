import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../../util/verifyToken";

async function uploadProblem(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const userData = verifyToken(req);
    const { question, answer, folderId } = req.body;
    const mongodbURI = process.env.MONGODB_URI || "";
    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const collection = db.collection("problem");
    collection.insertOne({
      question,
      answer,
      like: 0,
      userId: userData.sub,
      folderId,
      date: new Date().getTime(),
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default uploadProblem;
