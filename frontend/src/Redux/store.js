// store.js
import { createStore } from 'redux';
import rootReducer from './Reducers/user.js';

const store = createStore(rootReducer);

export default store;
