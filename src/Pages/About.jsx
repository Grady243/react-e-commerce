import React from "react";

function About () {
  return (
    <div className="font-sans text-gray-800">

      {/* HERO SECTION */}
     <section className="bg-[#f6f4f2] py-32 px-16">
  <div className="flex flex-col items-center justify-center mx-auto max-w-7xl">
    <h1 className="mb-3 text-4xl font-semibold">About Us</h1>
    <p className="text-sm text-gray-500">HOME / ABOUT US</p>
  </div>
</section>

      {/* INTRO SECTION */}
      <section className="px-16 py-20 bg-white">
        <div className="grid items-center grid-cols-2 gap-16 mx-auto max-w-7xl">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
            alt=""
            className="rounded-lg"
          />

          <div>
            <h2 className="mb-6 text-3xl font-semibold">
              Fashion is about passion, not just clothes
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600">
              Professional Design lorem quis bibendum auctor, nisi elit consequat
              ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh
              vulputate cursus a sit amet mauris.
            </p>

            <button className="bg-[#9a7c5a] text-white px-6 py-3 text-sm uppercase tracking-wide">
              Discover More
            </button>
          </div>
        </div>
      </section>


      {/* STATS SECTION */}
      <section className="bg-[#f6f4f2] py-12 px-16">
        <div className="grid max-w-6xl grid-cols-4 gap-8 mx-auto text-center">
          <div>
            <h3 className="text-2xl font-semibold">1.4K+</h3>
            <p className="text-sm text-gray-500">Products Sale</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">720+</h3>
            <p className="text-sm text-gray-500">Completed Projects</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">899+</h3>
            <p className="text-sm text-gray-500">Happy Customer</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">15+</h3>
            <p className="text-sm text-gray-500">Years Experience</p>
          </div>
        </div>
      </section>


      {/* STYLING SECTION */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322"
          alt=""
          className="w-full h-[500px] object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center bg-black/50">
          <div className="max-w-2xl text-white">
            <h2 className="mb-4 text-3xl font-semibold">
              Do styling your fashion with our best-personalized designs
            </h2>

            <p className="mb-6 text-sm">
              Fashion has been a medium connecting people across generations,
              cultures and countries.
            </p>

            <button className="bg-[#9a7c5a] px-6 py-3 uppercase text-sm">
              Discover More
            </button>
          </div>
        </div>
      </section>


      {/* SERVICES SECTION */}
      <section className="px-16 py-20 bg-white">
        <div className="grid grid-cols-3 gap-10 mx-auto text-center max-w-7xl">
          <div className="p-8 border">
            <h3 className="mb-3 font-semibold">Design for Personal</h3>
            <p className="text-sm text-gray-600">
              Personalized unique fashion styling tailored to your individual
              needs.
            </p>
          </div>

          <div className="p-8 border">
            <h3 className="mb-3 font-semibold">Massive Production</h3>
            <p className="text-sm text-gray-600">
              Premium quality garments tailored with modern production
              techniques.
            </p>
          </div>

          <div className="p-8 border">
            <h3 className="mb-3 font-semibold">Special Event Styling</h3>
            <p className="text-sm text-gray-600">
              Professional styling services for weddings, parties and
              corporate events.
            </p>
          </div>
        </div>
      </section>


      {/* TEAM SECTION */}
      <section className="py-20 px-16 bg-[#f6f4f2] text-center">
        <h2 className="mb-12 text-2xl font-semibold">
          We serve uniqueness because you are unique to us
        </h2>

        <div className="grid grid-cols-4 gap-10 mx-auto max-w-7xl">
          {[
            "Erica Stewart",
            "Melissa Shafer",
            "Claudia Stephens",
            "Hector Furman",
          ].map((name, index) => (
            <div key={index} className="p-6 bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt=""
                className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">Fashion Designer</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default About;
