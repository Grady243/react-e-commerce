import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartService";
import favoritesService from "../services/favoritesService";
import memberService from "../Modules/Member/memberService";

// Carte produit améliorée
// - Affiche image, nom, prix
// - Bouton coeur pour ajouter/retirer des favoris
// - Bouton "Ajouter au panier" pour la commande
// - Bouton "Avis" pour écrire un avis (si connecté)
const ArrivalCard = ({ id, image, name, price, description = "" }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier au montage si le produit est en favoris et si utilisateur est connecté
  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(id));
    setIsAuthenticated(memberService.isAuthenticated());
  }, [id]);

  // Basculer le statut favoris
  function handleToggleFavorite(e) {
    e.preventDefault();
    const updated = favoritesService.toggleFavorite({
      id,
      name,
      price,
      image,
      description
    });
    setIsFavorite(favoritesService.isFavorite(id));
  }

  // Ajouter au panier
  function handleAddToCart(e) {
    e.preventDefault();
    cartService.addToCart({
      id,
      name,
      price,
      image,
      description
    }, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  // Naviguer vers le formulaire d'avis
  function handleWriteReview() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Stock le produit actuel dans sessionStorage pour le formulaire d'avis
    sessionStorage.setItem("reviewProduct", JSON.stringify({ id, name }));
    navigate("/member/reviews");
  }

  return (
    <div className="flex flex-col items-start bg-white  dark:bg-gray-900 group relative">
      {/* Image container avec bouton favoris */}
      <div className="w-full h-56 p-5 bg-[#DCD7D4] dark:bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden relative">
        <img src={image} alt={name} className="h-full object-contain" />
        
        {/* Bouton Favoris (coeur) */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition ${
            isFavorite
              ? "bg-red-600 text-white"
              : "bg-white  text-gray-800 hover:bg-red-100"
          }`}
          aria-label="Ajouter aux favoris"
        >
          <FiHeart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Nom du produit */}
      <h3 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
        {name}
      </h3>

      {/* Prix */}
      <p className="mt-2 text-gray-600 dark:text-white  font-medium">€ {price.toFixed(2)}</p>

      {/* Bouton Ajouter au panier */}
      <button
        onClick={handleAddToCart}
        className={`mt-3 w-full px-4 py-3 rounded-full font-medium transition flex items-center justify-center gap-2 ${
          addedToCart
            ? "bg-green-500 text-white"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        <FiShoppingCart size={16} />
        {addedToCart ? "Added!" : "Add to Chart"}
      </button>

      {/* Bouton Avis (visible seulement si connecté) */}
      {isAuthenticated && (
        <button
          onClick={handleWriteReview}
          className="mt-2 w-full px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"
        >
          <FiStar size={16} />
          Donner un avis
        </button>
      )}
    </div>
  );
};

export default ArrivalCard;


