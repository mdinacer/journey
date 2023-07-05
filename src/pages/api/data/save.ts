// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data: values } = req.body;

    if (!values) {
      return res.status(500).end('values not found');
    }

    const result = await fetch(`http://localhost:8082/save`, {
      method: 'POST',
      body: values
    });
    const data = await result.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
