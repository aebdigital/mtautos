import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MiniHero from '../components/MiniHero';

const LeasingPage: React.FC = () => {
    const advantages = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: '0% akontácia',
            description: 'Schválenie úveru už aj s minimálnou alebo nulovou akontáciou. Začnite jazdiť hneď!',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            title: 'Vaše auto ako akontácia',
            description: 'Použite vaše súčasné vozidlo ako akontáciu na nový leasing alebo úver.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Rýchle schválenie',
            description: 'Vybavenie úveru rýchlo a jednoducho. Výsledok schválenia máte do niekoľkých minút.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Výhodné podmienky',
            description: 'Výhodné financovanie cez nášho partnera HomeCredit s konkurenčnými úrokovými sadzbami.',
        },
    ];

    return (
        <div className="min-h-screen bg-white font-montserrat">
            <Helmet>
                <title>Leasing a financovanie vozidiel | MT AUTOS</title>
                <meta
                    name="description"
                    content="Výhodný leasing a autoúver na mieru. 0% akontácia, rýchle schválenie, možnosť použiť vaše auto ako protihodnotu. Financovanie pre každého."
                />
            </Helmet>
            <MiniHero title="LEASING & AUTOÚVER" />

            {/* Intro */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold font-jost mb-6">
                            Výhodné <span className="text-blue-500">financovanie</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed">
                            Použite Vaše vozidlo ako akontáciu, schválenie úveru už aj s minimálnou akontáciou.
                            Spolupracujeme s overenými finančnými partnermi, aby sme Vám zabezpečili tie najlepšie podmienky.
                        </p>
                    </div>
                </div>
            </section>

            {/* Advantages Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* Left: Cards */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {advantages.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 mb-5">
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
                                src="/leasing.jpg"
                                alt="Leasing & Autoúver"
                                className="w-full h-full object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-14 text-white text-center">
                            <h2 className="text-3xl md:text-4xl font-bold font-jost mb-6">Náš financovací partner</h2>
                            <div className="inline-block bg-white rounded-2xl px-10 py-6 mb-6">
                                <img src="/homecredit.jpg" alt="HomeCredit" className="h-14 w-auto object-contain" />
                            </div>
                            <p className="text-lg font-montserrat opacity-90 max-w-2xl mx-auto">
                                Spoľahlivý partner pre autoúvery a spotrebné úvery. Rýchle schválenie, férové podmienky
                                a profesionálny prístup.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold font-jost text-center mb-16">
                        Ako získať <span className="text-blue-500">autoúver?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Vyberte si auto', desc: 'Vyberte si z našej ponuky alebo si nechajte doviezť.' },
                            { step: '02', title: 'Podajte žiadosť', desc: 'Vyplníme žiadosť o úver priamo u nás v autobazári.' },
                            { step: '03', title: 'Schválenie', desc: 'HomeCredit schváli váš úver rýchlo a bez komplikácií.' },
                            { step: '04', title: 'Šťastná jazda!', desc: 'Odchádzate s novým autom ešte v ten istý deň.' },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-6xl font-bold font-jost text-green-500/20 mb-4">{item.step}</div>
                                <h3 className="text-lg font-bold font-jost mb-3">{item.title}</h3>
                                <p className="text-gray-600 font-montserrat text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold font-jost mb-6">Máte záujem o financovanie?</h2>
                    <p className="text-xl font-montserrat mb-10 opacity-90 max-w-2xl mx-auto">
                        Kontaktujte nás a my vám pripravíme najvýhodnejšiu ponuku na mieru.
                    </p>
                    <Link
                        to="/kontakt"
                        className="bg-white text-green-700 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg font-montserrat inline-block transition-colors"
                    >
                        Nezáväzná konzultácia
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LeasingPage;
