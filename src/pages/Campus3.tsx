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
    moduleTitle: "Módulo 03 – Construcción de Patrimonio",
    downloadPdf: "Descargar PDF",
    goToTest: "Ir al Test",
    testTitle: "Evaluación Módulo 03",
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
    breadcrumbModule: "Módulo 03",
  },
  en: {
    navItem: "UX Campus",
    tabModule: "Module",
    tabTest: "Test",
    moduleTitle: "Module 03 – Building Wealth",
    downloadPdf: "Download PDF",
    goToTest: "Go to Test",
    testTitle: "Module 03 Assessment",
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
    breadcrumbModule: "Module 03",
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
      theme: "¿Por qué hablar de patrimonio?",
      question: "¿Cuál es la idea central desarrollada en este módulo?",
      options: [
        "Que las inversiones constituyen el principal objetivo financiero.",
        "Que el ahorro debe concentrarse únicamente en el corto plazo.",
        "Que la construcción patrimonial es el objetivo final.",
        "Que el endeudamiento debería evitarse en todos los casos.",
      ],
      answer: 2,
      explanation:
        "El módulo plantea que el ahorro y la inversión son herramientas, mientras que la construcción patrimonial constituye el objetivo final de las finanzas personales.",
    },
    {
      theme: "¿Qué es el patrimonio?",
      question: "Desde una perspectiva patrimonial, ¿qué representa el patrimonio de una persona?",
      options: [
        "El valor total de los ingresos que percibirá.",
        "La diferencia entre los activos y los pasivos.",
        "La suma de todos los bienes que posee.",
        "El dinero disponible en cuentas y efectivo.",
      ],
      answer: 1,
      explanation:
        "El patrimonio se define como la diferencia entre los activos que posee una persona y las obligaciones financieras que mantiene.",
    },
    {
      theme: "¿Qué es el patrimonio?",
      question: "¿Cuál de los siguientes ejemplos corresponde a un activo financiero?",
      options: [
        "Un terreno destinado a uso recreativo.",
        "Un automóvil utilizado para transporte personal.",
        "Una cuenta pendiente de cobro por alquileres.",
        "Una acción emitida por una empresa que cotiza en el mercado.",
      ],
      answer: 3,
      explanation:
        "Las acciones representan derechos financieros sobre una empresa y forman parte de los activos financieros.",
    },
    {
      theme: "¿Cómo se construye?",
      question: "¿Cuál de las siguientes decisiones contribuye más directamente a la construcción patrimonial?",
      options: [
        "Destinar una mayor proporción del ingreso al consumo.",
        "Transformar ingresos actuales en activos o derechos económicos.",
        "Incrementar gastos corrientes mediante financiamiento adicional.",
        "Mantener recursos sin asignarlos a objetivos concretos.",
      ],
      answer: 1,
      explanation:
        "La construcción patrimonial ocurre cuando una parte de los recursos actuales se transforma en activos capaces de generar valor o permanecer disponibles en el futuro.",
    },
    {
      theme: "¿Cómo se construye?",
      question: "¿Cuál es la principal razón por la que una deuda puede resultar conveniente?",
      options: [
        "Puede financiar activos o proyectos que generen valor.",
        "Permite eliminar completamente la necesidad de ahorrar.",
        "Garantiza una mejora inmediata del patrimonio neto.",
        "Reduce automáticamente el riesgo financiero futuro.",
      ],
      answer: 0,
      explanation:
        "La deuda puede utilizarse como herramienta financiera cuando permite adquirir activos, realizar inversiones o desarrollar proyectos que generen valor futuro.",
    },
    {
      theme: "El patrimonio se construye lentamente",
      question: "¿Qué factor explica principalmente las diferencias patrimoniales entre Leo, Enzo y Ana?",
      options: [
        "La suerte al seleccionar inversiones.",
        "El nivel inicial de ingresos.",
        "Los hábitos sostenidos durante largos períodos de tiempo.",
        "La evolución de los salarios reales.",
      ],
      answer: 2,
      explanation:
        "El ejemplo muestra que el tiempo y la consistencia en las decisiones financieras tienen un impacto mayor que decisiones aisladas.",
    },
    {
      theme: "El patrimonio se construye lentamente",
      question: "¿Cuál es una de las principales conclusiones del ejemplo de Leo, Enzo y Ana?",
      options: [
        "Ahorrar más siempre garantiza un mayor patrimonio final.",
        "Comenzar antes puede ser tan importante como ahorrar más.",
        "La inversión elimina completamente el riesgo financiero.",
        "Los ingresos determinan por sí solos el patrimonio.",
      ],
      answer: 1,
      explanation:
        "Leo logró acumular más patrimonio porque comenzó antes, invirtió de manera consistente y permitió que el tiempo trabajara a su favor.",
    },
    {
      theme: "Seguridad financiera",
      question: "Según la sección sobre seguridad financiera, ¿qué ventaja puede brindar un patrimonio acumulado?",
      options: [
        "Garantizar ingresos ilimitados en el futuro.",
        "Evitar cualquier pérdida económica futura.",
        "Eliminar la necesidad de trabajar.",
        "Incrementar la capacidad de elegir y planificar.",
      ],
      answer: 3,
      explanation:
        "El patrimonio aporta flexibilidad, capacidad de adaptación y mayor libertad para tomar decisiones importantes.",
    },
    {
      theme: "Seguridad financiera",
      question: "¿Cuál de las siguientes opciones constituye una fuente potencial de ingresos patrimoniales?",
      options: [
        "Dividendos distribuidos por acciones.",
        "Horas extras trabajadas regularmente.",
        "Comisiones laborales por ventas.",
        "Salario mensual por empleo.",
      ],
      answer: 0,
      explanation:
        "Los dividendos son ingresos generados por activos patrimoniales, no por trabajo directo.",
    },
    {
      theme: "El desafío de la jubilación",
      question: "¿Por qué la construcción patrimonial adquiere una relevancia creciente para la jubilación?",
      options: [
        "Porque las personas cambian más frecuentemente de empleo.",
        "Porque los activos financieros garantizan ingresos futuros.",
        "Porque las personas viven más años y los sistemas previsionales enfrentan desafíos.",
        "Porque los sistemas previsionales eliminan la necesidad de ahorrar.",
      ],
      answer: 2,
      explanation:
        "El aumento de la expectativa de vida y los desafíos demográficos incrementan la importancia de construir patrimonio propio.",
    },
    {
      theme: "El camino hacia la construcción patrimonial",
      question: "Dentro de la analogía de los vasos comunicantes, ¿qué representa el primer vaso?",
      options: [
        "La construcción patrimonial de largo plazo.",
        "Los objetivos financieros de mediano plazo.",
        "La inversión en activos financieros.",
        "El fondo de emergencia.",
      ],
      answer: 3,
      explanation:
        "El fondo de emergencia constituye el primer nivel de acumulación y la base sobre la cual se construyen las etapas posteriores.",
    },
    {
      theme: "El camino hacia la construcción patrimonial",
      question: "¿Cuál es la función principal del tercer vaso dentro del sistema financiero personal?",
      options: [
        "Financiar gastos cotidianos del presente.",
        "Acumular patrimonio para objetivos de largo plazo.",
        "Mantener liquidez inmediata ante emergencias.",
        "Cubrir gastos extraordinarios imprevistos.",
      ],
      answer: 1,
      explanation:
        "El tercer vaso está asociado a la construcción patrimonial de largo plazo, la generación de ingresos futuros y la jubilación.",
    },
    {
      theme: "El camino hacia la construcción patrimonial",
      question:
        "Tomás recibe un bono anual. No tiene deudas, completó su fondo de emergencia y no posee objetivos de mediano plazo pendientes. Según la lógica presentada, ¿cuál sería el destino más consistente?",
      options: [
        "Incorporarlo al proceso de acumulación patrimonial de largo plazo.",
        "Destinarlo exclusivamente al consumo inmediato.",
        "Mantenerlo permanentemente en efectivo.",
        "Ampliar el fondo de emergencia indefinidamente.",
      ],
      answer: 0,
      explanation:
        "Una vez cubiertas las necesidades de corto y mediano plazo, los recursos excedentes pueden dirigirse al tercer vaso, vinculado con la construcción patrimonial.",
    },
    {
      theme: "El patrimonio se construye lentamente",
      question:
        "María y Sofía tienen ingresos similares. María comienza a ahorrar e invertir desde sus primeros años de trabajo. Sofía espera quince años para comenzar. ¿Cuál es la conclusión más consistente?",
      options: [
        "Ambas alcanzarán necesariamente el mismo patrimonio.",
        "Sofía tendrá mayor patrimonio por aportar más tarde.",
        "María probablemente acumule más por el mayor tiempo de acumulación.",
        "El resultado dependerá únicamente de la inflación.",
      ],
      answer: 2,
      explanation:
        "El tiempo es uno de los factores más importantes en la construcción patrimonial porque amplifica el efecto acumulativo de las decisiones financieras.",
    },
    {
      theme: "UX Dual en la construcción patrimonial",
      question: "¿Cuál es el principal beneficio de realizar los consumos con la tecnología de UX Dual?",
      options: [
        "Reemplazar completamente la necesidad de ahorrar para el futuro.",
        "Eliminar el riesgo asociado a la construcción patrimonial.",
        "Garantizar un determinado nivel de patrimonio futuro.",
        "Convertir parte del consumo cotidiano en una fuente adicional de acumulación.",
      ],
      answer: 3,
      explanation:
        "UX Dual permite que parte del valor generado por los consumos realizados vuelva a incorporarse al proceso de construcción patrimonial, complementando otras fuentes de acumulación de recursos.",
    },
  ],
  en: [
    {
      theme: "Why talk about wealth?",
      question: "What is the central idea developed in this module?",
      options: [
        "That investments are the main financial goal.",
        "That savings should focus only on the short term.",
        "That wealth building is the final goal.",
        "That debt should be avoided in all cases.",
      ],
      answer: 2,
      explanation:
        "The module argues that saving and investing are tools, while wealth building is the final goal of personal finance.",
    },
    {
      theme: "What is wealth?",
      question: "From a wealth perspective, what does a person's net worth represent?",
      options: [
        "The total value of the income they will receive.",
        "The difference between assets and liabilities.",
        "The sum of all the goods they own.",
        "The money available in accounts and cash.",
      ],
      answer: 1,
      explanation:
        "Net worth is defined as the difference between the assets a person owns and the financial obligations they hold.",
    },
    {
      theme: "What is wealth?",
      question: "Which of the following examples corresponds to a financial asset?",
      options: [
        "A plot of land used for recreation.",
        "A car used for personal transportation.",
        "A receivable pending collection for rent.",
        "A share issued by a publicly traded company.",
      ],
      answer: 3,
      explanation:
        "Shares represent financial claims on a company and are part of financial assets.",
    },
    {
      theme: "How is it built?",
      question: "Which of the following decisions contributes most directly to wealth building?",
      options: [
        "Allocating a larger share of income to consumption.",
        "Transforming current income into assets or economic claims.",
        "Increasing current expenses through additional financing.",
        "Keeping resources without assigning them to concrete goals.",
      ],
      answer: 1,
      explanation:
        "Wealth building occurs when part of current resources is transformed into assets capable of generating value or remaining available in the future.",
    },
    {
      theme: "How is it built?",
      question: "What is the main reason a debt can be advantageous?",
      options: [
        "It can finance assets or projects that generate value.",
        "It completely eliminates the need to save.",
        "It guarantees an immediate improvement in net worth.",
        "It automatically reduces future financial risk.",
      ],
      answer: 0,
      explanation:
        "Debt can be used as a financial tool when it allows acquiring assets, making investments, or developing projects that generate future value.",
    },
    {
      theme: "Wealth is built slowly",
      question: "What factor mainly explains the wealth differences between Leo, Enzo and Ana?",
      options: [
        "Luck in selecting investments.",
        "Their initial income level.",
        "Habits sustained over long periods of time.",
        "The evolution of real wages.",
      ],
      answer: 2,
      explanation:
        "The example shows that time and consistency in financial decisions have a greater impact than isolated decisions.",
    },
    {
      theme: "Wealth is built slowly",
      question: "What is one of the main conclusions of the Leo, Enzo and Ana example?",
      options: [
        "Saving more always guarantees a higher final net worth.",
        "Starting earlier can be as important as saving more.",
        "Investing completely eliminates financial risk.",
        "Income alone determines net worth.",
      ],
      answer: 1,
      explanation:
        "Leo accumulated more wealth because he started earlier, invested consistently, and let time work in his favor.",
    },
    {
      theme: "Financial security",
      question: "According to the financial security section, what advantage can accumulated wealth provide?",
      options: [
        "Guaranteeing unlimited future income.",
        "Avoiding any future economic loss.",
        "Eliminating the need to work.",
        "Increasing the capacity to choose and plan.",
      ],
      answer: 3,
      explanation:
        "Wealth provides flexibility, adaptability, and greater freedom to make important decisions.",
    },
    {
      theme: "Financial security",
      question: "Which of the following is a potential source of wealth-based income?",
      options: [
        "Dividends distributed by shares.",
        "Regularly worked overtime hours.",
        "Sales commissions from a job.",
        "A monthly salary from employment.",
      ],
      answer: 0,
      explanation:
        "Dividends are income generated by wealth assets, not by direct labor.",
    },
    {
      theme: "The retirement challenge",
      question: "Why is wealth building becoming increasingly relevant for retirement?",
      options: [
        "Because people change jobs more frequently.",
        "Because financial assets guarantee future income.",
        "Because people live longer and pension systems face challenges.",
        "Because pension systems eliminate the need to save.",
      ],
      answer: 2,
      explanation:
        "Longer life expectancy and demographic challenges increase the importance of building one's own wealth.",
    },
    {
      theme: "The path toward wealth building",
      question: "Within the communicating vessels analogy, what does the first vessel represent?",
      options: [
        "Long-term wealth building.",
        "Medium-term financial goals.",
        "Investment in financial assets.",
        "The emergency fund.",
      ],
      answer: 3,
      explanation:
        "The emergency fund is the first level of accumulation and the foundation on which later stages are built.",
    },
    {
      theme: "The path toward wealth building",
      question: "What is the main function of the third vessel within the personal financial system?",
      options: [
        "Financing everyday current expenses.",
        "Accumulating wealth for long-term goals.",
        "Maintaining immediate liquidity for emergencies.",
        "Covering unexpected extraordinary expenses.",
      ],
      answer: 1,
      explanation:
        "The third vessel is linked to long-term wealth building, generating future income, and retirement.",
    },
    {
      theme: "The path toward wealth building",
      question:
        "Tomás receives an annual bonus. He has no debts, has completed his emergency fund, and has no pending medium-term goals. Based on the logic presented, what would be the most consistent destination for it?",
      options: [
        "Incorporating it into the long-term wealth accumulation process.",
        "Allocating it exclusively to immediate consumption.",
        "Keeping it permanently in cash.",
        "Indefinitely expanding the emergency fund.",
      ],
      answer: 0,
      explanation:
        "Once short- and medium-term needs are covered, excess resources can be directed to the third vessel, linked to wealth building.",
    },
    {
      theme: "Wealth is built slowly",
      question:
        "María and Sofía have similar incomes. María starts saving and investing from her first years of work. Sofía waits fifteen years to start. What is the most consistent conclusion?",
      options: [
        "Both will necessarily reach the same net worth.",
        "Sofía will have greater wealth by contributing later.",
        "María will likely accumulate more due to the longer accumulation time.",
        "The outcome will depend solely on inflation.",
      ],
      answer: 2,
      explanation:
        "Time is one of the most important factors in wealth building because it amplifies the cumulative effect of financial decisions.",
    },
    {
      theme: "UX Dual in wealth building",
      question: "What is the main benefit of making purchases using UX Dual's technology?",
      options: [
        "Completely replacing the need to save for the future.",
        "Eliminating the risk associated with wealth building.",
        "Guaranteeing a specific level of future net worth.",
        "Turning part of everyday consumption into an additional source of accumulation.",
      ],
      answer: 3,
      explanation:
        "UX Dual allows part of the value generated by purchases to be reincorporated into the wealth building process, complementing other sources of resource accumulation.",
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
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-white font-display">
          {c.moduleTitle}
        </h2>
        <a
          href="/Nivel_1_-_Modulo_03.pdf"
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
          file="/Nivel_1_-_Modulo_03.pdf"
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

// ── Campus3 Page ──────────────────────────────────────────────────────────────

interface Campus3Props {
  onOpenBeta?: () => void;
}

const Campus3Page: React.FC<Campus3Props> = ({ onOpenBeta }) => {
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

export default Campus3Page;
