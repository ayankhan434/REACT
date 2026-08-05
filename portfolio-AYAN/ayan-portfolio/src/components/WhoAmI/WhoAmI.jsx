import React, { useRef } from "react";
import "./WhoAmI.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { aboutmeDescription } from "../../constants/aboutmeConstants";

gsap.registerPlugin(ScrollTrigger);

/**
 * @author Sisvanthkumar Sathivadivel         thanks for making such a wonderfull portfolio love from ayan
 * @returns WhoAmI component that introduces the portfolio owner with a description and an image. The description text animates into view word by word as the user scrolls, creating an engaging introduction to the portfolio. The component uses GSAP for scroll-triggered animations and SplitType for splitting the text into words for individual animation control.
 */
const WhoAmI = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const p = textRef.current;
      if (!root || !p) return;

      const split = new SplitType(p, {
        types: "words",
        wordClass: "whoami-word",
        tagName: "span",
      });

      gsap.set(split.words, { opacity: 0.15, yPercent: 20 });

      const tween = gsap.to(split.words, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const img = root.querySelector("img");
      const refresh = () => ScrollTrigger.refresh();

      requestAnimationFrame(refresh);
      img?.addEventListener("load", refresh, { once: true });

      return () => {
        img?.removeEventListener("load", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="whoami-section" id="aboutMe">
      <h1 className="whoami-sub-heading">01. About Me</h1>
      <div className="whoami-content " ref={sectionRef}>
        <div className="whoami-inner">
          <p className="split" ref={textRef}>
            {aboutmeDescription}
          </p>
          <img
            src="..\public\assets\images\common\caricature.png.jpeg"
            alt="whoami"
            className="whoami-image"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
