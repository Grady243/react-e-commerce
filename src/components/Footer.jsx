const Footer = () => {
  return (

    <footer className="bg-[#f8f8f8] dark:bg-gray-800 py-16 text-gray-700 dark:text-gray-300 font-sans">
      <div className="px-24 py-10">

        <div className="flex justify-between ">

          {/* Logo */}
          <div>
            <h2 className="text-[28px] font-bold text-black dark:text-white mb-4">
              Flone.
            </h2>
            <p className="text-sm leading-6">
              © 2019 Flone.
              <br />
              All Rights Reserved
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-widest text-black dark:text-white">
              ABOUT US
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">About us</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Store location</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Contact</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Orders tracking</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-widest text-black dark:text-white">
              USEFUL LINKS
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Returns</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Support Policy</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Size guide</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">FAQs</li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-widest text-black dark:text-white">
              FOLLOW US
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Facebook</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Twitter</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Instagram</li>
              <li className="cursor-pointer hover:text-black dark:hover:text-gray-100">Youtube</li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
