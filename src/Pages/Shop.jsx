import React from "react";
import shopbg from "../assets/shopbg.jpg";
import pull from "../assets/pull.png";
import sac from "../assets/sac.png";
import lunettes from "../assets/lunettes.png";

function Shop() {
  const products = [
    { id: 1, name: "Premium Hoodie", price: 79.99, oldPrice: 99.99, image: pull },
    { id: 2, name: "Street Sneakers", price: 99.99, oldPrice: 129.99, image: sac },
    { id: 3, name: "Classic Jeans", price: 59.99, oldPrice: 79.99, image: lunettes },
    { id: 4, name: "Urban Jacket", price: 119.99, oldPrice: 149.99, image: pull },
    { id: 5, name: "Minimal Sneakers", price: 89.99, oldPrice: 109.99, image: sac },
    { id: 6, name: "Summer Hoodie", price: 69.99, oldPrice: 89.99, image: lunettes },
    { id: 7, name: "Vintage Jeans", price: 64.99, oldPrice: 84.99, image: pull },
    { id: 8, name: "Luxury Backpack", price: 129.99, oldPrice: 159.99, image: sac },
    { id: 9, name: "Sport Hoodie", price: 74.99, oldPrice: 94.99, image: lunettes },
    { id: 10, name: "Classic Sneakers", price: 95.99, oldPrice: 120.99, image: pull },
    { id: 11, name: "Denim Jacket", price: 110.99, oldPrice: 140.99, image: sac },
    { id: 12, name: "Black Sunglasses", price: 49.99, oldPrice: 69.99, image: lunettes },
  ];

  const recommended = products.slice(0, 3);

  return (
    <div className="w-full font-sans bg-gray-50">

      {/* ================= HERO ================= */}
      <div className="relative h-[60vh] w-full">
        <img
          src={shopbg}
          alt="Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-7xl font-bold mb-6 tracking-wide">SHOP</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Discover timeless fashion pieces crafted for comfort and style.
          </p>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="px-10 md:px-24 py-20">

        {/* Filters */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Browse Collection</h2>
          <div className="flex justify-center gap-8 text-gray-600 font-medium">
            <button className="hover:text-black transition">All</button>
            <button className="hover:text-black transition">Sneakers</button>
            <button className="hover:text-black transition">T-Shirts</button>
            <button className="hover:text-black transition">Hoodies</button>
          </div>
        </div>

        {/* Products Grid */}
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

      {/* ================= RECOMMENDATIONS ================= */}
      <div className="px-10 md:px-24 pb-24">
        <h2 className="text-4xl font-bold mb-14 text-center">
          Recommended For You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {recommended.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition duration-300"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <h2 className="text-2xl font-semibold mt-6">{product.name}</h2>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xl font-bold text-black">${product.price}</span>
                <span className="text-gray-400 line-through">${product.oldPrice}</span>
              </div>
              <button className="mt-6 w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>

  );
}

export default Shop;
