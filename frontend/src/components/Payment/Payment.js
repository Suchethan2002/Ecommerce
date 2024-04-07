import React, { useState } from "react";
import Header from "../Layout/Header";
import { Link } from "react-router-dom";
const Payment = () => {
  const [select, setSelect] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardSubmitted, setCardSubmitted] = useState(false);
  const [upiSubmitted, setUpiSubmitted] = useState(false);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
    setCardSubmitted(true);
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
    setUpiSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className="w-full flex justify-center" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
          <div className="flex items-center">
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#484646] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Order Summary
              </span>
            </div>
            <div className="w-[30px] 800px:w-[70px] h-[4px] bg-[#0e0e0e] "></div>
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#0c0808] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Payment
              </span>
            </div>
            <div className="w-[30px] 800px:w-[70px] h-[4px] bg-[#0b0808] "></div>
            <div className="px-[20px] h-[38px] rounded-[20px] bg-[#524e4e] flex items-center justify-center cursor-pointer mb-3">
              <span className="text-[#fff] text-[16px] font-[500]">
                Success
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '500px' ,borderRadius:'10px'}} className="w-[10%] 800px:w-[25%] bg-white rounded-md p-5 pb-8">
        {/* Payment options */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            {/* Credit/Debit Card option */}
            <div
              className={`w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[${select === 1 ? "#1d1a1acb" : "#1d1a1ab4"}] relative flex items-center justify-center`}
              onClick={() => setSelect(1)}
            >
              {select === 1 && (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              )}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Debit/credit card
            </h4>
          </div>
          {/* Form for Debit/Credit Card */}
          {select === 1 && (
            <form onSubmit={handleCardSubmit}>
              <div className="box-container">
                <label>
                  Card Number:
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                      backgroundColor: cardSubmitted ? '#f2f2f2' : '#fff', // Change background color on submission
                    }}
                    disabled={cardSubmitted} // Disable input field on submission
                  />
                </label>
              </div>
              <div className="box-container">
                <label>
                  Expiry Date:
                  <input
                    type="text"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                      backgroundColor: cardSubmitted ? '#f2f2f2' : '#fff', // Change background color on submission
                    }}
                    disabled={cardSubmitted} // Disable input field on submission
                  />
                </label>
              </div>
              <div className="box-container">
                <label>
                  Name on Card:
                  <input
                    type="text"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                      backgroundColor: cardSubmitted ? '#f2f2f2' : '#fff', // Change background color on submission
                    }}
                    disabled={cardSubmitted} // Disable input field on submission
                  />
                </label>
              </div>
              <button type="submit" className="bg-black text-white px-3 py-1 rounded-md mt-4" style={{ marginBottom: "10px" }}>Submit</button>
            </form>
          )}

          {/* UPI option */}
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className={`w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[${select === 2 ? "#1d1a1acb" : "#1d1a1ab4"}] relative flex items-center justify-center`}
              onClick={() => setSelect(2)}
            >
              {select === 2 && (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              )}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with UPI
            </h4>
          </div>
          {/* Form for UPI */}
          {select === 2 && (
            <form onSubmit={handleUpiSubmit}>
              <div className="box-container">
                <label>
                  Enter UPI Id:
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                      backgroundColor: upiSubmitted ? '#f2f2f2' : '#fff', // Change background color on submission
                    }}
                    disabled={upiSubmitted} // Disable input field on submission
                  />
                </label>
              </div>
              <button type="submit" className="bg-black text-white px-3 py-1 rounded-md mt-4" style={{ marginBottom: '10px' }}>Verify</button>
            </form>
          )}

          {/* Cash on Delivery option */}
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className={`w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[${select === 3 ? "#1d1a1acb" : "#1d1a1ab4"}] relative flex items-center justify-center`}
              onClick={() => setSelect(3)}
            >
              {select === 3 && (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              )}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Cash on Delivery
            </h4>
          </div>
        </div>
      </div>
      <Link to='/success'>
      <button className="bg-black text-white px-3 py-1 rounded-md mt-4" style={{ marginTop: '10px', marginLeft: '500px' }}>Confirm Order</button>
      </Link>
    </>
  );
};

export default Payment;
