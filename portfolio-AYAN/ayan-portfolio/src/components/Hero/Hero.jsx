import React, { useRef } from "react";
import "./Hero.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { name } from "../../constants/landingPageConstants";
import { tagline } from "../../constants/landingPageConstants";
import { scrollIndicator } from "../../constants/landingPageConstants";

gsap.registerPlugin(ScrollTrigger);

console.log("hey");
const Hero = () => {
  const heroRef = useRef(null);
  const zoomRef = useRef(null);
  const stRef = useRef(null);

  useGSAP(() => {
    const heroEl = heroRef.current;
    const zoomEl = zoomRef.current;
    if (!heroEl || !zoomEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        tablet: "(min-width: 768px) and (max-width: 1023px)",
        desktop: "(min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
        short: "(max-height: 650px)",
      },
      (ctx) => {
        const { mobile, tablet, desktop, reduce, short } = ctx.conditions;

        if (reduce) {
          gsap.set(zoomEl, { clearProps: "transform,opacity" });
          return;
        }

        // tune these per screen so it feels consistent
        const scaleTo = mobile ? 6 : tablet ? 8 : 10;
        const endDist = short ? "+=55%" : mobile ? "+=70%" : "+=80%";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: endDist,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "heroPin",
          },
        });

        // make sure we start clean when switching breakpoints
        gsap.set(zoomEl, { scale: 1, opacity: 1, force3D: true });

        tl.to(zoomEl, { scale: scaleTo, opacity: 0 });

        stRef.current = tl.scrollTrigger;
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div ref={zoomRef} className="hero-zoom">
          <h1 className="hero-title">{name}</h1>
          <div className="hero-sub">
            <span className="line" />
            <span className="tag-line">{tagline}</span>
            <span className="line" />
          </div>

          <div className="scroll-down-indicator">
            <img src="/assets/images/common/scroll-down.png" alt="scroll" />
            <p>{scrollIndicator}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
