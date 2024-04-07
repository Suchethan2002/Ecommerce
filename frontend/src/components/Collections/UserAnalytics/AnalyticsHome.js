import React, { useState } from "react";
import Account from "./Account";
import ProductCategory from "./ProductCategory";
import Formater, { UserEngProcess } from "./Formater";
import Header from "../../Layout/Header";
import Search from "./Search";
import MonthlyTimeSpentChart from './MonthOnMonthActivity'
import PurchaseBehaviorChart from "./ATExpenditure";
import UserEngagementChart from "./UserEngamenet";
import PieChart from "./Views";
import ChangePasswordForm from "./AccountSecurity";
import AreaChart from "./Revenue";
import Address from "./Address";

export default function AnalyticsHome() {
  // State to manage the currently active page
  const [activePage, setActivePage] = useState(null);

  // Function to handle page clicks
  const handlePageClick = (pageLabel) => {
    setActivePage(pageLabel);
  };
 

  // Function to render the content based on the active page
  const renderPageContent = () => {
    switch (activePage) {
      case "Account":
        return <div>hjck</div>;
      case "Address":
        return <div>Address Page Content <Address/></div>;
      // case "Account Security":
      //   return <div><ChangePasswordForm/></div>;
      case "Categories":
        return <div>average pageview of category<ProductCategory/></div>;
      case "Brands":
        return <div><Search/></div>;
      case "Reviews":
        return <div><MonthlyTimeSpentChart/></div>;
      
      case "Views":
        return <div>Views Page pie chart Content<PieChart/></div>;
      case "Products":
        return <div>Products Page Content</div>;
      case "All Time Expenditure":
        return <div>purchase behaviour<PurchaseBehaviorChart/></div>;
      case "Amount Saved":
        return <div>Revenue <AreaChart/></div>;
      case "Overall":
        return <div><UserEngProcess/></div>;
      default:
        return <div><Formater/></div>;
    }
  };

  return (
    <>
      <div className="w-full h-full">
        {/* <div className="p-5 text-white text-center bg-gray-800">
          <h1>Welcome to the AnalyticsHome</h1>
        </div> */}
        <Header/>

        <div className="flex">
          <div className="ml-3 mt-4 w-1/5 grid">
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Account")}
            >
              Account
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Address")}
            >
              Address
            </div>
            {/* <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Account Security")}
            >
              Account Security */}
            {/* </div> */}
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Categories")}
            >
              Categories
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Brands")}
            >
              Search Activity
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Reviews")}
            >
              MonthlyTimeSpent
            </div>
            
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Views")}
            >
              Views
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Products")}
            >
              Products
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("All Time Expenditure")}
            >
              All Time Expenditure
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Amount Saved")}
            >
              Amount Saved
            </div>
            <div
              className="p-3 border border-gray-400 bg-gray-200 hover:bg-gray-300"
              onClick={() => handlePageClick("Overall")}
            >
              Overall
            </div>
          </div>

          <div className="flex-1">
            {/* Render the content of the active page */}
            <div className="mt-4 ml-20">{renderPageContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
