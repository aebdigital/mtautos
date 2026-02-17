import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type CookiePreferences = {
    necessary: boolean;
    analytics: boolean;
};

const COOKIE_CONSENT_KEY = 'mt-autos-cookie-consent';

const getStoredPreferences = (): CookiePreferences | null => {
    try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) return JSON.parse(stored);
    } catch {}
    return null;
};

const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
};

// Banner shown on first visit
const CookieBanner: React.FC<{
    onAcceptAll: () => void;
    onRejectAll: () => void;
    onOpenSettings: () => void;
}> = ({ onAcceptAll, onRejectAll, onOpenSettings }) => (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8 font-montserrat">
            <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 flex-shrink-0">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold font-jost mb-1">Táto stránka používa cookies</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Používame cookies na zabezpečenie základnej funkčnosti stránky a na analytické účely.
                        Viac informácií nájdete v našej{' '}
                        <Link to="/ochrana-osobnych-udajov" className="text-blue-500 underline">
                            ochrane osobných údajov
                        </Link>.
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                    onClick={onOpenSettings}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                    Nastavenia
                </button>
                <button
                    onClick={onRejectAll}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                    Odmietnuť všetky
                </button>
                <button
                    onClick={onAcceptAll}
                    className="px-6 py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
                >
                    Prijať všetky
                </button>
            </div>
        </div>
    </div>
);

// Settings modal
const CookieSettings: React.FC<{
    preferences: CookiePreferences;
    onSave: (prefs: CookiePreferences) => void;
    onClose: () => void;
}> = ({ preferences, onSave, onClose }) => {
    const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl font-montserrat">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold font-jost">Nastavenia cookies</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold bg-transparent border-none cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Necessary */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h4 className="font-bold font-jost mb-1">Nevyhnutné cookies</h4>
                            <p className="text-sm text-gray-600">
                                Zabezpečujú základnú funkčnosť stránky. Tieto cookies nie je možné vypnúť.
                            </p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-6 bg-purple-500 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                            </div>
                        </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h4 className="font-bold font-jost mb-1">Štatistické cookies</h4>
                            <p className="text-sm text-gray-600">
                                Pomáhajú nám pochopiť, ako návštevníci stránku používajú, čo nám umožňuje zlepšovať naše služby.
                            </p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                            <button
                                onClick={() => setLocalPrefs(prev => ({ ...prev, analytics: !prev.analytics }))}
                                className={`w-12 h-6 rounded-full relative transition-colors border-none cursor-pointer ${localPrefs.analytics ? 'bg-purple-500' : 'bg-gray-300'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${localPrefs.analytics ? 'right-0.5' : 'left-0.5'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                        Zrušiť
                    </button>
                    <button
                        onClick={() => onSave(localPrefs)}
                        className="px-6 py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
                    >
                        Uložiť nastavenia
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main component
const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
    });

    useEffect(() => {
        const stored = getStoredPreferences();
        if (stored) {
            setPreferences(stored);
        } else {
            setShowBanner(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const prefs: CookiePreferences = { necessary: true, analytics: true };
        setPreferences(prefs);
        savePreferences(prefs);
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        const prefs: CookiePreferences = { necessary: true, analytics: false };
        setPreferences(prefs);
        savePreferences(prefs);
        setShowBanner(false);
    };

    const handleSaveSettings = (prefs: CookiePreferences) => {
        prefs.necessary = true; // always on
        setPreferences(prefs);
        savePreferences(prefs);
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleOpenSettings = () => {
        setShowBanner(false);
        setShowSettings(true);
    };

    // Expose open settings globally so footer can trigger it
    useEffect(() => {
        (window as any).__openCookieSettings = () => setShowSettings(true);
        return () => { delete (window as any).__openCookieSettings; };
    }, []);

    return (
        <>
            {showBanner && (
                <CookieBanner
                    onAcceptAll={handleAcceptAll}
                    onRejectAll={handleRejectAll}
                    onOpenSettings={handleOpenSettings}
                />
            )}
            {showSettings && (
                <CookieSettings
                    preferences={preferences}
                    onSave={handleSaveSettings}
                    onClose={() => setShowSettings(false)}
                />
            )}
        </>
    );
};

export default CookieConsent;
