import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";
import verifyToken from "../../util/verifyToken";

async function loginCheck(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;
  try {
    const result = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("user");
    const userData = await collection.findOne({ userId: result.sub });
    res.status(200).json({ ...userData, success: true });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false });
  }
}

export default loginCheck;
