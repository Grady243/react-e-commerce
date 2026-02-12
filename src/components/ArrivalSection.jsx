import React, { useState, useEffect } from "react";
import ArrivalCard from "./ArrivalCard";
import productService from "../services/productService";

// Section de nouveautés
// Affiche les produits que l'utilisateur peut ajouter aux favoris ou au panier
const ArrivalSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Charger les produits au montage
    setProducts(productService.getAllProducts());
  }, []);

  return (
    <section className="py-12 px-24 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-8">
      {/* Titre */}
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">New Arrivals</h1>

      {/* Ligne de séparation */}
      <div className="w-24 h-[2px] bg-gray-800 dark:bg-gray-600 mx-auto"></div>

      {/* Phrase de description */}
      <p className="text-center text-gray-600 dark:text-gray-400">
        Discover our latest products and find your perfect match!
      </p>

      {/* Grille de produits */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <ArrivalCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ArrivalSection;

