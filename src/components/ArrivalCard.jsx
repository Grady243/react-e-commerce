import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartService";
import favoritesService from "../services/favoritesService";
import memberService from "../Modules/Member/memberService";

const ArrivalCard = ({ id, image, name, price, description = "" }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesService.isFavorite(id));
    setIsAuthenticated(memberService.isAuthenticated());
  }, [id]);

  function handleToggleFavorite(e) {
    e.preventDefault();
    favoritesService.toggleFavorite({
      id,
      name,
      price,
      image,
      description,
    });
    setIsFavorite(favoritesService.isFavorite(id));
  }

  function handleAddToCart(e) {
    e.preventDefault();
    cartService.addToCart(
      {
        id,
        name,
        price,
        image,
        description,
      },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleWriteReview() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    sessionStorage.setItem(
      "reviewProduct",
      JSON.stringify({ id, name })
    );

    navigate("/member/reviews");
  }

  return (
    <div className="flex flex-col items-start bg-white dark:bg-gray-900 group relative">
      
      {/* Image */}
      <div className="w-full h-56 p-5 bg-[#DCD7D4] dark:bg-gray-800 flex items-center justify-
