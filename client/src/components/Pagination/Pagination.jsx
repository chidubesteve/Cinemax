import React from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';

import useStyles from './style';

const Pagination = ({ setPage, totalPages, currentPage }) => {
  const classes = useStyles();

  // If there are less than 2 times in pagination range we shall not render the component

  if (currentPage === 0) return null;

  const onNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={classes.pagination_container}>
      <SlArrowLeft
        className={classes.arrows}
        onClick={onPrevious}
        title="Previous page"
      />
      <p className={classes.currentPage}>{currentPage}</p>
      <SlArrowRight
        className={classes.arrows}
        onClick={onNext}
        title="Next page"
      />
    </div>
  );
};

export default Pagination;
