import { NextApiRequest, NextApiResponse } from "next";

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const cookies: any = req.headers["cookie"]
    ?.split(`; `)
    .map((el) => el.split("="));
  const token = cookies.filter((el: string[]) => el[0] === "token")[0][1];
  res.setHeader("Set-Cookie", `token=${token}; Max-Age=0`);
  res.json({ message: "logout success" });
}

export default logout;
