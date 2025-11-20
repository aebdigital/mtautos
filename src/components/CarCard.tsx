import React from 'react';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  const isAdminAdded = car.source === 'admin';

  // Check if car is reserved (reservation date is in the future)
  const isReserved = car.reservedUntil && new Date(car.reservedUntil) > new Date();

  // Format reservation date
  const formatReservationDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div
      className={`bg-white shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all car-card ${
        isAdminAdded ? 'ring-2 ring-red-500 shadow-red-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 rounded-bl text-lg font-bold font-jost">
          {car.price.toLocaleString()} €
        </div>
        {isAdminAdded && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold font-montserrat">
            ADMIN
          </div>
        )}
      </div>
      <div className="px-4 pt-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {car.brand} {car.model}
        </h3>
        {isReserved && car.reservedUntil && (
          <div className="mb-2 bg-orange-100 border border-orange-300 text-orange-800 px-2 py-1 rounded text-xs font-semibold font-montserrat">
            Rezervované do {formatReservationDate(car.reservedUntil)}
          </div>
        )}
        <div className="grid gap-1 text-xs text-gray-600 mb-3" style={{ gridTemplateColumns: '1fr 1fr 1.3fr 1fr' }}>
          <div className="flex items-center">
            <img 
              className="w-4 h-4 mr-1" 
              src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-4.svg" 
              alt="Rok"
            />
            <span className="font-bold text-gray-800">{car.year}</span>
          </div>
          <div className="flex items-center">
            <img 
              className="w-4 h-4 mr-1" 
              src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-1.svg" 
              alt="Palivo"
            />
            <span className="font-bold text-gray-800">{car.fuel}</span>
          </div>
          <div className="flex items-center">
            <img 
              className="w-4 h-4 mr-1" 
              src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-3.svg" 
              alt="Najazdené km"
            />
            <span className="font-bold text-gray-800">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center">
            <img 
              className="w-4 h-4 mr-1" 
              src="https://www.mtautos.sk/wp-content/uploads/2025/05/image-6.svg" 
              alt="Výkon"
            />
            <span className="font-bold text-gray-800">{car.power || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;