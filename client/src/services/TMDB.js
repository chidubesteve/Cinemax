import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUrl = process.env.REACT_APP_API_URL;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api` }),

  endpoints: (builder) => ({
    getUserList: builder.query({
      query: ({ listName, sessionId, page, accountId }) =>
        `account/${accountId}/${listName}?session_id=${sessionId}&page=${page}`,
    }),

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
    getMovie: builder.query({
      // configure route {added /id} to avoiding path conflict in express
      query: (id) => `movie/id/${id}?append_to_response=videos,credits`,
    }),
    getRecommendations: builder.query({
      //refactoring route to prevent path conflict
      query: ({ movie_id, page }) =>
        `movie/recommendation/${movie_id}?page=${page}`,
    }),
    // get actors info
    getActors: builder.query({
      query: (id) => `person/${id}?append_to_response=external_ids`,
    }),
    // get movies an artist is known for
    getMoviesByActorsID: builder.query({
      //refactoring route to prevent path conflict
      query: ({ id, page }) =>
        `discover/with_cast/movie?with_cast=${id}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetUserListQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsQuery,
  useGetMoviesByActorsIDQuery,
} = tmdbApi;
