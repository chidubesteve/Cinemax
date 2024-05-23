require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios').default;
const app = express();
const path = require('path');
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

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

// creating a axios default instance
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_RAT}`,
  },
});

// movies request handler
const getMoviesHandler = async (req, res) => {
  let url = '';

  // Define base params
  let params = {
    language: 'en-US',
    page: req.query.page || 1,
  };

  // Determine URL and additional params based on the path
  if (req.path === '/api/movies') {
    url = 'trending/movie/week';
  } else if (req.path === '/api/discover/movie') {
    url = 'discover/movie';
    const { with_genres } = req.query;
    console.log(with_genres);
    console.log(url);
    params = {
      language: 'en-US',
      page: req.query.page || 1,
      with_genres: with_genres,
    };
  }

  // Make the API request to tmdbApi
  tmdbApi
    .get(url, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
      res.status(500).send({ message: 'Error fetching movies' });
    });
};

// Proxy endpoint to get trending weekly movies & genres
app.get(['/api/movies', '/api/discover/movie'], getMoviesHandler);

//get movies by category
app.get('/api/movie/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const { page } = req.query;

  let params = {
    language: 'en-US',
    page: page || 1,
  };
  const url = `movie/${categoryName}`;
  tmdbApi
    .get(url, {
      params,
    })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      console.log('Error fetching category:', error.message, error.code);
      res.status(500).send({ message: 'Error fetching category' });
    });
});

// proxy endpoint to get genres
app.get('/api/genre/movie/list', async (req, res) => {
  const params = {
    language: 'en-US',
  };

  tmdbApi
    .get('genre/movie/list', { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error fetching genres:', err.message);
      res.status(500).send({ message: 'Error fetching genres' });
    });
});

//  proxy endpoint to get movies by search
app.get('/api/search/movie', async (req, res) => {
  const { query, page } = req.query;

  const params = {
    language: 'en-US',
    page: page || 1,
  };

  tmdbApi
    .get(`search/movie?query=${query}`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error searching movies:', err);
      res.status(500).send({ message: 'Error searching movies' });
    });
});

// All other request not handled by api will return the react app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
