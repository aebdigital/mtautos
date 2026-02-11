import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import CarFilter from '../components/CarFilter';
import MiniHero from '../components/MiniHero';
import { Car } from '../types/car';
import { Helmet } from 'react-helmet-async';

interface PonukaPageProps {
  cars: Car[];
  isLoading: boolean;
}

const PonukaPage: React.FC<PonukaPageProps> = ({ cars, isLoading }) => {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  React.useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

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

  const handleFilter = (filtered: Car[]) => {
    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Ponuka vozidiel | MT AUTOS Sučany</title>
        <meta
          name="description"
          content="Aktuálna ponuka jazdených vozidiel v MT AUTOS. Široký výber áut, možnosť financovania a poistenia. Všetky vozidlá sú preverené."
        />
      </Helmet>
      <MiniHero title="PONUKA" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-montserrat text-gray-600">
            Zobrazené: {filteredCars.length} z {cars.length} vozidiel
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-2xl font-montserrat">Načítavam vozidlá...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <CarFilter cars={cars} onFilter={handleFilter} />
            </div>

            {/* Cars Grid */}
            <div className="lg:col-span-3">
              {filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold mb-4 font-jost">Žiadne vozidlá</h3>
                  <p className="text-gray-600 font-montserrat">Skúste zmeniť filtre pre zobrazenie vozidiel.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      onClick={() => handleCarClick(car)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PonukaPage;