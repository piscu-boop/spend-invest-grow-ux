import { useLanguage } from "@/contexts/LanguageContext";

export const WhyUxDual = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      headerTitle: "The Future of ",
      headerHighlight: "Wealth Creation",
      headerSubtitle: "Revolutionary technology that transforms how you build wealth through everyday spending",
      highlights: [
        {
          title: "NO SAVINGS REQUIRED",
          description: "Every individual will be able to turn their everyday spending into daily investments with daily returns — no savings required."
        },
        {
          title: "CREATE WEALTH",
          description: "For the first time ever, you can build wealth through your everyday spending. No one has done it before — only us: UX Capital"
        }
      ],
      callToAction: (
        <>
          Only available to{" "}
          <span className="text-ux-green font-bold">100 Pre-subscribed users</span>, already
          taking advantage of UX Dual. Very soon…<span className="text-ux-green font-bold">YOU</span>
        </>
      )
    },
    es: {
      headerTitle: "El Futuro de la ",
      headerHighlight: "Creación de Riqueza",
      headerSubtitle: "Tecnología revolucionaria que transforma cómo construyes riqueza a través de tus gastos diarios",
      highlights: [
        {
          title: "NO NECESITAS AHORROS",
          description: "Ahora, cualquier persona puede convertir sus gastos en inversiones diarias con rendimientos diarios. Ya no necesitás ahorrar."
        },
        {
          title: "CREA RIQUEZA",
          description: "Por primera vez, vas a poder generar riqueza a través de tus gastos cotidianos. Nadie lo hizo antes - solo nosotros: UX Capital"
        }
      ],
      callToAction: (
        <>
          Solo disponible para{" "}
          <span className="text-ux-green font-bold">100 usuarios pre-suscritos</span>, que ya están utilizando UX Dual. Muy pronto…<span className="text-ux-green font-bold">TU</span>
        </>
      )
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-[#1C304F] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {currentContent.headerTitle}
            <span className="text-green-400">{currentContent.headerHighlight}</span>
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            {currentContent.headerSubtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {currentContent.highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 relative group hover:border-green-400 transition-all duration-300"
            >
              <div>
                <h3 className="text-green-400 font-bold text-sm mb-4 uppercase tracking-wide">
                  {highlight.title}
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-ux-green/10 border-l-8 border-ux-green border border-ux-green rounded-2xl p-8 mt-12 text-lg font-bold shadow-lg mx-auto max-w-4xl flex items-center gap-4">
          <svg className="w-8 h-8 text-ux-green flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <span className="text-white font-bold">
            {language === "en"
              ? <>
                  Only available to{" "}
                  <span className="text-ux-green font-bold">100 Pre-subscribed users</span>, already
                  taking advantage of UX Dual.<br />
                  Very soon… <span className="text-ux-green font-bold">YOU</span>
                </>
              : <>
                  Solo disponible para{" "}
                  <span className="text-ux-green font-bold">100 usuarios pre-suscritos</span>, que ya están utilizando UX Dual.<br />
                  Muy pronto… <span className="text-ux-green font-bold">TÚ</span>
                </>
            }
          </span>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-400 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-400 opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-400 opacity-5 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};



/*
    const WhyUxDual = () => (
    <section className="bg-ux-navy py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ux-green mb-8">
            Why UX Dual?
        </h2>
        <div className="space-y-6">
            <div className="bg-ux-green/10 rounded-lg px-6 py-4 text-lg text-gray-200 font-medium shadow">
            Every individual will be able to turn all your spendings into{" "}
            <span className="text-ux-green font-bold">daily investments</span> with
            daily returns,{" "}
            <span className="font-bold">NO SAVINGS REQUIRED.</span>
            </div>
            <div className="bg-ux-green/5 rounded-lg px-6 py-4 text-lg text-gray-200 font-medium shadow">
            For the first time ever, you will now be able to create{" "}
            <span className="text-ux-green font-bold">WEALTH</span> in your
            everyday-spendings. No one did before, just{" "}
            <span className="font-bold">US…UX Capital.</span>
            </div>
            <div className="bg-blue-900/40 border-l-4 border-ux-green rounded-lg px-6 py-4 text-lg text-gray-200 font-semibold shadow">
            Only available to{" "}
            <span className="text-ux-green font-bold">100 Pre-subscribed clients</span>, already
            taking advantage of UX Dual. Very soon…<span className="text-ux-green font-bold">YOU!</span>
            </div>
        </div>
        </div>
    </section>
    );

    export default WhyUxDual; 
    */