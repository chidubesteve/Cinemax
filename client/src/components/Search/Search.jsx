import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TextField, InputAdornment } from '@mui/material';

//internal imports
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const [query, setQuery] = useState('');
  const [shrink, setShrink] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };
  if (location.pathname !== '/') return null;
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        label="Search"
        onFocus={() => setShrink(true)}
        onBlur={(e) => setShrink(!!e.target.value)}
        InputLabelProps={{
          shrink,
          sx: {
            left: '2rem',
            fontSize: '0.85rem',
          },
        }}
        sx={(theme) => ({
          '& .Mui-focused .MuiInputAdornment-root': {
            color: theme.palette.primary.main,
          },
          '& .Mui-error .MuiInputAdornment-root': {
            color: theme.palette.error.main,
          },
          [theme.breakpoints.down('sm')]: {
            size: 'small',
          },
          // '& .MuiOutlinedInput-notchedOutline': {
          //   px: 5.5,
          // },
        })}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
