import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}/credits`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Failed to fetch drama credits data ${error}`);
    res.status(500).json({ error: "Failed to fetch drama detail data" });
  }
}
