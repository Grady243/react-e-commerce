import React, { useState, useEffect } from "react";
import { FiStar, FiTrash2, FiThumbsUp } from "react-icons/fi";
import memberService from "./memberService";

export default function Reviews() {
  const [reviews, setReviews] = useState(memberService.getReviews());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    rating: 5,
    title: "",
    comment: "",
  });

  // Au montage, vérifier si un produit a été sélectionné depuis une carte
  useEffect(() => {
    const reviewProduct = sessionStorage.getItem("reviewProduct");
    if (reviewProduct) {
      try {
        const product = JSON.parse(reviewProduct);
        setFormData(prev => ({
          ...prev,
          productId: product.id,
          productName: product.name,
        }));
        setShowForm(true);
        sessionStorage.removeItem("reviewProduct");
      } catch (e) {
        console.error("Error parsing review product:", e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.productName || !formData.title || !formData.comment) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const newReview = memberService.addReview(formData);
    setReviews([newReview, ...reviews]);
    setFormData({
      productId: "",
      productName: "",
      rating: 5,
      title: "",
      comment: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avis?")) {
      memberService.deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleHelpful = (id) => {
    const updatedReview = memberService.incrementHelpful(id);
    setReviews(reviews.map(r => (r.id === id ? updatedReview : r)));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            size={16}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mes Avis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Partagez votre expérience avec les produits que vous avez achetés
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {showForm ? "Annuler" : "+ Ajouter un avis"}
        </button>
      </div>

      {/* Formulaire d'ajout d'avis */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Rédiger un avis</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Produit (ID)
                </label>
                <input
                  type="text"
                  name="productId"
                  placeholder="Ex: 1, 2, 3..."
                  value={formData.productId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom du produit
                </label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Ex: T-shirt"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note ({formData.rating}/5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                  >
                    <FiStar
                      size={24}
                      className={star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre de l'avis
              </label>
              <input
                type="text"
                name="title"
                placeholder="Ex: Excellent produit"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Votre avis
              </label>
              <textarea
                name="comment"
                rows="4"
                placeholder="Partagez votre expérience avec ce produit..."
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Publier l'avis
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    productId: "",
                    productName: "",
                    rating: 5,
                    title: "",
                    comment: "",
                  });
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium dark:bg-gray-700 dark:text-gray-200"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FiStar size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Vous n'avez pas encore d'avis. {" "}
              <button
                onClick={() => setShowForm(true)}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Écrivez votre premier avis
              </button>
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {review.rating}/5
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {review.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="font-medium">{review.productName}</span> (ID: {review.productId})
                    {" "} • {new Date(review.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                  title="Supprimer cet avis"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {review.comment}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
                >
                  <FiThumbsUp size={16} />
                  Utile ({review.helpful})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
