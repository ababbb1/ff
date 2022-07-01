import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await axios({
    method: 'post',
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HH_IMAGES_TOKEN}`,
    },
  });

  res.json({
    ok: true,
    ...response.data.result,
  });
}
