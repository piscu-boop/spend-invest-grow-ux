import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  es: {
    eyebrow: "Un nuevo estándar de pagos",
    rails: [
      { word: "CRÉDITO", desc: "Pagás con plata prestada." },
      { word: "DÉBITO", desc: "Pagás con plata que se va." },
      { word: "INVERTÍ COMPRANDO", desc: "Invertís sin ahorros, pagando." },
    ],
    closing: "El tercer riel",
    closingHighlight: " ya existe.",
  },
  en: {
    eyebrow: "A new payment standard",
    rails: [
      { word: "CREDIT", desc: "You pay with borrowed money." },
      { word: "DEBIT", desc: "You pay with money that's gone." },
      { word: "INVEST BY SPENDING", desc: "You invest without savings, by paying." },
    ],
    closing: "The third rail",
    closingHighlight: " already exists.",
  },
};

// Scroll-progress windows: each legacy rail reveals word → line → description,
// then both dim once the third rail lands.
const LEGACY_STARTS = [0, 0.25];
const DIM_RANGE = [0.6, 0.75];

function LegacyRail({
  progress,
  start,
  word,
  desc,
}: {
  progress: MotionValue<number>;
  start: number;
  word: string;
  desc: string;
}) {
  const wordOpacity = useTransform(progress, [start, start + 0.07], [0, 1]);
  const wordY = useTransform(progress, [start, start + 0.07], [24, 0]);
  const lineScale = useTransform(progress, [start + 0.07, start + 0.14], [0, 1]);
  const descOpacity = useTransform(progress, [start + 0.14, start + 0.2], [0, 1]);
  const rowOpacity = useTransform(progress, DIM_RANGE, [1, 0.5]);

  return (
    <motion.div className="rail-row" style={{ opacity: rowOpacity }}>
      <motion.span
        className="rail-word font-display font-bold leading-none text-[#4A5680]"
        style={{ opacity: wordOpacity, y: wordY }}
      >
        {word}
      </motion.span>
      <motion.span
        className="rail-line block h-[2px] origin-left bg-[#3A4670]"
        style={{ scaleX: lineScale }}
      />
      <motion.span
        className="rail-desc text-[17px] leading-[1.4] text-uxc-muted-foreground"
        style={{ opacity: descOpacity }}
      >
        {desc}
      </motion.span>
    </motion.div>
  );
}

function UxRail({
  progress,
  word,
  desc,
}: {
  progress: MotionValue<number>;
  word: string;
  desc: string;
}) {
  const wordOpacity = useTransform(progress, [0.5, 0.55], [0, 1]);
  const wordY = useTransform(progress, [0.5, 0.55], [24, 0]);
  const lineScale = useTransform(progress, [0.55, 0.6875], [0, 1]);
  const glowBlur = useTransform(progress, [0.6875, 0.72, 0.76], [0, 24, 0]);
  const glowSpread = useTransform(progress, [0.6875, 0.72, 0.76], [0, 5, 0]);
  const boxShadow = useMotionTemplate`0 0 ${glowBlur}px ${glowSpread}px rgba(58,123,255,0.45)`;
  const descOpacity = useTransform(progress, [0.69, 0.74], [0, 1]);

  return (
    <div className="rail-row">
      <motion.span
        className="rail-word font-display font-bold leading-none text-white"
        style={{ opacity: wordOpacity, y: wordY }}
      >
        {word}
      </motion.span>
      <motion.span
        className="rail-line block h-[6px] origin-left rounded-full bg-blue"
        style={{ scaleX: lineScale, boxShadow }}
      />
      <motion.span
        className="rail-desc text-[17px] font-medium leading-[1.4] text-white"
        style={{ opacity: descOpacity }}
      >
        {desc}
      </motion.span>
    </div>
  );
}

export function PaymentRails() {
  const { language } = useLanguage();
  const c = content[language];
  const ref = useRef<HTMLElement>(null);
  // Manual progress instead of useScroll: framer's ScrollTimeline acceleration
  // drops the end value of partial-range opacity keyframes.
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      scrollYProgress.set(range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);
  const closingOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const [step, setStep] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(p < 0.25 ? 1 : p < 0.5 ? 2 : 3);
  });

  const counter = ["01", "02", "03"].slice(0, step).join(" · ");

  return (
    <section ref={ref} id="estandar" className="bg-palette-a relative h-[250vh] md:h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="mx-6 w-[calc(100%-48px)] max-w-[1280px] rounded-[32px] border border-white/10 bg-[#081025] p-[clamp(28px,5vw,80px)]">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.22em] text-uxc-muted-foreground">
            <span>{c.eyebrow}</span>
            <span className="hidden md:inline">{counter}</span>
          </div>

          <div className="my-10 flex flex-col gap-8 md:my-14 md:gap-10">
            {LEGACY_STARTS.map((start, i) => (
              <LegacyRail
                key={c.rails[i].word}
                progress={scrollYProgress}
                start={start}
                word={c.rails[i].word}
                desc={c.rails[i].desc}
              />
            ))}
            <UxRail progress={scrollYProgress} word={c.rails[2].word} desc={c.rails[2].desc} />
          </div>

          <motion.p
            className="font-display text-[clamp(20px,2.2vw,28px)]"
            style={{ opacity: closingOpacity }}
          >
            {c.closing}
            <span className="text-blue">{c.closingHighlight}</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
