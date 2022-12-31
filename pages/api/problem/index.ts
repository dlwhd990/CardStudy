import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function uploadProblem(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const userData = verifyToken(req);
    const { question, answer, folderId } = req.body;
    const db = await connectToDatabase();
    const collection = db.collection("problem");
    await collection.insertOne({
      question,
      answer,
      like: 0,
      userId: userData.sub,
      folderId,
      date: new Date().getTime(),
    });

    const folderCollection = db.collection("folder");
    await folderCollection.findOneAndUpdate(
      { _id: new ObjectId(folderId.toString()) },
      { $inc: { problemCount: 1 } }
    );

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default uploadProblem;
