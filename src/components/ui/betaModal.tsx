import React, { FormEvent, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import countries from 'world-countries';
import 'react-phone-input-2/lib/style.css';

interface Props {
  open: boolean;
  onClose: () => void;
  scriptURL: string;
}

const i18n = {
  en: {
    title: "Join the waitlist",
    subtitle: "Turn every purchase into a growth opportunity. Be the first to know when we launch.",
    name: 'Name *',
    lastName: 'Last name *',
    email: 'Email *',
    phone: 'Phone (e.g. +1 555‑1234)',
    nationality: 'Nationality *',
    spendingLabel: 'Estimated monthly spending in US dollars',
    btn: 'Join waitlist',
    required: 'All fields are required',
    privacyPrefix: 'I have read and accept the ',
    privacyLink:   'Privacy Policy',
    privacySuffix: '',
    success: 'Thank you for signing up! We will notify you when we launch UX DUAL',
    errorSend: 'Could not subscribe. Try again later.'
  },
  es: {
    title: 'Unite a la lista de espera',
    subtitle: 'Transformá cada compra en una oportunidad de crecimiento. Sé de los primeros en saber cuando lancemos.',
    name: 'Nombre *',
    lastName: 'Apellido *',
    email: 'Correo electrónico *',
    phone: 'Teléfono (ej.: +54 11 1234‑5678)',
    nationality: 'Nacionalidad *',
    spendingLabel: 'Gasto mensual estimado en dólares',
    btn: 'Sumarme',
    required: 'Todos los campos son obligatorios',
    privacyPrefix: 'He leído y acepto la ',
    privacyLink:   'Política de Privacidad',
    privacySuffix: '',
    success: '¡Gracias por registrarte! Te avisaremos cuando lancemos UX DUAL',
    errorSend: 'No pudimos registrar tus datos. Inténtalo más tarde.'
  }
} as const;

const spendingOptions = [
  { value: '0-500000', en: '$0 – $500', es: '$0 – $500' },
  { value: '501000-1000000', en: '$501 – $1,000', es: '$501 – $1.000' },
  { value: '>1000000', en: 'More than $1,000', es: 'Más de $1.000' }
];

const flagEmoji = (code: string) =>
  code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  padding: '14px 16px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const InputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    style={inputStyle}
    onFocus={e => {
      e.currentTarget.style.borderColor = '#4DF0AC';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(77,240,172,0.15)';
    }}
    onBlur={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  />
);

const SelectField = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select
    {...props}
    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
    onFocus={e => {
      e.currentTarget.style.borderColor = '#4DF0AC';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(77,240,172,0.15)';
    }}
    onBlur={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {props.children}
  </select>
);

const BetaModal: React.FC<Props> = ({ open, onClose, scriptURL }) => {
  const { language } = useLanguage();
  const t = i18n[language];

  const nationalityOptions = useMemo(() => {
    return countries.map((c) => ({
      code: c.cca2,
      flag: c.flag || flagEmoji(c.cca2),
      label: language === 'es' ? c.translations.spa?.common || c.name.common : c.name.common
    }));
  }, [language]);

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

  const buildQuery = (): string => {
    const params = new URLSearchParams({
      action: 'register',
      first_name: name,
      last_name: lastName,
      email,
      phone,
      monthlySpending: spendingRange,
      nationality: nationality,
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
      const res = await fetch(buildQuery());
      const json = await res.json();
      if (json.ok) {
        setSuccess(true);
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
        <div
          className="relative w-full text-center shadow-2xl text-white space-y-6 p-8"
          style={{
            maxWidth: '480px',
            background: 'var(--color-bg-dark-2)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h2 className="text-2xl font-semibold">{t.success}</h2>
          <button
            onClick={() => { setSuccess(false); onClose(); }}
            className="mx-auto px-6 py-2 rounded-full font-semibold transition hover:opacity-90"
            style={{ background: 'var(--color-accent)', color: 'var(--color-text-dark)' }}
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4">
      <div
        className="relative w-full shadow-2xl overflow-y-auto"
        style={{
          maxWidth: '480px',
          maxHeight: '90vh',
          background: 'var(--color-bg-dark-2)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '36px 32px',
        }}
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-white mb-2">{t.title}</h2>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          {/* Nombre + Apellido en 2 columnas en desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              type="text"
              placeholder={t.name}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              type="text"
              placeholder={t.lastName}
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <InputField
            type="email"
            placeholder={t.email}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <SelectField value={nationality} onChange={(e) => setNationality(e.target.value)} required>
            <option value="" disabled style={{ background: '#0E2240' }}>{t.nationality}</option>
            {nationalityOptions.map((n) => (
              <option key={n.code} value={n.code} style={{ background: '#0E2240' }}>
                {n.flag} {n.label}
              </option>
            ))}
          </SelectField>

          <InputField
            type="tel"
            placeholder={t.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <SelectField value={spendingRange} onChange={(e) => setSpendingRange(e.target.value)} required>
            <option value="" disabled style={{ background: '#0E2240' }}>{t.spendingLabel}</option>
            {spendingOptions.map((o) => (
              <option key={o.value} value={o.value} style={{ background: '#0E2240' }}>
                {language === 'en' ? o.en : o.es}
              </option>
            ))}
          </SelectField>

          {/* Privacy checkbox */}
          <label className="flex items-start gap-2.5 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded flex-shrink-0"
              style={{ accentColor: '#4DF0AC' }}
              required
            />
            <span>
              {t.privacyPrefix}
              <a
                href="/wp-content/uploads/2024/12/Politicas-de-Privacidad-Presuscriptores.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)' }}
                className="underline hover:opacity-80"
              >
                {t.privacyLink}
              </a>
              {t.privacySuffix}
            </span>
          </label>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 disabled:opacity-60 mt-1"
            style={{ background: 'var(--color-accent)', color: 'var(--color-text-dark)' }}
          >
            {sending ? '…' : t.btn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetaModal;
