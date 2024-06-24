import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import {
  selectGenreOrCategory,
  searchMovie,
} from '../features/currentGenreOrCategory';

const useAlan = () => {
  const { toggleColorMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (genre) =>
              genre.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate(`/`);
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            // we have 4 options, top rated, upcoming, popular, now playing. top rated and now playing has spaces so we have to parse them
            const parsedCategory = (category) => {
              if (category.startsWith('top')) {
                return 'top_rated';
              } else if (category.startsWith('now')) {
                return 'now_playing';
              } else if (category === 'popular' || category === 'upcoming') {
                return category;
              }
            };
            navigate(`/`);
            const category = parsedCategory(genreOrCategory);
            console.log(category);
            if (category) {
              dispatch(selectGenreOrCategory(category));
            } else {
              alanBtn().playText(`${genreOrCategory} was not found`);
            }
          }
        } else if (command === 'changeMode') {
          if (mode === 'dark') {
            toggleColorMode('dark');
          } else {
            toggleColorMode('light');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          sessionStorage.clear();
          window.location.href = '/';
        } else if (command === 'search') {
          console.log(query);
          dispatch(searchMovie(query));
        }
      },
    });
  }, [dispatch, navigate, toggleColorMode]);
};

export default useAlan;
