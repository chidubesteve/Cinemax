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

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://cinemax-app-seven.vercel.app'
    : '*', // Allow all origins in development
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type',
};

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

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

// proxy request for request token
app.get('/api/requestToken', async (req, res) => {
  try {
    const response = await tmdbApi.get('/authentication/token/new');
    const { request_token } = response.data;

    if (response.data.success) {
      res.status(200).json({ request_token });
    } else {
      res.status(500).json({ message: 'Token generation unsuccessful' });
    }
  } catch (err) {
    console.log('Sorry, your token could not be generated.', err);
    res.status(500).json({ message: 'Error generating token' });
  }
});

//proxy request for session_id
app.post('/api/sessionId', async (req, res) => {
  const { request_token } = req.body;

  try {
    if (!request_token) {
      return res.status(400).json({ message: 'Request token is required' });
    }

    const response = await tmdbApi.post('authentication/session/new', {
      request_token,
    });
    // Assuming that the data returned from tmdbApi has an object with session_id
    if (response.data && response.data.session_id) {
      res.status(200).json(response.data);
    } else {
      throw new Error('TMDB did not return a session_id');
    }
  } catch (err) {
    console.error('Error fetching session ID:', err.message);
    res.status(500).json({ message: 'Error fetching session ID' });
  }
});

//proxy endpoint for account
app.get('/api/getAccount', async (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) {
    return res.status(400).send({ message: 'Session ID is required' });
  }
  const params = {
    session_id: sessionId,
  };
  tmdbApi
    .get(`account`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error getting account: ', err);
      res.status(500).send({ message: 'Error getting account' });
    });
});

// proxy endpoint to get a particular movie information = configure route to prevent path conflict in express
app.get('/api/movie/id/:id', async (req, res) => {
  const { append_to_response } = req.query;
  const { id } = req.params;

  const params = {
    language: 'en-US',
  };
  tmdbApi
    .get(`movie/${id}?append_to_response=${append_to_response}`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error getting movie detail: ', err);
      res
        .status(500)
        .send({ message: 'Error getting movie detail', error: err.message });
    });
});

//proxy endpoint to get move recommendations from a particular movie
app.get('/api/movie/recommendation/:movie_id', async (req, res) => {
  const { movie_id } = req.params;
  const { page } = req.query;

  const params = {
    language: 'en-US',
    page: page || 1,
  };

  tmdbApi
    .get(`movie/${movie_id}/recommendations`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error getting movie recommendations: ', err);
      res.status(500).send({
        message: 'Error getting movie recommendations',
        error: err.message,
      });
    });
});

//proxy endpoint to get an actors info
app.get('/api/person/:id', async (req, res) => {
  const { append_to_response } = req.query;
  const { id } = req.params;

  const params = {
    language: 'en-US',
  };

  tmdbApi
    .get(`person/${id}?append_to_response=${append_to_response}`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error getting actors details: ', err);
      res.status(500).send({
        message: 'Error getting actors details',
        error: err.message,
      });
    });
});

//proxy endpoint to get an movies an actor casted in
app.get('/api/discover/with_cast/movie', async (req, res) => {
  const { with_cast, page } = req.query;

  const params = {
    language: 'en-US',
    page: page || 1,
  };

  tmdbApi
    .get(`discover/movie?with_cast=${with_cast}`, { params })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log('Error getting movies actor is known for: ', err);
      res.status(500).send({
        message: 'Error getting movies actor is known for: ',
        error: err.message,
      });
    });
});

// proxy endpoint for user to favorite movie
app.post('/api/user/addToFavorite/user_id=:user_id', async (req, res) => {
  const { media_type, media_id, favorite } = req.body;
  const { session_id } = req.query;
  const { user_id } = req.params;

  const params = {
    media_type: media_type,
    media_id: media_id,
    favorite: favorite,
  };

  try {
    if (!session_id || !user_id) {
      return res
        .status(400)
        .send({ message: 'Session ID and User ID are required' });
    }

    await tmdbApi
      .post(`account/${user_id}/favorite?session_id=${session_id}`, params)
      .then((response) => {
        res.status(200).send(response.data);
      });
  } catch (err) {
    console.log('Error adding movie to favorites: ', err);
    res.status(500).send({
      message: 'Error adding movie to favorites',
      error: err.message,
    });
  }
});

// proxy endpoint for user to watchlist movie
app.post('/api/user/addToWatchList/user_id=:user_id', async (req, res) => {
  const { media_type, media_id, watchlist } = req.body;
  const { session_id } = req.query;
  const { user_id } = req.params;

  const params = {
    media_type: media_type,
    media_id: media_id,
    watchlist: watchlist,
  };

  if (!session_id || !user_id) {
    return res
      .status(400)
      .send({ message: 'Session ID and User ID are required' });
  }
  await tmdbApi
    .post(`account/${user_id}/watchlist?session_id=${session_id}`, params)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('Error adding movie to favorites: ', err);
      res.status(500).send({
        message: 'Error adding movie to favorites',
        error: err.message,
      });
    });
});

// proxy endpoint for user to get list of favorite/watchlist movies
app.get('/api/account/:accountId/:listName/:listName2', async (req, res) => {
  const { accountId, listName, listName2 } = req.params;
  const { session_id, page } = req.query;

  console.log(req.query);
  console.log(req.params);

  const params = {
    session_id: session_id,
    language: 'en-US',
    page: page || 1,
  };

  if (!session_id || !accountId) {
    return res
      .status(400)
      .send({ message: 'Session ID and User ID are required' });
  }

  await tmdbApi
    .get(`account/${accountId}/${listName}/${listName2}`, { params })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('Error adding movie to favorites: ', err);
      res.status(500).send({
        message: 'Error adding movie to favorites',
        error: err.message,
      });
    });
});

// All other request not handled by api will return the react app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
