require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios').default;
const app = express();
const TMDB_RAT = process.env.TMDB_RAT;

const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  max: 40,
  windowMs: 1000,
  message: 'Too many requests. Try again later',
});

app.set('trust proxy', 1);
app.use(express.json());
app.use(limiter);
app.use(cors());

// Proxy endpoint to get movies
app.get('/api/movies', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/movie/week';
  const params = {
    language: 'en-US',
    page: req.query.page || 1,
  };
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_RAT}`,
  };

  axios
    .get(url, {
      params,
      headers,
    })
    .then((result) => {
      res.status(200).send(result.data);
      console.log(result.data);
    })
    .catch((error) => {
      console.log('Error fetching movies:', error.message);
      res.status(500).send({ message: 'Error fetching movies' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
