export const setLoggedInStatus = (status) => ({
    type: 'SET_LOGGED_IN_STATUS',
    payload: status,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });