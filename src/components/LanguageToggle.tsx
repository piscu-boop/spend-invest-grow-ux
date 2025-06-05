import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-3 mr-4">
      <span className={`text-2xl transition-colors ${language === 'en' ? 'opacity-100' : 'opacity-60'}`}>
        🇺🇸
      </span>
      <Switch
        checked={language === 'es'}
        onCheckedChange={toggleLanguage}
        className="data-[state=checked]:bg-ux-green"
      />
      <span className={`text-2xl transition-colors ${language === 'es' ? 'opacity-100' : 'opacity-60'}`}>
        🇦🇷
      </span>
    </div>
  );
};

export default LanguageToggle;
