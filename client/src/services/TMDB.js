import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://localhost:3001';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api` }),

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // get movies by search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }
        // get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}`;
        }
        // get movies by genres
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        // get trending weekly movies
        return `movies?page=${page}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list`,
    }),
    // get a particular movie info
    getMovie: builder.query({ // configure route {added /id} to avoiding path conflict in express
      query: (id) => `movie/id/${id}?append_to_response=videos,credits`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery } =
  tmdbApi;
