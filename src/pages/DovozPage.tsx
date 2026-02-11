import React from 'react';
import { Link } from 'react-router-dom';
import MiniHero from '../components/MiniHero';

const DovozPage: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Kvalitné a preverené vozidlá',
      description: 'Dovážame len overené vozidlá z dovozu aj so slovenským pôvodom. Každé vozidlo prechádza dôkladnou kontrolou pred predajom.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Garancia najazdených KM',
      description: 'Garantujeme pravosť najazdených kilometrov. Každé vozidlo má overenú históriu a servisnú knižku.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Dovoz na mieru',
      description: 'Dovezieme vozidlo presne podľa vašich požiadaviek. Stačí nám povedať, aké auto hľadáte, a my sa postaráme o zvyšok.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Kompletné vybavenie',
      description: 'Rýchle a kompletné vybavenie od predaja, poistenia až po prepis vozidla za Vás. Nemusíte sa o nič starať.',
    },
  ];

  return (
    <>
      <MiniHero title="DOVOZ VOZIDIEL" />

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-jost mb-6">
              Kvalitné a preverené vozidlá <span className="text-blue-500">z dovozu</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed">
              Ponúkame kvalitné a preverené vozidlá z dovozu aj so slovenským pôvodom.
              Každé vozidlo prechádza dôkladnou kontrolou stavu, overením histórie a
              garančnou kontrolou najazdených kilometrov.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid + Image */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Left: Feature cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-jost mb-3">{feature.title}</h3>
                  <p className="text-gray-600 font-montserrat leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            {/* Right: Image */}
            <div className="lg:col-span-2 h-full">
              <img
                src="/dovoz.jpg"
                alt="Dovoz vozidiel"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-jost text-center mb-16">
            Ako to <span className="text-blue-500">funguje?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Povedzte nám, čo hľadáte', desc: 'Opíšte nám vaše požiadavky – značka, model, rozpočet, výbava.' },
              { step: '02', title: 'Nájdeme a overíme', desc: 'Nájdeme vozidlo, overíme jeho históriu, stav a najazdené kilometre.' },
              { step: '03', title: 'Dovezieme a vybavíme', desc: 'Dovezieme auto priamo k vám a vybavíme všetky dokumenty za vás.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold font-jost text-blue-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold font-jost mb-3">{item.title}</h3>
                <p className="text-gray-600 font-montserrat">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-jost mb-6">Máte záujem o dovoz vozidla?</h2>
          <p className="text-xl font-montserrat mb-10 opacity-90 max-w-2xl mx-auto">
            Kontaktujte nás a my vám nájdeme presne to auto, ktoré hľadáte.
          </p>
          <Link
            to="/kontakt"
            className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg font-montserrat inline-block transition-colors"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </>
  );
};

export default DovozPage;
