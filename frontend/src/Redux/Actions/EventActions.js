// Define action types
export const ADD_EVENT = 'ADD_EVENT';

// Action creators
export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
});
