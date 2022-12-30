import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function getObjectionListById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("objection");

    if (req.method === "GET") {
      const result = await collection
        .find({ authorId: userData.sub })
        .toArray();
      res.json({ success: true, result });
    }
  } catch (err) {
    res.json({ success: false });
  }
}

export default getObjectionListById;
