import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function objectionAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("objection");

    // user ID로 알림 목록 가져오기
    if (req.method === "GET") {
      const result = await collection
        .find({ authorId: userData.sub })
        .toArray();
      res.json({ success: true, result });
    }

    // user ID로 알림 목록 모두 읽음 설정
    if (req.method === "PATCH") {
      await collection.updateMany(
        { authorId: userData.sub, read: false },
        { $set: { read: true } }
      );
      res.json({ success: true });
    }
  } catch (err) {
    res.json({ success: false });
  }
}

export default objectionAPI;
