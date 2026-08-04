import React from "react";
import "./Contact.scss";
import { mobileNumber, email } from "../../constants/contactConstants";

/**
 * @author Sisvanthkumar Sathivadivel  #inspiration
 * @description Contact component for the portfolio website. This section includes a form for visitors to get in touch, as well as contact information and social media links.
 * @returns Contact section with a form to get in touch, including contact information and social links.
 * The form submits to Formspree for handling contact messages.
 *
 */
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />

      <div className="contact-header">
        <p className="contact-sub-heading">03. Contact</p>
        <h2>GET IN TOUCH</h2>
        <p className="contact-description">
          I’m always open to discussing product ideas, creative strategies, or
          potential collaborations. Actively looking for summer internships.
        </p>
      </div>

      <div className="contact__container">
        <div className="contact__left">
          <h2 className="contact__title">
            Let’s build <br />
            something <br />
            <span className="contact__titleAccent">impactful.</span>
          </h2>

          <p className="contact__desc">
            Actively seeking summer internship opportunities. Feel free to reach
            out if you have a project in mind or just want to say hi! I’m always
            open to discussing product ideas, creative strategies, or potential
            collaborations.
          </p>

          <div className="contact__info">
            <a className="contact__email" href={`mailto:${email}`}>
              {email}
            </a>
            <div className="contact__phone">{mobileNumber}</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact__card">
          <form
            className="contact__form"
            action="https://formspree.io/f/mvkpppbk"
            method="POST"
            onKeyDownCapture={(e) => {
              const isField =
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement ||
                e.target.isContentEditable;

              if (isField && e.key === " ") e.stopPropagation();
            }}
          >
            <input type="hidden" name="_subject" value="Portfolio Contact" />
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
            />

            <label className="field">
              <span className="field__label">NAME</span>
              <input
                className="field__input"
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span className="field__label">EMAIL</span>
              <input
                className="field__input"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span className="field__label">MESSAGE</span>
              <textarea
                className="field__textarea"
                name="message"
                placeholder="Reaching out about a job or internship? Share role details + timeline…"
                rows={5}
                required
              />
            </label>

            <button type="submit" className="contact__btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="contact__footer">
        <div className="contact__footerInner">
          <div className="contact__copyright">
            © {new Date().getFullYear()} Ayan Khan. All rights reserved.
          </div>

          <div className="contact__links">
            <a
              href="www.linkedin.com/in/ayan-khan-529786380"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ayankhan434"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
