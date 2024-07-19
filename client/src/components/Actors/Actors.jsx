import React, { useState } from 'react';
import { Button, Typography, Grid, Box, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaYoutube, FaTiktok, FaImdb } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';

// internal imports
import {
  useGetMoviesByActorsIDQuery,
  useGetActorsQuery,
} from '../../services/TMDB';
import useStyles from './styles.js';
import PageTitle from '../PageTitle.jsx';
import { FetchError, FetchingState, MovieList, Pagination, ReadMore } from '..';
import { useSelector } from 'react-redux';

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const includeAdult = useSelector((state) => state.adultContent.adultContent);
  const [page, setPage] = useState(1);

  const {
    data: actorsMovies,
    error: actorsMoviesError,
    isFetching: actorsMoviesIsFetching,
    isLoading: actorsMoviesIsLoading,
  } = useGetMoviesByActorsIDQuery({ id, page, includeAdult });
  console.log(actorsMovies);

  const {
    data: actorsData,
    error: actorsError,
    isFetching: isActorsFetching,
    isLoading: isActorsLoading,
  } = useGetActorsQuery(id);

  const socialMediaLinks = [
    {
      id: 'facebook_id',
      Icon: MdFacebook,
      urlPrefix: 'https://www.facebook.com/',
      title: 'Facebook',
    },
    {
      id: 'instagram_id',
      Icon: FaInstagram,
      urlPrefix: 'https://www.instagram.com/',
      title: 'Instagram',
    },
    {
      id: 'tiktok_id',
      Icon: FaTiktok,
      urlPrefix: 'https://www.tiktok.com/@',
      title: 'TikTok',
    },
    {
      id: 'youtube_id',
      Icon: FaYoutube,
      urlPrefix: 'https://www.youtube.com/',
      title: 'Youtube',
    },
    {
      id: 'twitter_id',
      Icon: FaXTwitter,
      urlPrefix: 'https://www.twitter.com/',
      title: 'Twitter',
    },
  ];

  const genderMapping = {
    0: 'Not set / not specified',
    1: 'Female',
    2: 'Male',
    3: 'Non-binary',
  };

  const renderGender = (gender) => {
    return genderMapping[gender];
  };

  //actors info handling
  if (isActorsLoading || isActorsFetching) {
    return <FetchingState />;
  }

  if (actorsMoviesError) {
    return (
      <FetchError
        message={`Sorry, an error occurred while getting movies  ${
          actorsData?.name || 'actor'
        } is known for`}
      />
    );
  }

  // actors movies state handing
  if (actorsMoviesIsLoading || actorsMoviesIsFetching) {
    return <FetchingState />;
  }

  if (actorsError) {
    return (
      <>
        <FetchError
          message={`Sorry, couldn't get ${
            actorsData?.name || `actors's`
          } details.`}
        />
        <br />
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          align="center"
        >
          Go Back
        </Button>
      </>
    );
  }

  return (
    <>
      <PageTitle title={`${actorsData?.name} | Cinemax`} />
      <Grid className={classes.containerSpaceAround} container spacing={3}>
        <Grid item sm={12} lg={5} xl={4}>
          {}
          <img
            className={classes.poster}
            src={`https://cdn.statically.io/img/image.tmdb.org/t/p/w342/${actorsData?.profile_path}`}
            alt={actorsData?.name}
            loading="lazy"
            fetchPriority="high"
          />
          <Grid item className={classes.social_icons} gutterBottom>
            {socialMediaLinks.map(({ id, Icon, urlPrefix, title }) => {
              const socialId = actorsData?.external_ids?.[id];
              if (socialId) {
                return (
                  <Tooltip
                    arrow
                    disableTouchListener
                    title={`Visit ${title}`}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, -6],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon
                        key={id}
                        onClick={() =>
                          window.open(`${urlPrefix}${socialId}`, '_blank')
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </Tooltip>
                );
              }
              return null;
            })}
            {actorsData?.homepage && (
              <>
                <Tooltip
                  arrow
                  disableTouchListener
                  title={`Visit Website`}
                  placement="top"
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -6],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <div>
                    <TbWorld
                      onClick={() =>
                        window.open(`${actorsData?.homepage}`, '_blank')
                      }
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    />
                  </div>
                </Tooltip>
              </>
            )}
          </Grid>
          <section>
            <Typography variant="h5" gutterBottom>
              Personal Info
            </Typography>
            <p>
              <strong>Known For</strong>
              <span style={{ display: 'block' }}>
                {actorsData?.known_for_department || 'N/A'}
              </span>
            </p>
            <p>
              <strong>Popularity</strong>
              <span style={{ display: 'block' }}>
                {Math.floor((actorsData?.popularity * 100) / 100) || 'N/A'}
              </span>
            </p>
            <p>
              <strong>Gender</strong>
              <span style={{ display: 'block' }}>
                {renderGender(actorsData?.gender)}
              </span>
            </p>
            <p>
              <strong>Birthday</strong>
              <span style={{ display: 'block' }}>
                {new Date(actorsData?.birthday).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) || 'N/A'}
              </span>
            </p>
            <p>
              <strong>Place of Birth</strong>
              <span style={{ display: 'block' }}>
                {actorsData?.place_of_birth || 'N/A'}
              </span>
            </p>
          </section>
        </Grid>
        <Grid
          item
          container
          lg={7}
          direction="column"
          xl={8}
          style={{ display: 'flex', justifyContent: 'start' }}
        >
          {' '}
          <Typography variant="h3" fontWeight="bolder" marginBottom={'15px'}>
            {actorsData?.name}
          </Typography>
          <Grid item>
            <Typography variant="h5" gutterBottom fontWeight="500">
              Biography
            </Typography>
            <ReadMore>
              {actorsData?.biography ||
                `Sorry, we don't have a biography for ${
                  actorsData?.name || `this actor`
                }`}
            </ReadMore>
            <Grid item className={classes.buttonsContainer} marginTop="1.5rem">
              <Button
                target="_blank"
                variant="outlined"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${actorsData?.imdb_id}`}
                endIcon={<FaImdb />}
                name={`visit ${actorsData?.name} imdb's profile`}
              >
                IMDB
              </Button>{' '}
              <Button
                sx={{ borderColor: 'primary.main' }}
                variant="outlined"
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
            </Grid>
          </Grid>
        </Grid>
        <Box margin="2rem 0" className={classes.known_movies}>
          <h2 style={{ textAlign: 'center', display: 'block' }}>Know For</h2>

          {actorsMovies && <MovieList movies={actorsMovies} noOfMovies={12} />}
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={actorsMovies?.total_pages}
          />
        </Box>
      </Grid>
    </>
  );
};

export default Actors;
