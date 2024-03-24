import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = user.actions;

export default user.reducer;
