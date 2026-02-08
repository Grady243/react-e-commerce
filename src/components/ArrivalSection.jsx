import React from "react";
import ArrivalCard from "./ArrivalCard";
import pull from "../assets/pull.png";
import sac from "../assets/sac.png";
import lunettes from "../assets/lunettes.png";
import chapeau from "../assets/chapeau.png";
import montre from "../assets/montre.png";
import ceinture from "../assets/ceinture.png";
import sneaker from "../assets/sneaker.png";
import culotte from "../assets/culotte.png";
import casque from "../assets/casque.png";
import basket from "../assets/basket.png";

// Exemple de données pour 10 produits
const products = [
  { id: 1, name: "Fleece long Sleeve Tshirt", price: "99.99", image: pull },
  { id: 2, name: "SportWear Rucksack", price: "29.99", image: sac },
  { id: 3, name: "Titanium Rimeless Glasses", price: "59.99", image: lunettes },
  { id: 4, name: "Haydock Fedora", price: "19.99", image: chapeau},
  { id: 5, name: "SPeedmaster Appolo Watch", price: "199.99", image: montre },
  { id: 6, name: "Dante Soft Leather Gucci", price: "149.99", image: ceinture },
  { id: 7, name: "fashion Shoes", price: "89.99", image: sneaker },
  { id: 8, name: "Stretch Chino Short", price: "9.99", image: culotte},
  { id: 9, name: "Wireless Headphone RGT243", price: "49.99", image: casque },
  { id: 10, name: "Damen Sportliche Shoesgit ", price: "39.99", image: basket },
];


const ArrivalSection = () => {
  return (
    <section className="py-12 px-24 bg-white flex flex-col items-center justify-center gap-8">
      {/* Titre */}
      <h1 className="text-4xl font-bold text-center">New Arrivals</h1>

      {/* Ligne de séparation */}
      <div className="w-24 h-[2px] bg-gray-800 mx-auto"></div>

      {/* Phrase de description */}
      <p className="text-center text-gray-600">
        Discover our latest products and find your perfect match!
      </p>

      {/* Grille de produits */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <ArrivalCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ArrivalSection;
