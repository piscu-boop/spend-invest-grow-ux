import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, ArrowRight, RotateCcw, CheckCircle, XCircle, BookOpen, ClipboardList } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// ── i18n ─────────────────────────────────────────────────────────────────────

const ui = {
  es: {
    navItem: "UX Campus",
    tabModule: "Módulo",
    tabTest: "Test",
    moduleTitle: "Módulo 02 – Planificación Financiera Personal",
    downloadPdf: "Descargar PDF",
    goToTest: "Ir al Test",
    testTitle: "Evaluación Módulo 02",
    next: "Siguiente",
    seeResult: "Ver Resultado",
    retry: "Reintentar",
    pdfLoading: "Cargando módulo...",
    question: "Pregunta",
    of: "de",
    score: "Puntaje",
    breakdown: "Resultado por tema",
    levelExcellent: "Excelente",
    levelGood: "Buen resultado",
    levelInProgress: "En proceso",
    levelDescExcellent: "Comprensión sólida de los conceptos del módulo.",
    levelDescGood: "Revisá los temas con errores antes de avanzar.",
    levelDescInProgress: "Se recomienda releer el módulo antes de reintentar.",
    correct: "Correcta",
    incorrect: "Incorrecta",
    explanation: "Explicación",
    correct_answers: "respuestas correctas",
    backLabel: "UX Campus",
    breadcrumbModule: "Módulo 02",
  },
  en: {
    navItem: "UX Campus",
    tabModule: "Module",
    tabTest: "Test",
    moduleTitle: "Module 02 – Personal Financial Planning",
    downloadPdf: "Download PDF",
    goToTest: "Go to Test",
    testTitle: "Module 02 Assessment",
    next: "Next",
    seeResult: "See Result",
    retry: "Retry",
    pdfLoading: "Loading module...",
    question: "Question",
    of: "of",
    score: "Score",
    breakdown: "Results by topic",
    levelExcellent: "Excellent",
    levelGood: "Good result",
    levelInProgress: "In progress",
    levelDescExcellent: "Solid understanding of module concepts.",
    levelDescGood: "Review the topics where you made errors before moving on.",
    levelDescInProgress: "We recommend rereading the module before retrying.",
    correct: "Correct",
    incorrect: "Incorrect",
    explanation: "Explanation",
    correct_answers: "correct answers",
    backLabel: "UX Campus",
    breadcrumbModule: "Module 02",
  },
};

// ── Questions data ────────────────────────────────────────────────────────────

interface Question {
  theme: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: { es: Question[]; en: Question[] } = {
  es: [
    {
      theme: "Planificación financiera",
      question: "¿Cuál es el principal objetivo de la planificación financiera personal?",
      options: [
        "Organizar recursos para alcanzar objetivos financieros.",
        "Incrementar ingresos mediante inversiones frecuentes.",
        "Reducir gastos para acumular efectivo disponible.",
        "Evitar completamente situaciones de incertidumbre.",
      ],
      answer: 0,
      explanation:
        "La planificación financiera busca asignar los recursos disponibles de manera consistente con objetivos concretos.",
    },
    {
      theme: "Planificación financiera",
      question: "Una persona que planifica sus finanzas tiende a:",
      options: [
        "Modificar sus gastos cuando surge un problema.",
        "Anticiparse a situaciones futuras relevantes.",
        "Concentrar sus recursos en un único objetivo.",
        "Priorizar exclusivamente el ahorro mensual.",
      ],
      answer: 1,
      explanation:
        "La planificación permite actuar de manera anticipada en lugar de reaccionar ante los problemas cuando ya ocurrieron.",
    },
    {
      theme: "Gastos y microgastos",
      question: "¿Qué característica distingue a los microgastos?",
      options: [
        "Se relacionan únicamente con gastos extraordinarios.",
        "Son pequeños individualmente pero relevantes en el agregado.",
        "Corresponden exclusivamente a gastos de ocio.",
        "Representan una proporción fija del ingreso.",
      ],
      answer: 1,
      explanation:
        "Muchas veces los mayores desvíos financieros no provienen de grandes compras, sino de pequeñas erogaciones recurrentes que, al acumularse, terminan representando montos significativos.",
    },
    {
      theme: "Ahorro planificado",
      question: "Según las prácticas sugeridas, ¿cuál es la principal ventaja de definir el ahorro antes de gastar?",
      options: [
        "Permite eliminar completamente gastos innecesarios.",
        "Incrementa automáticamente los ingresos disponibles.",
        "Convierte el ahorro en parte de la planificación.",
        "Garantiza alcanzar cualquier objetivo financiero.",
      ],
      answer: 2,
      explanation:
        "Cuando el ahorro se define previamente, deja de ser una variable residual y pasa a formar parte de la planificación financiera.",
    },
    {
      theme: "Fondo de emergencia",
      question: "¿Cuál es la función principal del fondo de emergencia?",
      options: [
        "Financiar objetivos de consumo de corto plazo.",
        "Generar rendimientos superiores al mercado.",
        "Maximizar el crecimiento del patrimonio.",
        "Proteger frente a eventos inesperados relevantes.",
      ],
      answer: 3,
      explanation:
        "El fondo de emergencia prioriza la seguridad financiera y evita que un problema temporal se transforme en un problema financiero de largo plazo.",
    },
    {
      theme: "Fondo de emergencia",
      question: "¿Por qué el fondo de emergencia debe priorizar la liquidez?",
      options: [
        "Porque elimina completamente el riesgo financiero.",
        "Porque facilita disponer del dinero rápidamente.",
        "Porque protege automáticamente frente a la inflación.",
        "Porque permite obtener mejores rendimientos reales.",
      ],
      answer: 1,
      explanation:
        "Su función es estar disponible frente a emergencias. Por eso debe poder utilizarse de manera inmediata cuando sea necesario.",
    },
    {
      theme: "Vasos comunicantes",
      question: "En la lógica de los vasos comunicantes, ¿qué ocurre una vez completado el fondo de emergencia?",
      options: [
        "Los recursos comienzan a dirigirse a otros objetivos.",
        "El ahorro deja de ser una prioridad financiera.",
        "Se reemplazan los activos líquidos por consumo.",
        "Se suspenden temporalmente nuevas inversiones.",
      ],
      answer: 0,
      explanation:
        "Una vez completo el fondo de emergencia, el ahorro puede orientarse hacia objetivos con horizontes temporales más largos.",
    },
    {
      theme: "Costo de oportunidad",
      question: "¿Qué describe mejor el concepto de costo de oportunidad?",
      options: [
        "El valor monetario total de una decisión.",
        "El rendimiento esperado de cualquier inversión.",
        "La mejor alternativa a la que se renuncia al elegir.",
        "El riesgo asociado a una operación financiera.",
      ],
      answer: 2,
      explanation:
        "Toda decisión implica renunciar a otras alternativas posibles. El costo de oportunidad representa el valor de la mejor alternativa descartada.",
    },
    {
      theme: "Restricción intertemporal",
      question: "Según el análisis intertemporal, ahorrar más hoy permite:",
      options: [
        "Incrementar la capacidad de consumo futuro.",
        "Mantener constante el consumo en el tiempo.",
        "Eliminar la necesidad de realizar inversiones.",
        "Reducir la importancia de los ingresos futuros.",
      ],
      answer: 0,
      explanation:
        "Destinar una mayor proporción del ingreso al ahorro reduce el consumo presente, pero puede ampliar la capacidad de consumo futuro.",
    },
    {
      theme: "Educación financiera",
      question: "¿Por qué la educación financiera puede modificar nuestras decisiones de consumo en el tiempo?",
      options: [
        "Porque incrementa directamente los ingresos personales.",
        "Porque permite acceder a activos más rentables.",
        "Porque ayuda a valorar mejor las consecuencias futuras.",
        "Porque reduce automáticamente los gastos corrientes.",
      ],
      answer: 2,
      explanation:
        "A medida que una persona comprende mejor la relación entre ahorro, inversión y patrimonio, suele considerar con mayor peso las consecuencias futuras de sus decisiones presentes.",
    },
    {
      theme: "Objetivos financieros",
      question: "¿Cuál de los siguientes objetivos representa mejor un horizonte de largo plazo?",
      options: [
        "Financiar un viaje dentro de los próximos meses.",
        "Renovar equipamiento para uso cotidiano.",
        "Cambiar el automóvil en algunos años.",
        "Construir patrimonio para complementar la jubilación.",
      ],
      answer: 3,
      explanation:
        "Los objetivos de largo plazo suelen vincularse con acumulación de patrimonio y generación de ingresos futuros.",
    },
    {
      theme: "Sistema financiero personal",
      question: "¿Qué busca lograr un sistema financiero personal?",
      options: [
        "Concentrar todos los recursos en una inversión.",
        "Mantener la mayor cantidad posible de liquidez.",
        "Incrementar el consumo sin afectar el ahorro.",
        "Organizar previamente el destino de cada ingreso.",
      ],
      answer: 3,
      explanation:
        "Un sistema financiero personal asigna previamente el destino de cada peso para que las decisiones importantes no dependan únicamente de la voluntad del momento.",
    },
    {
      theme: "Restricción intertemporal",
      question:
        "Martina recibe un aumento salarial y decide destinarlo íntegramente a gastos de consumo. ¿Cuál es la principal consecuencia desde la perspectiva de la restricción presupuestaria intertemporal?",
      options: [
        "Aumenta su capacidad para enfrentar imprevistos futuros.",
        "Incrementa automáticamente el valor de su patrimonio.",
        "Reduce recursos que podrían fortalecer objetivos futuros.",
        "Mejora la liquidez de su fondo de emergencia.",
      ],
      answer: 2,
      explanation:
        "Destinar todos los recursos al consumo implica resignar alternativas de ahorro e inversión, reduciendo la capacidad de ampliar el consumo y el patrimonio futuro.",
    },
    {
      theme: "Objetivos financieros",
      question:
        "Tomás tiene completo su fondo de emergencia. Su próximo objetivo es reunir dinero para el anticipo de una vivienda dentro de cuatro años. Según el esquema de los vasos comunicantes, ¿qué alternativa resulta más consistente?",
      options: [
        "Destinar todos los recursos a activos de máxima volatilidad.",
        "Mantener todo el capital inmovilizado en efectivo.",
        "Canalizar el ahorro hacia objetivos de mediano plazo.",
        "Concentrar los fondos exclusivamente en consumo actual.",
      ],
      answer: 2,
      explanation:
        "Un horizonte de cuatro años corresponde al mediano plazo. Como Tomás deberá realizar un desembolso importante en una fecha relativamente determinada, necesita contar con una alta probabilidad de disponer de esos recursos cuando los necesite, por eso resulta más consistente utilizar instrumentos de renta fija o de baja volatilidad.",
    },
    {
      theme: "Sistema financiero personal",
      question:
        "Dos personas tienen exactamente el mismo ingreso. Una registra sus gastos, define objetivos y planifica su ahorro. La otra decide mes a mes según las circunstancias. Según los conceptos desarrollados, es esperable que:",
      options: [
        "La primera tenga más herramientas para cumplir objetivos.",
        "Ambas alcancen resultados similares en el largo plazo.",
        "Ninguna diferencia aparezca mientras mantengan ingresos similares.",
        "La segunda acumule más ahorro por ser más flexible.",
      ],
      answer: 0,
      explanation:
        "La planificación no garantiza resultados, pero aumenta significativamente la probabilidad de alcanzar objetivos financieros.",
    },
  ],
  en: [
    {
      theme: "Financial planning",
      question: "What is the main goal of personal financial planning?",
      options: [
        "Organizing resources to achieve financial goals.",
        "Increasing income through frequent investments.",
        "Reducing expenses to accumulate available cash.",
        "Completely avoiding uncertainty.",
      ],
      answer: 0,
      explanation:
        "Financial planning seeks to allocate available resources in a manner consistent with concrete goals.",
    },
    {
      theme: "Financial planning",
      question: "A person who plans their finances tends to:",
      options: [
        "Adjust their expenses when a problem arises.",
        "Anticipate relevant future situations.",
        "Concentrate their resources on a single goal.",
        "Prioritize exclusively monthly savings.",
      ],
      answer: 1,
      explanation:
        "Planning allows for proactive action rather than reacting to problems after they occur.",
    },
    {
      theme: "Expenses & micro-expenses",
      question: "What characteristic distinguishes micro-expenses?",
      options: [
        "They relate exclusively to extraordinary expenses.",
        "They are small individually but significant in aggregate.",
        "They correspond exclusively to leisure spending.",
        "They represent a fixed proportion of income.",
      ],
      answer: 1,
      explanation:
        "Often the largest financial deviations come not from big purchases, but from small recurring expenses that, when accumulated, end up representing significant amounts.",
    },
    {
      theme: "Planned savings",
      question: "According to suggested practices, what is the main advantage of defining savings before spending?",
      options: [
        "It makes it possible to completely eliminate unnecessary expenses.",
        "It automatically increases available income.",
        "It turns saving into part of planning.",
        "It guarantees reaching any financial goal.",
      ],
      answer: 2,
      explanation:
        "When savings are defined in advance, they stop being a residual variable and become part of financial planning.",
    },
    {
      theme: "Emergency fund",
      question: "What is the main function of an emergency fund?",
      options: [
        "To finance short-term consumption goals.",
        "To generate above-market returns.",
        "To maximize asset growth.",
        "To protect against relevant unexpected events.",
      ],
      answer: 3,
      explanation:
        "The emergency fund prioritizes financial security and prevents a temporary problem from turning into a long-term financial problem.",
    },
    {
      theme: "Emergency fund",
      question: "Why should an emergency fund prioritize liquidity?",
      options: [
        "Because it completely eliminates financial risk.",
        "Because it makes funds quickly available.",
        "Because it automatically protects against inflation.",
        "Because it allows obtaining better real returns.",
      ],
      answer: 1,
      explanation:
        "Its function is to be available in emergencies. Therefore it must be immediately accessible when needed.",
    },
    {
      theme: "Communicating vessels",
      question: "In the communicating vessels logic, what happens once the emergency fund is complete?",
      options: [
        "Resources begin to flow toward other goals.",
        "Saving is no longer a financial priority.",
        "Liquid assets are replaced by consumption.",
        "New investments are temporarily suspended.",
      ],
      answer: 0,
      explanation:
        "Once the emergency fund is complete, savings can be directed toward goals with longer time horizons.",
    },
    {
      theme: "Opportunity cost",
      question: "What best describes the concept of opportunity cost?",
      options: [
        "The total monetary value of a decision.",
        "The expected return of any investment.",
        "The best alternative forgone when choosing.",
        "The risk associated with a financial transaction.",
      ],
      answer: 2,
      explanation:
        "Every decision involves giving up other possible alternatives. Opportunity cost represents the value of the best discarded alternative.",
    },
    {
      theme: "Intertemporal constraint",
      question: "According to intertemporal analysis, saving more today allows:",
      options: [
        "Increasing future consumption capacity.",
        "Keeping consumption constant over time.",
        "Eliminating the need for investments.",
        "Reducing the importance of future income.",
      ],
      answer: 0,
      explanation:
        "Allocating a larger share of income to savings reduces present consumption, but can expand future consumption capacity.",
    },
    {
      theme: "Financial education",
      question: "Why can financial education modify our consumption decisions over time?",
      options: [
        "Because it directly increases personal income.",
        "Because it provides access to more profitable assets.",
        "Because it helps better assess future consequences.",
        "Because it automatically reduces current expenses.",
      ],
      answer: 2,
      explanation:
        "As a person better understands the relationship between savings, investment and wealth, they tend to give greater weight to the future consequences of their present decisions.",
    },
    {
      theme: "Financial goals",
      question: "Which of the following objectives best represents a long-term horizon?",
      options: [
        "Financing a trip in the coming months.",
        "Replacing everyday equipment.",
        "Changing the car in a few years.",
        "Building wealth to supplement retirement.",
      ],
      answer: 3,
      explanation:
        "Long-term goals are usually linked to wealth accumulation and the generation of future income.",
    },
    {
      theme: "Personal financial system",
      question: "What does a personal financial system seek to achieve?",
      options: [
        "Concentrating all resources in a single investment.",
        "Maintaining as much liquidity as possible.",
        "Increasing consumption without affecting savings.",
        "Organizing in advance where each income goes.",
      ],
      answer: 3,
      explanation:
        "A personal financial system pre-assigns the destination of every peso so that important decisions don't rely solely on willpower in the moment.",
    },
    {
      theme: "Intertemporal constraint",
      question:
        "Martina receives a salary raise and decides to allocate it entirely to consumer spending. What is the main consequence from the perspective of the intertemporal budget constraint?",
      options: [
        "It increases her capacity to handle future contingencies.",
        "It automatically increases the value of her assets.",
        "It reduces resources that could strengthen future goals.",
        "It improves the liquidity of her emergency fund.",
      ],
      answer: 2,
      explanation:
        "Allocating all resources to consumption means forgoing savings and investment alternatives, reducing the capacity to expand future consumption and wealth.",
    },
    {
      theme: "Financial goals",
      question:
        "Tomás has completed his emergency fund. His next goal is to save for a housing down payment within four years. According to the communicating vessels framework, which alternative is most consistent?",
      options: [
        "Allocating all resources to maximum-volatility assets.",
        "Keeping all capital immobilized in cash.",
        "Channeling savings toward medium-term goals.",
        "Concentrating funds exclusively on current consumption.",
      ],
      answer: 2,
      explanation:
        "A four-year horizon corresponds to the medium term. Since Tomás will need to make a significant disbursement at a relatively defined date, fixed-income or low-volatility instruments are the most consistent choice.",
    },
    {
      theme: "Personal financial system",
      question:
        "Two people have exactly the same income. One records their expenses, defines goals and plans savings. The other decides month by month based on circumstances. Based on the concepts developed, it is expected that:",
      options: [
        "The first has more tools to achieve goals.",
        "Both achieve similar results in the long run.",
        "No difference appears as long as they maintain similar income.",
        "The second accumulates more savings by being more flexible.",
      ],
      answer: 0,
      explanation:
        "Planning doesn't guarantee results, but it significantly increases the probability of achieving financial goals.",
    },
  ],
};

// ── PDF Section ───────────────────────────────────────────────────────────────

interface PDFSectionProps {
  onGoToTest: () => void;
  lang: "es" | "en";
}

const PDFSection: React.FC<PDFSectionProps> = ({ onGoToTest, lang }) => {
  const c = ui[lang];
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateWidth]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-white font-display">
          {c.moduleTitle}
        </h2>
        <a
          href="/Nivel_1_-_Modulo_02.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-teal/40 px-4 py-2 text-sm font-medium text-teal hover:bg-teal/10 transition-colors"
        >
          <Download className="h-4 w-4" />
          {c.downloadPdf}
        </a>
      </div>

      {/* PDF viewer */}
      <div
        ref={containerRef}
        className="rounded-xl overflow-hidden border border-white/10 bg-uxc-card"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="h-10 w-10 rounded-full border-4 border-teal/30 border-t-teal animate-spin" />
            <p className="text-sm text-uxc-muted-foreground">{c.pdfLoading}</p>
          </div>
        )}

        <Document
          file="/Nivel_1_-_Modulo_02.pdf"
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setLoading(false);
          }}
          onLoadError={() => setLoading(false)}
          className={loading ? "hidden" : ""}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="border-b border-white/5 last:border-b-0">
              <Page
                pageNumber={i + 1}
                width={containerWidth || undefined}
                renderTextLayer
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>

      {/* Go to test CTA */}
      {!loading && numPages > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onGoToTest}
            className="rounded-full bg-teal text-navy-deep font-semibold px-8 py-3 hover:opacity-90 flex items-center gap-2"
          >
            {c.goToTest}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

// ── Test Section ──────────────────────────────────────────────────────────────

type TestPhase = "question" | "result";

interface TestState {
  index: number;
  phase: TestPhase;
  selected: number | null;
  responses: { questionIndex: number; selected: number; correct: boolean }[];
}

const INITIAL_STATE: TestState = {
  index: 0,
  phase: "question",
  selected: null,
  responses: [],
};

interface TestSectionProps {
  lang: "es" | "en";
}

const TestSection: React.FC<TestSectionProps> = ({ lang }) => {
  const [state, setState] = useState<TestState>(INITIAL_STATE);
  const c = ui[lang];
  const questions = QUESTIONS[lang];

  const reset = () => setState(INITIAL_STATE);

  const select = (idx: number) => {
    if (state.selected !== null) return;
    setState((s) => ({ ...s, selected: idx }));
  };

  const next = () => {
    if (state.selected === null) return;
    const q = questions[state.index];
    const correct = state.selected === q.answer;
    const newResponses = [
      ...state.responses,
      { questionIndex: state.index, selected: state.selected, correct },
    ];
    const isLast = state.index === questions.length - 1;
    setState({
      index: isLast ? state.index : state.index + 1,
      phase: isLast ? "result" : "question",
      selected: null,
      responses: newResponses,
    });
  };

  if (state.phase === "result") {
    return (
      <ResultScreen
        lang={lang}
        responses={state.responses}
        onRetry={reset}
      />
    );
  }

  const q = questions[state.index];
  const answered = state.selected !== null;
  const progress = ((state.index) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-uxc-muted-foreground mb-2">
          <span>{c.question} {state.index + 1} {c.of} {questions.length}</span>
          <span className="rounded-full bg-teal/10 border border-teal/20 px-2 py-0.5 text-teal text-xs font-semibold">
            {q.theme}
          </span>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10 [&>div]:bg-teal" />
      </div>

      {/* Question */}
      <p className="text-xl md:text-2xl font-semibold text-white leading-snug mb-8">
        {q.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {q.options.map((opt, i) => {
          const letter = ["A", "B", "C", "D"][i];
          let variant = "default";
          if (answered) {
            if (i === q.answer) variant = "correct";
            else if (i === state.selected) variant = "incorrect";
          }
          const baseClass =
            "w-full text-left rounded-xl border px-5 py-4 text-sm font-medium transition-all flex items-start gap-3 ";
          const variantClass =
            variant === "correct"
              ? "border-teal/60 bg-teal/10 text-white"
              : variant === "incorrect"
              ? "border-red-500/60 bg-red-500/10 text-white"
              : answered
              ? "border-white/10 bg-white/3 text-uxc-muted-foreground cursor-default"
              : "border-white/15 bg-white/5 text-white hover:border-teal/40 hover:bg-teal/5 cursor-pointer";

          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={answered}
              className={baseClass + variantClass}
            >
              <span
                className={`flex-shrink-0 h-6 w-6 rounded-full border text-xs font-bold flex items-center justify-center ${
                  variant === "correct"
                    ? "border-teal text-teal"
                    : variant === "incorrect"
                    ? "border-red-500 text-red-500"
                    : "border-white/30 text-uxc-muted-foreground"
                }`}
              >
                {letter}
              </span>
              <span className="flex-1 leading-relaxed">{opt}</span>
              {variant === "correct" && (
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-teal mt-0.5" />
              )}
              {variant === "incorrect" && (
                <XCircle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-1">
            {c.explanation}
          </p>
          <p className="text-sm text-uxc-muted-foreground leading-relaxed">
            {q.explanation}
          </p>
        </div>
      )}

      {/* Nav */}
      <div className="flex justify-end">
        <Button
          onClick={next}
          disabled={!answered}
          className="rounded-full bg-teal text-navy-deep font-semibold px-8 py-3 hover:opacity-90 disabled:opacity-30 flex items-center gap-2"
        >
          {state.index === questions.length - 1 ? c.seeResult : c.next}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// ── Result Screen ─────────────────────────────────────────────────────────────

interface ResultScreenProps {
  lang: "es" | "en";
  responses: { questionIndex: number; selected: number; correct: boolean }[];
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ lang, responses, onRetry }) => {
  const c = ui[lang];
  const questions = QUESTIONS[lang];
  const score = responses.filter((r) => r.correct).length;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const level =
    score >= 13
      ? { label: c.levelExcellent, desc: c.levelDescExcellent, color: "text-teal" }
      : score >= 9
      ? { label: c.levelGood, desc: c.levelDescGood, color: "text-yellow-400" }
      : { label: c.levelInProgress, desc: c.levelDescInProgress, color: "text-red-400" };

  // Group by theme
  const themeMap: Record<string, { correct: number; total: number }> = {};
  responses.forEach((r) => {
    const theme = questions[r.questionIndex].theme;
    if (!themeMap[theme]) themeMap[theme] = { correct: 0, total: 0 };
    themeMap[theme].total++;
    if (r.correct) themeMap[theme].correct++;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Score ring */}
      <div className="text-center mb-10">
        <div className="inline-flex flex-col items-center justify-center h-36 w-36 rounded-full border-4 border-teal/30 bg-uxc-card mb-6 relative">
          <span className={`text-4xl font-bold font-display ${level.color}`}>
            {pct}%
          </span>
          <span className="text-xs text-uxc-muted-foreground mt-1">
            {score}/{total} {c.correct_answers}
          </span>
        </div>
        <p className={`text-2xl font-bold font-display mb-2 ${level.color}`}>
          {level.label}
        </p>
        <p className="text-sm text-uxc-muted-foreground max-w-sm mx-auto">
          {level.desc}
        </p>
      </div>

      {/* Theme breakdown */}
      <div className="rounded-2xl border border-white/10 bg-uxc-card p-6 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-uxc-muted-foreground mb-4">
          {c.breakdown}
        </p>
        <div className="flex flex-col gap-3">
          {Object.entries(themeMap).map(([theme, { correct, total: t }]) => (
            <div key={theme} className="flex items-center gap-3">
              <span className="text-sm text-uxc-muted-foreground flex-1">{theme}</span>
              <span
                className={`text-sm font-semibold ${
                  correct === t ? "text-teal" : correct === 0 ? "text-red-400" : "text-yellow-400"
                }`}
              >
                {correct}/{t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button
          onClick={onRetry}
          variant="outline"
          className="rounded-full border-white/20 text-white hover:bg-white/10 flex items-center gap-2 px-6"
        >
          <RotateCcw className="h-4 w-4" />
          {c.retry}
        </Button>
        <Link
          to="/campus"
          className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2 text-sm font-semibold text-navy-deep hover:opacity-90 transition-opacity"
        >
          {c.backLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

// ── Campus2 Page ──────────────────────────────────────────────────────────────

interface Campus2Props {
  onOpenBeta?: () => void;
}

const Campus2Page: React.FC<Campus2Props> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const c = ui[language];
  const [activeTab, setActiveTab] = useState("module");

  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation onOpenBeta={onOpenBeta} />
      <div className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 pt-6 pb-2 text-sm text-uxc-muted-foreground">
            <Link
              to="/campus"
              className="flex items-center gap-1 hover:text-teal transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {c.backLabel}
            </Link>
            <span>/</span>
            <span className="text-white">{c.breadcrumbModule}</span>
          </div>

          {/* Page header */}
          <div className="py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-3">
              UX Campus
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white">
              {language === "es" ? "Nivel 1 — Educación Financiera" : "Level 1 — Financial Education"}
            </h1>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-6">
              <TabsList className="bg-uxc-card border border-white/10 rounded-full p-1 gap-1">
                <TabsTrigger
                  value="module"
                  className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-teal data-[state=active]:text-navy-deep data-[state=inactive]:text-uxc-muted-foreground flex items-center gap-2"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {c.tabModule}
                </TabsTrigger>
                <TabsTrigger
                  value="test"
                  className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-teal data-[state=active]:text-navy-deep data-[state=inactive]:text-uxc-muted-foreground flex items-center gap-2"
                >
                  <ClipboardList className="h-3.5 w-3.5" />
                  {c.tabTest}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="module">
              <PDFSection
                lang={language}
                onGoToTest={() => setActiveTab("test")}
              />
            </TabsContent>

            <TabsContent value="test">
              <TestSection lang={language} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Campus2Page;
