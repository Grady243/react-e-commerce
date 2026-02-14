import React, { useState, useEffect } from "react";
import ArrivalCard from "../components/ArrivalCard";
import productService from "../services/productService";

export default function Collection() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Charger les catégories au montage
  useEffect(() => {
    const cats = productService.getCategories();
    setCategories(cats);

    if (cats.length > 0) {
      setSelectedCategory(cats[0]);
    }
  }, []);

  // Charger les produits selon la catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory) {
      const filtered = productService.getProductsByCategory(selectedCategory);
      setProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Collections
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Parcourez nos produits par catégories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Onglets catégories */}
        <div className="flex flex-wrap gap-3 mb-10 border-b pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 font-medium transition border-b-2 ${
                selectedCategory === cat
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Infos catégorie */}
        {selectedCategory && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCategory}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {products.length} produit(s) dans cette catégorie
            </p>
          </div>
        )}

        {/* Grille produits */}
        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Aucun produit dans cette catégorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        )}
      </div>
    </div>
  );
}
