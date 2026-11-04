
import "./App.css";

const skills = [
  "Python",
  "TypeScript",
  "FastAPI",
  "LangChain",
  "LangGraph",
  "Agentic AI",
  "RAG",
  "Azure OpenAI",
  "Vector Search",
  "SQL",
  "Docker",
  "Git",
  "GitHub",
  "Streamlit",
];

const projects = [
  {
    number: "01",
    title: "Agentic AI Enterprise Automation",
    category: "Agentic AI · LangGraph · RAG",
    description:
      "Developed agentic AI workflows for enterprise request triage, investigation, knowledge retrieval, and resolution support using Python, LangGraph, FastAPI, and Azure OpenAI.",
    technologies: ["Python", "LangGraph", "FastAPI", "Azure OpenAI"],
    github: "https://github.com/Saiteja137",
  },
  {
    number: "02",
    title: "SmartPDF QA Assistant",
    category: "Generative AI · RAG",
    description:
      "Built a document question-answering application that processes PDF files, retrieves relevant content using embeddings and FAISS, and generates contextual answers.",
    technologies: ["Python", "LangChain", "FAISS", "Streamlit"],
    github: "https://github.com/Saiteja137",
  },
  {
    number: "03",
    title: "Data Analytics Dashboard",
    category: "Data Analytics · Visualization",
    description:
      "Created an interactive dashboard to analyze CSV datasets, explore data patterns, and visualize insights using Python data processing and visualization libraries.",
    technologies: ["Python", "Pandas", "Streamlit", "Matplotlib"],
    github: "https://github.com/Saiteja137",
  },
];

function App() {
  return (
    <div className="portfolio">
      <header className="navbar">
        <a href="#home" className="logo">
          ST<span>.</span>
        </a>

        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact" className="nav-contact">
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero section-container">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="status-dot"></span>
              AI ENGINEER
            </p>

            <h1>
              Building intelligent
              <br />
              systems with <span>AI.</span>
            </h1>

            <p className="hero-description">
              Hi, I'm <strong>Sai Teja</strong> — an AI Engineer focused on
              Agentic AI, Generative AI, RAG systems, and building practical
              AI-powered applications.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="button button-primary">
                Explore Projects ↗
              </a>

              <a href="#contact" className="button button-secondary">
                Contact Me
              </a>
            </div>

            <div className="hero-links">
              <a
                href="https://github.com/Saiteja137"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/saitheja-atkapuram/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume ↗
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span>AI ENGINEER</span>
              <span className="card-indicator">● AVAILABLE</span>
            </div>

            <div className="code-window">
              <div className="code-header">
                <span></span>
                <span></span>
                <span></span>
                <p>ai_engineer.py</p>
              </div>

              <pre>
                <code>
                  <span className="code-purple">class</span>{" "}
                  <span className="code-green">AIEngineer</span>:
                  {"\n"}
                  {"  "}
                  <span className="code-purple">def</span>{" "}
                  <span className="code-blue">build</span>(self):
                  {"\n"}
                  {"    "}
                  <span className="code-purple">return</span> [
                  {"\n"}
                  {"      "}
                  <span className="code-orange">"Agentic AI"</span>,
                  {"\n"}
                  {"      "}
                  <span className="code-orange">"RAG Systems"</span>,
                  {"\n"}
                  {"      "}
                  <span className="code-orange">"Generative AI"</span>,
                  {"\n"}
                  {"      "}
                  <span className="code-orange">"Intelligent Apps"</span>
                  {"\n"}
                  {"    "}]
                </code>
              </pre>
            </div>

            <div className="hero-card-footer">
              <span>Python</span>
              <span>LangGraph</span>
              <span>Azure AI</span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-container section-block">
          <div className="section-heading">
            <p className="eyebrow">01 / ABOUT ME</p>
            <h2>
              Turning ideas into
              <br />
              <span>intelligent solutions.</span>
            </h2>
          </div>

          <div className="about-content">
            <p>
              I'm an AI Engineer with approximately one year of professional
              experience building AI-powered applications and intelligent
              automation solutions.
            </p>

            <p>
              My work focuses on Agentic AI, Large Language Models, Retrieval
              Augmented Generation, and developing reliable AI systems using
              Python, LangChain, LangGraph, FastAPI, and Azure OpenAI.
            </p>

            <p>
              I enjoy learning emerging AI technologies and transforming
              technical concepts into practical applications that solve
              real-world problems.
            </p>

            <div className="about-details">
              <div>
                <span>ROLE</span>
                <strong>AI Engineer</strong>
              </div>

              <div>
                <span>FOCUS</span>
                <strong>Agentic AI & RAG</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>Hyderabad, India</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section-container section-block">
          <div className="section-heading">
            <p className="eyebrow">02 / TECHNICAL SKILLS</p>
            <h2>
              Technologies I
              <br />
              <span>work with.</span>
            </h2>
          </div>

          <div className="skills-content">
            <p className="section-description">
              Tools and technologies I use to build AI applications,
              intelligent workflows, and data-driven solutions.
            </p>

            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-item" key={skill}>
                  <span className="skill-icon">✳</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section-container section-block">
          <div className="section-heading">
            <p className="eyebrow">03 / SELECTED PROJECTS</p>
            <h2>
              Things I've
              <br />
              <span>built.</span>
            </h2>
          </div>

          <div className="projects-content">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-number">{project.number}</div>

                <div className="project-details">
                  <p className="project-category">{project.category}</p>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tech">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    View on GitHub ↗
                  </a>
                </div>

                <div className="project-arrow">↗</div>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section-container section-block">
          <div className="section-heading">
            <p className="eyebrow">04 / EXPERIENCE</p>
            <h2>
              My professional
              <br />
              <span>journey.</span>
            </h2>
          </div>

          <div className="experience-content">
            <div className="experience-card">
              <div className="experience-date">
                PROFESSIONAL EXPERIENCE
              </div>

              <div className="experience-details">
                <h3>AI Engineer</h3>
                <p className="company-name">UBS</p>

                <p>
                  Worked on AI-powered enterprise automation using Python,
                  LangChain, LangGraph, RAG, and Azure OpenAI.
                </p>

                <ul>
                  <li>
                    Developed agentic workflows for request triage and
                    investigation.
                  </li>
                  <li>
                    Integrated enterprise knowledge retrieval with AI
                    applications.
                  </li>
                  <li>
                    Contributed to application development, testing,
                    monitoring, and production releases.
                  </li>
                </ul>

                <p className="experience-note">
                  Project details are summarized without confidential
                  implementation information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section
          id="certifications"
          className="section-container section-block"
        >
          <div className="section-heading">
            <p className="eyebrow">05 / CERTIFICATIONS</p>
            <h2>
              Learning and
              <br />
              <span>growth.</span>
            </h2>
          </div>

          <div className="certifications-content">
            <div className="certification-item">
              <span className="certification-number">01</span>
              <div>
                <h3>Microsoft Certified: Azure AI Fundamentals</h3>
                <p>Microsoft · AI-900 / AI-901 credential as applicable</p>
              </div>
              <span className="certification-symbol">↗</span>
            </div>

            <div className="certification-item">
              <span className="certification-number">02</span>
              <div>
                <h3>Microsoft Certified: Azure Fundamentals</h3>
                <p>Microsoft · AZ-900</p>
              </div>
              <span className="certification-symbol">↗</span>
            </div>

            <div className="certification-item">
              <span className="certification-number">03</span>
              <div>
                <h3>NextGen AI — Agents in Action</h3>
                <p>UBS · Certificate of Achievement</p>
              </div>
              <span className="certification-symbol">↗</span>
            </div>

            <div className="certification-item">
              <span className="certification-number">04</span>
              <div>
                <h3>GitHub Copilot Productivity</h3>
                <p>GitHub · Learning certification</p>
              </div>
              <span className="certification-symbol">↗</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-container contact-section">
          <p className="eyebrow">06 / CONTACT</p>

          <h2>
            Let's build
            <br />
            something <span>intelligent.</span>
          </h2>

          <p className="contact-description">
            Interested in AI engineering, Agentic AI, or building
            intelligent applications? Let's connect.
          </p>

          <a
            href="mailto:Saitejaatkapuram7@gmail.com"
            className="button button-primary contact-button"
          >
            Get in Touch ↗
          </a>

          <div className="contact-links">
            <a
              href="https://github.com/Saiteja137"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/saitheja-atkapuram/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>

            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-logo">
          ST.
        </a>

        <p>Designed & built by Sai Teja</p>

        <p>© {new Date().getFullYear()} · AI Engineer</p>
      </footer>
    </div>
  );
}

export default App;
