import { useState } from 'react'
import './App.css'

const resumeUrl =
  'https://drive.google.com/file/d/1X90EbDy13GnJpyS0Lns3JieXERRUWbGa/view?usp=sharing'

const skillGroups = [
  {
    title: 'Programming',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'Agentic AI & GenAI',
    items: [
      'LLMs',
      'LangChain',
      'LangGraph',
      'Multi-Agent Workflows',
      'Tool / Function Calling',
      'Prompt Engineering',
      'Human-in-the-Loop',
    ],
  },
  {
    title: 'RAG & Retrieval',
    items: [
      'RAG',
      'Embeddings',
      'Semantic Search',
      'Vector Search',
      'Azure AI Search',
      'FAISS',
      'ChromaDB',
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      'FastAPI',
      'REST APIs',
      'PostgreSQL',
      'SQLAlchemy',
      'Alembic',
      'SQLite',
      'Pydantic',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      'Azure OpenAI',
      'Azure AI Foundry',
      'Azure Blob Storage',
      'Docker',
      'Kubernetes',
      'AKS',
      'Helm',
      'GitLab CI/CD',
    ],
  },
  {
    title: 'Evaluation & Observability',
    items: [
      'DeepEval',
      'Pytest',
      'OpenTelemetry',
      'Azure Monitor',
      'LLM Evaluation',
      'Logging',
    ],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'HTML', 'CSS', 'Streamlit'],
  },
]

const projects = [
  {
    title: 'Request Management Service',
    label: 'Enterprise Agentic AI Automation · UBS',
    featured: true,
    stack: [
      'Python 3.12',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'RAG',
      'Azure OpenAI',
      'Azure AI Search',
      'PostgreSQL',
      'Docker',
      'AKS',
      'Helm',
    ],
    description:
      'AI-powered enterprise service that automates end-to-end triage, enrichment, investigation, and resolution of service requests across Atlas and ServiceNow (GSNOW).',
    details: [
      'Designed and built an AI-powered Request Management Service using Python 3.12 and FastAPI to automate end-to-end triage, enrichment, investigation, and resolution of enterprise service requests across Atlas and ServiceNow (GSNOW).',

      'Developed agentic AI workflows with LangChain and LangGraph, including Triage and Investigation agents using GPT-based tool/function calling. Implemented Retrieval-Augmented Generation (RAG) over Atlas Knowledge Base, Confluence, and Azure AI Search to provide grounded responses.',

      'Built a reusable Skills Framework and Skills Sandbox that generates, evaluates, and exports executable skills from knowledge articles and PDFs, enabling new use cases to be onboarded without application code changes.',

      'Implemented human-in-the-loop approval through an MS Teams bot, followed by deterministic and auditable automation execution. Added dry-run mode to simulate requests without side effects.',

      'Adopted eval-driven development using DeepEval and LLM feedback loops. Added observability and monitoring through OpenTelemetry and Azure Monitor.',

      'Containerized the service using Docker and deployed it to Azure Kubernetes Service (AKS) using Helm. Managed PostgreSQL with async SQLAlchemy and Alembic, Azure Blob Storage, secrets through Vault/Key Vault, and mTLS.',
    ],
  },

  {
    title: 'AI Personal Finance Planner',
    label: 'Multi-Agent AI Financial Planning Platform · Bootcamp Project',
    stack: [
      'Python',
      'LangGraph',
      'LangChain',
      'GPT-4.1',
      'RAG',
      'React',
      'TypeScript',
      'CSS',
    ],
    description:
      'A multi-agent personal finance planning and recommendation platform that uses user financial context, specialized AI agents, and RAG to support savings, investment, and goal-based planning.',
    details: [
      'Built a multi-agent personal finance planning platform using Python, LangChain, and LangGraph to generate personalized financial planning recommendations based on user income, family details, expenses, and financial goals.',

      'Developed specialized AI agents for financial data collection, investment planning, and goal-based planning, covering lump-sum investments, stocks, fixed deposits, and major purchases such as cars, bikes, homes, and family trips.',

      'Implemented RAG-based recommendations with GPT-4.1 using user-provided financial context and knowledge sources to present investment options based on risk preferences, estimated returns, and available investment amounts.',

      'Developed a responsive React, TypeScript, and CSS frontend that collects user profiles and financial goals and presents personalized investment options, savings strategies, return estimates, and goal-planning recommendations through the agentic workflow.',
    ],
  },

  {
    title: 'AI-Powered CI/CD Root Cause Analysis',
    label: 'GitLab Pipeline Failure Diagnosis · IntelliSquad',
    stack: [
      'LangGraph',
      'LangChain',
      'Azure OpenAI GPT-4o',
      'RAG',
      'Python',
      'FastAPI',
      'GitLab REST API v4',
      'React 19',
      'TypeScript',
      'SQLAlchemy',
      'SQLite',
    ],
    description:
      'A full-stack AI-powered Root Cause Analysis platform that diagnoses GitLab CI/CD pipeline failures, identifies probable causes, and provides contextual remediation recommendations.',
    details: [
      'Built a full-stack AI-powered root cause analysis platform to diagnose GitLab CI/CD pipeline failures using a 4-agent LangGraph pipeline for log parsing, failure classification, fix suggestions, and similarity matching.',

      'Designed an agentic workflow with Azure OpenAI GPT-4o to extract error signatures, classify failures into six categories, assign confidence scores, and generate actionable remediation steps.',

      'Developed an asynchronous FastAPI backend with GitLab REST API v4 integration for real-time pipeline and job-log retrieval, background processing, and multi-user credential handling.',

      'Implemented a knowledge-base-driven similarity engine to identify historically similar failures and recommended fixes. Used SQLAlchemy and SQLite for failure tracking, analytics, and trend metrics.',

      'Created a responsive React 19 and TypeScript dashboard with agent execution timelines, RCA summaries, manual log analysis, failure analytics, and system metrics to support developer investigation.',
    ],
  },

  {
    title: 'SmartPDF QA Assistant',
    label: 'Document Question Answering',
    stack: [
      'Python',
      'Streamlit',
      'LangChain',
      'OpenAI API',
      'PyPDF2',
      'FAISS',
      'Embeddings',
    ],
    description:
      'A PDF question-answering application that retrieves relevant document passages and generates context-aware answers using an LLM.',
    details: [
      'Built a Streamlit application that accepts PDF uploads and answers user questions about their contents.',

      'Extracted text with PyPDF2, split documents into chunks using LangChain, and generated embeddings through the OpenAI API.',

      'Implemented FAISS semantic retrieval and a LangChain QA chain using GPT-3.5-turbo to produce context-grounded responses.',
    ],
  },

  {
    title: 'CSV Data Analytics Dashboard',
    label: 'Interactive Data Exploration',
    stack: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    description:
      'An interactive dashboard for exploring uploaded CSV datasets, reviewing summaries, filtering records, and visualizing data trends.',
    details: [
      'Created a Streamlit dashboard for CSV upload, data exploration, summary statistics, and filtering.',

      'Used Pandas for data processing and Matplotlib for visualizing trends and insights through an interactive dashboard.',
    ],
  },

]

const certifications = [
  'Microsoft Certified: Azure AI Fundamentals',
  'Microsoft Certified: Azure Fundamentals (AZ-900)',
  'UBS Certificate of Achievement — NextGen AI: Agents in Action',
  'Introduction to GitHub Copilot',
  'Boost Your Productivity with GitHub Copilot',
  'Generative AI for Everyone — DeepLearning.AI',
  'GitLab CI Fundamentals',
  'Agile Fundamentals',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className="site-wrap">
      {/* NAVIGATION */}
      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">ST</span>
          <span>Sai Teja</span>
        </a>

        <button
          className="menu-button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {[
            'About',
            'Skills',
            'Experience',
            'Projects',
            'Certifications',
            'Contact',
          ].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}

          <a
            className="nav-resume"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume ↗
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section" id="home">
          <div className="hero-text">
            <p className="eyebrow">
              <span className="live-dot" />
              AI ENGINEER
              <span className="eyebrow-separator">/</span>
              HYDERABAD, INDIA
            </p>

            <h1>
              Turning complex work into
              <br />
              <span>intelligent systems.</span>
            </h1>

            <p className="hero-summary">
              I’m Sai Teja Atkapuram, an AI Engineer focused on building
              practical applications with generative AI, retrieval, and
              multi-agent systems. I bring ideas from prototype to
              production-minded solutions through thoughtful engineering,
              evaluation, and a focus on real-world impact.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                Explore projects <span>↘</span>
              </a>

              <a
                className="button button-outline"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                View resume <span>↗</span>
              </a>
            </div>

            <div className="social-links">
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

              <a href="mailto:saitejaatkapuram7@gmail.com">
                Email ↗
              </a>
            </div>
          </div>

          {/* CODE WINDOW VISUAL */}
          <div className="hero-art" aria-label="Code illustration">
            <div className="glow glow-a" />
            <div className="glow glow-b" />

            <div className="code-window">
              <div className="window-bar">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>

                <span>agentic_ai.py</span>

                <span className="window-status">● running</span>
              </div>

              <div className="code-lines">
                <p>
                  <b>01</b>
                  <span>
                    <em>class</em> <strong>AIEngineer</strong>:
                  </span>
                </p>

                <p>
                  <b>02</b>
                  <span>&nbsp;&nbsp;skills = [</span>
                </p>

                <p>
                  <b>03</b>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<i>"Agentic AI"</i>,</span>
                </p>

                <p>
                  <b>04</b>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<i>"RAG systems"</i>,</span>
                </p>

                <p>
                  <b>05</b>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<i>"LLM applications"</i>,</span>
                </p>

                <p>
                  <b>06</b>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<i>"Production AI"</i></span>
                </p>

                <p>
                  <b>07</b>
                  <span>&nbsp;&nbsp;]</span>
                </p>

                <p>
                  <b>08</b>
                  <span>
                    <em>build</em>(<i>reliable_ai</i>) <strong>→</strong>{' '}
                    <mark>True</mark>
                  </span>
                </p>
              </div>

              <div className="window-footer">
                <span className="live-dot" />
                Building reliable AI applications
              </div>
            </div>

            <span className="floating-tag tag-lang">
              LangGraph <b>✦</b>
            </span>

            <span className="floating-tag tag-rag">
              RAG <b>⌘</b>
            </span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="section-title">
            <p className="eyebrow">01 / ABOUT</p>

            <h2>
              Engineering intelligence
              <br />
              <span>into useful products.</span>
            </h2>
          </div>

          <div className="about-body">
            <p className="about-lead">
              I turn complicated work into AI systems people can actually rely
              on—not just impressive demos.
            </p>

            <p>
              At UBS, I’ve worked on enterprise service-request automation:
              building LangGraph agents, grounding investigations in internal
              knowledge, and connecting AI decisions to human approval and
              auditable actions. I’ve also worked across the parts that make
              these systems production-ready, including APIs, evaluation,
              deployment, and monitoring.
            </p>

            <div className="about-principles">
              <div className="about-principle">
                <span>01</span>
                <p>
                  <strong>Start with the workflow</strong>
                  Solve the real operational problem before choosing the model.
                </p>
              </div>

              <div className="about-principle">
                <span>02</span>
                <p>
                  <strong>Keep AI grounded</strong>
                  Connect agents to trusted knowledge, tools, and clear context.
                </p>
              </div>

              <div className="about-principle">
                <span>03</span>
                <p>
                  <strong>Build for the real world</strong>
                  Make room for evaluation, human oversight, and observability.
                </p>
              </div>
            </div>

            <div className="stats">
              <div>
                <strong>
                  1<span>+</span>
                </strong>
                <small>Year professional experience</small>
              </div>

              <div>
                <strong>
                  200<span>+</span>
                </strong>
                <small>Enterprise requests supported</small>
              </div>

              <div>
                <strong>100</strong>
                <small>Use cases enabled through reusable skills</small>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="section-title">
            <p className="eyebrow">02 / TOOLKIT</p>

            <h2>
              Skills & <span>technologies.</span>
            </h2>

            <p className="section-note">
              Technologies used to design, build, evaluate, and ship AI
              applications.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>

                <div className="tags">
                  {group.items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="section-title">
            <p className="eyebrow">03 / EXPERIENCE</p>

            <h2>
              Where I’ve <span>worked.</span>
            </h2>
          </div>

          <article className="experience-card">
            <div className="experience-heading">
              <div>
                <h3>UBS Technology Services · AI Crew</h3>

                <p>
                  AI Engineer <span>·</span> Hyderabad, India
                </p>
              </div>

              <time>Oct 2025 – Oct 2026</time>
            </div>

            <ul>
              <li>
                Designed and engineered enterprise AI applications using
                Python, FastAPI, LangChain, and LangGraph to automate
                service-request workflows.
              </li>

              <li>
                Developed agentic workflows integrating LLM orchestration,
                RAG pipelines, and tool/function calling for complex
                enterprise processes.
              </li>

              <li>
                Contributed to the production release lifecycle, deployment
                validation, monitoring, evaluation, and CI/CD practices.
              </li>
            </ul>

            <div className="tags">
              <span>Agentic AI</span>
              <span>Enterprise Automation</span>
              <span>Azure</span>
              <span>Production AI</span>
            </div>
          </article>
        </section>

        {/* PROJECTS */}
        <section className="section projects-section" id="projects">
          <div className="section-title">
            <p className="eyebrow">04 / SELECTED WORK</p>

            <h2>
              Projects built for <span>impact.</span>
            </h2>

            <p className="section-note">
              Detailed project descriptions, responsibilities, and technology
              stacks. No project links are included.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card ${
                  project.featured ? 'project-featured' : ''
                }`}
                key={project.title}
              >
                <div className="project-meta">
                  <span className="project-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>{project.label}</span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <ul className="project-details">
                  {project.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="section" id="certifications">
          <div className="section-title">
            <p className="eyebrow">05 / LEARNING</p>

            <h2>
              Certifications & <span>achievements.</span>
            </h2>
          </div>

          <div className="cert-list">
            {certifications.map((cert, index) => (
              <div className="cert-row" key={cert}>
                <span className="cert-index">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p>{cert}</p>

                <span className="cert-symbol">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <div className="contact-panel">
            <p className="eyebrow">06 / CONTACT</p>

            <h2>
              Let’s build something
              <br />
              <span>intelligent.</span>
            </h2>

            <p>
              Interested in AI engineering, agentic systems, or reliable
              GenAI applications? Let’s connect.
            </p>

            <div className="hero-buttons">
              <a
                className="button button-primary"
                href="mailto:saitejaatkapuram7@gmail.com"
              >
                Get in touch ↗
              </a>

              <a
                className="button button-outline"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Resume ↗
              </a>
            </div>
          </div>

          <div className="contact-links">
            <a href="mailto:saitejaatkapuram7@gmail.com">
              saitejaatkapuram7@gmail.com
            </a>

            <a
              href="https://www.linkedin.com/in/saitheja-atkapuram/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>

            <a
              href="https://github.com/Saiteja137"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <span>Hyderabad, India</span>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">ST</span>
          <span>Sai Teja</span>
        </a>

        <p>Designed & built with React, TypeScript, and curiosity.</p>

        <span>© {new Date().getFullYear()} Sai Teja Atkapuram</span>
      </footer>
    </div>
  )
}

export default App