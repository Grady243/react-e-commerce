import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import favoritesService from '../services/favoritesService'
import cartService from '../services/cartService'

// Page des articles favoris
// Affiche tous les articles marqués comme favoris par l'utilisateur
// Permet de retirer un favori ou ajouter au panier directement
export default function Favoris() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Charger les favoris au montage du composant
    setFavorites(favoritesService.getFavorites())
  }, [])

  function handleRemove(itemId) {
    const updated = favoritesService.removeFavorite(itemId)
    setFavorites(updated)
  }

  function handleAddToCart(item) {
    cartService.addToCart(item, 1)
    // Optionnel: afficher une notification ou rediriger vers le panier
    alert(`${item.name} ajouté au panier!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">Mes Favoris</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{favorites.length} article(s) en favoris</p>

        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="text-xl text-gray-600 dark:text-gray-300 mb-4">Vous n'avez pas de favoris pour le moment</div>
            <Link to="/shop" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Continuer les achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                {/* Image */}
                {item.image && (
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Contenu */}
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>

                  {/* Prix */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">€ {item.price?.toFixed(2)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                      <FiShoppingCart size={16} />
                      Ajouter
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
