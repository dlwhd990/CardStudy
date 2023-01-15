import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../util/mongodb";

export async function searchAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;
  try {
    const db = await connectToDatabase();
    const folderCollection = db.collection("folder");

    const result = await folderCollection
      .find({
        title: { $regex: req.query.query },
        public: true,
      })
      .toArray();

    res.json({ success: true, result: result.sort((a, b) => b.date - a.date) });
  } catch (err) {
    res.json({ success: false });
  }
}

export default searchAPI;
