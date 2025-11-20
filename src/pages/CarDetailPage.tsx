import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MiniHero from '../components/MiniHero';
import { Car } from '../types/car';
import { equipmentCategories } from '../data/equipmentOptions';

interface CarDetailPageProps {
  cars: Car[];
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ cars }) => {
  const { slug } = useParams<{ slug: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
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
    // Calculate total width of all photos
    const mainPhotoWidth = 624 + 4; // 624px + 4px margin
    const smallPhotoColumns = Math.ceil((images.length - 1) / 2);
    const smallPhotosWidth = smallPhotoColumns * (336 + 4); // 336px width + 4px gap per column
    const totalContentWidth = mainPhotoWidth + smallPhotosWidth;
    
    // Assume viewport width (you might want to get actual viewport width)
    const viewportWidth = window.innerWidth - 10; // minus 5px padding on each side
    const maxScroll = Math.max(0, totalContentWidth - viewportWidth);
    
    setCurrentImageIndex(prev => Math.min(prev + 600, maxScroll));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => Math.max(0, prev - 600)); // Scroll by 600px to the left
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setTimeout(() => setLightboxVisible(true), 10);
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
      
      <div className="py-8">
        {/* Image Gallery */}
        <div className="relative mb-8 w-full overflow-x-auto" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          {images.length > 6 && (() => {
            const mainPhotoWidth = 624 + 4;
            const smallPhotoColumns = Math.ceil((images.length - 1) / 2);
            const smallPhotosWidth = smallPhotoColumns * (336 + 4);
            const totalContentWidth = mainPhotoWidth + smallPhotosWidth;
            const viewportWidth = window.innerWidth - 10;
            const maxScroll = Math.max(0, totalContentWidth - viewportWidth);
            
            return (
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
                  disabled={currentImageIndex >= maxScroll}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border-none text-2xl cursor-pointer px-3 py-1 rounded z-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  →
                </button>
              </>
            );
          })()}
          
          {/* Horizontal Scrolling Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                height: '499px',
                transform: `translateX(-${currentImageIndex}px)`,
                width: 'auto'
              }}
            >
              {/* First image - big (2x2) */}
              <div className="flex-shrink-0 mr-1" style={{ width: '624px', height: '499px' }}>
                <img 
                  src={images[0]} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90"
                  onClick={() => openLightbox(0)}
                />
              </div>
              
              {/* Remaining images - small grid continuing to the right */}
              <div className="flex gap-1">
                {Array.from({ length: Math.ceil((images.length - 1) / 2) }, (_, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col gap-1" style={{ width: '336px' }}>
                    {/* Top row image */}
                    {images[columnIndex * 2 + 1] && (
                      <div style={{ height: '248px' }}>
                        <img 
                          src={images[columnIndex * 2 + 1]} 
                          alt={`${car.brand} ${car.model} ${columnIndex * 2 + 2}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                          onClick={() => openLightbox(columnIndex * 2 + 1)}
                        />
                      </div>
                    )}
                    
                    {/* Bottom row image */}
                    {images[columnIndex * 2 + 2] && (
                      <div style={{ height: '248px' }}>
                        <img 
                          src={images[columnIndex * 2 + 2]} 
                          alt={`${car.brand} ${car.model} ${columnIndex * 2 + 3}`}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                          onClick={() => openLightbox(columnIndex * 2 + 2)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div 
            className={`fixed inset-0 bg-white backdrop-blur z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
              lightboxVisible ? 'bg-opacity-80 opacity-100' : 'bg-opacity-0 opacity-0'
            }`}
            onClick={() => {
              setLightboxVisible(false);
              setTimeout(() => setLightboxOpen(false), 500);
            }}
          >
            <button 
              onClick={() => {
                setLightboxVisible(false);
                setTimeout(() => setLightboxOpen(false), 500);
              }}
              className="fixed top-4 right-4 text-black text-4xl hover:text-gray-700 z-50 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
              ×
            </button>
            <button 
              onClick={(e) => {e.stopPropagation(); prevLightboxImage();}}
              className="fixed left-8 top-1/2 transform -translate-y-1/2 text-black text-4xl hover:text-gray-700 z-50 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
              ←
            </button>
            <button 
              onClick={(e) => {e.stopPropagation(); nextLightboxImage();}}
              className="fixed right-8 top-1/2 transform -translate-y-1/2 text-black text-4xl hover:text-gray-700 z-50 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
              →
            </button>
            
            <div className={`relative max-w-5xl max-h-5xl transform transition-all duration-500 ease-in-out ${
              lightboxVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              <img 
                src={images[lightboxIndex]} 
                alt={`${car.brand} ${car.model}`}
                className="max-w-full max-h-full object-contain transition-all duration-200 ease-in-out"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-black text-sm bg-white bg-opacity-90 px-3 py-1 rounded shadow-lg z-50">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 pb-5 border-b border-gray-200 w-4/5 mx-auto">
          <h1 className="text-4xl font-bold mb-2 font-jost">{car.brand} {car.model}</h1>
          <div className="text-3xl text-red-600 font-bold font-montserrat">{car.price.toLocaleString()} €</div>
        </div>

        {/* Basic Data */}
        <div className="w-4/5 mx-auto">
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
        </div>

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="w-4/5 mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-5 font-jost">Výbava</h2>
            <div className="space-y-6">
              {equipmentCategories.map((category) => {
                const categoryFeatures = car.features?.filter(feature => category.options.includes(feature)) || [];

                if (categoryFeatures.length === 0) return null;

                return (
                  <div key={category.name}>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 font-jost">{category.name}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-0 list-none">
                      {categoryFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center font-montserrat">
                          <span className="text-blue-500 font-bold mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="w-4/5 mx-auto mb-10">
          {car.description && (
            <div className="pb-3 border-b border-gray-200 mb-4">
              <strong className="block text-xl mb-2 font-jost">Popis</strong>
              <div className="whitespace-pre-wrap font-montserrat break-words overflow-hidden">{car.description}</div>
            </div>
          )}
          <div className="pb-3 border-b border-gray-200">
            <strong className="block text-xl mb-2 font-jost">Link</strong>
            <div>
              <button className="inline-block bg-gray-800 text-white px-5 py-2 rounded font-bold hover:bg-gray-700 font-montserrat border-none cursor-pointer">
                <span>Autobazar</span><span className="text-blue-500">.SK</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8 w-4/5 mx-auto">
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