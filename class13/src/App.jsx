import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
