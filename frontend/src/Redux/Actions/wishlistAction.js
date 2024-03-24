// wishlistActions.js

import axios from 'axios';


export const fetchWishlist = () => async (dispatch, getState) => {
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
    const response = await axios.get('/api/wishlist', config);
    console.log(response.data.items);

    // Dispatch the action to update the Redux state with fetched cart data
    dispatch({
      type: 'FETCH_WISHLIST_SUCCESS',
      payload: response.data.items, // Assuming response.data contains the cart data
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    // You can dispatch an action here for error handling if needed
  }
};
export const addToWishlist = (productId) =>async(dispatch,getState)=> {
    
  try{
    const token=localStorage.getItem("token");

    const config={
      headers:{
        Authorization:`${token}`,
      },
    }; 

    await axios.post('/api/wishlist/add',{productId},config);

    dispatch({type: 'ADD_TO_WISHLIST',
    payload: productId,});
  }catch(err){
    console.log('Error adding item to wishlist',err);
  }
    
  };
  
  export const removeFromWishlist = (productId) => async(dispatch,getState)=>{
    try{
      const token=localStorage.getItem('token');

      const config={
        headers:{
          Authorization: `${token}`,
        },
      };

      await axios.delete(`/api/wishlist/remove/${productId}`,config);

      dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: productId,

      });
      
    } catch(err){
      console.log('error removing item from the whishlist',err.message);
    }  
   
  };
  