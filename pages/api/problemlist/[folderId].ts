import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

async function getProblemListOfFolder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return;
  try {
    const { folderId } = req.query;
    const db = await connectToDatabase();
    const folderCollection = db.collection("folder");
    const thisFolder = await folderCollection.findOne({
      _id: new ObjectId(folderId?.toString()),
    });
    if (!thisFolder) {
      throw new Error("ID ERROR");
    }

    const problemCollection = db.collection("problem");
    const result = await problemCollection
      .find({ folderId: req.query.folderId })
      .toArray();
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

export default getProblemListOfFolder;
