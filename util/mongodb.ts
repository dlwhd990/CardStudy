import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || "";

let cachedDb: null | Db = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // connection 여러번 되는 문제
  console.log("NEW CONNECTION");
  let client = await MongoClient.connect(MONGODB_URI);
  let db = client.db();

  cachedDb = db;

  return cachedDb;
}
