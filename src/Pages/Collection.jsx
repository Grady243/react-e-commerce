import React from "react";
import collectionbg from "../assets/collectionbg.jpg"; // tu peux mettre une autre image si tu veux
import pull from "../assets/pull.png";
import sac from "../assets/sac.png";
import lunettes from "../assets/lunettes.png";

function Collection() {
  const products = [
    { id: 1, name: "Premium Hoodie", price: 79.99, oldPrice: 99.99, collection: "Hoodies", image: pull },
    { id: 2, name: "Street Sneakers", price: 99.99, oldPrice: 129.99, collection: "Sneakers", image: sac },
    { id: 3, name: "Classic Jeans", price: 59.99, oldPrice: 79.99, collection: "Jeans", image: lunettes },
    { id: 4, name: "Urban Jacket", price: 119.99, oldPrice: 149.99, collection: "Jackets", image: pull },
    { id: 5, name: "Minimal Sneakers", price: 89.99, oldPrice: 109.99, collection: "Sneakers", image: sac },
    { id: 6, name: "Summer Hoodie", price: 69.99, oldPrice: 89.99, collection: "Hoodies", image: lunettes },
    { id: 7, name: "Vintage Jeans", price: 64.99, oldPrice: 84.99, collection: "Jeans", image: pull },
    { id: 8, name: "Luxury Backpack", price: 129.99, oldPrice: 159.99, collection: "Bags", image: sac },
  ];

  const collections = ["All", "Sneakers", "Hoodies", "Jackets", "Jeans", "Bags"];

  return (
    <div className="w-full font-sans bg-gray-50">

      {/* ================= HERO ================= */}
      <div className="relative h-[60vh] w-full">
        <img
          src={collectionbg}
          alt="Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-7xl font-bold mb-6 tracking-wide">COLLECTION</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Explore our exclusive collections of premium fashion items.
          </p>
        </div>
      </div>

      {/* ================= COLLECTION FILTER ================= */}
      <div className="px-10 md:px-24 py-20">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Filter by Collection</h2>
          <div className="flex justify-center gap-6 flex-wrap text-gray-600 font-medium">
            {collections.map((col) => (
              <button
                key={col}
                className="hover:text-black transition px-4 py-2 border rounded-lg"
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-300 group"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <h2 className="text-lg font-semibold mt-5">{product.name}</h2>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-black font-bold">${product.price}</span>
                <span className="text-gray-400 line-through text-sm">${product.oldPrice}</span>
              </div>

              <button className="mt-5 w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Collection;
