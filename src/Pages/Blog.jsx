import React from "react";
import blogbg from "../assets/shopbg.jpg"; // image hero
import blog1 from "../assets/pull.png";
import blog2 from "../assets/sac.png";
import blog3 from "../assets/lunettes.png";

function Blog() {
  const blogs = [
    {
      id: 1,
      title: "Top Fashion Trends to Watch This Season",
      description:
        "Discover the latest trends that are taking the fashion world by storm this season. From bold colors and innovative patterns to sustainable fabrics and versatile designs, these pieces are crafted to help you express your unique style while staying comfortable. Whether you are updating your wardrobe for casual wear, professional settings, or special occasions, these trends provide inspiration for every aspect of your daily outfits. Accessories, layering techniques, and statement items all play a role in elevating your look. Stay ahead of the curve and embrace fashion choices that are both modern and timeless, making your wardrobe truly standout.",
      image: blog1,
      reverse: false,
    },
    {
      id: 2,
      title: "Your Outfit for Everyday Wear",
      description:
        "Learn how to mix comfort and style for your everyday outfits. From casual mornings to professional meetings and social gatherings, these fashion tips help you look polished without sacrificing ease. Combining versatile pieces, smart layering, and carefully chosen accessories ensures that each outfit feels effortless yet stylish. Embrace clothing that works for multiple occasions and reflects your personal taste. With the right choices, you can create a wardrobe that is practical, fashionable, and ready for any situation.",
      image: blog2,
      reverse: true,
    },
    {
      id: 3,
      title: "Accessories That Elevate Your Look",
      description:
        "Accessories play a crucial role in transforming any outfit from ordinary to extraordinary. From statement necklaces and bold belts to elegant scarves and stylish hats, the right pieces can highlight your personal style and bring cohesion to your look. Learning how to mix textures, colors, and sizes allows you to create outfits that feel complete and polished. Whether dressing for casual outings, work, or special occasions, incorporating thoughtful accessories ensures your wardrobe is versatile, fashionable, and always on-trend.",
      image: blog3,
      reverse: false,
    },
  ];

  return (
    <div className="w-full font-sans bg-gray-50">

      {/* ================= HERO ================= */}
      <div className="relative h-[60vh] w-full">
        <img
          src={blogbg}
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-7xl font-bold mb-6 tracking-wide">BLOG</h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Stay updated with our latest news, trends, and style tips.
          </p>
        </div>
      </div>

      {/* ================= BLOGS ================= */}
      <div className="px-10 md:px-24 py-24 space-y-20">

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`flex flex-col ${
              blog.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-10`}
          >
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-3xl shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
              <p className="text-gray-600 mb-6">{blog.description}</p>
              <button className="bg-black text-white py-2.5 px-6 rounded-xl hover:bg-gray-800 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Blog;
