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

// creating a axios default instance
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_RAT}`,
  },
})

// Proxy endpoint to get movies
app.get('/api/movies', async (req, res) => {
  const params = {
    language: 'en-US',
    page: req.query.page || 1,
  };

  tmdbApi
    .get('trending/movie/week', {
      params
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      console.log('Error fetching movies:', error.message);
      res.status(500).send({ message: 'Error fetching movies' });
    });
});

// proxy endpoint to get genres
app.get('/api/genre/movie/list', async (req, res) => {
  const params = {
    language: 'en-US',
  }

  tmdbApi.get('genre/movie/list', {params}).then(result => {
    res.status(200).send(result.data);
    console.log(result.data);
  }).catch(err => {
    console.log('Error fetching genres:', err.message);
    res.status(500).send({ message: 'Error fetching genres' });

  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
