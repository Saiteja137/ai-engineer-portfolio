
import { useState } from 'react'
import './App.css'

const profile = {
  name: 'Sai Teja Atkapuram',
  role: 'AI Engineer',
  experience: '1 Year Experience',
  email: 'saitejaatkapuram7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/saitheja-atkapuram/',
  github: 'https://github.com/Saiteja137',
}

const skills = [
  {
    title: 'AI & Generative AI',
    items: ['LLMs', 'Agentic AI', 'RAG', 'Prompt Engineering', 'AI Agents'],
  },
  {
    title: 'Frameworks',
    items: ['LangChain', 'LangGraph', 'FastAPI', 'Streamlit', 'Hugging Face'],
  },
  {
    title: 'Cloud & Deployment',
    items: ['Azure OpenAI', 'Azure AI Search', 'Docker', 'AKS', 'GitHub Actions'],
  },
  {
    title: 'Programming & Data',
    items: ['Python', 'TypeScript', 'SQL', 'PostgreSQL', 'FAISS'],
  },
]

const projects = [
  {
    number: '01',
    title: 'Request Management Service',
    subtitle: 'Agentic AI Enterprise Automation',
    description:
      'Worked on an AI-powered enterprise service that automates triage, enrichment, investigation, and resolution of service requests across Atlas and ServiceNow.',
    technologies: [
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'Azure OpenAI',
      'RAG',
      'PostgreSQL',
      'Docker',
      'AKS',
    ],
    highlights: [
      'Contributed to 4 agentic AI workflows for enterprise request automation.',
      'Implemented GPT-based tool calling for triage and investigation workflows.',
      'Worked with enterprise knowledge sources including Atlas Knowledge Base, Confluence, and Azure AI Search.',
      'Contributed to reusable AI skills and a Skills Sandbox for knowledge-driven automation.',
      'Supported human-in-the-loop approvals through Microsoft Teams.',
      'Worked on evaluation and observability using DeepEval, OpenTelemetry, and Azure Monitor.',
      'Contributed to the end-to-end production release lifecycle, including 20 weekly production releases.',
    ],
    category: 'Professional Experience',
  },
  {
    number: '02',
    title: 'SmartPDF QA Assistant',
    subtitle: 'Retrieval-Augmented Generation',
    description:
      'Developed a document question-answering application that allows users to upload PDF files and ask questions using a retrieval-based AI workflow.',
    technologies: [
      'Python',
      'Streamlit',
      'LangChain',
      'OpenAI',
      'FAISS',
      'PyPDF2',
    ],
    highlights: [
      'Extracted and processed PDF content.',
      'Created document chunks for retrieval.',
      'Generated embeddings and stored them in FAISS.',
      'Used a retrieval-based question-answering workflow to answer user queries.',
    ],
    category: 'Personal Project',
  },
  {
    number: '03',
    title: 'Data Analytics Dashboard',
    subtitle: 'Interactive Data Exploration',
    description:
      'Created a Streamlit dashboard for exploring CSV datasets and presenting useful data insights through interactive visualizations.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    highlights: [
      'Loaded and processed CSV datasets using Pandas.',
      'Presented dataset summaries and visualizations.',
      'Created an interactive interface for data exploration.',
    ],
    category: 'Personal Project',
  },
  {
    number: '04',
    title: 'Airline Tweet Sentiment Analysis',
    subtitle: 'Natural Language Processing',
    description:
      'Built a sentiment analysis project using a pretrained transformer model to classify text sentiment.',
    technologies: ['Python', 'Hugging Face', 'Transformers', 'NLP'],
    highlights: [
      'Used a pretrained DistilBERT sentiment pipeline.',
      'Processed text input and generated sentiment predictions.',
      'Explored transformer-based NLP inference.',
    ],
    category: 'Personal Project',
  },
]

const certifications = [
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    detail: 'Microsoft',
  },
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    detail: 'Microsoft',
  },
  {
    name: 'NextGen AI — Agents in Action',
    detail: 'UBS Certificate of Achievement',
  },
  {
    name: 'Introduction to GitHub Copilot',
    detail: 'GitHub',
  },
  {
    name: 'Boost Your Productivity with GitHub Copilot',
    detail: 'GitHub',
  },
  {
    name: 'AI For Everyone',
    detail: 'DeepLearning.AI',
  },
  {
    name: 'GitLab CI Fundamentals',
    detail: 'GitLab',
  },
  {
    name: 'Agile Fundamentals',
    detail: 'Professional Learning',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="portfolio">
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">ST</span>
          <span>Sai Teja</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                {item}
              </a>
            ),
          )}
          <a
            className="nav-cta"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Let's Connect ↗
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-container">
          <div className="hero-content">
            <div className="availability">
              <span className="availability-dot" />
              AI ENGINEER · 1 YEAR EXPERIENCE
            </div>

            <p className="eyebrow">HELLO, I'M</p>
            <h1>
              {profile.name}
              <span className="hero-gradient">.</span>
            </h1>

            <h2>
              Building intelligent systems with{' '}
              <span className="hero-gradient">Agentic AI</span>
              <br />
              and Generative AI.
            </h2>

            <p className="hero-description">
              AI Engineer focused on building AI-powered applications,
              agentic workflows, retrieval-augmented generation, and
              enterprise automation using modern AI frameworks and cloud
              technologies.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore My Work <span>↗</span>
              </a>
              <a
                className="button button-secondary"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Resume ↓
              </a>
            </div>

            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={`mailto:${profile.email}`}>Email ↗</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="profile-card">
              <div className="profile-card-top">
                <span className="window-dot purple" />
                <span className="window-dot blue" />
                <span className="window-dot pink" />
                <span className="card-label">AI ENGINEER</span>
              </div>

              <div className="profile-avatar">ST</div>
              <h3>Sai Teja</h3>
              <p>Agentic AI · RAG · LLMs</p>

              <div className="mini-stats">
                <div>
                  <strong>1+</strong>
                  <span>Year Exp.</span>
                </div>
                <div>
                  <strong>AI</strong>
                  <span>Engineering</span>
                </div>
                <div>
                  <strong>RAG</strong>
                  <span>Applications</span>
                </div>
              </div>

              <div className="profile-card-footer">
                <span className="footer-status" />
                Building AI solutions
              </div>
            </div>

            <div className="floating-chip chip-top">
              <span>✦</span> LangGraph
            </div>
            <div className="floating-chip chip-bottom">
              <span>⌘</span> RAG Systems
            </div>
          </div>

          <a className="scroll-indicator" href="#about">
            <span /> Scroll to explore
          </a>
        </section>

        <section id="about" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">01 / ABOUT</span>
            <h2>
              Turning ideas into
              <br />
              <span className="hero-gradient">intelligent solutions.</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                I'm an AI Engineer with around one year of professional
                experience working on AI-powered enterprise applications
                and automation.
              </p>
              <p>
                My work focuses on Agentic AI, Retrieval-Augmented
                Generation (RAG), LLM integration, and building practical
                AI workflows using Python, LangChain, LangGraph, FastAPI,
                and Azure AI services.
              </p>
              <p>
                At UBS, I contributed to an enterprise Request Management
                Service designed to automate service request triage,
                investigation, and resolution through AI agents and
                knowledge-driven workflows.
              </p>
              <p>
                I enjoy learning new AI technologies and turning them
                into reliable, useful applications.
              </p>
            </div>

            <div className="about-cards">
              <div className="info-card">
                <span className="info-icon">⌘</span>
                <span className="info-label">FOCUS</span>
                <h3>Agentic AI & RAG</h3>
                <p>Intelligent workflows and knowledge-based systems</p>
              </div>
              <div className="info-card">
                <span className="info-icon">⚡</span>
                <span className="info-label">EXPERIENCE</span>
                <h3>1 Year</h3>
                <p>AI engineering and enterprise automation</p>
              </div>
              <div className="info-card">
                <span className="info-icon">◎</span>
                <span className="info-label">LOCATION</span>
                <h3>Hyderabad, India</h3>
                <p>Open to AI engineering opportunities</p>
              </div>
              <div className="info-card">
                <span className="info-icon">✧</span>
                <span className="info-label">INTERESTS</span>
                <h3>Generative AI</h3>
                <p>LLMs, AI agents, cloud and automation</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">02 / SKILLS</span>
            <h2>
              Technologies I
              <br />
              <span className="hero-gradient">work with.</span>
            </h2>
            <p className="section-description">
              Tools and technologies used to build AI applications,
              intelligent workflows, and production-oriented solutions.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article className="skill-card" key={skill.title}>
                <div className="skill-card-top">
                  <span className="skill-index">0{index + 1}</span>
                  <span className="skill-symbol">✦</span>
                </div>
                <h3>{skill.title}</h3>
                <div className="skill-tags">
                  {skill.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">03 / EXPERIENCE</span>
            <h2>
              Where I've
              <br />
              <span className="hero-gradient">made an impact.</span>
            </h2>
          </div>

          <article className="experience-card">
            <div className="experience-top">
              <div>
                <span className="experience-badge">PROFESSIONAL EXPERIENCE</span>
                <h3>AI Engineer</h3>
                <p className="company-name">UBS</p>
              </div>
              <span className="experience-duration">Around 1 Year</span>
            </div>

            <div className="experience-divider" />

            <h4>Request Management Service — Agentic AI Enterprise Automation</h4>
            <p className="experience-description">
              Contributed to an AI-powered enterprise service that
              automates triage, enrichment, investigation, and resolution
              of service requests across Atlas and ServiceNow.
            </p>

            <ul className="experience-list">
              <li>
                Worked on four agentic AI workflows using LangChain and
                LangGraph for enterprise request automation.
              </li>
              <li>
                Contributed to triage and investigation agents using
                GPT-based tool and function calling.
              </li>
              <li>
                Integrated retrieval workflows with Atlas Knowledge Base,
                Confluence, and Azure AI Search.
              </li>
              <li>
                Worked on reusable AI skills and knowledge-driven
                automation capabilities.
              </li>
              <li>
                Supported human-in-the-loop approvals through Microsoft
                Teams and auditable execution workflows.
              </li>
              <li>
                Contributed to evaluation and observability using
                DeepEval, OpenTelemetry, and Azure Monitor.
              </li>
              <li>
                Participated in end-to-end production release activities,
                including 20 weekly production releases.
              </li>
            </ul>

            <div className="experience-tech">
              {[
                'Python',
                'FastAPI',
                'LangChain',
                'LangGraph',
                'RAG',
                'Azure OpenAI',
                'PostgreSQL',
                'Docker',
                'AKS',
              ].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </article>
        </section>

        <section id="projects" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">04 / PROJECTS</span>
            <h2>
              Selected
              <br />
              <span className="hero-gradient">work.</span>
            </h2>
            <p className="section-description">
              AI engineering projects focused on enterprise automation,
              retrieval-based applications, and data-driven solutions.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                </div>

                <div className="project-icon">
                  {project.number === '01'
                    ? '✧'
                    : project.number === '02'
                      ? '⌕'
                      : project.number === '03'
                        ? '▥'
                        : '◎'}
                </div>

                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>

                <div className="project-highlights">
                  <h4>Key Contributions</h4>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="certifications"
          className="section-container section-block"
        >
          <div className="section-heading">
            <span className="section-number">05 / CERTIFICATIONS</span>
            <h2>
              Learning &
              <br />
              <span className="hero-gradient">certifications.</span>
            </h2>
          </div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <article className="cert-card" key={cert.name}>
                <div className="cert-icon">✦</div>
                <div className="cert-content">
                  <span className="cert-number">
                    CERTIFICATION / 0{index + 1}
                  </span>
                  <h3>{cert.name}</h3>
                  <p>{cert.detail}</p>
                </div>
                <span className="cert-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-container section-block">
          <div className="contact-panel">
            <span className="section-number">06 / CONTACT</span>
            <h2>
              Let's build
              <br />
              something <span className="hero-gradient">intelligent.</span>
            </h2>
            <p>
              Interested in AI engineering opportunities, Generative AI,
              Agentic AI, or building practical AI applications?
              Let's connect.
            </p>

            <a className="button button-primary" href={`mailto:${profile.email}`}>
              Get in Touch ↗
            </a>

            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={`mailto:${profile.email}`}>Email ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="footer-brand">
          ST<span>.</span>
        </a>
        <p>Designed & built by {profile.name}</p>
        <p>© {new Date().getFullYear()} · AI Engineer Portfolio</p>
      </footer>
    </div>
  )
}

export default App
