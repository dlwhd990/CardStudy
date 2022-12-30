import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function objectionAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  try {
    const userData = verifyToken(req);
    const { folderId, folderTitle, reporterName, content, authorId } = req.body;
    const db = await connectToDatabase();
    const collection = db.collection("objection");
    await collection.insertOne({
      folderId,
      folderTitle,
      reporterId: userData.sub,
      reporterName,
      content,
      authorId,
      date: new Date().getTime(),
      read: false,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default objectionAPI;
