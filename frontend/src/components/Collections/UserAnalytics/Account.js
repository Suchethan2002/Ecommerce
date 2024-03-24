import React from "react";


 export default function Account(){
    const UserData=JSON.parse(window.localStorage.getItem('Address'));
    return(
        <div>
        {UserData ? (
          <>
            <h2>User Address:</h2>
            <p>Street: {UserData.street}</p>
            <p>City: {UserData.city}</p>
            <p>State: {UserData.state}</p>
            <p>Country: {UserData.country}</p>
            <p>ZIP: {UserData.zip}</p>
          </>
        ) : (
          <p>Loading user data...
            {/* {UserData.street} */}
          </p>
        )}
      </div>
    );
 }