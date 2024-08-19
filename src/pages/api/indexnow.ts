import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'URL parameter is required' });
  }

  try {
    const indexNowApiUrl = `https://www.bing.com/indexnow?url=${url}&key=960c4bacbe434fe2a272020cdc937617`;

    const response = await axios.get(indexNowApiUrl);

    if (response.status === 200) {
      res.status(200).json({ message: 'URL successfully submitted to IndexNow' });
    } else {
      res.status(500).json({ message: 'Failed to submit URL to IndexNow' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting URL to IndexNow', error });
  }
}
