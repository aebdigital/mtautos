import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MiniHero from '../components/MiniHero';
import { Car } from '../types/car';

interface CarDetailPageProps {
  cars: Car[];
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ cars }) => {
  const { slug } = useParams<{ slug: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (slug && cars.length > 0) {
      const foundCar = cars.find(c => {
        const carSlug = `${c.brand}-${c.model}-${c.year}-${c.id}`
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        return carSlug === slug;
      });
      setCar(foundCar || null);
    }
  }, [slug, cars]);

  if (!car) {
    return (
      <div className="min-h-screen bg-white">
        <MiniHero title="Vozidlo sa nenašlo" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-xl mb-4 font-montserrat">Požadované vozidlo sa nenašlo</p>
            <Link to="/ponuka" className="text-blue-600 hover:underline font-montserrat">
              Späť na ponuku
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : [car.image];
  
  const icons = {
    'Farba': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-1-1.svg',
    'Dvere': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-2-1.svg',
    'Pohon': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-3-1.svg',
    'Palivo': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-4.svg',
    'Kilometre': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-5.svg',
    'Výkon': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-6.svg',
    'Prevodovka': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-7.svg',
    'Objem motora': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-9.svg',
    'Rok výroby': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-10.svg',
    'Karoséria': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-11.svg',
    'VIN': 'https://www.mtautos.sk/wp-content/uploads/2025/05/image-8.svg',
  };

  const basicData = [
    { label: 'Farba', value: 'Modrá tm.', icon: icons['Farba'] },
    { label: 'Dvere', value: '4 (5-miestne)', icon: icons['Dvere'] },
    { label: 'Pohon', value: '4x4', icon: icons['Pohon'] },
    { label: 'Palivo', value: car.fuel, icon: icons['Palivo'] },
    { label: 'Kilometre', value: `${car.mileage.toLocaleString()} km`, icon: icons['Kilometre'] },
    { label: 'Výkon', value: car.power || 'N/A', icon: icons['Výkon'] },
    { label: 'Prevodovka', value: car.transmission, icon: icons['Prevodovka'] },
    { label: 'Objem motora', value: car.engine || 'N/A', icon: icons['Objem motora'] },
    { label: 'Rok výroby', value: car.year.toString(), icon: icons['Rok výroby'] },
    { label: 'Karoséria', value: car.bodyType || 'N/A', icon: icons['Karoséria'] },
    { label: 'VIN', value: car.vin || 'N/A', icon: icons['VIN'] },
  ].filter(item => item.value && item.value !== 'N/A');

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="DETAIL VOZIDLA" />
      
      <div className="w-4/5 mx-auto py-8">
        {/* Image Gallery */}
        <div className="relative mb-8 overflow-hidden">
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border-none text-2xl cursor-pointer px-3 py-1 rounded z-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                ←
              </button>
              <button 
                onClick={nextImage}
                disabled={currentImageIndex >= images.length - 1}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border-none text-2xl cursor-pointer px-3 py-1 rounded z-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                →
              </button>
            </>
          )}
          
          {/* Sliding Gallery */}
          <div className="h-96 relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ 
                transform: `translateX(-${currentImageIndex * 100}%)`,
                width: `${images.length * 100}%`
              }}
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="w-full h-full flex-shrink-0 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image} 
                    alt={`${car.brand} ${car.model} ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
          
          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-blue-500 opacity-100' 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-4xl max-h-4xl">
              <button 
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
              >
                ×
              </button>
              <button 
                onClick={(e) => {e.stopPropagation(); prevLightboxImage();}}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
              >
                ←
              </button>
              <button 
                onClick={(e) => {e.stopPropagation(); nextLightboxImage();}}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
              >
                →
              </button>
              <img 
                src={images[lightboxIndex]} 
                alt={`${car.brand} ${car.model}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 pb-5 border-b border-gray-200">
          <h1 className="text-4xl font-bold mb-2 font-jost">{car.brand} {car.model}</h1>
          <div className="text-3xl text-red-600 font-bold font-montserrat">{car.price.toLocaleString()} €</div>
        </div>

        {/* Basic Data */}
        <h2 className="text-2xl font-semibold mb-5 font-jost">Základné údaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {basicData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <img src={item.icon} alt={item.label} className="w-10 h-10" />
              </div>
              <div className="flex flex-col">
                <div className="text-lg mb-0 leading-tight font-montserrat">{item.label}</div>
                <div className="text-base font-bold font-montserrat">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-5 font-jost">Výbava</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 p-0 list-none">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center font-montserrat">
                  <span className="text-blue-500 font-bold mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Additional Info */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-10">
          {car.description && (
            <li className="pb-3 border-b border-gray-200">
              <strong className="block text-xl mb-2 font-jost">Popis</strong>
              <div className="whitespace-pre-wrap font-montserrat">{car.description}</div>
            </li>
          )}
          <li className="pb-3 border-b border-gray-200">
            <strong className="block text-xl mb-2 font-jost">Link</strong>
            <div>
              <a href="#" className="inline-block bg-gray-800 text-white px-5 py-2 rounded no-underline font-bold hover:bg-gray-700 font-montserrat">
                <span>Autobazar</span><span className="text-blue-500">.SK</span>
              </a>
            </div>
          </li>
        </ul>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link 
            to="/ponuka"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg inline-block font-montserrat"
          >
            ← Späť na ponuku
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;