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

const MODULO_ID = "5";

// ── i18n ─────────────────────────────────────────────────────────────────────

const ui = {
  es: {
    navItem: "UX Campus",
    tabModule: "Módulo",
    tabTest: "Test",
    moduleTitle: "Módulo 05 – ¿Cómo funciona un bono?",
    downloadPdf: "Descargar PDF",
    goToTest: "Ir al Test",
    testTitle: "Evaluación Módulo 05",
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
    breadcrumbModule: "Módulo 05",
  },
  en: {
    navItem: "UX Campus",
    tabModule: "Module",
    tabTest: "Test",
    moduleTitle: "Module 05 – How Does a Bond Work?",
    downloadPdf: "Download PDF",
    goToTest: "Go to Test",
    testTitle: "Module 05 Assessment",
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
    breadcrumbModule: "Module 05",
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
      theme: "01 · Bonos dentro del mercado de capitales",
      question:
        "¿Cuál es la principal diferencia entre comprar una acción y comprar un bono?",
      options: [
        "La acción otorga intereses pactados y el bono permite participar de las ganancias.",
        "La acción convierte al inversor en propietario y el bono lo convierte en acreedor.",
        "La acción se negocia en el mercado primario y el bono únicamente en el secundario.",
        "La acción posee vencimiento definido y el bono permanece vigente indefinidamente.",
      ],
      answer: 1,
      explanation:
        "Al comprar una acción, el inversor adquiere una participación en el patrimonio de la empresa. Al comprar un bono, presta dinero al emisor y obtiene un derecho de cobro.",
    },
    {
      theme: "02 · ¿Qué es un bono?",
      question: "¿Por qué los bonos se consideran instrumentos de renta fija?",
      options: [
        "Porque su precio de mercado permanece constante hasta la fecha de vencimiento.",
        "Porque el emisor garantiza que el inversor nunca sufrirá pérdidas de capital.",
        "Porque todos los bonos pagan la misma tasa durante toda su vida financiera.",
        "Porque sus principales condiciones de pago se definen al momento de emitirse.",
      ],
      answer: 3,
      explanation:
        "La tasa de cupón, el cronograma de pagos, la forma de amortización y el vencimiento se establecen desde la emisión. Esto brinda previsibilidad sobre los flujos, aunque no garantiza el rendimiento final.",
    },
    {
      theme: "03 · Mercado primario y secundario",
      question: "¿Qué ocurre cuando un inversor adquiere un bono en el mercado primario?",
      options: [
        "Los fondos invertidos se destinan al emisor que busca obtener financiamiento.",
        "Los fondos se transfieren al inversor que anteriormente era propietario del bono.",
        "El precio queda determinado exclusivamente por operaciones realizadas entre inversores.",
        "El emisor recupera un bono que había colocado previamente en el mercado.",
      ],
      answer: 0,
      explanation:
        "En el mercado primario se realiza la colocación inicial. El dinero pagado por los inversores llega al emisor y constituye el financiamiento obtenido.",
    },
    {
      theme: "03 · Mercado primario y secundario",
      question: "¿Cuál es una función fundamental del mercado secundario?",
      options: [
        "Establecer las condiciones contractuales que deberán incluirse en el prospecto de emisión.",
        "Transferir nuevamente al emisor los fondos pagados en cada compraventa posterior.",
        "Permitir la negociación entre inversores y aportar liquidez a los instrumentos.",
        "Determinar el monto nominal que podrá emitir una empresa o un Estado.",
      ],
      answer: 2,
      explanation:
        "En el mercado secundario, los bonos cambian de titular sin generar nuevo financiamiento para el emisor. Esto permite venderlos antes del vencimiento, contribuye a formar su precio y le da liquidez al instrumento.",
    },
    {
      theme: "04 · ¿Cómo se emite un bono?",
      question: "¿Qué función cumple el prospecto de emisión?",
      options: [
        "Registrar diariamente las variaciones del precio y el volumen negociado del bono.",
        "Documentar las condiciones financieras y contractuales que regirán al instrumento.",
        "Calcular el rendimiento final que obtendrá cada inversor según su momento de venta.",
        "Garantizar jurídicamente que el emisor cumplirá todos sus pagos sin excepción.",
      ],
      answer: 1,
      explanation:
        "El prospecto es el documento oficial en el que se establecen, entre otros datos, la moneda, el cupón, el vencimiento, la amortización y la legislación aplicable.",
    },
    {
      theme: "05 · Principales características",
      question: "¿Qué representa el valor nominal de un bono?",
      options: [
        "La unidad de referencia sobre la que se definen sus principales condiciones financieras.",
        "El precio que tendrá el instrumento durante todas las ruedas del mercado secundario.",
        "El monto que recibirá necesariamente el emisor después de finalizar la colocación.",
        "La suma del capital pendiente y los intereses acumulados desde el último cupón.",
      ],
      answer: 0,
      explanation:
        "El valor nominal es la base contractual del bono. Sobre él se calcula inicialmente el cupón y se expresa el capital que deberá devolverse, aunque no necesariamente coincide con el precio pagado por el inversor.",
    },
    {
      theme: "05 · Principales características",
      question: "Un bono con VN $1.000 se coloca a un precio de emisión de 90. ¿Cuál es su valor efectivo?",
      options: [
        "$90, porque la cotización indica directamente el importe desembolsado por el título.",
        "$100, porque el precio se calcula utilizando siempre una referencia de VN 100.",
        "$1.000, porque el valor efectivo debe coincidir con el valor nominal establecido.",
        "$900, porque el inversor paga el 90% del valor nominal suscripto.",
      ],
      answer: 3,
      explanation:
        "El precio 90 significa que se paga el 90% del valor nominal. Por lo tanto: $1.000 × 90% = $900.",
    },
    {
      theme: "06 · ¿Cómo gana dinero quien invierte?",
      question: "¿Qué ocurre cuando un bono se coloca bajo la par?",
      options: [
        "El inversor paga más que el valor nominal y obtiene un rendimiento menor al cupón.",
        "El inversor paga el valor nominal y obtiene un rendimiento idéntico al cupón.",
        "El inversor paga menos que el valor nominal y su rendimiento efectivo resulta mayor.",
        "El inversor deja de recibir intereses y solo recupera el capital al vencimiento.",
      ],
      answer: 2,
      explanation:
        "Al pagar menos por el bono y recibir los mismos intereses contractuales, el rendimiento calculado sobre el dinero efectivamente invertido aumenta.",
    },
    {
      theme: "06 · ¿Cómo gana dinero quien invierte?",
      question: "¿Cuál es la diferencia entre la tasa de cupón y la tasa de rendimiento efectivo?",
      options: [
        "La tasa de cupón se aplica sobre el valor nominal, mientras que el rendimiento efectivo depende del precio pagado.",
        "La tasa de cupón depende del precio pagado, mientras que el rendimiento efectivo se calcula sobre el valor nominal.",
        "La tasa de cupón se aplica sobre el valor técnico, mientras que el rendimiento efectivo depende del valor residual.",
        "La tasa de cupón depende del valor residual, mientras que el rendimiento efectivo se aplica sobre el precio nominal.",
      ],
      answer: 0,
      explanation:
        "La tasa de cupón se aplica sobre el valor nominal —o sobre el valor residual cuando corresponde—, mientras que la tasa de rendimiento efectivo depende del precio que el inversor pagó por el bono.",
    },
    {
      theme: "05 · Principales características",
      question: "¿Qué sucede con los intereses de un bono que amortiza capital progresivamente?",
      options: [
        "Se calculan sobre el valor nominal original, por lo que permanecen constantes si la tasa es fija.",
        "Se calculan sobre el valor residual, por lo que disminuyen junto con el capital pendiente si la tasa es fija.",
        "Se calculan sobre el precio de mercado, por lo que disminuyen cuando baja la cotización del bono.",
        "Se calculan sobre el valor técnico, por lo que aumentan junto con los intereses corridos si la tasa es fija.",
      ],
      answer: 1,
      explanation:
        "Una vez iniciadas las amortizaciones, la tasa de cupón se aplica sobre el capital que aún no fue devuelto, es decir, sobre el valor residual.",
    },
    {
      theme: "05 · Principales características",
      question: "¿Qué representa el valor técnico de un bono?",
      options: [
        "El precio promedio al que se negoció el instrumento durante la última rueda bursátil.",
        "El monto originalmente emitido menos todos los bonos vendidos en el mercado secundario.",
        "El valor nominal inicial multiplicado por la paridad informada en la ficha técnica.",
        "El capital pendiente de devolución más los intereses corridos desde el último pago.",
      ],
      answer: 3,
      explanation:
        "El valor técnico se obtiene sumando el valor residual y los intereses corridos. Representa el saldo contractual de la deuda en una fecha determinada.",
    },
    {
      theme: "05 · Principales características",
      question: "¿Qué indica que un bono tenga una paridad inferior al 100%?",
      options: [
        "Que su tasa de cupón es inferior a la inflación observada durante el último año.",
        "Que su valor residual es menor que el valor nominal originalmente emitido.",
        "Que su precio de mercado es inferior a su valor técnico y cotiza bajo la par.",
        "Que el emisor ya pagó la totalidad del capital y solo adeuda los intereses.",
      ],
      answer: 2,
      explanation:
        "La paridad relaciona el precio con el valor técnico. Una paridad menor al 100% significa que el mercado paga menos que el valor técnico, aunque eso no permite concluir por sí solo que el bono esté barato.",
    },
    {
      theme: "06 · ¿Cómo gana dinero quien invierte?",
      question:
        "Un bono tiene VN $100, paga $10 de intereses anuales y se coloca a $110. ¿Cuál es la interpretación correcta?",
      options: [
        "Se coloca sobre la par y su rendimiento efectivo es inferior a la tasa de cupón.",
        "Se coloca bajo la par y su rendimiento efectivo es superior a la tasa de cupón.",
        "Se coloca a la par y ambas tasas coinciden exactamente en un 10% anual.",
        "Se coloca sobre la par y su rendimiento efectivo supera el 10% anual.",
      ],
      answer: 0,
      explanation:
        "El inversor paga $110 para recibir $10 de intereses. Su rendimiento corriente es aproximadamente 10/110 = 9,1%, inferior a la tasa de cupón del 10%.",
    },
    {
      theme: "04 · ¿Cómo se emite un bono?",
      question:
        "¿Cuál de las siguientes características de un bono queda establecida en el prospecto de emisión y no cambia durante la vida del instrumento?",
      options: [
        "El precio de mercado al que se negocia diariamente entre inversores.",
        "El valor técnico que resulta de sumar el capital pendiente y los intereses corridos.",
        "La tasa de cupón que determina los intereses comprometidos por el emisor.",
        "La paridad que surge de comparar el precio de mercado con el valor técnico.",
      ],
      answer: 2,
      explanation:
        "La tasa de cupón forma parte de las condiciones contractuales definidas en el prospecto de emisión y permanece estable durante toda la vida del bono, salvo que el propio prospecto establezca una estructura variable previamente determinada. En cambio, el precio de mercado, el valor técnico y la paridad evolucionan a lo largo del tiempo.",
    },
    {
      theme: "07 · UX Lens: AL30",
      question:
        "El AL30 presenta un precio de USD 56,11, un valor residual de USD 64 y un interés corrido cercano a cero. ¿Qué conclusión es correcta?",
      options: [
        "Su valor técnico es USD 56,11 y su paridad se encuentra exactamente en el 100%.",
        "Su valor técnico es USD 120,11 y su precio se encuentra ampliamente sobre la par.",
        "Su valor técnico es USD 64 y su paridad supera el 100% del capital pendiente.",
        "Su valor técnico es cercano a USD 64 y su paridad es aproximadamente 87,9%.",
      ],
      answer: 3,
      explanation:
        "Como el interés corrido es prácticamente cero, el valor técnico coincide con el valor residual. La paridad se calcula como USD 56,11 / USD 64 × 100, lo que arroja aproximadamente 87,7%.",
    },
  ],
  en: [
    {
      theme: "01 · Bonds within capital markets",
      question: "What is the main difference between buying a stock and buying a bond?",
      options: [
        "A stock pays agreed-upon interest and a bond lets you share in profits.",
        "A stock makes the investor an owner and a bond makes them a creditor.",
        "A stock trades only in the primary market and a bond only in the secondary market.",
        "A stock has a defined maturity and a bond remains outstanding indefinitely.",
      ],
      answer: 1,
      explanation:
        "By buying a stock, the investor acquires a stake in the company's equity. By buying a bond, they lend money to the issuer and obtain a claim to repayment.",
    },
    {
      theme: "02 · What is a bond?",
      question: "Why are bonds considered fixed-income instruments?",
      options: [
        "Because their market price stays constant until maturity.",
        "Because the issuer guarantees the investor will never suffer capital losses.",
        "Because all bonds pay the same rate throughout their financial life.",
        "Because their main payment conditions are defined at the time of issuance.",
      ],
      answer: 3,
      explanation:
        "The coupon rate, payment schedule, amortization method and maturity are set at issuance. This provides predictability about the cash flows, though it doesn't guarantee the final return.",
    },
    {
      theme: "03 · Primary and secondary markets",
      question: "What happens when an investor buys a bond in the primary market?",
      options: [
        "The invested funds go to the issuer seeking financing.",
        "The funds are transferred to the investor who previously owned the bond.",
        "The price is determined exclusively by trades between investors.",
        "The issuer buys back a bond it had previously placed in the market.",
      ],
      answer: 0,
      explanation:
        "The primary market is where the initial placement takes place. The money paid by investors reaches the issuer and constitutes the financing obtained.",
    },
    {
      theme: "03 · Primary and secondary markets",
      question: "What is a fundamental function of the secondary market?",
      options: [
        "Setting the contractual conditions that must be included in the offering prospectus.",
        "Transferring the funds from every subsequent trade back to the issuer.",
        "Allowing trading between investors and providing liquidity to the instruments.",
        "Determining the face amount a company or a state may issue.",
      ],
      answer: 2,
      explanation:
        "In the secondary market, bonds change hands without generating new financing for the issuer. This allows investors to sell before maturity, helps form the price, and gives the instrument liquidity.",
    },
    {
      theme: "04 · How is a bond issued?",
      question: "What is the purpose of the offering prospectus?",
      options: [
        "Recording the daily price and trading volume changes of the bond.",
        "Documenting the financial and contractual conditions that will govern the instrument.",
        "Calculating the final return each investor will get depending on when they sell.",
        "Legally guaranteeing that the issuer will meet every payment without exception.",
      ],
      answer: 1,
      explanation:
        "The prospectus is the official document that establishes, among other data, the currency, coupon, maturity, amortization and applicable law.",
    },
    {
      theme: "05 · Main characteristics",
      question: "What does a bond's face value represent?",
      options: [
        "The reference unit on which its main financial conditions are defined.",
        "The price the instrument will have during every secondary-market session.",
        "The amount the issuer will necessarily receive after the placement ends.",
        "The sum of the outstanding capital plus interest accrued since the last coupon.",
      ],
      answer: 0,
      explanation:
        "Face value is the bond's contractual base. The coupon is initially calculated on it, and it expresses the capital that must be repaid, although it doesn't necessarily match the price the investor paid.",
    },
    {
      theme: "05 · Main characteristics",
      question: "A bond with a face value of $1,000 is issued at a price of 90. What is its effective value?",
      options: [
        "$90, because the quoted price directly indicates the amount disbursed for the bond.",
        "$100, because the price is always calculated using a face-value reference of 100.",
        "$1,000, because the effective value must match the stated face value.",
        "$900, because the investor pays 90% of the subscribed face value.",
      ],
      answer: 3,
      explanation:
        "A price of 90 means 90% of the face value is paid. Therefore: $1,000 × 90% = $900.",
    },
    {
      theme: "06 · How do bond investors earn money?",
      question: "What happens when a bond is issued below par?",
      options: [
        "The investor pays more than the face value and gets a return lower than the coupon.",
        "The investor pays the face value and gets a return identical to the coupon.",
        "The investor pays less than the face value and their effective return is higher.",
        "The investor stops receiving interest and only recovers capital at maturity.",
      ],
      answer: 2,
      explanation:
        "By paying less for the bond while receiving the same contractual interest, the return calculated on the money actually invested increases.",
    },
    {
      theme: "06 · How do bond investors earn money?",
      question: "What is the difference between the coupon rate and the effective yield?",
      options: [
        "The coupon rate applies to the face value, while the effective yield depends on the price paid.",
        "The coupon rate depends on the price paid, while the effective yield is calculated on the face value.",
        "The coupon rate applies to the technical value, while the effective yield depends on the residual value.",
        "The coupon rate depends on the residual value, while the effective yield applies to the face price.",
      ],
      answer: 0,
      explanation:
        "The coupon rate applies to the face value — or to the residual value when applicable — while the effective yield depends on the price the investor paid for the bond.",
    },
    {
      theme: "05 · Main characteristics",
      question: "What happens to the interest on a bond that amortizes capital progressively?",
      options: [
        "It is calculated on the original face value, so it stays constant if the rate is fixed.",
        "It is calculated on the residual value, so it decreases along with the outstanding capital if the rate is fixed.",
        "It is calculated on the market price, so it decreases when the bond's quote falls.",
        "It is calculated on the technical value, so it increases along with accrued interest if the rate is fixed.",
      ],
      answer: 1,
      explanation:
        "Once amortization begins, the coupon rate is applied to the capital not yet repaid — that is, to the residual value.",
    },
    {
      theme: "05 · Main characteristics",
      question: "What does a bond's technical value represent?",
      options: [
        "The average price at which the instrument traded during the last market session.",
        "The originally issued amount minus every bond sold in the secondary market.",
        "The initial face value multiplied by the parity reported in the factsheet.",
        "The outstanding capital plus interest accrued since the last payment.",
      ],
      answer: 3,
      explanation:
        "Technical value is obtained by adding the residual value and accrued interest. It represents the debt's contractual balance on a given date.",
    },
    {
      theme: "05 · Main characteristics",
      question: "What does it indicate when a bond has a parity below 100%?",
      options: [
        "That its coupon rate is lower than the inflation observed over the last year.",
        "That its residual value is lower than the originally issued face value.",
        "That its market price is lower than its technical value and it trades below par.",
        "That the issuer already repaid all the capital and only owes interest.",
      ],
      answer: 2,
      explanation:
        "Parity relates price to technical value. A parity below 100% means the market pays less than the technical value, though that alone doesn't mean the bond is cheap.",
    },
    {
      theme: "06 · How do bond investors earn money?",
      question:
        "A bond has a face value of $100, pays $10 in annual interest, and is issued at $110. What is the correct interpretation?",
      options: [
        "It is issued above par and its effective yield is lower than the coupon rate.",
        "It is issued below par and its effective yield is higher than the coupon rate.",
        "It is issued at par and both rates match exactly at 10% annually.",
        "It is issued above par and its effective yield exceeds 10% annually.",
      ],
      answer: 0,
      explanation:
        "The investor pays $110 to receive $10 in interest. The current yield is approximately 10/110 = 9.1%, lower than the 10% coupon rate.",
    },
    {
      theme: "04 · How is a bond issued?",
      question:
        "Which of the following bond characteristics is set in the offering prospectus and does not change during the instrument's life?",
      options: [
        "The market price at which it trades daily between investors.",
        "The technical value obtained by adding outstanding capital and accrued interest.",
        "The coupon rate that determines the interest the issuer commits to pay.",
        "The parity that results from comparing the market price with the technical value.",
      ],
      answer: 2,
      explanation:
        "The coupon rate is part of the contractual terms set in the offering prospectus and stays stable throughout the bond's life, unless the prospectus itself establishes a predetermined variable structure. Market price, technical value and parity, by contrast, evolve over time.",
    },
    {
      theme: "07 · UX Lens: AL30",
      question:
        "The AL30 bond shows a price of USD 56.11, a residual value of USD 64, and accrued interest close to zero. Which conclusion is correct?",
      options: [
        "Its technical value is USD 56.11 and its parity is exactly 100%.",
        "Its technical value is USD 120.11 and its price is well above par.",
        "Its technical value is USD 64 and its parity exceeds 100% of outstanding capital.",
        "Its technical value is close to USD 64 and its parity is approximately 87.9%.",
      ],
      answer: 3,
      explanation:
        "Since accrued interest is practically zero, the technical value matches the residual value. Parity is calculated as USD 56.11 / USD 64 × 100, which gives approximately 87.7%.",
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
          href="/Nivel_2_-_Modulo_05.pdf"
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
          file="/Nivel_2_-_Modulo_05.pdf"
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

// ── Campus5 Page ──────────────────────────────────────────────────────────────

interface Campus5Props {
  onOpenBeta?: () => void;
}

const Campus5Page: React.FC<Campus5Props> = ({ onOpenBeta }) => {
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

export default Campus5Page;
