import React, { useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';

import useStyles, { GlobalCSS } from './styles';
import '../../utils/libs/swiper-bundle.min.css';
import './swiper.css';
const FeaturedMovie = ({ movies }) => {

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
            dynamicBullets: true,
            dynamicMainBullets: 3,
          },
        }
      : {};

    script.onload = () => {
      // Initialize Swiper
      new window.Swiper('.mySwiper', {
        slidesPerView: 'auto',
        loopAdditionalSlides: 1,
        grabCursor: !0,
        centeredSlides: !isSmallDevice,
        effect: effect,
        ...effectConfig,
        ...addNavigationAndPagination,
        loop: !isSmallDevice,
        autoplay: {
          delay: 5e3,
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
      <Box
        className={`FeaturedCardContainer`}
      >
        <div className={`swiper mySwiper swiperContainer`}>
          <div className="swiper-wrapper">
            {movies.map((movie, i) => (
              <div key={i} className={`swiper-slide swiperSlide`}>
                <Link to={`/movies/${movie.id}`} className="link">
                  <div className="cardMedia">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                      alt={`${movie?.title} backdrop`}
                      title={movie?.title}
                      className="image"
                      loading="lazy"
                    />
                    <div className="overlay"></div>

                    <div className="info">
                      <h2 className={classes.title}>{movie?.title}</h2>
                      {!isSmallDevice && (
                        <p className="overview">{movie?.overview}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {!isSmallDevice && (
            <>
              <div
                className={`swiper-button-prev ${classes.myPrev_button_style}`}
              ></div>
              <div className={`swiper-button-next`}></div>
              <div
                className={`swiper-pagination ${classes.mySwiper_navigation}`}
              ></div>
            </>
          )}
        </div>
      </Box>
    </>
  );
};

export default FeaturedMovie;
