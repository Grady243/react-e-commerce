import React from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className=" w-full font-sans">
      {/* Main header */}
      <div className="flex items-center justify-between px-24 py-6">
        {/* Logo */}
        <div className="text-[28px] font-bold">Flone.</div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-8 text-[15px] font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">Collection</li>
            <li className="cursor-pointer">Blog</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
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
