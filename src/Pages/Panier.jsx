import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import cartService from '../services/cartService'

// Page du panier
// Affiche les articles dans le panier, permet de modifier les quantités
// Calcul automatique du sous-total, frais de port, et total
// Bouton pour passer une commande (vers checkout/paiement)
export default function Panier() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Charger le panier au montage du composant
    setCart(cartService.getCart())
  }, [])

  function handleRemove(itemId) {
    const updated = cartService.removeFromCart(itemId)
    setCart(updated)
  }

  function handleUpdateQuantity(itemId, delta) {
    const item = cart.find(c => c.id === itemId)
    if (item) {
      const newQty = item.quantity + delta
      const updated = cartService.updateQuantity(itemId, newQty)
      setCart(updated)
    }
  }

  function handleClearCart() {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier?')) {
      cartService.clearCart()
      setCart([])
    }
  }

  function handleCheckout() {
    if (cart.length === 0) return
    // Rediriger vers la page de paiement
    navigate('/checkout')
  }

  const subtotal = cartService.getSubtotal()
  const shipping = cartService.getShippingCost()
  const total = cartService.getTotal()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
            <FiArrowLeft /> Retour
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Mon Panier</h1>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <div className="text-xl text-gray-600 dark:text-gray-300 mb-4">Votre panier est vide</div>
            <Link to="/shop" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-700">
              Continuer les achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Articles */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-semibold dark:text-white">Articles ({cart.length})</h2>
                  <button onClick={handleClearCart} className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    Vider le panier
                  </button>
                </div>

                <div className="divide-y dark:divide-gray-700">
                  {cart.map(item => (
                    <div key={item.id} className="p-6 flex gap-4">
                      {/* Image */}
                      {item.image && (
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Détails */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">€ {item.price?.toFixed(2)}</p>
                      </div>

                      {/* Quantité */}
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      {/* Sous-total article */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Supprimer */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Résumé et checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-semibold dark:text-white mb-4">Résumé</h2>

                <div className="space-y-2 text-sm mb-4 border-b dark:border-gray-700 pb-4">
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Sous-total</span>
                    <span>€ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-300">
                    <span>Frais de port</span>
                    <span>€ {shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-lg dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">€ {total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Passer la commande
                </button>

                <Link to="/shop" className="block text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-3">
                  Continuer les achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
