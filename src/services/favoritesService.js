// Service mock pour gérer les articles favoris en localStorage
// Permet d'ajouter/retirer des favoris selon les préférences de l'utilisateur

const FAVORITES_STORAGE_KEY = 'ecommerce_favorites_v1'

const favoritesService = {
  // Lire la liste des favoris
  getFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('favoritesService read error', e)
      return []
    }
  },

  // Ajouter un article aux favoris
  addFavorite(item) {
    const favs = favoritesService.getFavorites()
    if (!favs.find(f => f.id === item.id)) {
      favs.push(item)
      favoritesService.saveFavorites(favs)
    }
    return favs
  },

  // Retirer un article des favoris
  removeFavorite(itemId) {
    const favs = favoritesService.getFavorites()
    const filtered = favs.filter(f => f.id !== itemId)
    favoritesService.saveFavorites(filtered)
    return filtered
  },

  // Vérifier si un article est en favoris
  isFavorite(itemId) {
    return favoritesService.getFavorites().some(f => f.id === itemId)
  },

  // Toggle favoris (ajouter si absent, retirer si présent)
  toggleFavorite(item) {
    if (favoritesService.isFavorite(item.id)) {
      return favoritesService.removeFavorite(item.id)
    } else {
      return favoritesService.addFavorite(item)
    }
  },

  // Enregistrer les favoris en localStorage
  saveFavorites(favs) {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs))
    } catch (e) {
      console.error('favoritesService save error', e)
    }
  }
}

export default favoritesService
