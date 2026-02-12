import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuCircleDollarSign } from "react-icons/lu";

function FeatureBar() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16 px-24 flex justify-center items-center gap-8 text-center ">


      <div className="w-[30%] flex flex-col items-center px-4">
        <LiaShippingFastSolid className="text-gray-900 dark:text-white text-5xl mb-2" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Free Shipping</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Free shipping on all orders, delivered fast and hassle-free, straight to your door</p>
      </div>
      
      <div className="w-[30%] flex flex-col items-center px-4">
        <BsClockHistory className="text-gray-900 dark:text-white text-5xl mb-2" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Support 24/7</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Our friendly customer support is available 24/7 to assist you anytime, anywhere.</p>
      </div>

       <div className="w-[30%] flex flex-col items-center px-4">
        <LuCircleDollarSign className="text-gray-900 dark:text-white text-5xl mb-2" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Money Return</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Easy money-back guarantee with confidence and get a full refund if you're not satisfied.</p>
      </div>

    </div>
  );
}

export default FeatureBar;
