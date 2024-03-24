// viewsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  views: {},
};

const viewSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    addView: (state, action) => {
      state.views[action.payload] = (state.views[action.payload] || 0) + 1;
    },
  },
});

export const { addView } = viewSlice.actions;

export const selectViews = (state) => state.views;

export const selectTotalIndividualViews = (state) => {
    return Object.keys(state.views.views).length;
  };
  export const selectTotalViews = (state) => {
    return Object.values(state.views.views).reduce((acc, view) => acc + view, 0);
  };

export default viewSlice.reducer;