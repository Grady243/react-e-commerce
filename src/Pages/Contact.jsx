import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Contact() {
  return (
   <section className="w-full bg-[#f6f4f2]">

      {/* Hero Section */}
      <div className="relative h-[350px] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="contact"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-[#0f2c59]/70"></div>

        <div className="relative text-white">
          <h2 className="mb-2 text-3xl font-semibold">Contact us</h2>
          <p className="text-sm">
            Kassapay is ready to provide the right solution <br />
            according to your needs
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div className="relative flex max-w-5xl mx-auto -mt-24 overflow-hidden bg-white shadow-lg rounded-xl">

        {/* Left Side */}
        <div className="w-1/2 p-10 bg-[#f3f3f3]">
          <h3 className="mb-6 text-xl font-semibold">Get in touch</h3>

          <p className="mb-6 text-sm text-gray-500">
            Sociosqu viverra lectus placerat sem efficitur molestie
            vehicula cubilia leo etiam nam.
          </p>

          {/* Head Office */}
          <div className="flex items-start mb-5">
            <div className="p-3 mr-4 text-white bg-blue-600 rounded-full">
              <FaMapMarkerAlt size={14} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Head Office</h4>
              <p className="text-sm text-gray-500">
                Jl. Letjend Suprapto No 22 <br />
                Jakarta - Indonesia
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start mb-5">
            <div className="p-3 mr-4 text-white bg-blue-600 rounded-full">
              <FaEnvelope size={14} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Email Us</h4>
              <p className="text-sm text-gray-500">
                support@domain.tld <br />
                hello@domain.tld
              </p>
            </div>
          </div>

          {/* Call */}
          <div className="flex items-start mb-8">
            <div className="p-3 mr-4 text-white bg-blue-600 rounded-full">
              <FaPhoneAlt size={14} />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Call Us</h4>
              <p className="text-sm text-gray-500">
                Phone : +6221.2002.2012 <br />
                Fax : +6221.2002.2013
              </p>
            </div>
          </div>

          <h4 className="mb-3 text-sm font-semibold">Follow our social media</h4>

          <div className="flex space-x-3">
            <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
              <FaFacebookF size={12} />
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
              <FaTwitter size={12} />
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
              <FaLinkedinIn size={12} />
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
              <FaYoutube size={12} />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-10">
          <h3 className="mb-6 text-xl font-semibold">Send us a message</h3>

          <form className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Name"
                className="w-1/2 px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-1/2 px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Phone"
                className="w-1/2 px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-1/2 px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
            />

            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-2 text-sm bg-gray-100 rounded-md focus:outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-full"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="h-24"></div>
    </section>
  
  );
}

export default Contact;
