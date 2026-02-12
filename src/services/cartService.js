// Service mock pour gérer le panier client en localStorage
// Permet ajouter/retirer/modifier QTÉ articles, calcul automatique du total

const CART_STORAGE_KEY = 'ecommerce_cart_v1'

const cartService = {
  // Lire le panier depuis le localStorage
  getCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('cartService read error', e)
      return []
    }
  },

  // Ajouter un article au panier
  // item : { id, name, price, image, ... }
  addToCart(item, quantity = 1) {
    const cart = cartService.getCart()
    const existing = cart.find(c => c.id === item.id)
    
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ ...item, quantity })
    }
    
    cartService.saveCart(cart)
    return cart
  },

  // Retirer un article du panier par ID
  removeFromCart(itemId) {
    const cart = cartService.getCart()
    const filtered = cart.filter(c => c.id !== itemId)
    cartService.saveCart(filtered)
    return filtered
  },

  // Mettre à jour la quantité d'un article
  updateQuantity(itemId, quantity) {
    const cart = cartService.getCart()
    const item = cart.find(c => c.id === itemId)
    
    if (item) {
      if (quantity <= 0) {
        return cartService.removeFromCart(itemId)
      }
      item.quantity = quantity
      cartService.saveCart(cart)
    }
    
    return cart
  },

  // Vider le panier complètement
  clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY)
    return []
  },

  // Calculer le sous-total du panier
  getSubtotal() {
    const cart = cartService.getCart()
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },

  // Calculer les frais de port (simple: 5% du sous-total, min 5€)
  getShippingCost() {
    const subtotal = cartService.getSubtotal()
    const shipping = Math.max(5, subtotal * 0.05)
    return parseFloat(shipping.toFixed(2))
  },

  // Calculer le montant total (sous-total + frais)
  getTotal() {
    const subtotal = cartService.getSubtotal()
    const shipping = cartService.getShippingCost()
    return parseFloat((subtotal + shipping).toFixed(2))
  },

  // Enregistrer le panier en localStorage
  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error('cartService save error', e)
    }
  }
}

export default cartService
