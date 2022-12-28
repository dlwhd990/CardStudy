import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

async function getFolderIdList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  try {
    const db = await connectToDatabase();
    const folderCollection = db.collection("folder");
    const result = await folderCollection.find({}).toArray();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default getFolderIdList;
