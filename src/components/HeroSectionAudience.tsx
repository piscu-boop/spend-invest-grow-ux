import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface HeroSectionAudienceProps {
	onOpenBeta: () => void;
}

const HeroSectionAudience: React.FC<HeroSectionAudienceProps> = ({ onOpenBeta }) => {
	const { language } = useLanguage();
	const navigate = useNavigate();

	const handleConsumerClick = () => {
		navigate("/consumer");
	};

	const handleMerchantClick = () => {
		navigate("/merchant");
	};

	const handleManufacturerClick = () => {
		navigate("/manufacturer");
	};

	const content = {
		en: {
			preTitleFirst: "",
			preTitleSecond: "",
			mainTitle: "Turning Every Purchase into an Investment",
			subtitle: "",
			consumer: "I'm a Consumer",
			merchant: "I'm a Merchant",
			manufacturer: "I'm a Manufacturer",
		},
		es: {
			preTitleFirst: "",
			preTitleSecond: "",
			mainTitle: "Transformando cada Compra en Inversión",
			subtitle: "",
			consumer: "Soy Consumidor",
			merchant: "Soy Comercio",
			manufacturer: "Soy Fabricante",
		},
	};

	const currentContent = content[language];

	return (
		<section id="hero" className="relative min-h-screen bg-[#1C304F] flex items-center overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-20 right-20 w-96 h-96 bg-ux-green/10 rounded-full blur-3xl animate-pulse-green"></div>
				<div className="absolute bottom-20 left-20 w-64 h-64 bg-ux-green/5 rounded-full blur-2xl"></div>
			</div>

			<div className="container mx-auto px-4 pt-20 pb-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
					<div className="space-y-8 animate-slide-up text-center lg:text-left">
						<div className="space-y-4">
							<p className="text-base md:text-lg font-semibold text-ux-green tracking-widest uppercase mb-2">
								{currentContent.preTitleFirst}
								<br />
								{currentContent.preTitleSecond}
							</p>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line">
							{currentContent.mainTitle}
						</h1>
							<p className="text-xl md:text-2xl text-white leading-relaxed">
								{currentContent.subtitle}
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Button
								className="border-[#0E1B38] bg-[#0E1B38] text-white hover:bg-blue-900/70 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 shadow-lg"
								onClick={handleConsumerClick}
							>
								{currentContent.consumer}
							</Button>
							<Button
								variant="outline"
								className="border-slate-800 bg-slate-800 text-white hover:bg-blue-900/40 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300"
								onClick={handleMerchantClick}
							>
								{currentContent.merchant}
							</Button>
							<Button
								variant="outline"
								className="border-slate-800 bg-slate-800 text-white hover:bg-blue-900/40 hover:text-ux-green px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300"
								onClick={handleManufacturerClick}
							>
								{currentContent.manufacturer}
							</Button>
						</div>
					</div>

					<div className="relative flex justify-center animate-float">
						<div className="relative">
							<div className="absolute inset-0 w-[500px] h-[500px] bg-gradient-to-r from-ux-green/20 to-ux-green/10 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
							<div className="relative z-10">
								<img
									src="lovable-uploads/200931e1-23f7-4c91-8aa2-73df09bab162.png"
									alt="UX Dual App Interface"
									className="w-[450px] h-auto drop-shadow-2xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSectionAudience;
