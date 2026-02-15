import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ArrivalCard from "../components/ArrivalCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 États des filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // 🔹 Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Extraire catégories uniques
  const categories = [...new Set(products.map(p => p.category))];

  // 🔹 Appliquer filtres
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-24">
      
      {/* 🔹 Titre */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Our Shop
      </h1>

      {/* 🔹 Filtres stylés */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10">
        <div className="grid gap-6 md:grid-cols-4">

          {/* Recherche */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Recherche
            </label>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          {/* Catégorie */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">Toutes catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Prix min */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Prix minimum
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          {/* Prix max */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Prix maximum
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-700 dark:text-white transition"
            />
          </div>
        </div>

        {/* Bouton reset */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
              setMinPrice(0);
              setMaxPrice(1000);
            }}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white 
            hover:bg-indigo-700 transition font-medium shadow-md"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* 🔹 États */}
      {loading && <p className="text-center">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 🔹 Produits */}
      {!loading && !error && (
        filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Aucun produit trouvé.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ArrivalCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
