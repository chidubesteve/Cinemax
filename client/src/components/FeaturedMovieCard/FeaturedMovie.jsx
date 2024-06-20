import React, { useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';

import useStyles, { GlobalCSS } from './styles';
import '../../utils/libs/swiper-bundle.min.css';
import './swiper.css';
const FeaturedMovie = ({ movies }) => {
  console.log(movies);

  const classes = useStyles();
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(
    theme.breakpoints.down('customBreakpoint3')
  );
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    const effect = isSmallDevice ? 'cards' : 'coverflow';
    const effectConfig = isSmallDevice
      ? {
          cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false,
          },
        }
      : {
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          },
        };

    const addNavigationAndPagination = !isSmallDevice
      ? {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        }
      : {};

    const addAutoPlay = !isSmallDevice
      ? {
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        }
      : {};

    script.onload = () => {
      // Initialize Swiper
      new window.Swiper('.mySwiper', {
        slidesPerView: 'auto',
        grabCursor: !0,
        centeredSlides: !isSmallDevice,
        effect: effect,
        ...effectConfig,
        ...addNavigationAndPagination,
        loop: !isSmallDevice,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [isSmallDevice]);

  if (!movies) return null;

  return (
    <>
      <GlobalCSS />
      <Box className="FeaturedCardContainer">
        <div className={`swiper mySwiper swiperContainer`}>
          <div className="swiper-wrapper">
            {movies.map((movie, i) => (
              <div key={i} className={`swiper-slide swiperSlide`}>
                <Link to={`/movies/${movie.id}`} className="link">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={movie?.title}
                    title={movie?.title}
                    className="image"
                  />
                  <div className="info">
                    <h2 className="title">{movie?.title}</h2>
                    <p className="overview">{movie?.overview}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {!isSmallDevice && (
          <>
            <div class="swiper-button-prev myPrev-button-style"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination mySwiper-navigation"></div>
          </>
        )}
      </Box>
    </>
  );
};

export default FeaturedMovie;
