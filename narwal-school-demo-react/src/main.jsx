import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, ChevronDown, GraduationCap,
  Instagram, Mail, MapPin, Menu, Phone, Play, Quote, School, Star, Users, X
} from "lucide-react";
import "./styles.css";

const navItems = [
  ["Home", "home"], ["About", "about"], ["Academics", "academics"],
  ["Faculty", "faculty"], ["Results", "results"], ["Gallery", "gallery"], ["Contact", "contact"]
];

const faculty = [
  { name: "Dr. Riya Sharma", role: "Principal", subject: "Academic Leadership", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80" },
  { name: "Amit Verma", role: "Senior Faculty", subject: "Mathematics", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80" },
  { name: "Neha Singh", role: "Senior Faculty", subject: "Science", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" }
];

const gallery = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80"
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div className="app">
      <div className="demo-bar">DEMO WEBSITE • SAMPLE SCHOOL DESIGN</div>

      <header className="navbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo("home")}>
            <span className="brand-icon"><School size={24} /></span>
            <span><b>Narwal</b><small>Public School</small></span>
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo("admission")}>Apply Now <ArrowRight size={16}/></button>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span></span> Admissions Open 2026–27</div>
              <h1>Where curiosity becomes <em>confidence.</em></h1>
              <p>Building strong foundations, independent thinkers and responsible citizens through quality education.</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => scrollTo("admission")}>Apply for Admission <ArrowRight size={18}/></button>
                <button className="ghost-btn" onClick={() => scrollTo("about")}><Play size={16} /> Explore School</button>
              </div>
              <div className="trust-row">
                <div><strong>15+</strong><span>Years of Excellence</span></div>
                <div><strong>98%</strong><span>Board Results</span></div>
                <div><strong>1,200+</strong><span>Students</span></div>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-image-wrap">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85" alt="School campus"/>
                <div className="floating-card">
                  <Award size={22}/>
                  <div><b>Excellence</b><span>in Education</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-cue"><ChevronDown size={18}/> Scroll to explore</div>
        </section>

        <section id="about" className="section">
          <div className="container two-col">
            <div>
              <span className="section-tag">ABOUT US</span>
              <h2>A school built around <span>every learner.</span></h2>
              <p className="lead">Narwal Public School is a demo concept for a modern school website. The final version can be customized with the real school's story, achievements, photos and information.</p>
              <p>Our approach combines academic rigour with sports, creativity, technology and values. Students are encouraged to ask questions, collaborate and become confident problem-solvers.</p>
              <button className="text-btn" onClick={() => scrollTo("academics")}>Discover our academics <ArrowRight size={17}/></button>
            </div>
            <div className="feature-grid">
              <div className="feature"><div className="icon"><GraduationCap/></div><b>Holistic Learning</b><span>Academics, activities and life skills.</span></div>
              <div className="feature"><div className="icon"><Users/></div><b>Expert Faculty</b><span>Mentors who guide every learner.</span></div>
              <div className="feature"><div className="icon"><BookOpen/></div><b>Modern Academics</b><span>Concept-first, future-ready learning.</span></div>
              <div className="feature"><div className="icon"><Star/></div><b>Student First</b><span>A safe and encouraging environment.</span></div>
            </div>
          </div>
        </section>

        <section id="academics" className="section soft">
          <div className="container">
            <div className="section-head">
              <div><span className="section-tag">ACADEMICS</span><h2>Learning for every stage.</h2></div>
              <p>Replace these demo cards with the school's actual classes, streams and curriculum.</p>
            </div>
            <div className="academic-grid">
              {[
                ["01","Primary School","Classes I–V","Strong foundations in language, mathematics, science and creativity."],
                ["02","Middle School","Classes VI–VIII","Conceptual learning, practical activities and collaborative projects."],
                ["03","Senior School","Classes IX–XII","Focused preparation for boards, higher education and careers."]
              ].map(x => (
                <article className="academic-card" key={x[0]}>
                  <span>{x[0]}</span><h3>{x[1]}</h3><b>{x[2]}</b><p>{x[3]}</p><ArrowRight className="card-arrow"/>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faculty" className="section">
          <div className="container">
            <div className="section-head"><div><span className="section-tag">FACULTY</span><h2>Meet the mentors.</h2></div></div>
            <div className="faculty-grid">
              {faculty.map(f => <article className="faculty-card" key={f.name}><img src={f.img} alt={f.name}/><div><span>{f.role}</span><h3>{f.name}</h3><p>{f.subject}</p></div></article>)}
            </div>
          </div>
        </section>

        <section id="results" className="results-section">
          <div className="container results-grid">
            <div><span className="section-tag light">RESULTS & ACHIEVEMENTS</span><h2>Results that reflect<br/><em>consistent effort.</em></h2><p>Use this section to showcase actual board results, Olympiad achievements, sports wins and student success stories.</p></div>
            <div className="result-stats">
              <div><strong>98<span>%</span></strong><small>Board Pass Rate</small></div>
              <div><strong>42</strong><small>Students above 90%</small></div>
              <div><strong>15+</strong><small>Years of Excellence</small></div>
              <div><strong>25+</strong><small>Academic Awards</small></div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <div className="section-head"><div><span className="section-tag">CAMPUS LIFE</span><h2>Life beyond the classroom.</h2></div></div>
            <div className="gallery-grid">{gallery.map((src,i)=><img key={src} src={src} alt={`Campus gallery ${i+1}`}/>)}</div>
          </div>
        </section>

        <section id="admission" className="admission-section">
          <div className="container admission-grid">
            <div>
              <span className="section-tag light">ADMISSIONS 2026–27</span>
              <h2>Take the first step<br/>towards a brighter future.</h2>
              <p>Parents can submit an enquiry online and the school team can follow up with them.</p>
              <div className="contact-mini"><Phone size={18}/><div><small>Admissions Helpline</small><b>+91 98765 43210</b></div></div>
              <div className="contact-mini"><Mail size={18}/><div><small>Email</small><b>admissions@narwalschool.demo</b></div></div>
            </div>

            <form className="enquiry-form" onSubmit={submitForm}>
              <h3>Admission Enquiry</h3>
              <p>Fill the form and our team will contact you.</p>
              <div className="form-grid">
                <label>Student Name<input required placeholder="Enter student name"/></label>
                <label>Parent Name<input required placeholder="Enter parent name"/></label>
                <label>Class<select required defaultValue=""><option value="" disabled>Select class</option><option>Class I–V</option><option>Class VI–VIII</option><option>Class IX–X</option><option>Class XI–XII</option></select></label>
                <label>Mobile Number<input required type="tel" placeholder="10-digit mobile"/></label>
              </div>
              <label>Message<textarea rows="3" placeholder="Any question or requirement?"></textarea></label>
              <button className="primary-btn full" type="submit">Submit Enquiry <ArrowRight size={18}/></button>
              {submitted && <div className="success"><CheckCircle2 size={18}/> Demo enquiry submitted successfully.</div>}
              <small className="privacy">By submitting, you agree that the school may contact you regarding admission.</small>
            </form>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div><span className="section-tag">CONTACT</span><h2>Come meet us.</h2><p>Replace the demo details below with the real school's address, phone and email.</p></div>
            <div className="contact-list">
              <div><MapPin/><div><b>Campus Address</b><span>Narwal, Kanpur Nagar, Uttar Pradesh</span></div></div>
              <div><Phone/><div><b>Phone</b><span>+91 98765 43210</span></div></div>
              <div><Mail/><div><b>Email</b><span>info@narwalschool.demo</span></div></div>
              <div><Instagram/><div><b>Social Media</b><span>@narwalschool</span></div></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="brand footer-brand"><span className="brand-icon"><School size={21}/></span><span><b>Narwal</b><small>Public School</small></span></div>
          <p>© 2026 Narwal Public School. Demo website concept.</p>
          <button onClick={() => scrollTo("home")}>Back to top ↑</button>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
