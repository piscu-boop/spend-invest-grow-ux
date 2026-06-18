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
    moduleTitle: "Módulo 01 – Fundamentos de las Finanzas Personales",
    downloadPdf: "Descargar PDF",
    goToTest: "Ir al Test",
    testTitle: "Evaluación Módulo 01",
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
    breadcrumbModule: "Módulo 01",
  },
  en: {
    navItem: "UX Campus",
    tabModule: "Module",
    tabTest: "Test",
    moduleTitle: "Module 01 – Fundamentals of Personal Finance",
    downloadPdf: "Download PDF",
    goToTest: "Go to Test",
    testTitle: "Module 01 Assessment",
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
    breadcrumbModule: "Module 01",
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
      theme: "Sistema financiero",
      question: "¿Cuál es la función principal del sistema financiero?",
      options: [
        "Facilitar el intercambio de bienes y servicios",
        "Conectar ahorradores con quienes necesitan financiamiento",
        "Determinar el nivel general de precios",
        "Controlar la cantidad de dinero en circulación",
      ],
      answer: 1,
      explanation:
        "El sistema financiero actúa como intermediario entre quienes tienen excedentes de dinero y quienes necesitan financiamiento para desarrollar proyectos o inversiones.",
    },
    {
      theme: "Sistema financiero",
      question:
        "¿En cuál de los siguientes mercados se negocian monedas de distintos países?",
      options: [
        "Mercado de dinero",
        "Mercado de capitales",
        "Mercado de divisas",
        "Mercado de derivados",
      ],
      answer: 2,
      explanation:
        "El mercado de divisas es donde se intercambian monedas de distintos países y se determina el tipo de cambio.",
    },
    {
      theme: "Instrumentos financieros",
      question:
        "Cuando una persona compra un bono, ¿qué relación adquiere con el emisor?",
      options: [
        "Pasa a ser acreedor del emisor",
        "Obtiene participación accionaria permanente",
        "Se convierte en socio de la organización",
        "Asume la administración de la entidad",
      ],
      answer: 0,
      explanation:
        "Al comprar un bono se está prestando dinero al emisor. El inversor se convierte en acreedor y espera recibir intereses y la devolución del capital.",
    },
    {
      theme: "Instrumentos financieros",
      question:
        "¿Cuál de las siguientes características corresponde a una acción?",
      options: [
        "Garantiza una renta fija previamente pactada",
        "Devuelve el capital en una fecha determinada",
        "Representa exclusivamente deuda pública",
        "Otorga participación en las ganancias de la empresa",
      ],
      answer: 3,
      explanation:
        "Las acciones son títulos de propiedad. Quien las adquiere se convierte en socio de la empresa y participa de sus resultados.",
    },
    {
      theme: "Finanzas personales",
      question: "¿Cuál es el principal objetivo de las finanzas personales?",
      options: [
        "Maximizar el consumo presente",
        "Invertir únicamente en el mercado de capitales",
        "Mejorar la toma de decisiones sobre el uso del dinero",
        "Evitar completamente cualquier riesgo financiero",
      ],
      answer: 2,
      explanation:
        "Las finanzas personales buscan que las personas administren mejor sus recursos para alcanzar objetivos y mejorar su calidad de vida.",
    },
    {
      theme: "Ahorro e inversión",
      question:
        "Una persona recibe su sueldo y decide reservar una parte para utilizarla dentro de algunos años. Ese dinero representa:",
      options: [
        "Ahorro",
        "Inversión financiera",
        "Rentabilidad",
        "Consumo",
      ],
      answer: 0,
      explanation:
        "El ahorro es la parte de los ingresos que no se consume en el presente y se reserva para el futuro.",
    },
    {
      theme: "Ahorro e inversión",
      question:
        "¿Cuál de las siguientes situaciones constituye una inversión financiera?",
      options: [
        "Guardar efectivo en un cajón",
        "Comprar un activo esperando obtener una rentabilidad futura",
        "Destinar dinero al consumo cotidiano",
        "Pagar una factura de servicios",
      ],
      answer: 1,
      explanation:
        "Invertir implica asignar recursos a un activo con la expectativa de obtener un beneficio económico futuro.",
    },
    {
      theme: "Valor del dinero en el tiempo",
      question: "¿Por qué se dice que el dinero tiene valor en el tiempo?",
      options: [
        "Porque el dinero siempre aumenta de valor",
        "Porque todas las inversiones generan ganancias",
        "Porque la inflación elimina el valor del dinero",
        "Porque el dinero siempre tiene un costo de oportunidad",
      ],
      answer: 3,
      explanation:
        "Las personas valoran más el consumo presente que el futuro. Por eso una misma cantidad de dinero tiene mayor valor hoy que mañana.",
    },
    {
      theme: "Inflación y tasa de interés",
      question:
        "En un contexto en el que el poder adquisitivo del dinero cae, ¿qué ocurre con los precios de la economía?",
      options: [
        "Aumentan",
        "Disminuyen",
        "Permanecen constantes",
        "Dependen únicamente del salario",
      ],
      answer: 0,
      explanation:
        "La inflación es la pérdida del poder adquisitivo del dinero, lo que implica que se necesita más dinero para comprar el mismo bien.",
    },
    {
      theme: "Riesgo y diversificación",
      question:
        "Un inversor evalúa dos alternativas similares. Una presenta mayor riesgo. Según el principio de riesgo y rendimiento, es esperable que ese activo:",
      options: [
        "Ofrezca un rendimiento esperado menor",
        "Ofrezca un rendimiento esperado mayor",
        "Tenga exactamente el mismo rendimiento esperado",
        "Garantice una rentabilidad positiva",
      ],
      answer: 1,
      explanation:
        "Los inversores exigen compensación adicional por asumir más riesgo. Esa compensación se refleja en un mayor rendimiento esperado.",
    },
    {
      theme: "Inflación y tasa de interés",
      question:
        "¿Cuál es la diferencia entre tasa de interés nominal y tasa de interés real?",
      options: [
        "La tasa nominal sólo se aplica a bonos y la real a acciones",
        "La tasa real siempre es mayor que la nominal",
        "La tasa real refleja el rendimiento luego de considerar la inflación",
        "La tasa nominal elimina el efecto de la inflación",
      ],
      answer: 2,
      explanation:
        "La tasa nominal incluye el efecto de la inflación. La tasa real muestra cuánto aumenta efectivamente el poder adquisitivo.",
    },
    {
      theme: "Riesgo y diversificación",
      question:
        "Un inversor distribuye su dinero entre acciones de distintos sectores económicos. ¿Qué principio financiero está aplicando?",
      options: [
        "Valor tiempo del dinero",
        "Riesgo y rendimiento",
        "Costo de oportunidad",
        "Diversificación",
      ],
      answer: 3,
      explanation:
        "La diversificación busca reducir el riesgo distribuyendo la inversión entre distintos activos.",
    },
    {
      theme: "Valor del dinero en el tiempo",
      question:
        "Una persona dispone hoy de $200.000. Los invierte a una tasa del 15% anual. ¿Cuánto tendrá dentro de un año?",
      options: ["$215.000", "$220.000", "$230.000", "$245.000"],
      answer: 2,
      explanation:
        "$200.000 × 1,15 = $230.000. La diferencia representa la compensación por postergar el consumo presente.",
    },
    {
      theme: "Inflación y tasa de interés",
      question:
        "Una inversión generó un rendimiento nominal del 25% en un año con inflación del 20%. ¿Cuál afirmación es correcta?",
      options: [
        "El rendimiento real fue del 25%",
        "El poder adquisitivo disminuyó un 20%",
        "La inflación no afecta la evaluación de la inversión",
        "El poder adquisitivo aumentó aproximadamente un 5%",
      ],
      answer: 3,
      explanation:
        "Tasa real = (1,25 / 1,20) - 1 = 4,17%. Lo importante no es cuánto creció el capital nominalmente sino cuánto creció el poder adquisitivo.",
    },
    {
      theme: "Riesgo y diversificación",
      question:
        "María tiene $1.000.000 para invertir. Puede poner todo en una acción o distribuirlo en 10 activos. ¿Cuál es la principal ventaja de distribuir la inversión?",
      options: [
        "Garantiza obtener una mayor rentabilidad",
        "Reduce el riesgo total de la cartera",
        "Elimina completamente la posibilidad de pérdidas",
        "Asegura rendimientos positivos todos los años",
      ],
      answer: 1,
      explanation:
        "Diversificar no garantiza ganancias, pero reduce la exposición al mal desempeño de un único activo.",
    },
  ],
  en: [
    {
      theme: "Financial system",
      question: "What is the main function of the financial system?",
      options: [
        "Facilitate the exchange of goods and services",
        "Connect savers with those who need financing",
        "Determine the general price level",
        "Control the amount of money in circulation",
      ],
      answer: 1,
      explanation:
        "The financial system acts as an intermediary between those with money surpluses and those who need financing to develop projects or investments.",
    },
    {
      theme: "Financial system",
      question:
        "In which of the following markets are currencies from different countries traded?",
      options: [
        "Money market",
        "Capital market",
        "Foreign exchange market",
        "Derivatives market",
      ],
      answer: 2,
      explanation:
        "The foreign exchange market is where currencies from different countries are exchanged and the exchange rate is determined.",
    },
    {
      theme: "Financial instruments",
      question:
        "When a person buys a bond, what relationship do they acquire with the issuer?",
      options: [
        "They become a creditor of the issuer",
        "They obtain permanent equity participation",
        "They become a partner of the organization",
        "They take over the management of the entity",
      ],
      answer: 0,
      explanation:
        "Buying a bond means lending money to the issuer. The investor becomes a creditor and expects to receive interest and capital repayment.",
    },
    {
      theme: "Financial instruments",
      question:
        "Which of the following characteristics corresponds to a stock?",
      options: [
        "Guarantees a previously agreed fixed income",
        "Returns capital on a specific date",
        "Exclusively represents public debt",
        "Grants participation in the company's profits",
      ],
      answer: 3,
      explanation:
        "Stocks are ownership titles. Whoever acquires them becomes a partner of the company and participates in its results.",
    },
    {
      theme: "Personal finance",
      question: "What is the main objective of personal finance?",
      options: [
        "Maximize present consumption",
        "Invest exclusively in the capital market",
        "Improve decision-making about money use",
        "Completely avoid any financial risk",
      ],
      answer: 2,
      explanation:
        "Personal finance seeks to help people better manage their resources to achieve goals and improve their quality of life.",
    },
    {
      theme: "Savings and investment",
      question:
        "A person receives their salary and decides to set aside a portion to use in a few years. That money represents:",
      options: ["Savings", "Financial investment", "Return", "Consumption"],
      answer: 0,
      explanation:
        "Savings is the portion of income that is not consumed in the present and is reserved for the future.",
    },
    {
      theme: "Savings and investment",
      question:
        "Which of the following situations constitutes a financial investment?",
      options: [
        "Keeping cash in a drawer",
        "Buying an asset expecting a future return",
        "Allocating money to daily consumption",
        "Paying a service bill",
      ],
      answer: 1,
      explanation:
        "Investing means allocating resources to an asset with the expectation of obtaining a future economic benefit.",
    },
    {
      theme: "Time value of money",
      question: "Why is it said that money has value in time?",
      options: [
        "Because money always increases in value",
        "Because all investments generate gains",
        "Because inflation eliminates the value of money",
        "Because money always has an opportunity cost",
      ],
      answer: 3,
      explanation:
        "People value present consumption more than future consumption. Therefore, the same amount of money has greater value today than tomorrow.",
    },
    {
      theme: "Inflation and interest rates",
      question:
        "In a context where the purchasing power of money falls, what happens to prices in the economy?",
      options: [
        "They rise",
        "They fall",
        "They remain constant",
        "They depend solely on wages",
      ],
      answer: 0,
      explanation:
        "Inflation is the loss of purchasing power of money, which means more money is needed to buy the same good.",
    },
    {
      theme: "Risk and diversification",
      question:
        "An investor evaluates two similar alternatives. One presents greater risk. According to the risk-return principle, that asset is expected to:",
      options: [
        "Offer a lower expected return",
        "Offer a higher expected return",
        "Have exactly the same expected return",
        "Guarantee a positive return",
      ],
      answer: 1,
      explanation:
        "Investors demand additional compensation for taking on more risk. That compensation is reflected in a higher expected return.",
    },
    {
      theme: "Inflation and interest rates",
      question:
        "What is the difference between nominal interest rate and real interest rate?",
      options: [
        "The nominal rate only applies to bonds and the real rate to stocks",
        "The real rate is always higher than the nominal rate",
        "The real rate reflects the return after considering inflation",
        "The nominal rate eliminates the effect of inflation",
      ],
      answer: 2,
      explanation:
        "The nominal rate includes the effect of inflation. The real rate shows how much purchasing power actually increases.",
    },
    {
      theme: "Risk and diversification",
      question:
        "An investor distributes their money among stocks from different economic sectors. What financial principle are they applying?",
      options: [
        "Time value of money",
        "Risk and return",
        "Opportunity cost",
        "Diversification",
      ],
      answer: 3,
      explanation:
        "Diversification seeks to reduce risk by distributing investment among different assets.",
    },
    {
      theme: "Time value of money",
      question:
        "A person has $200,000 today. They invest it at an annual rate of 15%. How much will they have in one year?",
      options: ["$215,000", "$220,000", "$230,000", "$245,000"],
      answer: 2,
      explanation:
        "$200,000 × 1.15 = $230,000. The difference represents compensation for postponing present consumption.",
    },
    {
      theme: "Inflation and interest rates",
      question:
        "An investment generated a nominal return of 25% in a year with 20% inflation. Which statement is correct?",
      options: [
        "The real return was 25%",
        "Purchasing power decreased by 20%",
        "Inflation does not affect the evaluation of the investment",
        "Purchasing power increased by approximately 5%",
      ],
      answer: 3,
      explanation:
        "Real rate = (1.25 / 1.20) - 1 = 4.17%. What matters is not how much capital grew nominally but how much purchasing power grew.",
    },
    {
      theme: "Risk and diversification",
      question:
        "María has $1,000,000 to invest. She can put it all in one stock or distribute it across 10 assets. What is the main advantage of distributing the investment?",
      options: [
        "It guarantees a higher return",
        "It reduces the total portfolio risk",
        "It completely eliminates the possibility of losses",
        "It ensures positive returns every year",
      ],
      answer: 1,
      explanation:
        "Diversification does not guarantee gains, but it reduces exposure to poor performance of a single asset.",
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
          href="/Nivel_1_-_Modulo_01.pdf"
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
          file="/Nivel_1_-_Modulo_01.pdf"
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
                renderAnnotationLayer
              />
            </div>
          ))}
        </Document>
      </div>

      {/* Go to test CTA (appears after PDF) */}
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
  current: number;
  selected: number | null;
  answered: boolean;
  responses: (number | null)[];
  phase: TestPhase;
}

const INITIAL_STATE: TestState = {
  current: 0,
  selected: null,
  answered: false,
  responses: Array(15).fill(null),
  phase: "question",
};

interface TestSectionProps {
  lang: "es" | "en";
}

const TestSection: React.FC<TestSectionProps> = ({ lang }) => {
  const c = ui[lang];
  const questions = QUESTIONS[lang];
  const [state, setState] = useState<TestState>(INITIAL_STATE);

  const reset = () => setState(INITIAL_STATE);

  const select = (idx: number) => {
    if (state.answered) return;
    setState((s) => ({ ...s, selected: idx, answered: true }));
  };

  const next = () => {
    const responses = [...state.responses];
    responses[state.current] = state.selected;

    if (state.current < questions.length - 1) {
      setState((s) => ({
        ...s,
        current: s.current + 1,
        selected: null,
        answered: false,
        responses,
      }));
    } else {
      setState((s) => ({ ...s, responses, phase: "result" }));
    }
  };

  if (state.phase === "result") {
    return <ResultScreen lang={lang} responses={state.responses} onRetry={reset} />;
  }

  const q = questions[state.current];
  const progress = ((state.current) / questions.length) * 100;
  const isLast = state.current === questions.length - 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold text-white font-display mb-6">
        {c.testTitle}
      </h2>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-uxc-muted-foreground mb-2">
          <span>
            {c.question} {state.current + 1} {c.of} {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10 [&>div]:bg-teal" />
      </div>

      {/* Theme badge */}
      <p className="text-xs font-medium text-teal/80 uppercase tracking-wider mb-3">
        {q.theme}
      </p>

      {/* Question */}
      <p className="text-base md:text-lg text-white leading-relaxed mb-6">
        {q.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-8">
        {q.options.map((opt, i) => {
          const isSelected = state.selected === i;
          const isCorrect = i === q.answer;
          let cls =
            "w-full text-left rounded-xl border px-5 py-4 text-sm transition-all duration-200 ";

          if (!state.answered) {
            cls +=
              "border-white/10 bg-uxc-card text-white hover:border-teal/50 hover:bg-teal/5 cursor-pointer";
          } else if (isCorrect) {
            cls += "border-teal bg-teal/10 text-teal cursor-default";
          } else if (isSelected) {
            cls += "border-red-400 bg-red-400/10 text-red-300 cursor-default";
          } else {
            cls += "border-white/5 bg-uxc-card/50 text-uxc-muted-foreground cursor-default";
          }

          return (
            <button key={i} className={cls} onClick={() => select(i)} disabled={state.answered}>
              <span className="flex items-start gap-3">
                {state.answered && isCorrect && (
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-teal" />
                )}
                {state.answered && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-400" />
                )}
                {(!state.answered || (!isCorrect && !isSelected)) && (
                  <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-current text-xs mt-0.5">
                    {String.fromCharCode(65 + i)}
                  </span>
                )}
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {state.answered && (
        <div
          className={`mb-6 rounded-xl border px-5 py-4 text-sm leading-relaxed ${
            state.selected === q.answer
              ? "border-teal/30 bg-teal/5 text-teal/90"
              : "border-red-400/30 bg-red-400/5 text-red-300/90"
          }`}
        >
          <span className="font-semibold">
            {state.selected === q.answer ? `✓ ${c.correct}` : `✗ ${c.incorrect}`}
            {" — "}
          </span>
          {q.explanation}
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-end">
        <Button
          onClick={next}
          disabled={!state.answered}
          className="rounded-full bg-teal text-navy-deep font-semibold px-6 py-2 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isLast ? c.seeResult : c.next}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// ── Result Screen ─────────────────────────────────────────────────────────────

interface ResultScreenProps {
  lang: "es" | "en";
  responses: (number | null)[];
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ lang, responses, onRetry }) => {
  const c = ui[lang];
  const questions = QUESTIONS[lang];
  const score = responses.filter((r, i) => r === questions[i].answer).length;
  const total = questions.length;

  let level: string;
  let levelDesc: string;
  let levelColor: string;
  if (score >= 13) {
    level = c.levelExcellent;
    levelDesc = c.levelDescExcellent;
    levelColor = "text-teal";
  } else if (score >= 9) {
    level = c.levelGood;
    levelDesc = c.levelDescGood;
    levelColor = "text-blue";
  } else {
    level = c.levelInProgress;
    levelDesc = c.levelDescInProgress;
    levelColor = "text-amber-400";
  }

  // Breakdown by theme
  const themeMap: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q, i) => {
    if (!themeMap[q.theme]) themeMap[q.theme] = { correct: 0, total: 0 };
    themeMap[q.theme].total += 1;
    if (responses[i] === q.answer) themeMap[q.theme].correct += 1;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Score card */}
      <div className="rounded-2xl border border-white/10 bg-uxc-card p-8 text-center mb-8">
        <p className="text-5xl font-bold font-display text-white mb-1">
          {score}<span className="text-2xl text-uxc-muted-foreground">/{total}</span>
        </p>
        <p className="text-sm text-uxc-muted-foreground mb-3">
          {score} {c.correct_answers}
        </p>
        <p className={`text-2xl font-semibold font-display ${levelColor}`}>{level}</p>
        <p className="text-sm text-uxc-muted-foreground mt-2 max-w-sm mx-auto">{levelDesc}</p>
      </div>

      {/* Breakdown */}
      <h3 className="text-base font-semibold text-white mb-4">{c.breakdown}</h3>
      <div className="flex flex-col gap-3 mb-8">
        {Object.entries(themeMap).map(([theme, { correct, total: t }]) => {
          const pct = Math.round((correct / t) * 100);
          return (
            <div key={theme} className="rounded-xl border border-white/8 bg-uxc-card px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{theme}</span>
                <span className={`text-sm font-semibold ${pct === 100 ? "text-teal" : pct >= 50 ? "text-blue" : "text-amber-400"}`}>
                  {correct}/{t}
                </span>
              </div>
              <Progress
                value={pct}
                className="h-1 bg-white/10 [&>div]:bg-teal"
              />
            </div>
          );
        })}
      </div>

      {/* Retry */}
      <div className="flex justify-center">
        <Button
          onClick={onRetry}
          className="rounded-full border border-teal/40 bg-transparent text-teal font-semibold px-8 py-3 hover:bg-teal/10 flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {c.retry}
        </Button>
      </div>
    </div>
  );
};

// ── Campus Page ───────────────────────────────────────────────────────────────

interface CampusProps {
  onOpenBeta?: () => void;
}

const CampusPage: React.FC<CampusProps> = ({ onOpenBeta }) => {
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

export default CampusPage;
