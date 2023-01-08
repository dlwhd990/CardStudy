import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function likeUploadAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("like");

    await collection.insertOne({
      folderId: req.body.folderId.toString(),
      userId: userData.sub,
      date: new Date().getTime(),
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

export default likeUploadAPI;
