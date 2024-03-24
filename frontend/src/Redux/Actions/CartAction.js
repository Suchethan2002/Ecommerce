import axios from 'axios';

export const fetchCart = () => async (dispatch, getState) => {
  try {
    // Get the token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    // Send the GET request to fetch cart data
    const response = await axios.get('/api/cart', config);
    console.log(response.data.items);

    // Dispatch the action to update the Redux state with fetched cart data
    dispatch({
      type: 'FETCH_CART_SUCCESS',
      payload: response.data.items, // Assuming response.data contains the cart data
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    // You can dispatch an action here for error handling if needed
  }
};


export const addToCart = (productId) => async (dispatch, getState) => {
  try {
    // Get the token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    // Send the POST request with the token included in the headers
    await axios.post('/api/cart/add', { productId }, config);

    // Dispatch the action to update the Redux state
    dispatch({
      type: 'ADD_TO_CART',
      payload: productId,
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    // Get the token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    // Send the DELETE request with the token included in the headers
    await axios.delete(`/api/cart/remove/${productId}`, config);

    // Dispatch the action to update the Redux state
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};
