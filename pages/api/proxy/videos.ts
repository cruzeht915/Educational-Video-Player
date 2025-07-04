import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user_id } = req.query;
  const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/videos?user_id=${user_id}`);
  const data = await response.json();
  res.status(200).json(data);
}