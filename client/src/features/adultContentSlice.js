import { createSlice } from '@reduxjs/toolkit';

export const isAdultContent = createSlice({
  name: 'adultContent',
  initialState: {
    adultContent: JSON.parse(sessionStorage.getItem('adultContent')) || false,
  },
  reducers: {
    setAdultContent: (state, action) => {
      state.adultContent = action.payload;
      console.log(state.adultContent);
      console.log(action.payload);
      sessionStorage.setItem('adultContent', JSON.stringify(action.payload));
    },
  },
});

export const { setAdultContent } = isAdultContent.actions;

export default isAdultContent.reducer;
