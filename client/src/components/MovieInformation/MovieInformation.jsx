import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Typography,
  Modal,
  Grid,
  Box,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  Bookmark,
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  ArrowBack,
  PlayArrow
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

// internal imports
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetUserListQuery,
} from '../../services/TMDB';
import useStyles from './styles.js';
import PageTitle from '../PageTitle.jsx';
import genreIcons from '../../assests/genres';
import { MovieList } from '..';
import { apiUrl } from '../../services/TMDB';
import {FetchError} from '..';
import {FetchingState} from '..';

const MovieInformation = () => {
  const [open, setOpen] = React.useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXLarge = useMediaQuery(theme.breakpoints.up('xl'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { user } = useSelector((state) => state.user);
  const { data, error, isFetching, isLoading } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetUserListQuery({
    listName: 'favorite/movies',
    accountId: user?.id,
    sessionId: sessionStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchlistMovies } = useGetUserListQuery({
    listName: 'watchlist/movies',
    accountId: user?.id,
    sessionId: sessionStorage.getItem('session_id'),
    page: 1,
  });
  const {
    data: recommendations,
    error: isRecommendationsError,
    isFetching: isRecommendationsFetching,
    isLoading: isRecommendationsLoading,
  } = useGetRecommendationsQuery({ movie_id: id, page: 1 });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    const sessionId = sessionStorage.getItem('session_id');
    const userId = sessionStorage.getItem('accountId');
    if (!sessionId || !userId) {
      console.error('Session ID or User ID is missing, try logging in first');
      return;
    }

    await fetch(
      `${apiUrl}/api/user/addToFavorite/user_id=${userId}?session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: id,
          favorite: !isMovieFavorited,
        }),
      }
    ).then((data) => {
      if (!data.ok) {
        alert(`operation failed`);
      }
    });
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchList = async () => {
    const sessionId = sessionStorage.getItem('session_id');
    const userId = sessionStorage.getItem('accountId');

    if (!sessionId || !userId) {
      console.error('Session ID or User ID is missing, try logging in first');
      return;
    }

    await fetch(
      `${apiUrl}/api/user/addToWatchList/user_id=${userId}?session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: id,
          watchlist: !isMovieWatchListed,
        }),
      }
    )
      .then((data) => {
        if (!data.ok) {
          alert(`operation failed`);
        }
      })
      .catch((err) => {
        console.error('Error adding movie to watchlist', err);
      });
    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching || isLoading) {
    return <FetchingState />;
  }

  error && (
    <FetchError message={'An error occurred while getting movie details'} />
  );

  if (!data || !data?.title) {
    return (
      <FetchError
        message={"Couldn't get that movie detail. Please try later. "}
      />
    );
  }

  // recommendations state handing
  if (isRecommendationsFetching || isRecommendationsLoading) {
    return <FetchingState />;
  }

  isRecommendationsError && (
    <FetchError message={'An error occurred while getting recommendations'} />
  );

  const spokenLanguages = data?.spoken_languages
    .map((language) => language.name)
    .join(', ');
  return (
    <>
      <PageTitle title={`${data.title} | Cinemax`} />
      <Grid className={classes.containerSpaceAround} container>
        <Grid
          item
          sm={12}
          lg={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            className={classes.poster}
            src={`https://cdn.statically.io/img/image.tmdb.org/f=auto/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
            loading="lazy"
            fetchpriority="high"
          />
        </Grid>
        <Grid item container lg={7} direction="column">
          <Typography variant="h4" align="center" gutterBottom>
            {data?.title} ({data.release_date.split('-')[0]})
          </Typography>
          <Typography variant="h6" align="center" gutterBottom color="grey">
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={data.vote_average / 2} />
              <Typography variant="subtitle1" gutterBottom marginLeft={'10px'}>
                {(Math.floor(data?.vote_average * 100) / 100).toFixed(1)} / 10
              </Typography>
            </Box>
            <Typography variant="subtitle1" align="center" gutterBottom>
              {data?.runtime} min{' '}
              {data?.spoken_languages.length > 0 && (
                <>
                  {data?.spoken_languages.length === 1
                    ? `/ ${data?.spoken_languages[0].name}`
                    : ''}
                </>
              )}
            </Typography>
          </Grid>
          {data?.spoken_languages.length > 1 && (
            <Typography
              display="flex"
              justifyContent="center"
              className={classes.spoken_langs}
            >
              Spoken languages: {spokenLanguages}.
            </Typography>
          )}
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                to="/"
                className={classes.links}
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  alt="genre icons"
                  className={classes.genreImage}
                  height={30}
                />{' '}
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h5" gutterBottom marginTop={'10px'}>
            Overview
          </Typography>
          <Typography
            variant="inherit"
            gutterBottom
            marginBottom={'2rem'}
            className={classes.overview}
          >
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Grid container className={classes.castContainer}>
            {data &&
              data.credits?.cast
                ?.map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid item key={i} className={classes.castItem}>
                        <Link
                          to={`/actors/${character.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <img
                            src={`https://cdn.statically.io/img/image.tmdb.org/f=auto/t/p/w185/${character.profile_path}`}
                            className={classes.castImage}
                            alt={character.name}
                            loading="lazy"
                          />
                          <Typography color="textPrimary" textAlign="center">
                            {character.name}
                          </Typography>
                          <Typography color="textSecondary" textAlign="center">
                            {
                              character.character
                                .split('/')[0]
                                .replace('(voice)', '')
                                .split('(')[0]
                            }
                          </Typography>
                        </Link>
                      </Grid>
                    )
                )
                .slice(0, 20)}
          </Grid>
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup
                  variant="outlined"
                  style={{ marginBottom: '10px' }}
                  size={isXLarge ? 'large' : 'small'}
                  orientation={'horizontal'}
                >
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup
                  variant="outlined"
                  size={isXLarge ? 'large' : 'small'}
                  style={{ marginBottom: '10px' }}
                  orientation={ 'horizontal'}
                >
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? <Favorite /> : <FavoriteBorder />
                    }
                  >
                    {isMovieFavorited ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    onClick={addToWatchList}
                    endIcon={
                      isMovieWatchListed ? <Bookmark /> : <BookmarkBorder />
                    }
                  >
                    {isMovieWatchListed ? 'Watchlisted' : 'Watchlist'}
                  </Button>
                  <Button
                    sx={{ borderColor: 'primary.main' }}
                    endIcon={<ArrowBack />}
                  >
                    <Link
                      to=""
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                      }}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontSize={'0.8125rem'}
                        fontWeight="500"
                      >
                        Back
                      </Typography>
                    </Link>
                  </Button>
                </ButtonGroup>
              </Grid>
              <Button variant="contained" style={{ marginTop: '20px', backgroundColor: '#56ff00', color: 'white', fontWeight: 'bold', width: '100%'}} startIcon={<PlayArrow />} size='large'>
              Watch Now
              </Button>
            </div>
          </Grid>
        </Grid>
        <Box marginTop="5rem" width="100%">
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: { fontSize: '1.8rem' },
            })}
          >
            You might also like
          </Typography>

          {recommendations ? (
            <MovieList movies={recommendations} noOfMovies={12} />
          ) : (
            <FetchError message={'No recommendations available'} />
          )}
        </Box>
        <Modal
          closeAfterTransition
          open={open}
          className={classes.modal}
          onClose={() => setOpen(false)}
        >
          {data?.videos?.results?.length > 0 && (
            <iframe
              autoPlay
              className={classes.videos}
              style={{ border: 0 }}
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              loading="lazy"
              allow="autoplay"
            />
          )}
        </Modal>
      </Grid>
    </>
  );
};

export default MovieInformation;
