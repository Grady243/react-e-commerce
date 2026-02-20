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

  // 🔹 Toggle affichage filtres (pour mobile)
  const [showFilters, setShowFilters] = useState(false);

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
  const categories = [...new Set(products.map((p) => p.category))];

  // 🔹 Appliquer filtres
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // 🔹 Réinitialiser filtres
  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-6 md:px-24">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Our Shop
      </h1>

      {/* Sidebar filtres */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
              Filtres
            </h2>

            {/* Recherche */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                Recherche
              </label>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>

            {/* Catégorie */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              >
                <option value="">Toutes catégories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                Prix : {minPrice}€ - {maxPrice}€
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full mb-2"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Produits */}
        <div className="lg:col-span-3">
          {loading && <p className="text-center">Chargement...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            filteredProducts.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-300">
                Aucun produit trouvé.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
      </div>
    </div>
  );
}
