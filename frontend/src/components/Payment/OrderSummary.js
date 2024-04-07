import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Layout/Header';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
  // Get cart items from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.productData.productData);

  // Initialize count state for each item
  const [counts, setCounts] = useState(
    Object.fromEntries(cart.map(itemId => [itemId, 1]))
  );
  

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((itemId) => {
      const product = products.find((product) => product.id === itemId);
      if (product) {
        totalPrice += product.discount_price * counts[itemId]; // Multiply by count of each item
      }
    });
    return totalPrice;
  };

  // Function to increment count for a specific item
  const incrementCount = (itemId) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [itemId]: prevCounts[itemId] + 1
    }));
  };

  // Function to decrement count for a specific item
  const decrementCount = (itemId) => {
    if (counts[itemId] > 1) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [itemId]: prevCounts[itemId] - 1
      }));
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    houseNumber: '',
    street: '',
    town: '',
    city: '',
    state: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation check for empty fields
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    if (!isFormValid) {
      alert('Please fill in all the fields');
      return;
    }
    // Here you can handle form submission
    console.log(formData);
  };

  const handleProceedToPayment = (e) => {
    if (!Object.values(formData).every(value => value.trim() !== '')) {
      alert('Please fill in all the fields before proceeding to payment.');
      e.preventDefault(); // Prevent default behavior of button
    } else {
      console.log('Proceeding to payment...');
      // Add code to redirect to payment page if necessary
    }
  };
  
  return (
    <div>
      <Header />
      
      <div className="w-full flex justify-center" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
          <div className="flex items-center">
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#0e0e0e] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Order Summary
              </span>
            </div>
            <div className="w-[30px] 800px:w-[70px] h-[4px] bg-[#0e0e0e] "></div>
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#4a4848] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Payment
              </span>
            </div>
            <div className="w-[30px] 800px:w-[70px] h-[4px] bg-[#595555] "></div>
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#524e4e] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Success
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-start py-8">
        <div className="w-[50%] 8000px:w-[35%] bg-white rounded-md p-5 pb-8 mr-8">
          <h5 className="text-[18px] font-[500]">Shipping Address</h5>
          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>House Number:</label>
        <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Street:</label>
        <input type="text" name="street" value={formData.street} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Town:</label>
        <input type="text" name="town" value={formData.town} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>State/Province:</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <button type="submit" style={{ padding: '8px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
    </form>
        </div>

       
       <div style={{marginLeft:'50px'}}>
         <div className="w-[100%] 800px:w-[35%] 800px:mt-0 mt-8">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {/* Map through cart items and display each item */}
    {cart.map((itemId) => {
      const product = products.find((product) => product.id === itemId);
      return (
        <div key={itemId} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {product && (
            <div>
              <div>
               <img src={product.image_Url} style={{ height: '150px', width: 'auto' }} />                
              </div> 

              <h3>{product.name}</h3>
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <button
                  className="bg-gradient-to-r from-black to-black text-white font-bold rounded-l px-1 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() => decrementCount(itemId)}
                >
                  -
                </button>
                <span className="bg-gray-400 text-gray-800 font-medium px-2 py-2">
                  {counts[itemId]}
                </span>
                <button
                  className="bg-gradient-to-r from-black to-black text-white font-bold rounded-l px-1 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  onClick={() => incrementCount(itemId)}
                >
                  +
                </button>
                
              </div>
              <p style={{fontWeight:'bold'}}>Price: ₹{product.discount_price}</p>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

          <div style={{ fontWeight: 'bolder',marginLeft:'200px' }} className="w-[30px] 800px:w-[150px] h-[4px] bg-[#0d0b0b]"></div>
          <h2 style={{ fontWeight: 'bolder',marginLeft:'200px' }}>Total Price: ₹{calculateTotalPrice()}</h2>
          <div style={{ fontWeight: 'bolder',marginLeft:'200px' }} className="w-[30px] 800px:w-[150px] h-[4px] bg-[#0d0b0b]"></div>
        </div>
      </div>
     
      <Link to='/payment'>
        <button
          style={{ marginLeft: '700px', marginTop: '30px' }}
          className="bg-black text-white px-4 py-2 rounded-md mt-4"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </Link>

    </div>
  );
};

export default OrderSummary;
