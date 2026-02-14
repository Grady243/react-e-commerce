import React from "react";
import Button from "./Button";
import hero from "../assets/heroimg1.jpg";

function Hero() {
  return (
    <div
      className="w-full h-screen relative flex items-center justify-center px-24"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenu centré */}
      <div className="relative z-10 text-center">
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-white"></span>

          <p className="text-xl uppercase text-white tracking-wide font-bold whitespace-nowrap">
            Stylish
          </p>

          <span className="flex-1 h-px bg-white"></span>
        </div>

        <h1 className="text-7xl text-white my-2">Fashion Collection</h1>

        <p className="mb-6 text-white">30% off Summer Vacation</p>

        <Button text="SHOP NOW" />
      </div>
    </div>
  );
}

export default Hero;
