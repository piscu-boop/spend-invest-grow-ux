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
import { track, trackOnce } from "@/lib/analytics";
import { completeModule } from "@/lib/leadsApi";
import EmailGate, { hasCapturedLead, getCapturedEmail } from "@/components/EmailGate";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MODULO_ID = "6";

// ── i18n ─────────────────────────────────────────────────────────────────────

const ui = {
  es: {
    navItem: "UX Campus",
    tabModule: "Módulo",
    tabTest: "Test",
    moduleTitle: "Módulo 06 – ¿Cómo funciona una acción?",
    downloadPdf: "Descargar PDF",
    goToTest: "Ir al Test",
    testTitle: "Evaluación Módulo 06",
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
    breadcrumbModule: "Módulo 06",
  },
  en: {
    navItem: "UX Campus",
    tabModule: "Module",
    tabTest: "Test",
    moduleTitle: "Module 06 – How Does a Stock Work?",
    downloadPdf: "Download PDF",
    goToTest: "Go to Test",
    testTitle: "Module 06 Assessment",
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
    breadcrumbModule: "Module 06",
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
      theme: "01 · ¿Qué es una acción?",
      question: "¿Qué representa una acción?",
      options: [
        "Cada una de las partes iguales en las que se divide la deuda de una sociedad.",
        "Cada uno de los préstamos mediante los que se financia la actividad de una sociedad.",
        "Cada una de las partes iguales en las que se divide el capital de una sociedad.",
        "Cada uno de los bienes individuales que integran el patrimonio de una sociedad.",
      ],
      answer: 2,
      explanation:
        "Quien la adquiere se convierte en accionista y participa de la propiedad en proporción a la cantidad de acciones que posee.",
    },
    {
      theme: "01 · ¿Qué es una acción?",
      question: "¿Cuál es una diferencia central entre emitir acciones y tomar deuda?",
      options: [
        "Las acciones no obligan a devolver el aporte en una fecha determinada.",
        "Las acciones obligan a pagar intereses definidos desde el momento de emisión.",
        "La deuda incorpora socios que participan directamente de la propiedad empresarial.",
        "La deuda solo puede utilizarse para financiar inversiones de muy corto plazo.",
      ],
      answer: 0,
      explanation:
        "La emisión de acciones incorpora capital y nuevos accionistas, pero no genera una obligación contractual de devolver el aporte en una fecha determinada. La deuda, en cambio, convierte al inversor en acreedor y establece pagos de capital e intereses.",
    },
    {
      theme: "02 · ¿Por qué una empresa emite acciones?",
      question: "¿Qué ocurre cuando una empresa emite acciones nuevas para obtener financiamiento?",
      options: [
        "Las acciones existentes se venden entre inversores y la empresa no recibe fondos.",
        "Los accionistas recuperan automáticamente el capital que habían aportado al ingresar.",
        "La empresa asume una deuda que deberá devolver junto con intereses periódicos.",
        "La empresa recibe nuevos recursos y puede reducirse la participación de los accionistas existentes.",
      ],
      answer: 3,
      explanation:
        "Cuando se emiten acciones nuevas, el dinero aportado ingresa a la empresa. Como aumenta la cantidad total de acciones, la participación porcentual de quienes no compran parte de la emisión puede reducirse; este efecto se denomina dilución.",
    },
    {
      theme: "03 · ¿Por qué una empresa decide cotizar en bolsa?",
      question: "¿Qué significa que una empresa cotice en bolsa?",
      options: [
        "Que todas sus acciones deben emitirse nuevamente al comenzar cada rueda bursátil.",
        "Que sus acciones fueron admitidas para negociarse públicamente en un mercado autorizado.",
        "Que el mercado garantiza la rentabilidad futura de quienes compren sus acciones.",
        "Que la empresa obtiene dinero cada vez que dos inversores negocian sus acciones.",
      ],
      answer: 1,
      explanation:
        "Cotizar significa que las acciones fueron admitidas para su negociación pública en un mercado. Esto no implica que la empresa reciba fondos en cada operación posterior ni que el mercado garantice su rentabilidad.",
    },
    {
      theme: "04 · ¿Cómo interpretar la información de una acción?",
      question: "¿Para qué se utiliza el ticker de una acción?",
      options: [
        "Para identificar el instrumento al consultar su cotización o ingresar una orden.",
        "Para determinar automáticamente el valor económico total de la empresa emisora.",
        "Para indicar la proporción del capital que conserva cada accionista de la empresa.",
        "Para garantizar que la acción se negocie siempre en la moneda del país de origen.",
      ],
      answer: 0,
      explanation:
        "El ticker es el código que identifica un activo dentro de un mercado. Permite reconocer el instrumento al consultar información o ingresar una orden y distinguirlo de otros valores negociables del mismo emisor.",
    },
    {
      theme: "04 · ¿Cómo interpretar la información de una acción?",
      question: "¿Qué ajuste realiza el Enterprise Value respecto de la capitalización bursátil?",
      options: [
        "Suma únicamente los dividendos distribuidos y resta las acciones que permanecen en circulación.",
        "Suma el efectivo disponible y resta las obligaciones financieras asumidas por la empresa.",
        "Suma los ingresos del período y resta todos los costos operativos y los impuestos pagados.",
        "Suma la deuda financiera y resta el efectivo y las inversiones líquidas disponibles.",
      ],
      answer: 3,
      explanation:
        "Como aproximación, el Enterprise Value se calcula sumando la deuda financiera a la capitalización bursátil y restando el efectivo y las inversiones líquidas. Busca aproximar el valor total del negocio con independencia de cómo se financia.",
    },
    {
      theme: "04 · ¿Cómo interpretar la información de una acción?",
      question: "¿Qué indica el volumen negociado de una acción?",
      options: [
        "La cantidad de operaciones necesarias para que el precio cierre por encima de la apertura.",
        "La cantidad total de acciones intercambiadas durante el período que se está considerando.",
        "La cantidad de accionistas diferentes que compraron o vendieron durante la última rueda.",
        "La cantidad máxima de acciones que la empresa puede emitir sin ampliar su capital.",
      ],
      answer: 1,
      explanation:
        "El volumen indica la cantidad total de acciones negociadas durante un período. No representa la cantidad de operaciones ni el número de participantes, sino la suma de las unidades intercambiadas.",
    },
    {
      theme: "05 · ¿Cómo gana dinero quien invierte?",
      question:
        "¿Qué efecto produce el pago de un dividendo sobre la riqueza del accionista, si todo lo demás permanece constante?",
      options: [
        "La incrementa por el monto completo recibido, porque el precio de la acción no se modifica.",
        "La elimina temporalmente, porque el accionista deja de participar del capital de la empresa.",
        "Transforma parte del valor de la acción en efectivo, sin crear riqueza automáticamente.",
        "La duplica proporcionalmente, porque conserva la acción y recibe además un nuevo activo.",
      ],
      answer: 2,
      explanation:
        "El dividendo transfiere efectivo desde la empresa hacia el accionista. En la fecha exdividendo, el precio tiende a ajustarse por ese importe, por lo que el pago no crea riqueza por sí mismo: cambia su composición.",
    },
    {
      theme: "06 · ¿Por qué cambia el precio de una acción?",
      question: "¿Por qué una noticia favorable para una empresa no garantiza una suba de su acción?",
      options: [
        "Porque su efecto depende de las expectativas previas y de cuánto ya estaba incorporado en el precio.",
        "Porque las noticias solo afectan a la deuda y nunca modifican el valor de las acciones.",
        "Porque el precio de una acción responde exclusivamente al volumen negociado durante cada rueda.",
        "Porque los resultados empresariales solo pueden influir después de que se distribuyen dividendos.",
      ],
      answer: 0,
      explanation:
        "El mercado compara la información nueva con lo que esperaba. Una noticia positiva puede no impulsar el precio si ya estaba descontada o si resulta menos favorable que lo previsto.",
    },
    {
      theme: "07 · Riesgos que afectan al precio",
      question: "¿Cuál de los siguientes constituye principalmente un riesgo específico de una empresa?",
      options: [
        "Una suba general de las tasas de interés que reduce la valuación de numerosos activos.",
        "Una recesión internacional que disminuye la demanda agregada en diferentes mercados.",
        "Una crisis cambiaria que afecta simultáneamente a gran parte de las empresas locales.",
        "La pérdida de un cliente importante que representa una parte sustancial de sus ventas.",
      ],
      answer: 3,
      explanation:
        "La pérdida de un cliente relevante depende de la situación particular de la compañía y constituye un riesgo específico. Las otras alternativas describen factores generales que pueden afectar a muchas empresas al mismo tiempo.",
    },
    {
      theme: "09 · Identificación de una acción",
      question:
        "Después del split 10 a 1 de las acciones locales de YPF, ¿por qué cada ADR pasó a representar diez acciones?",
      options: [
        "Porque el split se aplicó tanto a las acciones locales como al ADR y multiplicó ambos instrumentos.",
        "Porque el split se aplicó a las acciones locales, pero no al ADR, y por eso cambió la relación.",
        "Porque YPF emitió diez ADR nuevos por cada acción local que permanecía en circulación.",
        "Porque el precio del ADR debía multiplicarse por diez para conservar su valor en dólares.",
      ],
      answer: 1,
      explanation:
        "El split se aplicó sobre las acciones locales, pero no sobre el ADR. Como cada acción local anterior se dividió en diez y el ADR mantuvo su estructura, la relación cambió: cada ADR pasó de representar una acción local a representar diez.",
    },
    {
      theme: "10 · Información de mercado: interpretación",
      question:
        "¿Cuál de estas preguntas no puede responderse únicamente con la información de mercado presentada en el módulo?",
      options: [
        "Si la acción está cara o barata respecto de una estimación de su valor económico.",
        "Cuál fue el volumen total negociado por la acción durante una rueda determinada.",
        "Cuál fue el precio de cierre de una rueda.",
        "Cuál fue la diferencia entre el precio máximo y el mínimo de una rueda.",
      ],
      answer: 0,
      explanation:
        "La información de mercado permite conocer precios, variaciones y volumen, pero determinar si una acción está cara o barata exige estimar su valor mediante el análisis del negocio, sus flujos futuros y sus riesgos.",
    },
    {
      theme: "02 · ¿Por qué una empresa emite acciones?",
      question:
        "Una empresa tiene 100 acciones y una persona posee 40. Luego se emiten 60 acciones nuevas y esa persona no compra ninguna. ¿Cuál será su participación?",
      options: [
        "20%, porque las 40 acciones deben dividirse por el aumento de 200 acciones.",
        "40%, porque la cantidad de acciones que posee la persona no se modifica.",
        "25%, porque mantiene 40 acciones sobre un nuevo total de 160 acciones.",
        "62,5%, porque las 100 acciones iniciales se comparan con las 160 finales.",
      ],
      answer: 2,
      explanation:
        "Después de la emisión existen 160 acciones. Como la persona conserva 40, su nueva participación es 40 / 160 × 100 = 25%. La cantidad de acciones que posee no cambió, pero sí se redujo su porcentaje.",
    },
    {
      theme: "04 · ¿Cómo interpretar la información de una acción?",
      question:
        "La empresa A posee un capital dividido en 100 acciones que cotizan a $20 cada una. La empresa B posee 200 acciones que cotizan a $8 cada una. ¿Cuál tiene mayor capitalización bursátil?",
      options: [
        "La empresa B, porque posee el doble de acciones en circulación que la empresa A.",
        "Ambas empresas, porque la diferencia de precios compensa exactamente la cantidad de acciones.",
        "La empresa B, porque su capitalización bursátil es de $2.800 frente a $2.000.",
        "La empresa A, porque su capitalización es de $2.000 frente a $1.600 de la empresa B.",
      ],
      answer: 3,
      explanation:
        "La capitalización se calcula multiplicando el precio por la cantidad de acciones. La empresa A vale 100 × $20 = $2.000 y la empresa B, 200 × $8 = $1.600. Por lo tanto, la empresa A tiene mayor capitalización.",
    },
    {
      theme: "05 · ¿Cómo gana dinero quien invierte?",
      question:
        "Una persona compra una acción a $100, recibe un dividendo de $5 y luego la vende a $110. ¿Cuál fue su rentabilidad total?",
      options: [
        "5%, porque la rentabilidad total considera únicamente el dividendo recibido.",
        "15%, porque obtuvo $10 por la suba del precio y $5 por el dividendo.",
        "10%, porque la rentabilidad total considera únicamente la diferencia de precios.",
        "20%, porque deben sumarse el precio de venta y el dividendo antes de calcularla.",
      ],
      answer: 1,
      explanation:
        "La ganancia total fue de $15: $10 por la diferencia entre compra y venta más $5 de dividendos. Sobre una inversión inicial de $100, la rentabilidad total fue del 15%.",
    },
  ],
  en: [
    {
      theme: "01 · What is a stock?",
      question: "What does a stock represent?",
      options: [
        "Each of the equal parts into which a company's debt is divided.",
        "Each of the loans through which a company's activity is financed.",
        "Each of the equal parts into which a company's capital is divided.",
        "Each of the individual assets that make up a company's equity.",
      ],
      answer: 2,
      explanation:
        "Whoever acquires it becomes a shareholder and participates in ownership in proportion to the number of shares they hold.",
    },
    {
      theme: "01 · What is a stock?",
      question: "What is a central difference between issuing stock and taking on debt?",
      options: [
        "Stock does not require repaying the contribution on a set date.",
        "Stock requires paying interest defined at the time of issuance.",
        "Debt brings in partners who directly participate in company ownership.",
        "Debt can only be used to finance very short-term investments.",
      ],
      answer: 0,
      explanation:
        "Issuing stock brings in capital and new shareholders, but does not create a contractual obligation to repay the contribution on a set date. Debt, on the other hand, makes the investor a creditor and establishes principal and interest payments.",
    },
    {
      theme: "02 · Why does a company issue stock?",
      question: "What happens when a company issues new shares to raise financing?",
      options: [
        "Existing shares are sold among investors and the company receives no funds.",
        "Shareholders automatically recover the capital they had contributed when they joined.",
        "The company takes on debt that it must repay along with periodic interest.",
        "The company receives new resources and existing shareholders' stake may be reduced.",
      ],
      answer: 3,
      explanation:
        "When new shares are issued, the money contributed goes into the company. Since the total number of shares increases, the percentage stake of those who don't buy part of the issuance may be reduced; this effect is called dilution.",
    },
    {
      theme: "03 · Why does a company decide to go public?",
      question: "What does it mean for a company to trade on a stock exchange?",
      options: [
        "That all its shares must be reissued at the start of every trading session.",
        "That its shares were admitted for public trading on an authorized market.",
        "That the market guarantees future returns for those who buy its shares.",
        "That the company earns money every time two investors trade its shares.",
      ],
      answer: 1,
      explanation:
        "Trading publicly means the shares were admitted for public trading on a market. This doesn't imply the company receives funds on every subsequent trade, nor that the market guarantees its profitability.",
    },
    {
      theme: "04 · How to interpret a stock's information?",
      question: "What is a stock's ticker used for?",
      options: [
        "To identify the instrument when checking its price or placing an order.",
        "To automatically determine the total economic value of the issuing company.",
        "To indicate the proportion of capital each shareholder retains.",
        "To guarantee the stock is always traded in the currency of its country of origin.",
      ],
      answer: 0,
      explanation:
        "The ticker is the code that identifies an asset within a market. It allows the instrument to be recognized when checking information or placing an order, distinguishing it from other securities of the same issuer.",
    },
    {
      theme: "04 · How to interpret a stock's information?",
      question: "What adjustment does Enterprise Value make relative to market capitalization?",
      options: [
        "It adds distributed dividends and subtracts the shares that remain outstanding.",
        "It adds available cash and subtracts the financial obligations taken on by the company.",
        "It adds the period's revenue and subtracts all operating costs and taxes paid.",
        "It adds financial debt and subtracts cash and available liquid investments.",
      ],
      answer: 3,
      explanation:
        "As an approximation, Enterprise Value is calculated by adding financial debt to market capitalization and subtracting cash and liquid investments. It seeks to approximate the total value of the business regardless of how it's financed.",
    },
    {
      theme: "04 · How to interpret a stock's information?",
      question: "What does a stock's trading volume indicate?",
      options: [
        "The number of trades needed for the price to close above the opening price.",
        "The total number of shares exchanged during the period being considered.",
        "The number of different shareholders who bought or sold during the last session.",
        "The maximum number of shares the company can issue without expanding its capital.",
      ],
      answer: 1,
      explanation:
        "Volume indicates the total number of shares traded during a period. It doesn't represent the number of trades or participants, but the sum of the units exchanged.",
    },
    {
      theme: "05 · How do stock investors earn money?",
      question:
        "What effect does a dividend payment have on a shareholder's wealth, if everything else stays constant?",
      options: [
        "It increases it by the full amount received, because the share price doesn't change.",
        "It temporarily eliminates it, because the shareholder stops participating in the company's capital.",
        "It converts part of the share's value into cash, without automatically creating wealth.",
        "It doubles it proportionally, because the shareholder keeps the share and also receives a new asset.",
      ],
      answer: 2,
      explanation:
        "The dividend transfers cash from the company to the shareholder. On the ex-dividend date, the price tends to adjust by that amount, so the payment does not create wealth by itself: it changes its composition.",
    },
    {
      theme: "06 · Why does a stock's price change?",
      question: "Why doesn't favorable news for a company guarantee a rise in its stock price?",
      options: [
        "Because its effect depends on prior expectations and how much was already priced in.",
        "Because news only affects debt and never changes the value of stocks.",
        "Because a stock's price responds exclusively to the volume traded during each session.",
        "Because company results can only have an effect after dividends are distributed.",
      ],
      answer: 0,
      explanation:
        "The market compares new information with what it expected. Positive news may not push the price up if it was already priced in or turns out to be less favorable than anticipated.",
    },
    {
      theme: "07 · Risks that affect price",
      question: "Which of the following is mainly a company-specific risk?",
      options: [
        "A general rise in interest rates that lowers the valuation of many assets.",
        "An international recession that reduces aggregate demand across different markets.",
        "A currency crisis that simultaneously affects a large share of local companies.",
        "The loss of a major client that represents a substantial part of its sales.",
      ],
      answer: 3,
      explanation:
        "Losing a significant client depends on the company's particular situation and constitutes a specific risk. The other options describe general factors that can affect many companies at the same time.",
    },
    {
      theme: "09 · Identifying a stock",
      question: "After YPF's 10-to-1 split of its local shares, why did each ADR come to represent ten shares?",
      options: [
        "Because the split was applied to both the local shares and the ADR, multiplying both instruments.",
        "Because the split was applied to the local shares, but not to the ADR, which changed the ratio.",
        "Because YPF issued ten new ADRs for every local share that remained outstanding.",
        "Because the ADR's price had to be multiplied by ten to preserve its value in dollars.",
      ],
      answer: 1,
      explanation:
        "The split was applied to the local shares, but not to the ADR. Since each previous local share was split into ten and the ADR kept its structure, the ratio changed: each ADR went from representing one local share to representing ten.",
    },
    {
      theme: "10 · Market information: interpretation",
      question:
        "Which of these questions cannot be answered solely with the market information presented in the module?",
      options: [
        "Whether the stock is expensive or cheap relative to an estimate of its economic value.",
        "What the total volume traded for the stock was during a given session.",
        "What the closing price of a session was.",
        "What the difference between the high and low price of a session was.",
      ],
      answer: 0,
      explanation:
        "Market information lets you know prices, changes, and volume, but determining whether a stock is expensive or cheap requires estimating its value through analysis of the business, its future cash flows, and its risks.",
    },
    {
      theme: "02 · Why does a company issue stock?",
      question:
        "A company has 100 shares and a person owns 40. Then 60 new shares are issued and that person buys none. What will their stake be?",
      options: [
        "20%, because the 40 shares must be divided by the increase of 200 shares.",
        "40%, because the number of shares the person owns doesn't change.",
        "25%, because they keep 40 shares out of a new total of 160 shares.",
        "62.5%, because the initial 100 shares are compared with the final 160.",
      ],
      answer: 2,
      explanation:
        "After the issuance there are 160 shares outstanding. Since the person keeps 40, their new stake is 40 / 160 × 100 = 25%. The number of shares they own didn't change, but their percentage did decrease.",
    },
    {
      theme: "04 · How to interpret a stock's information?",
      question:
        "Company A has capital divided into 100 shares trading at $20 each. Company B has 200 shares trading at $8 each. Which has the larger market capitalization?",
      options: [
        "Company B, because it has twice as many shares outstanding as Company A.",
        "Both companies, because the price difference exactly offsets the share count.",
        "Company B, because its market capitalization is $2,800 versus $2,000.",
        "Company A, because its market capitalization is $2,000 versus Company B's $1,600.",
      ],
      answer: 3,
      explanation:
        "Market capitalization is calculated by multiplying price by the number of shares. Company A is worth 100 × $20 = $2,000 and Company B, 200 × $8 = $1,600. Therefore, Company A has the larger market capitalization.",
    },
    {
      theme: "05 · How do stock investors earn money?",
      question:
        "A person buys a share at $100, receives a $5 dividend, and later sells it at $110. What was their total return?",
      options: [
        "5%, because total return only considers the dividend received.",
        "15%, because they got $10 from the price increase plus $5 from the dividend.",
        "10%, because total return only considers the price difference.",
        "20%, because the sale price and the dividend must be added together before calculating it.",
      ],
      answer: 1,
      explanation:
        "The total gain was $15: $10 from the difference between purchase and sale price, plus $5 in dividends. On an initial investment of $100, the total return was 15%.",
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
          href="/Nivel_2_-_Modulo_06.pdf"
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
          file="/Nivel_2_-_Modulo_06.pdf"
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setLoading(false);
            trackOnce("pdf_open", { modulo_id: MODULO_ID });
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
  const [gateOpen, setGateOpen] = useState(!hasCapturedLead());
  const c = ui[lang];
  const questions = QUESTIONS[lang];

  useEffect(() => {
    trackOnce("test_start", { modulo_id: MODULO_ID });
  }, []);

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
    if (isLast) {
      const score = newResponses.filter((r) => r.correct).length;
      track("test_completed", { modulo_id: MODULO_ID, score });
      const email = getCapturedEmail();
      if (email) {
        void completeModule({ email, modulo_id: MODULO_ID, score });
      }
    }
    setState({
      index: isLast ? state.index : state.index + 1,
      phase: isLast ? "result" : "question",
      selected: null,
      responses: newResponses,
    });
  };

  if (gateOpen) {
    return (
      <EmailGate
        moduloCaptura={MODULO_ID}
        onComplete={() => setGateOpen(false)}
      />
    );
  }

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
    pct >= 85
      ? { label: c.levelExcellent, desc: c.levelDescExcellent, color: "text-teal" }
      : pct >= 65
      ? { label: c.levelGood, desc: c.levelDescGood, color: "text-yellow-400" }
      : { label: c.levelInProgress, desc: c.levelDescInProgress, color: "text-red-400" };

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

// ── Campus6 Page ──────────────────────────────────────────────────────────────

interface Campus6Props {
  onOpenBeta?: () => void;
}

const Campus6Page: React.FC<Campus6Props> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const c = ui[language];
  const [activeTab, setActiveTab] = useState("module");

  useEffect(() => {
    trackOnce("module_view", { modulo_id: MODULO_ID });
  }, []);

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
              {language === "es" ? "Nivel 2 — Educación Financiera" : "Level 2 — Financial Education"}
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

export default Campus6Page;
