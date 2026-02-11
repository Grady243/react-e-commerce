
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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;