import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const verifyToken = (req: NextApiRequest) => {
  const cookies: any = req.headers["cookie"]
    ?.split(`; `)
    .map((el: string) => el.split("="));
  const secret = process.env.SECRET_KEY || "";
  const token = cookies.filter((el: string[]) => el[0] === "token")[0][1];
  return jwt.verify(token, secret);
};

export default verifyToken;
