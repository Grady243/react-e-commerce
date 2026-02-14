import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import cartService from "../services/cartService";
import favoritesService from "../services/favoritesService";
import memberService from "../Modules/Member/memberService";
import { useTheme } from "../context/ThemeContext";

// Header professionnel amélioré :
// - Barre fixe (ne bouge pas au scroll)
// - Recherche fonctionnelle (ouvre un panneau de recherche)
// - Bouton Profil → redirige vers /login ou affiche le profil si connecté
// - Bouton Favoris → affiche le nombre d'articles favoris
// - Bouton Panier → affiche le nombre d'articles + badge
// - Toggle thème clair/sombre (respecte préférence système)
// - Menu mobile réactif
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userAvatar, setUserAvatar] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [favCount, setFavCount] = useState(0)
  const searchInputRef = useRef(null)
  const navigate = useNavigate()

  // Charger le panier, favoris, et statut auth
  useEffect(() => {
    const updateState = () => {
      setCartCount(cartService.getCart().length)
      setFavCount(favoritesService.getFavorites().length)
      const auth = memberService.isAuthenticated()
      setIsAuthenticated(auth)
      if (auth) {
        const profile = memberService.getProfile()
        if (profile?.name) {
          setUserAvatar(profile.name.charAt(0).toUpperCase())
        }
      }
    }
    updateState()
    // Ré-évaluer l'état toutes les 500ms (simple poll pour démo)
    const interval = setInterval(updateState, 500)
    return () => clearInterval(interval)
  }, [])

  // Focus sur l'input de recherche quand il s'active
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchActive])

  // Gestion de la recherche en temps réel
  function handleSearchChange(e) {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`)
    }
  }

  // Fermer la recherche
  function closeSearch() {
    setSearchActive(false)
    setSearchQuery('')
  }

  // Gestion du bouton Profil
  function handleProfileClick() {
    if (isAuthenticated) {
      navigate('/member/profile')
    } else {
      navigate('/login')
    }
  }

  const headerHeight = 72 // px

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <div className="text-[22px] md:text-[28px] font-bold cursor-pointer" onClick={() => navigate('/')}>
              Flone.
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:block">
              <ul className="flex gap-6 text-[15px] font-medium text-gray-700 dark:text-gray-200">
                <li>
                  <Link to="/" className="hover:text-gray-500">Home</Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-gray-500">Shop</Link>
                </li>
                <li>
                  <Link to="/collection" className="hover:text-gray-500">Collection</Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-gray-500">Blog</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gray-500">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-500">Contact</Link>
                </li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 text-[20px]">
              {/* Bouton/Champ Recherche */}
              {!searchActive ? (
                <button
                  onClick={() => setSearchActive(true)}
                  aria-label="Recherche"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <FiSearch />
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
                  <FiSearch className="text-gray-600 dark:text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onBlur={closeSearch}
                    className="bg-transparent outline-none w-40 text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={closeSearch}
                    aria-label="Fermer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>
              )}

              {/* Bouton Profil (connecté ou login) */}
              <button
                onClick={handleProfileClick}
                aria-label="Profil"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center"
              >
                {isAuthenticated && userAvatar ? (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                    {userAvatar}
                  </div>
                ) : (
                  <FiUser />
                )}
              </button>

              {/* Bouton Favoris */}
              <Link
                to="/favoris"
                aria-label="Favoris"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
              >
                <FiHeart />
                {favCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {favCount}
                  </span>
                )}
              </Link>

              {/* Bouton Panier */}
              <Link
                to="/panier"
                aria-label="Panier"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
              >
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Toggle thème */}
              <button
                onClick={() => toggleTheme()}
                aria-label="Toggle theme"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {isDark ? <FiSun /> : <FiMoon />}
              </button>

              {/* Menu mobile */}
              <button
                className="md:hidden p-2 rounded-md ml-1"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Menu"
              >
                {mobileOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Placeholder pour l'espace du header fixe */}
      <div style={{ height: `${headerHeight}px` }} aria-hidden="true" />

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-sm fixed top-[72px] left-0 right-0 z-40 max-h-96 overflow-y-auto">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              Shop
            </Link>
            <Link
              to="/collection"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              Collection
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              Blog
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-2 hover:text-indigo-600"
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-medium mt-4 text-indigo-600"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
