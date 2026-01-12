import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types/car';

// Import local SVG icons
import rokIcon from '../images/rok.svg';
import palivoIcon from '../images/palivo.svg';
import kmIcon from '../images/km.svg';
import vykonIcon from '../images/vykon.svg';

interface CarCardProps {
  car: Car;
  onClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  const isAdminAdded = car.source === 'admin';

  // Check if car is reserved (either by reserved boolean or reservation date in the future)
  const isReservedByDate = car.reservedUntil && new Date(car.reservedUntil) > new Date();
  const isReserved = car.reserved || isReservedByDate;

  // Format reservation date
  const formatReservationDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Create URL slug for the car
  const carSlug = `${car.brand}-${car.model}-${car.year}-${car.id}`
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <Link
      to={`/vozidlo/${carSlug}`}
      className={`bg-white shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all car-card block ${
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
        {isReserved && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold font-montserrat">
            REZERVOVANÉ
          </div>
        )}
      </div>
      <div className="px-4 pt-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {car.brand} {car.model}
        </h3>
        {isReservedByDate && car.reservedUntil && (
          <div className="mb-2 bg-orange-100 border border-orange-300 text-orange-800 px-2 py-1 rounded text-xs font-semibold font-montserrat">
            Rezervované do {formatReservationDate(car.reservedUntil)}
          </div>
        )}
        <div className="grid gap-1 text-xs text-gray-600 mb-3" style={{ gridTemplateColumns: '1fr 1fr 1.3fr 1fr' }}>
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1"
              src={rokIcon}
              alt="Rok"
            />
            <span className="font-bold text-gray-800">{car.year}</span>
          </div>
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1"
              src={palivoIcon}
              alt="Palivo"
            />
            <span className="font-bold text-gray-800">{car.fuel}</span>
          </div>
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1"
              src={kmIcon}
              alt="Najazdené km"
            />
            <span className="font-bold text-gray-800">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center">
            <img
              className="w-4 h-4 mr-1"
              src={vykonIcon}
              alt="Výkon"
            />
            <span className="font-bold text-gray-800">{car.power || 'N/A'}</span>
          </div>
        </div>
        {car.vatDeductible && car.priceWithoutVat && (
          <div className="bg-black text-white px-3 py-2 text-xs font-bold font-montserrat -mx-4 -mb-0">
            Odpočet DPH: {car.priceWithoutVat.toLocaleString()} €
          </div>
        )}
      </div>
    </Link>
  );
};

export default CarCard;