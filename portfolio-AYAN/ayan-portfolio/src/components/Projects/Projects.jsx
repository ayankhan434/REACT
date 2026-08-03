import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "GSAP Portfolio — React + GSAP",
    desc: "Designed and built a high-performance animated portfolio using React and GSAP. Implemented ScrollTrigger-based section pinning, scrubbed timelines, parallax/zoom effects, and smooth anchor navigation. Built reusable motion patterns, responsive layouts, and optimized rendering with will-change, transform-based animations, and cleanup-safe GSAP hooks for consistent behavior across refresh/resize.",
    image: "/assets/images/common/portfolio-image.png",
    tags: ["React", "GSAP", "ScrollTrigger", "SCSS", "Vite"],
    links: [
      {
        label: "Live Demo",
        href: "https://sisvanth-gsap-portfolio.vercel.app/",
        icon: "↗",
      },
      {
        label: "Source Code",
        href: "https://github.com/SisvanthkumarS/GSAP-Portfolio",
        icon: "⌂",
      },
    ],
  },
  {
    title: "Dining Concierge Chatbot — AWS",
    desc: "Built a production-style serverless dining recommendation system leveraging AWS cloud-native services. Implemented a decoupled microservices architecture using API Gateway, Lex, Lambda, SQS, OpenSearch, DynamoDB, SES, and EventBridge.",
    image: "/assets/images/common/chatbot-cover.png",
    tags: [
      "AWS",
      "Lex",
      "Lambda",
      "API Gateway",
      "SQS",
      "DynamoDB",
      "OpenSearch",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://amanns-dining-concierge-nyc.s3.us-east-1.amazonaws.com/index.html",
        icon: "↗",
      },
      {
        label: "Source Code",
        href: "https://github.com/SisvanthkumarS/dining-concierge-chatbot",
        icon: "⌂",
      },
    ],
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* Header like your Certifications screenshot */}
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS </h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and
          cloud-first architecture.
        </p>
      </div>

      {/* Cards like your first screenshot */}
      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
