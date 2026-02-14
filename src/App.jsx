import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favoris from "./Pages/Favoris";
import Panier from "./Pages/Panier";
import Checkout from "./Pages/Checkout";
import MemberRoutes from "./Modules/Member/MemberRoutes"
import Login from "./Login"
import Register from "./Register"
import Logout from "./Logout"


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/member/*" element={<MemberRoutes />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;