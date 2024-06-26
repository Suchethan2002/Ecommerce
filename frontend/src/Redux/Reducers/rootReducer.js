// rootReducer.js
import { combineReducers } from 'redux';
import user from './user.js';
import viewsReducer from './viewReducer.js';
import UserReducer from './UserDataReducer.js'
import ProductReducer from './ProductDataReducer.js';
import wishlistReducer from './wishlistReducer';
import cartReducer from './CartReducer.js';
import eventsReducer from './EventReducers.js';
const rootReducer = combineReducers({
  user: user,
  views: viewsReducer,
  userData:UserReducer,
  productData:ProductReducer,
  wishlist: wishlistReducer,
  cart:cartReducer,
  events: eventsReducer,


});

export default rootReducer;