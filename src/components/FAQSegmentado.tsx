import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQSegmentadoProps {
  defaultFilter?: "general" | "consumer" | "merchant" | "manufacturer";
}

const FAQSegmentado = ({ defaultFilter = "general" }: FAQSegmentadoProps) => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<"general" | "consumer" | "merchant" | "manufacturer">(defaultFilter);

  const content = {
    en: {
      heroTitle: "Frequently Asked Questions",
      heroSubtitle: "Get answers to common questions about UX Dual and how it works.",
      filters: {
        general: "Regulations & General Info",
        consumer: "Consumer",
        merchant: "Merchant",
        manufacturer: "Manufacturer"
      },
      faqs: {
        general: [
          {
            question: "Is UX Capital a Bank or Financial Entity?",
            answer: "UX Capital is a Payment Service Provider License BCRA No. 34.595 and is not authorized by the BCRA to operate as a financial entity."
          },
          {
            question: "Where is my money invested?",
            answer: "In the FCI 'Delta Pesos' (Delta Pesos FCI). Managed by Delta Asset Management. Delta Asset Management Agent for the administration of collective investment products FCI registered in CNV Registry No. 40 / Delta Asset Management Integral Placement and Distribution Agent registered in CNV Registry No. 158."
          },
          {
            question: "What is the process to start Balance and Purchase Investment?",
            answer: "Once you accept the Terms and Conditions (T&C) when creating your account, you will be ready to start investing your balance in Delta Pesos FCI."
          },
          {
            question: "What is the process to stop investing my Available Balance and my purchases?",
            answer: "If you are considering deactivating your client account (Balance Investment), we want to remind you that it is an essential part for the functioning of your account. Therefore, to completely deactivate your account, you must go to your user profile and proceed with the total deactivation of the same."
          }
        ],
        consumer: [
          {
            question: "How do I make money with UX Dual?",
            answer: "Your money from Available Balance and from purchases is in Delta Pesos FCI generating daily returns, allowing your spending money to grow while allowing you to meet your daily expenses and obligations."
          },
          {
            question: "Is my money safe and accessible?",
            answer: "Yes, your money is under custody of Delta Pesos FCI, managed by Delta Asset Management. (Delta Asset Management S.A. is Agent for the Administration of Collective Investment Products FCI (AAPIC FCI) registered in CNV under Registration No. 40, and Integral Placement and Distribution Agent (ACDI) registered in CNV under Registration No. 158)"
          },
          {
            question: "Do I need previous investment experience to use UX Dual?",
            answer: "Not at all! UX Dual handles all investment decisions automatically, making wealth building as simple as your regular shopping."
          },
          {
            question: "What types of returns can I expect?",
            answer: "Returns vary according to market conditions, but our platform is designed to generate consistent daily returns for both your available balance and your purchases."
          },
          {
            question: "How long is my money invested for purchases?",
            answer: "Your money for purchases is invested from the moment you deposited it in UX Dual, until the first business day of the following month."
          }
        ],
        merchant: [
          {
            question: "What added value do I have by adopting UX Dual in my business?",
            answer: "Something incredible and never seen before. Your customer transforms expenses in your business into investments with daily interest. For your customer, you are no longer an expense, you are an investment. The lowest processing cost you have ever had."
          },
          {
            question: "Do I need to pay for a POS?",
            answer: "No, not at all. We take care of everything, you just collect with our QR."
          }
        ],
        manufacturer: [
          {
            question: "What does it mean that I will allow my merchants to pay with UX Dual?",
            answer: "You will allow your allied merchants and distributors to profit from the amount of the purchase they make from you, generating a tangible and brutal financial benefit for them."
          },
          {
            question: "Do I have a cost?",
            answer: "No, on the contrary, you have a brutal tool to retain all your allied merchants and distributors."
          },
          {
            question: "Do I need anything to adopt UX Dual with my allied merchants and distributors?",
            answer: "Yes, contact us, we provide you with all the tools so that the only thing you have to do is tell them that from now on, their purchases generate a financial return all month."
          },
          {
            question: "Do I need a new system to use UX Dual with my allied merchants and distributors?",
            answer: "We provide you with a simple management system so you can track everything sold with UX Dual."
          }
        ]
      }
    },
    es: {
      heroTitle: "Preguntas Frecuentes",
      heroSubtitle: "Obtené respuestas a preguntas comunes sobre UX Dual y cómo funciona.",
      filters: {
        general: "Regulaciones & Info General",
        consumer: "Consumidor",
        merchant: "Comercio",
        manufacturer: "Fabricante"
      },
      faqs: {
        general: [
          {
            question: "¿UX Capital es un Banco o Entidad Financiera?",
            answer: "UX Capital es un Proveedor de Servicios de Pago Licencia BCRA Nro. 34.595 y no está autorizado por el BCRA para operar como entidad financiera."
          },
          {
            question: "¿En donde se invierte mi dinero?",
            answer: "En el FCI 'Delta Pesos' (Delta Pesos FCI). Administrado por Delta Asset Management. Delta Asset Management Agente de administración de productos de inversión colectiva FCI inscripto en el registro CNV Nro. 40 / Delta Asset Management Agente de Colocación y Distribución Integral inscripto en el registro CNV Nro. 158."
          },
          {
            question: "¿Cuál es el proceso para iniciar la Inversión de Saldos y Compras?",
            answer: "Una vez aceptados los Terminos y Condiciones (TyC) en la creación de tu cuenta, estarás listo para comenzar a invertir tu saldo en Delta Pesos FCI."
          },
          {
            question: "¿Cuál es el proceso para dejar de invertir mi Saldo Disponible y mis compras?",
            answer: "Si estás considerando dar de baja tu cuenta comitente (Inversion de saldos), queremos recordarte que es una parte esencial para el funcionamiento de tu cuenta. Por eso, para desactivar completamente tu cuenta, deberás dirigirte a tu perfil de usuario y proceder con la baja total de la misma."
          }
        ],
        consumer: [
          {
            question: "¿Cómo gano dinero con UX Dual?",
            answer: "Tu dinero por Saldo disponible y por compras esta en Delta Pesos FCI generando retornos diarios, permitiendo que tu dinero de gastos crezca mientras te permite cumplir con tus gastos y obligaciones cotidianas."
          },
          {
            question: "¿Esta mi dinero seguro y accesible?",
            answer: "Sí, tu dinero esta bajo custodia de Delta Pesos FCI, administrada por Delta Asset Management. (Delta Asset Management S.A. es Agente de Administración de Productos de Inversión Colectiva FCI (AAPIC FCI) registrado en CNV bajo la Matrícula Nro. 40, y Agente de Colocación y Distribución Integral (ACDI) registrado en CNV bajo la Matrícula Nro. 158)"
          },
          {
            question: "¿Necesito experiencia previa en inversiones para usar UX Dual?",
            answer: "¡Para nada! UX Dual maneja todas las decisiones de inversión automáticamente, haciendo la construcción de riqueza tan simple como tus compras regulares."
          },
          {
            question: "¿Que tipos de retornos puedo esperar?",
            answer: "Los retornos varían según las condiciones del mercado, pero nuestra plataforma está diseñada para generar retornos diarios consistentes tanto para tu saldo disponible como para tus compras."
          },
          {
            question: "¿Cuanto tiempo se invierte mi dinero por compras?",
            answer: "Tu dinero por compras esta invertido desde el momento que lo depositaste en UX Dual, hasta el primer dia habil del mes siguiente."
          }
        ],
        merchant: [
          {
            question: "¿Que valor agregado tengo adoptando UX Dual en mi comercio?",
            answer: "Algo increible y nunca antes visto. Tu cliente transforma los gastos en tu comercio, en inversiones con intereses diarios. Para tu cliente ya no sos mas un gasto, sos una inversión. El costo de procesamiento mas bajo que hayas tenido."
          },
          {
            question: "¿Necesito pagar un POS?",
            answer: "No, de ninguna manera. Nosotros nos encargamos de todo, vos solo cobras con nuestro QR."
          }
        ],
        manufacturer: [
          {
            question: "¿Que significa que voy a permitirles pagar a mis comercios con UX Dual?",
            answer: "Le vas a permitir a tus comercios aliados y distribuidores, poder rentabilizar el monto de la compra que te hagan, generandoles un beneficio financiero tangible y brutal."
          },
          {
            question: "¿Tengo costo?",
            answer: "No, al contrario, tenes una herramienta brutal para fidelizar a todos tus comercios aliados y distribuidores."
          },
          {
            question: "¿Necesito algo para adoptar UX Dual frente a mis comercios aliados y distribuidores?",
            answer: "Si, contactarte con nosotros, te brindamos todas las herramientas para que lo unico que tengas que hacer, es avisarles que de ahora en mas, sus compras les generan un retorno financiero todo el mes."
          },
          {
            question: "¿Necesito algun sistema nuevo para usar UX Dual frente a mis comercios aliados y distribuidores?",
            answer: "Nosotros te brindamos un sistema de gestion simple para que puedas hacer seguimiento a todo lo vendido con UX Dual."
          }
        ]
      }
    }
  };

  const currentContent = content[language];
  const currentFAQs = currentContent.faqs[activeFilter];

  return (
    <section className="text-white">
      {/* Hero */}
      <div className="pt-32 pb-10 text-center px-4 md:pt-40">
        <p className="eyebrow text-teal">FAQ</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl mb-3">
          {currentContent.heroTitle}
        </h1>
        <p className="text-lg text-uxc-muted-foreground">
          {currentContent.heroSubtitle}
        </p>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.entries(currentContent.filters) as [typeof activeFilter, string][]).map(([key, label]) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => { setActiveFilter(key); setOpenIndex(0); }}
                className="text-sm font-medium transition-all duration-200"
                style={{
                  padding: "8px 20px",
                  borderRadius: "24px",
                  border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  background: isActive ? "var(--color-accent)" : "rgba(255,255,255,0.06)",
                  color: isActive ? "#0A1A0F" : "rgba(255,255,255,0.6)",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(77,240,172,0.3)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-2">
          {currentFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOpen ? "rgba(77,240,172,0.25)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "8px",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  className="w-full flex justify-between items-center text-left transition-colors duration-200"
                  style={{ padding: "20px 24px" }}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <h3
                    className="pr-4"
                    style={{ color: "#fff", fontSize: "16px", fontWeight: 500, lineHeight: 1.4 }}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className="flex-shrink-0 text-xl font-light leading-none"
                    style={{
                      color: "var(--color-accent)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 20px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "16px",
                    }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.7 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSegmentado;
