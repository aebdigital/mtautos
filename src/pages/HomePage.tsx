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
  onAddCarClick: () => void;
  announcements?: Announcement[];
}

const HomePage: React.FC<HomePageProps> = ({ cars, isLoading, onCarClick, onAddCarClick, announcements = [] }) => {
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
            <button
              onClick={onAddCarClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg font-montserrat"
            >
              + Pridať vozidlo
            </button>
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