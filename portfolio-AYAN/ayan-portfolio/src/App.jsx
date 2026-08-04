import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Cursor from "./ui/Cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import WhoAmI from "./components/WhoAmI/WhoAmI";
import Warp from "./components/Warp/Warp";
npm;
import TechStack from "./components/TechStack/TechStack";

import Contact from "./components/Contact/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Warp />
      <Cursor />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar />
          <Hero />
          <WhoAmI />
          <TechStack />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default App;
