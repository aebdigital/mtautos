import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CarCard from '../components/CarCard';
import { Car } from '../types/car';

interface Announcement {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  createdAt: Date;
}

interface HomePageProps {
  cars: Car[];
  isLoading: boolean;
  onCarClick: (car: Car) => void;
  announcements?: Announcement[];
}

const HomePage: React.FC<HomePageProps> = ({ cars, isLoading, onCarClick, announcements = [] }) => {
  const navigate = useNavigate();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    // Show the first active announcement on page load
    const activeAnnouncements = announcements.filter(ann => ann.isActive);
    if (activeAnnouncements.length > 0) {
      setCurrentAnnouncement(activeAnnouncements[0]);
      setShowAnnouncement(true);
    }
  }, [announcements]);
  // Filter cars marked for homepage display, or fallback to latest 4 cars
  const homepageCars = cars.filter(car => car.showOnHomepage === true);
  const displayCars = homepageCars.length > 0 ? homepageCars.slice(0, 4) : cars.slice(0, 4);

  const createCarSlug = (car: Car) => {
    return `${car.brand}-${car.model}-${car.year}-${car.id}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleCarClick = (car: Car) => {
    const slug = createCarSlug(car);
    navigate(`/vozidlo/${slug}`);
  };

  return (
    <>
      <Hero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-6xl font-bold font-jost">NAJNOVŠIE VOZIDLÁ</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-2xl">Načítavam vozidlá...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onClick={() => handleCarClick(car)}
                  />
                ))}
              </div>

              {cars.length > 4 && (
                <div className="text-center mt-8">
                  <Link
                    to="/ponuka"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg inline-block"
                  >
                    Zobraziť všetky vozidlá ({cars.length})
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Services />

      {/* Prečo MT Autos? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 font-jost">PREČO <span className="text-blue-500">MT AUTOS?</span></h2>
          <p className="text-center text-gray-500 font-montserrat mb-14 text-lg max-w-2xl mx-auto">
            Poskytujeme kompletné služby od predaja, dovozu, financovania až po poistenie a prepis vozidla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Kvalitné a preverené vozidlá',
                desc: 'Z dovozu aj so slovenským pôvodom. Každé vozidlo je dôkladne skontrolované.',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                title: 'Garancia najazdených KM',
                desc: 'Garantujeme pravosť najazdených kilometrov na každom vozidle.',
                color: 'text-green-500',
                bg: 'bg-green-500/10',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Výhodné financovanie',
                desc: 'Schválenie úveru aj s minimálnou akontáciou. Použite vaše auto ako akontáciu.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'PZP + HAV za výhodné ceny',
                desc: 'Poistenie od Generali, Allianz a Kooperativa za najlepšie ceny.',
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Výkup vozidiel v hotovosti',
                desc: 'Platba ihneď pri odovzdaní vozidla. Rýchle a férové ocenenie.',
                color: 'text-red-500',
                bg: 'bg-red-500/10',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: 'Kompletné vybavenie',
                desc: 'Od predaja, poistenia až po prepis vozidla – všetko vybavíme za vás.',
                color: 'text-orange-500',
                bg: 'bg-orange-500/10',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center ${item.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-jost mb-3">{item.title}</h3>
                <p className="text-gray-600 font-montserrat leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcement Popup */}
      {showAnnouncement && currentAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 font-jost text-gray-900">
              {currentAnnouncement.title}
            </h2>
            <p className="text-gray-700 font-montserrat whitespace-pre-wrap mb-6">
              {currentAnnouncement.message}
            </p>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-montserrat font-semibold transition-colors"
            >
              Zavrieť
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;