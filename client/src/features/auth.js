import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = sessionStorage.getItem('session_id');

      sessionStorage.setItem('accountId', action.payload?.id);
      console.log(action.payload?.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
