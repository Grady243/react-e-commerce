import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import cartService from '../services/cartService'
import memberService from '../Modules/Member/memberService'

// Page de paiement (mock)
// Affiche un formulaire de paiement simplifié
// Simule le traitement et crée une commande
export default function Checkout() {
  const [step, setStep] = useState('review') // review | payment | confirmation
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const cart = cartService.getCart()
  const subtotal = cartService.getSubtotal()
  const shipping = cartService.getShippingCost()
  const total = cartService.getTotal()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    setError(null)

    // Validation
    if (!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.postalCode) {
      setError('Veuillez remplir tous les champs de facturation.')
      return
    }

    setStep('payment')
  }

  function handlePaymentSubmit(e) {
    e.preventDefault()
    setError(null)

    // Validation simple carte
    if (!form.cardNumber || !form.cardExpiry || !form.cardCvc) {
      setError('Veuillez remplir tous les champs de paiement.')
      return
    }

    if (form.cardNumber.replaceAll(' ', '').length !== 16) {
      setError('Numéro de carte invalide.')
      return
    }

    // "Traiter" le paiement (mock)
    const order = {
      items: cart,
      subtotal,
      shipping,
      total,
      customer: {
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country
      },
      paymentMethod: 'card',
      createdAt: new Date().toISOString()
    }

    // Ajouter la commande au profil utilisateur via memberService
    memberService.placeOrder(order)

    // Vider le panier
    cartService.clearCart()

    // Aller à la confirmation
    setStep('confirmation')
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Commande confirmée!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Merci pour votre achat. Un email de confirmation a été envoyé à <span className="font-semibold">{form.email}</span>.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Numéro de commande</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          <div className="space-y-2 mb-6 text-sm dark:text-gray-300">
            <div className="flex justify-between">
              <span>Montant</span>
              <span className="font-semibold">€ {total.toFixed(2)}</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Livraison estimée: 5-7 jours ouvrables
            </div>
          </div>
          <button
            onClick={() => navigate('/member/orders')}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Voir mes commandes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <form onSubmit={step === 'review' ? handleReviewSubmit : handlePaymentSubmit} className="space-y-6">
              {step === 'review' && (
                <>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Adresse de facturation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <input name="address" value={form.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                        <input name="city" value={form.city} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                        <input name="postalCode" value={form.postalCode} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 'payment' && (
                <>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Moyen de paiement</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte (16 chiffres)</label>
                        <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9000 0000" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (MM/YY)</label>
                          <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="12/25" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <input name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              <div className="flex gap-3">
                {step === 'payment' && (
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition font-medium"
                  >
                    Retour
                  </button>
                )}
                <button type="submit" className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                  {step === 'review' ? 'Continuer vers le paiement' : 'Confirmer le paiement'}
                </button>
              </div>
            </form>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Résumé</h2>

              <div className="space-y-3 text-sm mb-4 border-b pb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>€ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>€ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de port</span>
                  <span>€ {shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center font-semibold">
                <span>Total</span>
                <span className="text-2xl text-indigo-600">€ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
