import React from "react";

const BlogSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold tracking-wide">
          <span className="inline-block w-10 h-px bg-black align-middle mr-3"></span>
          OUR BLOG
          <span className="inline-block w-10 h-px bg-black align-middle ml-3"></span>
        </h2>
      </div>

      {/* Blog cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Card 1 */}
        <div className="text-center">
          <div className="relative mb-3 overflow-hidden rounded-md">
            <span className="absolute top-4 left-4 bg-purple-500 text-white text-xs px-3 py-1 rounded">
              Lifestyle
            </span>
            <img
              src="src/assets/Blog1.jpg"
              alt="Blog 1"
              className="w-full h-[250px]  object-cover"
            />
          </div>
         <h3 className="text-base font-semibold leading-tight mt-4 mb-1">

            Top Fashion Trends to Watch This Season
          </h3>
          <p className="text-xs text-gray-400">
By Shop Admin</p>
        </div>

        {/* Card 2 */}
        <div className="text-center">
          <div className="relative mb-3 overflow-hidden rounded-md">
            <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded">
              Lifestyle
            </span>
            <img
              src="src/assets/Blog2.jpg"
              alt="Blog 2"
              className="w-full h-[250px] object-cover"
            />
          </div>
          <h3 className="text-base font-semibold leading-tight mt-4 mb-1">

            Your Outfit for Everyday Wear
          </h3>
          <p className="text-xs text-gray-400">
By Store Team</p>
        </div>

        {/* Card 3 */}
        <div className="text-center">
          <div className="relative mb-3 overflow-hidden rounded-md">
            <span className="absolute top-4 left-4 bg-purple-500 text-white text-xs px-3 py-1 rounded">
              Lifestyle
            </span>
            <img
              src="src/assets/Blog3.jpg"
              alt="Blog 3"
              className="w-full h-[250px] object-cover"
            />
          </div>
          <h3 className="text-base font-semibold leading-tight mt-4 mb-1">

            Accessories That Elevate Your Look
          </h3>
         <p className="text-xs text-gray-400">
By Editorial Team</p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
