import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Best Selling',
      url: '/best-selling',
    },
    {
      title: 'Products',
      url: '/products',
    },
    
    {
      title: 'Analytics',
      url: '/analytics',
    },
  ];

  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (url) => {
    setActiveLink(url);
  };

  return (
    <nav className="p-4">
      <ul className="flex text-white space-x-6">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className={` transition duration-300 ${
                activeLink === item.url ? 'text-green-500' : ''
              }`}
              onClick={() => handleLinkClick(item.url)}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
