import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MiniHero from '../components/MiniHero';

const PZPPage: React.FC = () => {
    const insurancePartners = [
        {
            name: 'Generali',
            description: 'Jedna z najväčších poisťovní v Európe s dlhoročnou tradíciou a širokou škálou poistných produktov.',
            color: 'from-red-500 to-red-700',
            logo: '/generali.png',
        },
        {
            name: 'Allianz',
            description: 'Svetový líder v poistení s prémiovou kvalitou služieb a kompletným poistným krytím.',
            color: 'from-blue-500 to-blue-700',
            logo: '/alianz.webp',
        },
        {
            name: 'Kooperativa',
            description: 'Najväčšia poisťovňa na Slovensku s najširšou sieťou pobočiek a rýchlym vybavením poistných udalostí.',
            color: 'from-green-500 to-green-700',
            logo: '/kooperativa copy.jpg',
        },
    ];

    const coverageTypes = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'PZP – Povinné zmluvné poistenie',
            description: 'Zákonné poistenie zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla. Povinné pre každé vozidlo.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                </svg>
            ),
            title: 'HAV – Havarijné poistenie',
            description: 'Dobrovoľné poistenie, ktoré pokryje škody na vašom vozidle pri havárii, krádeži, vandalizme či živelnej pohrome.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Výhodné ceny',
            description: 'Vďaka spolupráci s viacerými poisťovňami vám vieme ponúknuť PZP + HAV za výhodné ceny.',
        },
    ];

    return (
        <div className="min-h-screen bg-white font-montserrat">
            <Helmet>
                <title>Poistenie vozidiel PZP a havarijné | MT AUTOS</title>
                <meta
                    name="description"
                    content="Najvýhodnejšie PZP a havarijné poistenie. Porovnanie cien všetkých poisťovní. Uzatvorenie poistenia na počkanie pri kúpe vozidla."
                />
            </Helmet>
            <MiniHero title="PZP + HAV POISTENIE" />

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold font-jost mb-6">
                            PZP + HAV za <span className="text-blue-500">výhodné ceny</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed">
                            Ponúkame PZP a havarijné poistenie za výhodné ceny od overených poisťovní.
                            Vybavíme poistenie rýchlo a jednoducho priamo u nás v autobazári.
                        </p>
                    </div>
                </div>
            </section>

            {/* Coverage Types */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* Left: Cards */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            {coverageTypes.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-5">
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
                                src="/pzp.jpg"
                                alt="PZP poistenie"
                                className="w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Insurance Partners */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold font-jost text-center mb-16">
                        Naši <span className="text-blue-500">partneri</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {insurancePartners.map((partner, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${partner.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                <div className="bg-white rounded-xl p-4 mb-5 inline-block">
                                    <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                                </div>
                                <h3 className="text-3xl font-bold font-jost mb-4">{partner.name}</h3>
                                <p className="font-montserrat opacity-90 leading-relaxed">{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why with us */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold font-jost text-center mb-16">
                        Prečo poistenie <span className="text-blue-500">u nás?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Porovnáme za vás', desc: 'Porovnáme ponuky od viacerých poisťovní a nájdeme tú najvýhodnejšiu.' },
                            { step: '02', title: 'Vybavíme na mieste', desc: 'Poistenie vybavíme rýchlo a jednoducho priamo u nás v predajni.' },
                            { step: '03', title: 'Kompletný servis', desc: 'Pri kúpe vozidla poistíme auto okamžite – odchádzate s kompletne vybaveným autom.' },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-6xl font-bold font-jost text-purple-500/20 mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold font-jost mb-3">{item.title}</h3>
                                <p className="text-gray-600 font-montserrat">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold font-jost mb-6">Máte záujem o poistenie?</h2>
                    <p className="text-xl font-montserrat mb-10 opacity-90 max-w-2xl mx-auto">
                        Kontaktujte nás a získajte výhodnú ponuku PZP alebo havarijného poistenia.
                    </p>
                    <Link
                        to="/kontakt"
                        className="bg-white text-purple-700 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg font-montserrat inline-block transition-colors"
                    >
                        Získať ponuku poistenia
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PZPPage;
