import React from "react";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

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
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-[20px]">
          <FiSearch className="cursor-pointer" />
          <FiUser className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
