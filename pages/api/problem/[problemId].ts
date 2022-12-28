import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";
import verifyToken from "../../../util/verifyToken";

async function problemIdAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    let problemId: string;
    if (typeof req.query.problemId === "string") {
      problemId = req.query.problemId;
    } else {
      problemId = "";
    }
    const userData = verifyToken(req);
    const db = await connectToDatabase();
    const collection = db.collection("problem");

    // 삭제
    if (req.method === "DELETE") {
      await collection.deleteOne({
        userId: userData.sub,
        _id: new ObjectId(problemId),
      });

      res.json({ success: true });
    }

    // 변경 (update)
    else if (req.method === "PATCH") {
      await collection.updateOne(
        {
          userId: userData.sub,
          _id: new ObjectId(problemId),
        },
        {
          $set: { question: req.body.question },
        }
      );

      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
}

export default problemIdAPI;
