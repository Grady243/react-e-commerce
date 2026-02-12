import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiShoppingBag, FiMapPin, FiSettings, FiStar, FiArrowLeft } from "react-icons/fi";

export default function MemberSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      label: "Tableau de bord",
      path: "/member",
      icon: FiHome,
    },
    {
      label: "Mon Profil",
      path: "/member/profile",
      icon: FiUser,
    },
    {
      label: "Mes Commandes",
      path: "/member/orders",
      icon: FiShoppingBag,
    },
    {
      label: "Mes Adresses",
      path: "/member/addresses",
      icon: FiMapPin,
    },
    {
      label: "Mes Avis",
      path: "/member/reviews",
      icon: FiStar,
    },
    {
      label: "Paramètres",
      path: "/member/account",
      icon: FiSettings,
    },
  ];

  const isActive = (path) => {
    if (path === "/member") {
      return location.pathname === "/member" || location.pathname === "/member/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-fit sticky top-[88px]">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition mb-4"
        >
          <FiArrowLeft size={18} />
          <span className="text-sm font-medium">Retour au site</span>
        </Link>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Mon Espace
        </h2>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium text-sm ${
                active
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium text-sm"
        >
          <FiArrowLeft size={18} className="rotate-180" />
          <span>Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
}
