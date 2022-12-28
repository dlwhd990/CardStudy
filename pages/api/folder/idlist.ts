import { NextApiRequest, NextApiResponse } from "next";
import Folder from "../../../model/folder";
import { connectToDatabase } from "../../../util/mongodb";

async function getFolderIdList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  try {
    const db = await connectToDatabase();
    const folderCollection = db.collection("folder");
    const folderList = await folderCollection.find({}).toArray();
    const result = folderList.map((folder: Folder) => folder._id.toString());
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false });
  }
}

export default getFolderIdList;
