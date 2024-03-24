// userDataReducer.js

import { SET_PRODUCT_DATA } from '../Actions/ProductData';

const initialState = {
  productData: null, // New state to store user data
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
