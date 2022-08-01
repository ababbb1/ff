import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { contentTypeHeaders, authHeaders } from '../../libs/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await axios({
    method: 'post',
    url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    headers: {
      ...contentTypeHeaders,
      ...authHeaders(process.env.HH_IMAGES_TOKEN as string),
    },
  });

  res.json({
    success: true,
    ...response.data.result,
  });
}
