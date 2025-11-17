import React from 'react';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  const isAdminAdded = car.source === 'admin';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all car-card ${
        isAdminAdded ? 'ring-2 ring-red-500 shadow-red-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        {isAdminAdded && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold font-montserrat">
            ADMIN
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {car.brand} {car.model}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <img 
                className="w-4 h-4 mr-2" 
                src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-4.svg" 
                alt="Rok"
              />
              <span>Rok:</span>
            </div>
            <span className="font-bold text-gray-800">{car.year}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <img 
                className="w-4 h-4 mr-2" 
                src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-1.svg" 
                alt="Palivo"
              />
              <span>Palivo:</span>
            </div>
            <span className="font-bold text-gray-800">{car.fuel}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <img 
                className="w-4 h-4 mr-2" 
                src="https://www.aebdigital.com/wp-content/uploads/2025/04/image-3.svg" 
                alt="Najazdené km"
              />
              <span>Najazdené km:</span>
            </div>
            <span className="font-bold text-gray-800">{car.mileage.toLocaleString()} km</span>
          </div>
        </div>
        <div className="text-xl font-bold text-red-600">
          {car.price.toLocaleString()} €
        </div>
      </div>
    </div>
  );
};

export default CarCard;