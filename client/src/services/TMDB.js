import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const page = 1;



export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `movies?page=${page}`
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
