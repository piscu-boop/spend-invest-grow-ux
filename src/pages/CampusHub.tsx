import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, ClipboardList, TrendingUp, ArrowRight, Clock, FileText } from "lucide-react";

const content = {
  es: {
    eyebrow: "UX CAMPUS",
    title: "Tu educación financiera empieza acá.",
    description:
      "No hace falta ser experto para entender cómo funciona el dinero. UX Campus es el espacio de aprendizaje de UX Capital: módulos breves, concretos y evaluados, diseñados para que puedas tomar mejores decisiones con tus finanzas — y aprovechar al máximo UX Dual.",
    howTitle: "¿Cómo funciona?",
    steps: [
      { label: "Leé el módulo", detail: "Material conciso en PDF, a tu ritmo." },
      { label: "Completá el test", detail: "15 preguntas con feedback inmediato." },
      { label: "Avanzás de nivel", detail: "Construís tu base financiera módulo a módulo." },
    ],
    modulesTitle: "Módulos disponibles",
    level: "NIVEL",
    badge: "NIVEL 1",
    moduleTitle: "Módulo 01 – Fundamentos de las Finanzas Personales",
    moduleDesc:
      "El punto de partida para cualquier persona que quiera entender cómo funciona el dinero.",
    tags: ["Sistema financiero", "Ahorro e inversión", "Inflación", "Riesgo"],
    meta: { pdf: "PDF", questions: "15 preguntas", time: "~30 min" },
    cta: "Empezar módulo",
    module2Title: "Módulo 02 – Planificación Financiera Personal",
    module2Desc:
      "Herramientas para construir tu presupuesto, definir objetivos y diseñar tu sistema financiero personal.",
    tags2: ["Presupuesto", "Ahorro", "Fondo de emergencia", "Plazos de inversión"],
    badge2: "NIVEL 1",
    meta2: { pdf: "PDF", questions: "15 preguntas", time: "~30 min" },
    cta2: "Empezar módulo",
    module3Title: "Módulo 03 – Construcción de Patrimonio",
    module3Desc:
      "Comprender qué es el patrimonio, cómo se construye y por qué constituye el verdadero objetivo de las finanzas personales.",
    tags3: ["Patrimonio", "Activos y pasivos", "Seguridad financiera", "Jubilación"],
    badge3: "NIVEL 1",
    meta3: { pdf: "PDF", questions: "15 preguntas", time: "~30 min" },
    cta3: "Empezar módulo",
  },
  en: {
    eyebrow: "UX CAMPUS",
    title: "Your financial education starts here.",
    description:
      "You don't need to be an expert to understand how money works. UX Campus is UX Capital's learning space: short, concrete, and assessed modules designed to help you make better financial decisions — and get the most out of UX Dual.",
    howTitle: "How does it work?",
    steps: [
      { label: "Read the module", detail: "Concise PDF material, at your own pace." },
      { label: "Complete the test", detail: "15 questions with immediate feedback." },
      { label: "Level up", detail: "Build your financial foundation module by module." },
    ],
    modulesTitle: "Available modules",
    level: "LEVEL",
    badge: "LEVEL 1",
    moduleTitle: "Module 01 – Fundamentals of Personal Finance",
    moduleDesc:
      "The starting point for anyone who wants to understand how money works.",
    tags: ["Financial system", "Savings & investment", "Inflation", "Risk"],
    meta: { pdf: "PDF", questions: "15 questions", time: "~30 min" },
    cta: "Start module",
    module2Title: "Module 02 – Personal Financial Planning",
    module2Desc:
      "Tools to build your budget, define goals, and design your personal financial system.",
    tags2: ["Budget", "Savings", "Emergency fund", "Investment horizons"],
    badge2: "LEVEL 1",
    meta2: { pdf: "PDF", questions: "15 questions", time: "~30 min" },
    cta2: "Start module",
    module3Title: "Module 03 – Building Wealth",
    module3Desc:
      "Understand what wealth is, how it's built, and why it's the true goal of personal finance.",
    tags3: ["Net worth", "Assets & liabilities", "Financial security", "Retirement"],
    badge3: "LEVEL 1",
    meta3: { pdf: "PDF", questions: "15 questions", time: "~30 min" },
    cta3: "Start module",
  },
};

const STEP_ICONS = [BookOpen, ClipboardList, TrendingUp];

interface CampusHubProps {
  onOpenBeta?: () => void;
}

const CampusHub: React.FC<CampusHubProps> = ({ onOpenBeta }) => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="min-h-screen bg-palette-a">
      <Navigation onOpenBeta={onOpenBeta} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-4">
            {c.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white leading-tight mb-6">
            {c.title}
          </h1>
          <p className="text-base md:text-lg text-uxc-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {c.description}
          </p>
        </div>
      </section>

      {/* ── Cómo funciona ────────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-uxc-muted-foreground mb-10">
            {c.howTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={i}
                  className="relative rounded-2xl border border-white/10 bg-uxc-card px-6 py-7 flex flex-col gap-3"
                >
                  {/* Step number */}
                  <span className="absolute top-5 right-5 text-xs font-bold text-white/15 font-display">
                    0{i + 1}
                  </span>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 border border-teal/20">
                    <Icon className="h-5 w-5 text-teal" />
                  </div>
                  <p className="font-semibold text-white text-base">{step.label}</p>
                  <p className="text-sm text-uxc-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Módulos ──────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-uxc-muted-foreground mb-8">
            {c.modulesTitle}
          </h2>

          {/* Module card */}
          <div className="rounded-2xl border border-white/10 bg-uxc-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
            {/* Left: content */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Badge */}
              <span className="inline-flex self-start items-center rounded-full bg-teal/10 border border-teal/25 px-3 py-1 text-xs font-bold text-teal tracking-wider">
                {c.badge}
              </span>

              <div>
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {c.moduleTitle}
                </h3>
                <p className="text-sm text-uxc-muted-foreground leading-relaxed">
                  {c.moduleDesc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-uxc-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs text-uxc-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {c.meta.pdf}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {c.meta.questions}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {c.meta.time}
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex md:flex-col md:items-end md:justify-center shrink-0">
              <Link
                to="/campus/modulo-01"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy-deep hover:opacity-90 transition-opacity"
              >
                {c.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Module 02 card */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-uxc-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
            {/* Left: content */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Badge */}
              <span className="inline-flex self-start items-center rounded-full bg-teal/10 border border-teal/25 px-3 py-1 text-xs font-bold text-teal tracking-wider">
                {c.badge2}
              </span>

              <div>
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {c.module2Title}
                </h3>
                <p className="text-sm text-uxc-muted-foreground leading-relaxed">
                  {c.module2Desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {c.tags2.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-uxc-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs text-uxc-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {c.meta2.pdf}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {c.meta2.questions}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {c.meta2.time}
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex md:flex-col md:items-end md:justify-center shrink-0">
              <Link
                to="/campus/modulo-02"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy-deep hover:opacity-90 transition-opacity"
              >
                {c.cta2}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Module 03 card */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-uxc-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
            {/* Left: content */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Badge */}
              <span className="inline-flex self-start items-center rounded-full bg-teal/10 border border-teal/25 px-3 py-1 text-xs font-bold text-teal tracking-wider">
                {c.badge3}
              </span>

              <div>
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {c.module3Title}
                </h3>
                <p className="text-sm text-uxc-muted-foreground leading-relaxed">
                  {c.module3Desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {c.tags3.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-uxc-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs text-uxc-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {c.meta3.pdf}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {c.meta3.questions}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {c.meta3.time}
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex md:flex-col md:items-end md:justify-center shrink-0">
              <Link
                to="/campus/modulo-03"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy-deep hover:opacity-90 transition-opacity"
              >
                {c.cta3}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampusHub;
