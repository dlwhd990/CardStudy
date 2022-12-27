import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function loadStudyList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;

  const mongodbURI = process.env.MONGODB_URI || "";
  const dummy = {
    authorId: 1,
    title: "운영체제 중간고사 정리",
    dateTime: new Date().getTime(),
    like: 0,
  };
  const client = await MongoClient.connect(mongodbURI);
  const db = client.db();
  const collection = db.collection("study");
  collection.insertOne(dummy);
  res.status(200).json({ hello: "world" });
}

export default loadStudyList;
