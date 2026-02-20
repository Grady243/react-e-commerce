import axios from "axios";

// 1️⃣ Définir l'URL de l'API
const API_URL = "https://fakestoreapi.com/products";

// 2️⃣ Créer une fonction pour récupérer les produits
export const getProducts = async () => {
    try{
        // 3️⃣ Envoyer la requête et attendre la réponse
        const {data} = await axios.get(API_URL);

        // 4️⃣ Retourner les données pour que Shop.jsx puisse les utiliser
        return data;
    }catch{
        throw new Error("Erreur lors du chargement des produits ")

    }
};