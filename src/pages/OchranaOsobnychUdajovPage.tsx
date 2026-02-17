import React from 'react';
import { Helmet } from 'react-helmet-async';
import MiniHero from '../components/MiniHero';

const OchranaOsobnychUdajovPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-montserrat">
            <Helmet>
                <title>Ochrana osobných údajov | MT AUTOS</title>
                <meta
                    name="description"
                    content="Zásady ochrany osobných údajov spoločnosti MT AUTOS s.r.o. Informácie o spracúvaní osobných údajov a cookies."
                />
            </Helmet>
            <MiniHero title="OCHRANA OSOBNÝCH ÚDAJOV" />

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold font-jost mb-6 text-center">
                            Zásady ochrany <span className="text-blue-500">osobných údajov</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed text-center mb-16">
                            Vaše osobné údaje spracúvame v súlade s nariadením GDPR a slovenskou legislatívou.
                            Nižšie nájdete podrobné informácie o tom, aké údaje zbierame a ako ich chránime.
                        </p>

                        <div className="space-y-12">
                            {/* Company Info */}
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="font-bold text-lg font-jost mb-2">MT AUTOS s.r.o.</p>
                                    <p>ul. 29 augusta 2261/145, 038 52 Sučany</p>
                                    <p>IČO: 47584017, DIČ: 2023992652</p>
                                    <p>E-mail: mtautossro@gmail.com</p>
                                    <p>Tel.: +421 915 511 111</p>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
                            </p>

                            {/* Section I */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-5">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold font-jost mb-4">I. Kontaktný formulár</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Na stránke www.mtautos.sk prevádzkujeme kontaktný formulár na dvoch samostatných stránkach, ktorého účelom je umožniť vám:
                                </p>
                                <ul className="list-disc ml-6 mb-6 text-gray-600 space-y-1">
                                    <li>Položiť otázku k našim produktom a službám</li>
                                    <li>Požiadať o cenovú ponuku</li>
                                </ul>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Rozsah spracúvaných údajov</h4>
                                        <ul className="list-disc ml-5 text-gray-600 space-y-1">
                                            <li>Meno a priezvisko</li>
                                            <li>E-mailová adresa</li>
                                            <li>Telefónne číslo</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Účel spracovania</h4>
                                        <p className="text-gray-600">
                                            Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Právny základ</h4>
                                        <p className="text-gray-600">
                                            Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Doba uchovávania</h4>
                                        <p className="text-gray-600">
                                            Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section II */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-5">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold font-jost mb-4">II. Súbory cookies</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Nevyhnutné cookies</h4>
                                        <p className="text-gray-600">
                                            Zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="font-bold font-jost mb-3">Štatistické (analytické) cookies</h4>
                                        <p className="text-gray-600">
                                            Pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h4 className="font-bold font-jost mb-3">Správa súhlasov</h4>
                                    <p className="text-gray-600">
                                        Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
                                    </p>
                                </div>
                            </div>

                            {/* Section III */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-5">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold font-jost mb-4">III. Práva dotknutej osoby</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Podľa nariadenia GDPR máte nasledujúce práva:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {[
                                        'Prístup k osobným údajom, ktoré spracúvame',
                                        'Oprava nepresných alebo neúplných údajov',
                                        'Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ',
                                        'Obmedzenie spracovania',
                                        'Prenosnosť údajov',
                                        'Odvolanie súhlasu – stane sa účinným dňom odvolania',
                                        'Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)',
                                    ].map((right, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {right}
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <p className="text-gray-600">
                                        V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{' '}
                                        <a href="mailto:mtautossro@gmail.com" className="text-blue-500 underline">mtautossro@gmail.com</a>{' '}
                                        alebo telefónnom čísle +421 915 511 111.
                                    </p>
                                </div>
                            </div>

                            {/* Effective date */}
                            <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                                <p className="text-sm font-semibold text-purple-700">
                                    Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OchranaOsobnychUdajovPage;
