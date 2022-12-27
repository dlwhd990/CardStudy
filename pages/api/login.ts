import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

const authClient = new OAuth2Client(process.env.APP_API);

async function verify(token: string) {
  const ticket = await authClient.verifyIdToken({
    idToken: token,
    audience: process.env.APP_API,
  });
  return ticket;
}

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mongodbURI = process.env.MONGODB_URI || "";

    const token = req.headers.authorization || "";
    const ticket = await verify(token);
    const payload = ticket.getPayload() || { name: "", picture: "", sub: "" };
    const { name, picture, sub } = payload;

    const client = await MongoClient.connect(mongodbURI);
    const db = client.db();
    const User = db.collection("user");

    const check = await User.findOne({ userId: sub });
    if (!check) {
      await User.insertOne({ name, userId: sub, picture });
    }
    const credentials = { ...payload, signedIn: true };
    const jwtToken = jwt.sign(credentials, "temp123123temp"); // 비밀키 임시로 둠
    res.setHeader("Set-Cookie", `token=${jwtToken}; Max-Age=86400`);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
}

export default login;
