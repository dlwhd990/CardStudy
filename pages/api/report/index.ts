import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function reportAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("report");
    const { userName, folderId, content, folderTitle } = req.body;

    await collection.insertOne({
      folderId,
      folderTitle,
      userName,
      content,
      userId: userData.sub,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default reportAPI;
