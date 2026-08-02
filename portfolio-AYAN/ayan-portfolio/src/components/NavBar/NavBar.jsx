import React, { useRef, useState } from "react";
import { navLinks } from "../../constants/navbarConstant";
import "./Navbar.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.set(panelRef.current, {
      height: 0,
      opacity: 0,
      y: -8,
      pointerEvents: "none",
    });
  }, []);

  const animatePanel = (next) => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.to(panel, {
      height: next ? "auto" : 0,
      opacity: next ? 1 : 0,
      y: next ? 0 : -8,
      duration: 0.25,
      ease: "power2.out",
      onStart: () => gsap.set(panel, { pointerEvents: "auto" }),
      onComplete: () => {
        if (!next) gsap.set(panel, { pointerEvents: "none" });
      },
    });
  };

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      animatePanel(next);
      return next;
    });
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    if (open) {
      setOpen(false);
      animatePanel(false);
    }

    ScrollTrigger.refresh();
    gsap.to(window, {
      duration: 1,
      ease: "power3.out",
      scrollTo: { y: el, offsetY: 80 },
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <a
          className="nav-home"
          href="#home"
          onClick={goTo("home")}
          aria-label="Home"
        >
          <img src="./assets/images/common/icons8-home.svg" alt="" />
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={goTo(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="download-button"
              href="/assets/files/Ayan-Khan.pdf"
              download="Ayan-khan__SweResume.pdf"
            >
              RESUME
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={`nav-burger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={toggle}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      <div ref={panelRef} id="nav-panel" className="nav-panel">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={goTo(link.id)}>
            {link.label}
          </a>
        ))}
        <a
          className="download-button"
          href="/assets/files/Sisvanthkumar_Sathivadivel__SweResume.pdf"
          download="Sisvanthkumar_Sathivadivel__SweResume.pdf"
        >
          RESUME
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
