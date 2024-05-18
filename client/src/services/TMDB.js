import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
  reducerPath: {
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
  },
});
