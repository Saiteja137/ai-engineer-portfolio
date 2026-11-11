import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import AnimatedArrow from './AnimatedArrow';

type ArchitectureLayer = {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  signal: string;
};

const architectureLayers: ArchitectureLayer[] = [
  {
    number: '01',
    title: 'USER INTERACTION LAYER',
    subtitle: 'Intent · conversational UX · accessible interfaces',
    detail:
      'A clear interaction layer gives people a direct, understandable way to set goals, provide context and review an AI-assisted outcome.',
    signal: 'INPUT',
  },
  {
    number: '02',
    title: 'ORCHESTRATION LAYER',
    subtitle: 'LangGraph · routing · stateful workflows',
    detail:
      'Explicit graph states route each request through the right workflow, manage context between steps and coordinate specialist agents.',
    signal: 'ROUTE',
  },
  {
    number: '03',
    title: 'AGENT INTELLIGENCE LAYER',
    subtitle: 'Planning · agent collaboration · tool selection',
    detail:
      'Task-focused agents reason over their responsibilities, choose appropriate tools and hand work between steps with traceable state.',
    signal: 'REASON',
  },
  {
    number: '04',
    title: 'RETRIEVAL & KNOWLEDGE LAYER',
    subtitle: 'Azure AI Search · RAG · grounded context',
    detail:
      'Retrieval brings the most relevant, permission-aware source material into the workflow so generated answers stay grounded in evidence.',
    signal: 'GROUND',
  },
  {
    number: '05',
    title: 'MODEL INTELLIGENCE LAYER',
    subtitle: 'Azure OpenAI · structured generation · evaluation',
    detail:
      'Models interpret retrieved context and produce structured outputs that can be validated before any downstream tool is invoked.',
    signal: 'INFER',
  },
  {
    number: '06',
    title: 'TOOL EXECUTION LAYER',
    subtitle: 'FastAPI · enterprise integrations · approved actions',
    detail:
      'Scoped tools connect the system to real services while validating inputs, recording outcomes and requesting approval when needed.',
    signal: 'EXECUTE',
  },
  {
    number: '07',
    title: 'GOVERNANCE & EVALUATION LAYER',
    subtitle: 'Human oversight · tracing · guardrails · feedback',
    detail:
      'Evaluation, observability and human oversight form a continuous feedback loop that makes the whole system safer to operate and improve.',
    signal: 'VERIFY',
  },
];

function ArchitectureDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(diagramRef, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveLayer((current) => (current + 1) % architectureLayers.length);
    }, 1700);

    return () => window.clearInterval(timer);
  }, [isInView, reduceMotion]);

  const selectLayer = (index: number) => {
    setSelectedLayer(index);
    setActiveLayer(index);
  };

  const selected = architectureLayers[selectedLayer];

  return (
    <div className="architecture-visual" ref={diagramRef}>
      <div className="architecture-axis" aria-hidden="true">
        <span>INTENT IN</span>
        <span className="axis-line" />
        <span>VALUE OUT</span>
      </div>
      <div className="architecture-nodes" aria-label="Interactive seven-layer AI architecture">
        <AnimatedArrow
          className="architecture-flow"
          viewBox="0 0 40 700"
          path="M 20 10 L 20 690"
          duration={8}
        />
        {architectureLayers.map((layer, index) => (
          <motion.button
            className={`architecture-node ${activeLayer === index ? 'is-active' : ''} ${
              selectedLayer === index ? 'is-selected' : ''
            }`}
            key={layer.number}
            type="button"
            aria-pressed={selectedLayer === index}
            aria-controls="architecture-detail"
            onClick={() => selectLayer(index)}
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.54,
              delay: reduceMotion ? 0 : index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="architecture-pin" aria-hidden="true">
              <span />
            </span>
            <span className="architecture-number">{layer.number}</span>
            <span className="architecture-copy">
              <strong>{layer.title}</strong>
              <small>{layer.subtitle}</small>
            </span>
            <span className="architecture-signal">{layer.signal}</span>
          </motion.button>
        ))}
      </div>
      <div className="architecture-detail" id="architecture-detail" aria-live="polite">
        <span className="detail-coordinate">LAYER {selected.number} / SYSTEM DETAIL</span>
        <h3>{selected.title}</h3>
        <p>{selected.detail}</p>
        <span className="detail-pulse">
          <i className="status-dot" aria-hidden="true" /> {selected.signal} · LIVE SYSTEM MODEL
        </span>
      </div>
      <div className="architecture-foot">
        <span>
          <i className="status-dot" aria-hidden="true" /> MODULAR BY DESIGN
        </span>
        <span>SECURE · GROUNDED · OBSERVABLE</span>
      </div>
    </div>
  );
}

export default ArchitectureDiagram;
