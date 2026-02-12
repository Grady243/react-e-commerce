import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import ArrivalCard from '../components/ArrivalCard';
import productService from '../services/productService';

// Page Shop complète avec filtres et recherche
// Utilisateur peut filtrer par :
// - Texte libre (nom/description)
// - Catégorie
// - Gamme de prix
export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // Charger les catégories et produits au montage
  useEffect(() => {
    setCategories(productService.getCategories());
    handleFilterChange();
  }, []);

  // Appliquer les filtres
  function handleFilterChange() {
    const filtered = productService.advancedSearch(
      searchQuery,
      selectedCategory,
      minPrice,
      maxPrice
    );
    setProducts(filtered);
  }

  // Réappliquer les filtres quand les paramètres changent
  useEffect(() => {
    handleFilterChange();
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800">Shop</h1>
          <p className="text-gray-600 mt-2">{products.length} produits trouvés</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panneau de filtres (sidebar) */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiFilter /> Filtres
              </h2>

              {/* Recherche */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Nom ou description..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Catégories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Tous</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix: {minPrice}€ - {maxPrice}€
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="250"
                    value={minPrice}
                    onChange={e => setMinPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="250"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bouton Réinitialiser */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setMinPrice(0);
                  setMaxPrice(300);
                }}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>

          {/* Grille de produits */}
          <div className="lg:col-span-3">
            {/* Bouton afficher/masquer filtres (mobile) */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
              >
                <FiFilter /> {showFilters ? 'Masquer' : 'Afficher'} filtres
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600">Aucun produit ne correspond à vos critères.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
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

