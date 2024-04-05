import axios from 'axios';

export async function getEmailValidation(req, res) {
  if (req.method === 'GET') {
    try {
      const options = {
        method: 'GET',
        url: 'https://mailcheck.p.rapidapi.com/',
        params: { domain: req.query.email },
        headers: {
          'x-rapidapi-host': 'mailcheck.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        },
      };

      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
