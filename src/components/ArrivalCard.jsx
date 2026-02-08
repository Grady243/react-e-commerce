import React from "react";

const ArrivalCard = ({ image, name, price }) => {
  return (
    <div className="flex flex-col items-start bg-white ">
      {/* Carré pour l'image */}
      <div className="w-full h-56 p-5 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} />
      </div>

      {/* Nom du produit */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{name}</h3>

      {/* Prix */}
      <p className="mt-2 text-gray-600 font-medium">${price}</p>
    </div>
  );
};

export default ArrivalCard;

