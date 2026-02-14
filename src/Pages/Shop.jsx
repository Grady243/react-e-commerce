import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import ArrivalCard from "../components/ArrivalCard";
import productService from "../services/productService";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // Charger les catégories
  useEffect(() => {
    const cats = productService.getCategories();
    setCategories(cats);
  }, []);

  // Appliquer filtres
  useEffect(() => {
    const safeMin = Math.min(minPrice, maxPrice);
    const safeMax = Math.max(minPrice, maxPrice);

    const filtered = productService.advancedSearch(
      searchQuery,
      selectedCategory,
      safeMin,
      safeMax
    );

    setProducts(filtered);
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(300);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 h-[30vh] flex justify-center items-center">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white">
          Our Shop
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar filtres */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <FiFilter /> Filtres
              </h2>

              {/* Recherche */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                  Recherche
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nom ou description..."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>

              {/* Catégorie */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value="">Tous</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                  Prix : {minPrice}€ - {maxPrice}€
                </label>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Produits */}
          <div className="lg:col-span-3">
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
              >
                <FiFilter />
                {showFilters ? "Masquer" : "Afficher"} filtres
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Aucun produit ne correspond à vos critères.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
