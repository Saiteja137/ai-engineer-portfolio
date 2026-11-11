import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Database,
  Layers3,
  Mail,
  Menu,
  Terminal,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedArrow from './components/AnimatedArrow';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import CustomCursor from './components/CustomCursor';
import MagneticLink from './components/MagneticLink';
import ParticleOrbit from './components/ParticleOrbit';
import PortfolioWriter from './components/PortfolioWriter';
import ScrollProgress from './components/ScrollProgress';
import ScrollReveal from './components/ScrollReveal';

type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  stack: string[];
  outcome: string;
};

type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type NavItem = {
  id: string;
  label: string;
};

const email = 'saitejaatkapuram7@gmail.com';
const resumeUrl = 'https://drive.google.com/file/d/1X90EbDy13GnJpyS0Lns3JieXERRUWbGa';

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'deployments', label: 'WORK' },
  { id: 'system', label: 'SAAI' },
  { id: 'matrix', label: 'MATRIX' },
  { id: 'contact', label: 'CONTACT' },
];

const projects: Project[] = [
  {
    number: '01',
    name: 'Request Management Service',
    type: 'AGENTIC AI · ENTERPRISE AUTOMATION',
    description:
      'An agentic workflow for triaging, enriching and resolving enterprise requests. Grounded retrieval, tool use and human approvals keep every action useful, auditable and under control.',
    stack: ['LangGraph', 'FastAPI', 'RAG', 'ServiceNow', 'Azure AI Search'],
    outcome: 'Request triage · Knowledge retrieval · Human approvals',
  },
  {
    number: '02',
    name: 'AI-Powered CI/CD Root Cause Analysis',
    type: 'DEVELOPER EXPERIENCE · MULTI-AGENT SYSTEM',
    description:
      'A coordinated AI workflow that investigates failed CI/CD pipelines, connects errors to relevant engineering context and gives teams clear, evidence-led remediation guidance.',
    stack: ['LangGraph', 'Azure OpenAI', 'FastAPI', 'GitLab API', 'React'],
    outcome: 'Failure analysis · Incident correlation · Fix recommendations',
  },
  {
    number: '03',
    name: 'AI Personal Finance Planner',
    type: 'MULTI-AGENT SYSTEM · PERSONALIZATION',
    description:
      'A personal planning experience that turns financial goals and user context into practical, tailored savings and investment guidance through coordinated specialist agents.',
    stack: ['Python', 'LangGraph', 'GPT-4.1', 'RAG', 'React'],
    outcome: 'Financial profiles · Goal-based plans · Risk-aware guidance',
  },
  {
    number: '04',
    name: 'Agentic AI-Powered SLA Breach & Credit Recovery Platform',
    type: 'AGENTIC AI · OPERATIONS',
    description:
      'An operations platform concept for detecting SLA risk, assembling supporting evidence and coordinating credit recovery through governed, human-supervised workflows.',
    stack: ['LLMs', 'Agentic workflows', 'FastAPI', 'Enterprise APIs'],
    outcome: 'Risk detection · Evidence synthesis · Recovery workflows',
  },
];

const capabilities: Capability[] = [
  {
    icon: Workflow,
    title: 'AGENTIC SYSTEMS',
    body: 'LangChain, LangGraph, multi-agent orchestration, tool calling and human-in-the-loop workflows.',
  },
  {
    icon: Database,
    title: 'RETRIEVAL & KNOWLEDGE',
    body: 'RAG pipelines, Azure AI Search, vector retrieval, grounding and enterprise knowledge integration.',
  },
  {
    icon: Cpu,
    title: 'LLM APPLICATIONS',
    body: 'Azure OpenAI, prompt engineering, structured outputs, evaluation and production-minded AI.',
  },
  {
    icon: Layers3,
    title: 'ENGINEERING & DELIVERY',
    body: 'Python, FastAPI, React, TypeScript, Docker, Kubernetes and Azure.',
  },
];

const matrix = [
  { title: 'BUILD', items: 'Python / FastAPI / React / TypeScript' },
  { title: 'ORCHESTRATE', items: 'LangChain / LangGraph / LLM tool calling' },
  { title: 'RETRIEVE', items: 'RAG / Azure AI Search / vector stores' },
  { title: 'SHIP', items: 'Docker / Kubernetes / Azure / CI/CD' },
];

function SectionHeading({
  eyebrow,
  title,
  accent,
  index,
  id,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  index: string;
  id: string;
}) {
  return (
    <ScrollReveal>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id}>
            {title} <em>{accent}</em>
          </h2>
        </div>
        <span className="section-index">{index}</span>
      </div>
    </ScrollReveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <ScrollReveal className="project-reveal" delay={index * 0.1}>
      <article className="project-card">
        <div className="project-number">{project.number}</div>
        <div className="project-main">
          <span className="project-type">{project.type}</span>
          <h3>{project.name}</h3>
          <div className="project-route">
            <span>REQUEST / ROUTE</span>
            <AnimatedArrow
              viewBox="0 0 160 24"
              path="M 4 18 C 40 18 42 5 78 5 S 116 19 156 9"
              duration={5 + index * 0.4}
              delay={index * 0.18}
            />
            <span>CONTEXT / ACTION</span>
          </div>
          <p>{project.description}</p>
          <div className="tags" aria-label="Technology stack">
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <div className="project-outcome">
            <span>CORE CAPABILITIES</span>
            {project.outcome}
          </div>
        </div>
        <a
          className="project-arrow"
          href={`mailto:${email}?subject=${encodeURIComponent(`Project details: ${project.name}`)}`}
          aria-label={`Ask Saiteja about ${project.name}`}
        >
          <ArrowUpRight aria-hidden="true" />
        </a>
      </article>
    </ScrollReveal>
  );
}

function SiteHeader({
  active,
  menuOpen,
  onClose,
  onToggle,
}: {
  active: string;
  menuOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" onClick={onClose} aria-label="Saiteja Atkapuram, home">
        <span className="brand-mark" aria-hidden="true">
          S<span>.</span>
        </span>
        <span>
          SAI TEJA<span className="brand-sub"> / AI ENGINEER</span>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={onToggle}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        className={menuOpen ? 'nav-links open' : 'nav-links'}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            className={active === item.id ? 'active' : ''}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={onClose}
          >
            {item.label}
            {active === item.id && (
              <motion.span
                className="nav-indicator"
                layoutId="active-navigation-indicator"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
          </a>
        ))}
        <a
          className="nav-resume"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >
          RESUME <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <a className="nav-cta" href={`mailto:${email}`} onClick={onClose}>
          LET&apos;S TALK <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function HeroIllustration() {
  return (
    <div className="hero-art" role="img" aria-label="Abstract AI system visualization">
      <div className="art-grid" aria-hidden="true" />
      <div className="art-frame">
        <div className="frame-top">
          <span>FIG. 01 / SYSTEMS THINKING</span>
          <span>AI—26</span>
        </div>
        <div className="hero-system-map" aria-label="AI agent to retrieval to language model">
          <AnimatedArrow
            className="hero-system-flow"
            viewBox="0 0 240 180"
            path="M 30 55 C 65 55 69 55 95 55 S 151 55 177 55 C 202 55 204 117 178 117 S 122 117 95 117"
            duration={6.6}
          />
          <div className="system-node system-node-agent">
            <span className="system-node-dot" />
            <strong>AI AGENT</strong>
            <small>PLAN / ROUTE</small>
          </div>
          <div className="system-node system-node-rag">
            <span className="system-node-dot" />
            <strong>RAG ENGINE</strong>
            <small>RETRIEVE / GROUND</small>
          </div>
          <div className="system-node system-node-llm">
            <span className="system-node-dot" />
            <strong>LLM CORE</strong>
            <small>REASON / RESPOND</small>
          </div>
        </div>
        <div className="frame-bottom">
          <span>REASON</span>
          <span className="red-line" />
          <span>RETRIEVE</span>
          <span className="red-line" />
          <span>EXECUTE</span>
        </div>
      </div>
      <div className="art-caption">
        FROM MODEL TO MEANINGFUL OUTCOME <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="footer section-wrap">
      <a className="brand" href="#home" aria-label="Saiteja Atkapuram, back to top">
        <span className="brand-mark" aria-hidden="true">
          S<span>.</span>
        </span>
        <span>
          SAI TEJA<span className="brand-sub"> / AI ENGINEER</span>
        </span>
      </a>
      <span className="footer-note">DESIGNED WITH INTENT. BUILT TO EVOLVE.</span>
      <div className="socials" aria-label="Social and contact links">
        <a href={resumeUrl} target="_blank" rel="noreferrer">
          Resume <ArrowUpRight aria-hidden="true" />
        </a>
        <a href="https://github.com/Saiteja137" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/saitheja-atkapuram/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={`mailto:${email}`}>
          Email
          <Mail aria-hidden="true" />
        </a>
      </div>
      <ParticleOrbit />
      <span className="copyright">© 2026 SAI TEJA ATKAPURAM</span>
    </footer>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const visibleId = visibleSections[0]?.target.id;
        if (visibleId) setActive(visibleId);
      },
      { rootMargin: '-22% 0px -63% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <PortfolioWriter />
      <CustomCursor />
      <ScrollProgress />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader
        active={active}
        menuOpen={menuOpen}
        onClose={closeMenu}
        onToggle={() => setMenuOpen((open) => !open)}
      />
      <main id="main-content">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span>
              <i className="status-dot" aria-hidden="true" /> AI ENGINEER / ENTERPRISE AI SYSTEMS
            </span>
            <span>PORTFOLIO / 2026</span>
          </div>
          <div className="hero-title-wrap">
            <p className="eyebrow">ENGINEERING INTELLIGENCE INTO REAL-WORLD SYSTEMS</p>
            <h1 className="outline-title" id="hero-title">
              PORTFOLIO<span className="title-dot">.</span>
            </h1>
          </div>
          <div className="hero-grid">
            <div className="hero-intro">
              <div className="name-chip">HELLO, I&apos;M</div>
              <h2>
                Saiteja<span>.</span>
              </h2>
              <p className="hero-role">AI ENGINEER <b>·</b> AGENTIC AI <b>·</b> RAG SYSTEMS</p>
              <p className="hero-copy">
                I build production-minded AI applications that connect language models, tools and
                enterprise knowledge — turning complex workflows into useful, reliable products.
              </p>
              <div className="hero-actions">
                <MagneticLink className="button button-red" href="#deployments">
                  EXPLORE MY WORK <ArrowUpRight size={16} aria-hidden="true" />
                </MagneticLink>
                <MagneticLink
                  className="button button-quiet"
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  ariaLabel="View Saiteja Atkapuram's resume in Google Drive"
                >
                  VIEW RESUME <ArrowUpRight size={15} aria-hidden="true" />
                </MagneticLink>
              </div>
            </div>
            <HeroIllustration />
          </div>
          <a className="scroll-cue" href="#about">
            <span className="scroll-line" aria-hidden="true" /> SCROLL TO EXPLORE{' '}
            <ArrowDown size={13} aria-hidden="true" />
          </a>
          <div className="hero-coordinate" aria-hidden="true">
            <span>17° 23&apos; 45.6&quot; N</span>
            <span>AI / SYSTEMS / 2026</span>
          </div>
        </section>

        <section className="about section-wrap" id="about" aria-labelledby="about-title">
          <SectionHeading
            eyebrow="01 / THE THINKING BEHIND THE BUILD"
            title="Background &"
            accent="Philosophy"
            index="01 — 05"
            id="about-title"
          />
          <div className="about-grid">
            <ScrollReveal className="about-statement">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <h3>
                Useful AI is not just about a powerful model. It is about the{' '}
                <em>system around it.</em>
              </h3>
              <p>
                With experience delivering enterprise AI, I focus on what makes it practical: clear
                workflows, relevant context, dependable integrations and thoughtful safeguards.
              </p>
            </ScrollReveal>
            <ScrollReveal className="about-details" delay={0.14}>
              <div className="philosophy-rail">
                <span>PROBLEM</span>
                <AnimatedArrow
                  viewBox="0 0 500 30"
                  path="M 4 15 C 110 15 120 4 208 15 S 334 26 496 15"
                  duration={6}
                />
                <span>USEFUL AI</span>
                <i className="coordinate-tag">35.676 / 139.650</i>
              </div>
              <div className="detail-row">
                <span>01 / APPROACH</span>
                <p>
                  Start with the problem. Design the workflow. Choose the simplest architecture
                  that solves it.
                </p>
              </div>
              <div className="detail-row">
                <span>02 / PRINCIPLE</span>
                <p>
                  Ground outputs in trusted knowledge, validate actions and keep people in control
                  where it matters.
                </p>
              </div>
              <div className="detail-row">
                <span>03 / FOCUS</span>
                <p>
                  Agentic AI, retrieval-augmented generation and production-ready software
                  engineering.
                </p>
              </div>
              <div className="about-stats">
                <div>
                  <strong>
                    04<span>+</span>
                  </strong>
                  <small>FEATURED BUILDS</small>
                </div>
                <div>
                  <strong>07</strong>
                  <small>SYSTEM LAYERS</small>
                </div>
                <div>
                  <strong>∞</strong>
                  <small>ITERATION MINDSET</small>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section
          className="deployments section-wrap"
          id="deployments"
          aria-labelledby="deployments-title"
        >
          <SectionHeading
            eyebrow="02 / SELECTED WORK & EXPERIMENTS"
            title="Flagship"
            accent="Deployments"
            index="04 PROJECTS"
            id="deployments-title"
          />
          <p className="section-lede">
            Four AI systems exploring how intelligent workflows can solve concrete problems — from
            enterprise service automation to more helpful personal finance.
          </p>
          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard key={project.number} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="system section-wrap" id="system" aria-labelledby="system-title">
          <SectionHeading
            eyebrow="03 / REFERENCE ARCHITECTURE"
            title="SAAI — 7 Layer"
            accent="Autonomous AI Ecosystem"
            index="CONCEPT MODEL"
            id="system-title"
          />
          <p className="section-lede">
            Seven connected layers carry an idea from human intent through grounded reasoning and
            approved action to continuous evaluation.
          </p>
          <ScrollReveal className="architecture-reveal">
            <ArchitectureDiagram />
          </ScrollReveal>
        </section>

        <section
          className="matrix-section section-wrap"
          id="matrix"
          aria-labelledby="matrix-title"
        >
          <SectionHeading
            eyebrow="04 / THE ENGINEERING TOOLKIT"
            title="The System"
            accent="Matrix"
            index="CAPABILITIES"
            id="matrix-title"
          />
          <div className="capability-field">
            <AnimatedArrow
              className="matrix-flow"
              viewBox="0 0 1000 90"
              path="M 6 65 C 140 65 146 20 270 20 S 420 75 512 54 S 670 22 768 52 S 908 72 994 28"
              duration={8}
            />
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, body }, index) => (
                <ScrollReveal className="capability-reveal" delay={index * 0.12} key={title}>
                  <article className="capability">
                    <span className="cap-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="cap-index">0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="matrix-strip">
            {matrix.map(({ title, items }, index) => (
              <ScrollReveal className="matrix-cell" delay={index * 0.08} key={title}>
                <div>
                  <span>{title}</span>
                  <p>{items}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="contact section-wrap" id="contact" aria-labelledby="contact-title">
          <div className="contact-kicker">
            <span className="status-dot" aria-hidden="true" /> END OF TRANSMISSION / BEGINNING OF
            SOMETHING NEW
          </div>
          <div className="contact-content">
            <div>
              <p className="eyebrow">05 / HAVE A CHALLENGE IN MIND?</p>
              <h2 id="contact-title">
                Let&apos;s architect
                <br />
                <em>something</em> extraordinary<span>.</span>
              </h2>
              <p className="contact-copy">
                Have an AI use case, an engineering challenge or an opportunity to collaborate?
                Let&apos;s turn the idea into a system that works.
              </p>
              <MagneticLink className="button button-red" href={`mailto:${email}`}>
                START A CONVERSATION <ArrowUpRight size={16} aria-hidden="true" />
              </MagneticLink>
            </div>
            <div className="contact-orbit" aria-hidden="true">
              <div className="contact-ring ring-one" />
              <div className="contact-ring ring-two" />
              <div className="contact-ring ring-three" />
              <div className="contact-center">
                <Terminal size={26} />
                <span>LET&apos;S BUILD</span>
              </div>
              <i />
              <b />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
