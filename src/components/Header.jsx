import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full font-sans">
      {/* Main header */}
      <div className="flex items-center justify-between px-24 py-6">
        {/* Logo */}
        <div className="text-[28px] font-bold">Flone.</div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 text-[15px] font-medium">
            <li>
              <Link to="/" className="cursor-pointer hover:text-gray-500">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop" className="cursor-pointer hover:text-gray-500">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/collection" className="cursor-pointer hover:text-gray-500">
                Collection
              </Link>
            </li>

            <li>
              <Link to="/blog" className="cursor-pointer hover:text-gray-500">
                Blog
              </Link>
            </li>

            <li>
              <Link to="/about" className="cursor-pointer hover:text-gray-500">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="cursor-pointer hover:text-gray-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2 text-[20px]">
          <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <FiSearch />
          </div>

          <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <FiUser />
          </div>

          <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <FiHeart />
          </div>

          <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
            <FiShoppingCart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
