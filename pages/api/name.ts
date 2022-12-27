import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import verifyToken from "../../util/verifyToken";

async function changeName(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return;

  try {
    const cookieData = verifyToken(req);
    const mongodbURI = process.env.MONGODB_URI || "";
    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const collection = db.collection("user");
    const user = await collection.findOne({ userId: cookieData.sub });
    if (user === null) return res.status(401).json({ success: false });

    await collection.updateOne(
      { userId: user.userId },
      { $set: { name: req.body.name } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false });
  }
}

export default changeName;
