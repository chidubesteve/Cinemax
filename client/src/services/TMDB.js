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
    // get movies for featured cards, trending movies of the day
    getDailyTrending: builder.query({
      query: () => `trending/movie/day`,
    }),
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery, includeAdult }) => {
        const includeAdultParam = includeAdult ? '&include_adult=true' : '';
        console.log(includeAdultParam)
        // get movies by search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}${includeAdultParam}&page=${page}`;
        }
        // get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}${includeAdultParam}`;
        }
        // get movies by genres
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}${includeAdultParam}`;
        }

        // discover movies
        return `movies?page=${page}${includeAdultParam}`;
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
      query: ({ id, page, includeAdult }) => {
        const includeAdultParam = includeAdult ? '&include_adult=true' : '';
        return `discover/with_cast/movie?with_cast=${id}&page=${page}${includeAdultParam}`;
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetDailyTrendingQuery,
  useGetUserListQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorsQuery,
  useGetMoviesByActorsIDQuery,
} = tmdbApi;
