import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/dist/server/api-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect('/login');
}
