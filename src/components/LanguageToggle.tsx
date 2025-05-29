
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-3">
      <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-ux-green' : 'text-gray-400'}`}>
        EN
      </span>
      <Switch
        checked={language === 'es'}
        onCheckedChange={toggleLanguage}
        className="data-[state=checked]:bg-ux-green"
      />
      <span className={`text-sm font-medium transition-colors ${language === 'es' ? 'text-ux-green' : 'text-gray-400'}`}>
        ES
      </span>
    </div>
  );
};

export default LanguageToggle;
