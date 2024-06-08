import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  CircularProgress,
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
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdErrorOutline } from 'react-icons/md';
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
    const userId = localStorage.getItem('accountId');
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
    const userId = localStorage.getItem('accountId');
    console.log('this is the sessionId', sessionId);
    console.log('this is the userId', userId);

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <CircularProgress size={'3.5rem'} style={{ color: '#E3E6E8' }} />
      </Box>
    );
  }

  if (error) {
    console.log(error.message);
    console.log(error.code);
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography color="gray">
          An error occurred while getting movie details <MdErrorOutline />
          <br />
          {error.message}
        </Typography>
      </Box>
    );
  }

  if (!data || !data?.title) {
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" color="gray">
          Couldn't get that movie detail. Please try later. <MdErrorOutline />
        </Typography>
      </Box>
    );
  }

  // recommendations state handing
  if (isRecommendationsFetching || isRecommendationsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <CircularProgress size={'3.5rem'} style={{ color: '#E3E6E8' }} />
      </Box>
    );
  }

  if (isRecommendationsError) {
    console.log(isRecommendationsError.message);
    console.log(isRecommendationsError.code);
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography color="gray">
          An error while getting recommendations. <MdErrorOutline />
          <br />
          {error.message}
        </Typography>
      </Box>
    );
  }

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
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
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
                            src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                            className={classes.castImage}
                            alt={character.name}
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
                  orientation={isMedium ? 'vertical' : 'horizontal'}
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
                  orientation={isMedium ? 'vertical' : 'horizontal'}
                >
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? <Favorite /> : <FavoriteBorder />
                    }
                  >
                    {isMovieFavorited ? 'Favorited' : 'Favorite'}
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
            <Box
              height="inherit"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" color="gray">
                Sorry, no recommendations available. <MdErrorOutline />
              </Typography>
            </Box>
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
