import React, { FormEvent, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import countries from 'world-countries'; 
import 'react-phone-input-2/lib/style.css';

interface Props {
  open: boolean;
  onClose: () => void;
  scriptURL: string;
}

// ────────────────────────────────────────
// Diccionarios
// ────────────────────────────────────────
const i18n = {
  en: {
    title: "🚀 Be Part of our VIP list!",
    subtitle: 'Turn every purchase into a growth opportunity.\nLeave us your details to join our pre-subscribers list and you will be notified when we launch UX DUAL.',
    name: 'Name *',
    lastName: 'Last name *',
    email: 'Email *',
    phone: 'Phone (e.g. +1 555‑1234)',
    nationality: 'Nationality *',
    spendingLabel: 'Estimated monthly spending in US dollars',
    btn: 'Notify me',
    required: 'All fields are required',
    privacy: 'I accept the privacy policy',
    success: 'Thank you for signing up! We will notify you when we launch UX DUAL',
    errorSend: 'Could not subscribe. Try again later.'
  },
  es: {
    title: '🚀 ¡Sé parte de nuestra lista exclusiva!',
    subtitle: 'Transforma cada compra en una oportunidad de crecimiento.\nDéjanos tus datos para unirte a nuestra lista de pre suscriptores y seras notificado cuando lancemos UX DUAL.',
    name: 'Nombre *',
    lastName: 'Apellido *',
    email: 'Correo electrónico *',
    phone: 'Teléfono (ej.: +54 11 1234‑5678)',
    nationality: 'Nacionalidad *',
    spendingLabel: 'Gasto mensual estimado en dólares',
    btn: 'Notifícame',
    required: 'Todos los campos son obligatorios',
    privacy: 'Acepto la política de privacidad',
    success: '¡Gracias por registrarte! Te avisaremos cuando lancemos UX DUAL',
    errorSend: 'No pudimos registrar tus datos. Inténtalo más tarde.'
  }
} as const;

const spendingOptions = [
  { value: '0-500000', en: '$0 – $500', es: '$0 – $500' },
  { value: '501000-1000000', en: '$501 – $1,000', es: '$501 – $1.000' },
  { value: '>1000000', en: 'More than $1,000', es: 'Más de $1.000' }
];

const inputClass =
  'w-full rounded-lg border border-ux-green/20 bg-[#1C304F] text-white placeholder-gray-400 p-3 focus:border-ux-green focus:outline-none';

/* Devuelve emoji bandera si la librería no lo trae */
const flagEmoji = (code: string) =>
  code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

// ────────────────────────────────────────
const BetaModal: React.FC<Props> = ({ open, onClose, scriptURL }) => {
  const { language } = useLanguage();
  const t = i18n[language];

  /* Lista completa de países */
  const nationalityOptions = useMemo(() => {
    return countries.map((c) => ({
      code: c.cca2,
      flag: c.flag || flagEmoji(c.cca2),
      label: language === 'es' ? c.translations.spa?.common || c.name.common : c.name.common
    }));
  }, [language]);

  // ─ State
  const [sending, setSending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [spendingRange, setSpendingRange] = React.useState('');
  const [acceptPrivacy, setAcceptPrivacy] = React.useState(false);

  if (!open) return null;

  // ─ Helpers
  const buildQuery = (): string => {
    const params = new URLSearchParams({
      action: 'register',
      first_name: name,
      last_name: lastName,
      email,
      phone,
      monthlySpending: spendingRange,
      nationality:nationality,
      acceptPrivacy: String(acceptPrivacy)
    });
    return `${scriptURL}?${params.toString()}`;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!name || !lastName || !email || !spendingRange || !nationality || !acceptPrivacy) {
      setError(t.required);
      return;
    }
    try {
      setSending(true);
      const res = await fetch(buildQuery()); // GET → AppsScript doGet
      const json = await res.json();
      if (json.ok) {
        setSuccess(true);
        // opcional: limpiar campos
      } else {
        setError(json.message || t.errorSend);
      }
    } catch (err) {
      console.error(err);
      setError(t.errorSend);
    } finally {
      setSending(false);
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-[#1C304F] p-8 text-center shadow-2xl text-white space-y-6">
          <h2 className="text-2xl font-bold">{t.success}</h2>
          <button
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
            className="mx-auto rounded-full bg-ux-green py-2 px-6 font-semibold text-[#1C304F] hover:bg-ux-green/90"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // ─ UI principal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1C304F] p-8 text-center shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white focus:ring-2 focus:ring-ux-green rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t.title}</h2>
        <p className="mb-6 text-gray-300">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input type="text" placeholder={t.name} required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          <input type="text" placeholder={t.lastName} required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
          <input type="email" placeholder={t.email} required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />

          {/* Nationality */}
          <select value={nationality} onChange={(e) => setNationality(e.target.value)} className={`${inputClass} pr-8`} required>
            <option value="" disabled>
              {t.nationality}
            </option>
            {nationalityOptions.map((n) => (
              <option key={n.code} value={n.code} className="bg-[#1C304F]">
                {n.flag} {n.label}
              </option>
            ))}
          </select>

          <input type="tel" placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />

          {/* Spending */}
          <select value={spendingRange} onChange={(e) => setSpendingRange(e.target.value)} className={`${inputClass} pr-8`} required>
            <option value="" disabled>
              {t.spendingLabel}
            </option>
            {spendingOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-[#1C304F]">
                {language === 'en' ? o.en : o.es}
              </option>
            ))}
          </select>

          {/* Privacy checkbox */}
          <label className="flex items-start gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-400 bg-[#1C304F] text-ux-green focus:ring-ux-green"
              required
            />
            <span>{t.privacy}</span>
          </label>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-ux-green py-3 font-semibold text-[#1C304F] transition hover:bg-ux-green/90 disabled:opacity-60"
          >
            {sending ? 'Sending…' : t.btn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetaModal;
