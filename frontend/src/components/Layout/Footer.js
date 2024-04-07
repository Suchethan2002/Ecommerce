import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        

        <div className="col-md-4">
            <h4 className="mb-1 font-semibold">Get to Know Us</h4>
            <ul>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6" ><a href="#">About Us</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">Careers</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">Store Locations</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">Reviews</a></li>
            </ul>
          </div>

          
        <div className="col-md-4">
        <h4 style={{marginRight:'200px'}} className="mb-1 font-semibold">Connect with Us</h4>
        <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
          </div>

        <div className="col-md-4">
            <h4 className="mb-1 font-semibold">Customer Service</h4>
            <ul>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6" ><a href="#">Contact Us</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">Shipping Information</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">Returns & Exchanges</a></li>
              <li className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"><a href="#">FAQs</a></li>
            </ul>
          </div>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-blue-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span> All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;