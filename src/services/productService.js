// Service mock centralisant tous les produits disponibles dans la plateforme
// Structure: { id, name, price, image, category, description }

import pull from "../assets/pull.png";
import sac from "../assets/sac.png";
import lunettes from "../assets/lunettes.png";
import chapeau from "../assets/chapeau.png";
import montre from "../assets/montre.png";
import ceinture from "../assets/ceinture.png";
import sneaker from "../assets/sneaker.png";
import culotte from "../assets/culotte.png";
import casque from "../assets/casque.png";
import basket from "../assets/basket.png";

const products = [
  { id: 1, name: "Fleece long Sleeve Tshirt", price: 99.99, image: pull, category: "Vetements", description: "Confortable et chaud" },
  { id: 2, name: "SportWear Rucksack", price: 29.99, image: sac, category: "Sacs", description: "Parfait pour le sport" },
  { id: 3, name: "Titanium Rimeless Glasses", price: 59.99, image: lunettes, category: "Accessoires", description: "Montures légères et élégantes" },
  { id: 4, name: "Haydock Fedora", price: 19.99, image: chapeau, category: "Chapeaux", description: "Style intemporel" },
  { id: 5, name: "SPeedmaster Appolo Watch", price: 199.99, image: montre, category: "Montres", description: "Montre de luxe" },
  { id: 6, name: "Dante Soft Leather Gucci", price: 149.99, image: ceinture, category: "Accessoires", description: "Cuir authentique" },
  { id: 7, name: "Fashion Shoes", price: 89.99, image: sneaker, category: "Chaussures", description: "Confortables et modernes" },
  { id: 8, name: "Stretch Chino Short", price: 9.99, image: culotte, category: "Vetements", description: "Léger et respirant" },
  { id: 9, name: "Wireless Headphone RGT243", price: 49.99, image: casque, category: "Electronique", description: "Audio premium" },
  { id: 10, name: "Damen Sportliche Shoes", price: 39.99, image: basket, category: "Chaussures", description: "Pour le sport ou le quotidien" },
];

const productService = {
  // Récupérer tous les produits
  getAllProducts() {
    return products;
  },

  // Récupérer un produit par ID
  getProductById(id) {
    return products.find(p => p.id === Number(id));
  },

  // Rechercher des produits par nom ou description
  searchProducts(query) {
    if (!query.trim()) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },

  // Filtrer par catégorie
  getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(p => p.category === category);
  },

  // Obtenir toutes les catégories uniques
  getCategories() {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats).sort();
  },

  // Filtrer par prix min/max
  getProductsByPriceRange(minPrice, maxPrice) {
    return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
  },

  // Recherche avancée (combinaison de filtres)
  advancedSearch(query, category, minPrice, maxPrice) {
    let result = products;

    // Filtre par nom/description
    if (query && query.trim()) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Filtre par catégorie
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Filtre par prix
    if (minPrice !== undefined && maxPrice !== undefined) {
      result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    return result;
  }
};

export default productService;
