import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { video_id } = req.query;
  const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/videos/comments?video_id=${video_id}`);
  const data = await response.json();
  res.status(200).json(data);
}