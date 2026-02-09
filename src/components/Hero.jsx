import React from "react";
import Button from "./Button";
import hero from "../assets/heroimg1.png";

function Hero() {
  return (
    <div
      className="w-full h-screen bg-cover px-24 flex items-center"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="ml-16 text-center">
        {/* Stylish avec lignes gauche / droite */}
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-black"></span>

          <p className="text-xl uppercase  text-black tracking-wide font-bold whitespace-nowrap">
            Stylish
          </p>

          <span className="flex-1 h-px bg-black"></span>
        </div>

        <h1 className="text-7xl text-black my-2">Fashion Collection</h1>

        <p className="mb-6  text-black">30% off Summer Vacation</p>

        <Button text="SHOP NOW" />
      </div>
    </div>
  );
}

export default Hero;
