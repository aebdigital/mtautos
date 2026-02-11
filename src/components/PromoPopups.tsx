import React, { useState, useEffect, useCallback } from 'react';

interface PromoMessage {
    text: string;
    icon: string;
    color: string;
}

const promoMessages: PromoMessage[] = [
    { text: 'Autoúver s 0% akontáciou!', icon: '💰', color: 'from-green-500/90 to-green-700/90' },
    { text: 'Výkup áut – platba ihneď!', icon: '🚗', color: 'from-red-500/90 to-red-700/90' },
    { text: 'PZP už od 39€/rok!', icon: '🛡️', color: 'from-purple-500/90 to-purple-700/90' },
    { text: 'Garancia najazdených KM!', icon: '✅', color: 'from-blue-500/90 to-blue-700/90' },
    { text: 'Dovoz áut na objednávku!', icon: '🌍', color: 'from-orange-500/90 to-orange-700/90' },
];

const PromoPopups: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const showNextPopup = useCallback(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
            }, 500);
        }, 5000);
    }, []);

    useEffect(() => {
        if (isDismissed) return;

        // Initial delay before first popup
        const initialTimer = setTimeout(() => {
            showNextPopup();
        }, 3000);

        return () => clearTimeout(initialTimer);
    }, [isDismissed, showNextPopup]);

    useEffect(() => {
        if (isDismissed || currentIndex === 0) return;

        const timer = setTimeout(() => {
            showNextPopup();
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentIndex, isDismissed, showNextPopup]);

    // Restart cycle after going through all
    useEffect(() => {
        if (isDismissed) return;
        if (currentIndex === 0 && !isVisible) {
            const timer = setTimeout(() => {
                showNextPopup();
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isVisible, isDismissed, showNextPopup]);

    if (isDismissed) return null;

    const current = promoMessages[currentIndex];

    return (
        <div
            className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-[120%] opacity-0'
                }`}
        >
            <div
                className={`bg-gradient-to-r ${current.color} backdrop-blur-md text-white rounded-2xl shadow-2xl px-6 py-4 max-w-xs cursor-pointer border border-white/20`}
                style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                }}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDismissed(true);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white/90 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold hover:bg-white transition-colors shadow-md border-none cursor-pointer"
                    aria-label="Zavrieť"
                >
                    ✕
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-2xl flex-shrink-0">{current.icon}</span>
                    <span className="font-bold font-jost text-sm leading-tight">{current.text}</span>
                </div>
                <div className="mt-2 flex gap-1 justify-center">
                    {promoMessages.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-white' : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoPopups;
