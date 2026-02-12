// Service mock pour gérer les données utilisateur en local (localStorage)
// Fournit : profil, commandes, adresses. Utile pour le développement sans backend.

const STORAGE_KEY = 'react_ecom_member_data_v1'

const defaultData = {
  profile: {
    id: 'user-1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
  },
  addresses: [
    {
      id: 'addr-1',
      label: 'Domicile',
      line1: '10 rue de Paris',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    },
  ],
  orders: [
    {
      id: '1001',
      date: new Date().toISOString(),
      items: [
        { sku: 'sku-1', name: 'T-shirt', qty: 2, price: 19.99 },
      ],
      status: 'processing', // processing | shipped | delivered | cancelled
      total: 39.98,
      tracking: [],
    },
  ],
  reviews: [
    {
      id: 'review-1',
      productId: '1',
      productName: 'T-shirt',
      rating: 5,
      title: 'Produit excellent',
      comment: 'Excellente qualité, très satisfait de mon achat.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12,
    },
  ],
}

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
      return JSON.parse(JSON.stringify(defaultData))
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error('memberService read error', e)
    return JSON.parse(JSON.stringify(defaultData))
  }
}

function write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('memberService write error', e)
  }
}

const memberService = {
  // Authentication mock
  // Stores an `auth` token state in localStorage for simple client-side auth simulation
  authenticate(email, password) {
    const data = read()
    // Very simple mock: accept if email matches stored profile email
    if (email === data.profile.email) {
      const token = 'token-' + Date.now()
      localStorage.setItem('react_ecom_auth_token', token)
      return { ok: true, token, profile: data.profile }
    }
    return { ok: false, message: 'Email ou mot de passe invalide.' }
  },
  logout() {
    localStorage.removeItem('react_ecom_auth_token')
  },
  isAuthenticated() {
    return !!localStorage.getItem('react_ecom_auth_token')
  },
  // Profil
  getProfile() {
    return read().profile
  },
  updateProfile(updates) {
    const data = read()
    data.profile = { ...data.profile, ...updates }
    write(data)
    return data.profile
  },

  // Adresses
  getAddresses() {
    return read().addresses || []
  },
  addAddress(address) {
    const data = read()
    const id = 'addr-' + Date.now()
    const a = { id, ...address }
    data.addresses = data.addresses || []
    data.addresses.push(a)
    write(data)
    return a
  },
  updateAddress(id, updates) {
    const data = read()
    data.addresses = data.addresses.map(a => (a.id === id ? { ...a, ...updates } : a))
    write(data)
    return data.addresses.find(a => a.id === id)
  },
  deleteAddress(id) {
    const data = read()
    data.addresses = data.addresses.filter(a => a.id !== id)
    write(data)
  },

  // Commandes
  getOrders() {
    return read().orders || []
  },
  getOrderById(id) {
    return (read().orders || []).find(o => String(o.id) === String(id))
  },
  placeOrder(order) {
    const data = read()
    const id = String(1000 + (data.orders.length + 1))
    const o = { id, date: new Date().toISOString(), status: 'processing', ...order }
    data.orders.unshift(o)
    write(data)
    return o
  },

  // Avis clients (Reviews)
  getReviews() {
    return (read().reviews || [])
  },
  getReviewById(id) {
    return (read().reviews || []).find(r => r.id === id)
  },
  addReview(review) {
    const data = read()
    const id = 'review-' + Date.now()
    const r = {
      id,
      date: new Date().toISOString(),
      helpful: 0,
      ...review,
    }
    data.reviews = data.reviews || []
    data.reviews.push(r)
    write(data)
    return r
  },
  updateReview(id, updates) {
    const data = read()
    data.reviews = (data.reviews || []).map(r => (r.id === id ? { ...r, ...updates } : r))
    write(data)
    return data.reviews.find(r => r.id === id)
  },
  deleteReview(id) {
    const data = read()
    data.reviews = (data.reviews || []).filter(r => r.id !== id)
    write(data)
  },
  incrementHelpful(id) {
    return this.updateReview(id, { helpful: (this.getReviewById(id)?.helpful || 0) + 1 })
  },
}

export default memberService
