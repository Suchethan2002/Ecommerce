// viewsReducer.js
const initialState = {
  views: {},
};

const viewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VIEW':
      return {
        ...state,
        views: {
          ...state.views,
          [action.productId]: (state.views[action.productId] || 0) + 1,
        },
      };
    default:
      return state;
  }
};

export default viewsReducer;