import axios from 'axios';

export default async function handler(req, res) {
  const { id, i } = req.query;
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}/season/${i}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Failed to fetch drama season data ${error}`);
    res.status(500).json({ error: "Failed to fetch drama season data" });
  }
}
