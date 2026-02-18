import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MiniHero from '../components/MiniHero';

const VykupPage: React.FC = () => {
    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'Platba ihneď',
            description: 'Peniaze za vaše vozidlo dostanete okamžite pri odovzdaní. Žiadne čakanie, žiadne prísľuby.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Rýchle vybavenie',
            description: 'Celý proces výkupu zvládneme aj za jeden deň. Nemusíte chodiť po úradoch – všetko vybavíme za vás.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Férové ocenenie',
            description: 'Vaše vozidlo oceníme férovo a transparentne podľa aktuálnej trhovej hodnoty.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: 'Kompletný prepis',
            description: 'Poistenie, prepis na dopravnom inšpektoráte a všetky úradné záležitosti vybavíme kompletne za vás.',
        },
    ];

    return (
        <div className="min-h-screen bg-white font-montserrat">
            <Helmet>
                <title>Výkup vozidiel - peniaze ihneď | MT AUTOS</title>
                <meta
                    name="description"
                    content="Vykúpime vaše auto za najlepšiu cenu. Peniaze ihneď na ruku alebo na účet. Preberáme záruku za technický stav. Rýchle a férové jednanie."
                />
            </Helmet>
            <MiniHero title="VÝKUP VOZIDIEL" />

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold font-jost mb-6">
                            Výkup vozidiel – <span className="text-red-500">platba ihneď</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed">
                            Vykúpime vaše vozidlo rýchlo a férovo. Nemusíte sa starať o prepis,
                            poistenie ani žiadne iné formality – všetko vybavíme za vás.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* Left: Cards */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-5">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-jost mb-3">{item.title}</h3>
                                    <p className="text-gray-600 font-montserrat leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        {/* Right: Image */}
                        <div className="lg:col-span-2 h-full">
                            <img
                                src="/vykup.webp"
                                alt="Výkup vozidiel"
                                className="w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold font-jost text-center mb-16">
                        Ako prebieha <span className="text-red-500">výkup?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Kontaktujte nás', desc: 'Zavolajte nám alebo napíšte s informáciami o vašom vozidle.' },
                            { step: '02', title: 'Ocenenie vozidla', desc: 'Férovo oceníme vaše vozidlo podľa aktuálneho stavu a trhovej hodnoty.' },
                            { step: '03', title: 'Okamžitá platba', desc: 'Po dohode vám vyplatíme dohodnutú čiastku okamžite.' },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-6xl font-bold font-jost text-red-500/20 mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold font-jost mb-3">{item.title}</h3>
                                <p className="text-gray-600 font-montserrat">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold font-jost mb-6">Chcete predať vaše auto?</h2>
                    <p className="text-xl font-montserrat mb-10 opacity-90 max-w-2xl mx-auto">
                        Kontaktujte nás a získajte férovú ponuku na výkup vášho vozidla.
                    </p>
                    <Link
                        to="/kontakt"
                        className="bg-white text-red-700 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg font-montserrat inline-block transition-colors"
                    >
                        Chcem predať auto
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default VykupPage;
