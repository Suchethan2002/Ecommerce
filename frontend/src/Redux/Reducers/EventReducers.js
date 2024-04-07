import { ADD_EVENT } from '../Actions/EventActions';

// Initial state
const initialState = {
  events: [],
};

// Reducer function
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};

export default eventsReducer;
