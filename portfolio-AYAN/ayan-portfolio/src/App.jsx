import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Warp from "./components/Warp/Warp";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      normalizeScroll: true,
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Warp />
    </>
  );
};

export default App;
