import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MiniHero from '../components/MiniHero';
import { Car } from '../types/car';
import { equipmentCategories } from '../data/equipmentOptions';
import { getCarFullById, PublicCarFull } from '../lib/publicCars';

// Import local SVG icons
import pohonIcon from '../images/pohon.svg';
import palivoIcon from '../images/palivo.svg';
import kmIcon from '../images/km.svg';
import vykonIcon from '../images/vykon.svg';
import prevodovkaIcon from '../images/prevodovka.svg';
import motorIcon from '../images/motor.svg';
import rokIcon from '../images/rok.svg';
import karoseriaIcon from '../images/karoseria.svg';
import vinIcon from '../images/VIN.svg';
import dvereIcon from '../images/dvere.svg';
import farbaIcon from '../images/farba.svg';

interface CarDetailPageProps {
  cars: Car[];
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ cars }) => {
  const { slug } = useParams<{ slug: string }>();
  const [car, setCar] = useState<PublicCarFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);

  useEffect(() => {
    const loadCarDetails = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Extract car ID from slug (format: brand-model-year-uuid)
      // UUID format is xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 chars)
      // Take the last 36 characters to get the full UUID
      const carId = slug.slice(-36);

      try {
        // Fetch full details from Supabase
        const supabaseCar = await getCarFullById(carId);
        console.log('Loaded car from Supabase:', supabaseCar);
        setCar(supabaseCar);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setCar(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCarDetails();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MiniHero title="DETAIL VOZIDLA" />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-xl font-montserrat">Načítavam detail vozidla...</p>
          </div>
        </div>
      </div>
    );
  }

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

  // Build images array: main image + gallery images
  const allImages = [car.mainImageUrl, ...car.galleryImageUrls].filter(Boolean);
  const images = allImages.length > 0 ? allImages : [car.image];

  const icons = {
    'Pohon': pohonIcon,
    'Palivo': palivoIcon,
    'Kilometre': kmIcon,
    'Výkon': vykonIcon,
    'Prevodovka': prevodovkaIcon,
    'Objem motora': motorIcon,
    'Rok výroby': rokIcon,
    'Karoséria': karoseriaIcon,
    'VIN': vinIcon,
    'Dvere': dvereIcon,
    'Farba': farbaIcon,
  };

  // Helper to format transmission
  const formatTransmission = () => {
    if (car.transmissionType) {
      const type = car.transmissionType === 'automatic' ? 'Automatická' : 'Manuálna';
      return car.transmissionGears ? `${type} ${car.transmissionGears}-st.` : type;
    }
    return car.transmission;
  };

  const basicData = [
    { label: 'Pohon', value: car.drivetrain, icon: icons['Pohon'] },
    { label: 'Palivo', value: car.fuel, icon: icons['Palivo'] },
    { label: 'Kilometre', value: car.mileage ? `${car.mileage.toLocaleString()} km` : null, icon: icons['Kilometre'] },
    { label: 'Výkon', value: car.power, icon: icons['Výkon'] },
    { label: 'Prevodovka', value: formatTransmission(), icon: icons['Prevodovka'] },
    { label: 'Objem motora', value: car.engine, icon: icons['Objem motora'] },
    { label: 'Rok výroby', value: car.month && car.year ? `${car.month}/${car.year}` : car.year?.toString(), icon: icons['Rok výroby'] },
    { label: 'Karoséria', value: car.bodyType, icon: icons['Karoséria'] },
    { label: 'Dvere', value: car.doors, icon: icons['Dvere'] },
    { label: 'Farba', value: car.color, icon: icons['Farba'] },
    { label: 'Platnosť STK/EK', value: car.stkValidity ? (() => { const d = new Date(car.stkValidity); return `${d.getMonth() + 1}/${d.getFullYear()}`; })() : null, icon: icons['Rok výroby'] },
    { label: 'VIN', value: car.vin, icon: icons['VIN'] },
  ].filter(item => item.value && item.value !== 'N/A' && item.value !== '');

  const nextImage = () => {
    const mainPhotoWidth = 624 + 4;
    const smallPhotoColumns = Math.ceil((images.length - 1) / 2);
    const smallPhotosWidth = smallPhotoColumns * (336 + 4);
    const totalContentWidth = mainPhotoWidth + smallPhotosWidth;
    const viewportWidth = window.innerWidth - 10;
    const maxScroll = Math.max(0, totalContentWidth - viewportWidth);
    setCurrentImageIndex(prev => Math.min(prev + 600, maxScroll));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => Math.max(0, prev - 600));
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

  const nextMobileImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevMobileImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="VOZIDLO" />

      <div className="py-8">
        {/* Mobile Image View (Single Image with Slider) */}
        <div className="block md:hidden mb-8 w-full">
          <div className="w-full h-[40vh] relative">
            <img
              src={images[mobileImageIndex]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover"
              onClick={() => openLightbox(mobileImageIndex)}
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevMobileImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={nextMobileImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm pointer-events-none">
                  {mobileImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Image Gallery */}
        <div className="hidden md:block relative mb-8 w-full overflow-x-auto" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
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

            <div className={`relative flex items-center justify-center transform transition-all duration-500 ease-in-out ${
              lightboxVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`} style={{ width: '90vw', height: '90vh' }}>
      <img
        src={images[lightboxIndex]}
        alt="Car"
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-black text-sm bg-white bg-opacity-90 px-3 py-1 rounded shadow-lg z-50">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        )}

        {/* Header with Title and Price */}
        <div className="mb-8 pb-5 border-b border-gray-200 w-[90%] md:w-4/5 mx-auto">
          <h1 className="text-4xl font-bold mb-2 font-jost">{car.brand} {car.model}</h1>
          <p className="text-gray-600 mb-2 font-montserrat">
            {car.year} • {car.mileage?.toLocaleString()} km • {car.fuel} • {car.transmission}
          </p>
          <div className="text-3xl text-red-600 font-bold font-montserrat">{car.price?.toLocaleString()} €</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {car.reserved && (
              <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold font-montserrat rounded">
                REZERVOVANÉ
              </div>
            )}
            {car.vatDeductible && car.priceWithoutVat && (
              <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold font-montserrat rounded">
                Odpočet DPH: {car.priceWithoutVat.toLocaleString()} €
              </div>
            )}
          </div>
        </div>

        {/* Basic Data / Specs */}
        {basicData.length > 0 && (
          <div className="w-[90%] md:w-4/5 mx-auto">
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
        )}

        {/* Description */}
        {car.description && (
          <div className="w-[90%] md:w-4/5 mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-5 font-jost">Popis</h2>
            <div className="whitespace-pre-wrap font-montserrat break-words overflow-hidden bg-gray-50 p-4 rounded-lg">
              {car.description}
            </div>
          </div>
        )}

        {/* Features / Equipment */}
        {car.features && car.features.length > 0 && (
          <div className="w-[90%] md:w-4/5 mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-5 font-jost">Výbava</h2>
            <div className="space-y-6">
              {equipmentCategories.map((category) => {
                const categoryFeatures = car.features?.filter(feature => category.options.includes(feature)) || [];

                if (categoryFeatures.length === 0) return null;

                return (
                  <div key={category.name}>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 font-jost">{category.name}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-0 list-none">
                      {categoryFeatures.map((feature, index) => {
                        // Translation mappings for database values
                        const parkingSensorsMap: Record<string, string> = {
                          'front': 'Predné',
                          'rear': 'Zadné',
                          'front_rear': 'Predné + Zadné',
                        };
                        const acTypeMap: Record<string, string> = {
                          'manual': 'Manuálna',
                          'automatic': 'Automatická',
                        };
                        const electricWindowsMap: Record<string, string> = {
                          '2_front': '2x (predné)',
                          '4_all': '4x (všetky)',
                          '2': '2x (predné)',
                          '4': '4x (všetky)',
                        };
                        const heatedSeatsMap: Record<string, string> = {
                          'front': 'Predné',
                          'front_rear': 'Predné + Zadné',
                          'all': 'Všetky',
                        };

                        // Format feature display with values where available
                        let displayText = feature;
                        let valueText = '';

                        if (feature === 'Airbagy – počet' && car.airbagCount) {
                          displayText = 'Počet airbagov';
                          valueText = car.airbagCount.toString();
                        } else if (feature === 'Airbagy' && car.airbagCount) {
                          displayText = 'Počet airbagov';
                          valueText = car.airbagCount.toString();
                        } else if (feature === 'Klimatizácia' && car.acType) {
                          const acTypeTranslated = acTypeMap[car.acType] || car.acType;
                          valueText = acTypeTranslated + (car.acZones ? ` (${car.acZones})` : '');
                        } else if (feature === 'Parkovacie senzory' && car.parkingSensors) {
                          valueText = parkingSensorsMap[car.parkingSensors] || car.parkingSensors;
                        } else if (feature === 'Elektrické okná' && car.electricWindows) {
                          valueText = electricWindowsMap[car.electricWindows] || car.electricWindows;
                        } else if (feature === 'Vyhrievané sedadlá' && car.heatedSeats) {
                          valueText = heatedSeatsMap[car.heatedSeats] || car.heatedSeats;
                        }

                        return (
                          <li key={index} className="flex items-start font-montserrat">
                            <span className="text-blue-500 font-bold mr-2 mt-0.5">✓</span>
                            <div className="flex flex-col">
                              <span>{displayText}</span>
                              {valueText && <span className="text-gray-600 text-sm font-semibold">{valueText}</span>}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {/* Show features not in categories */}
              {(() => {
                const allCategoryOptions = equipmentCategories.flatMap(c => c.options);
                const uncategorizedFeatures = car.features?.filter(f => !allCategoryOptions.includes(f)) || [];

                if (uncategorizedFeatures.length === 0) return null;

                return (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 font-jost">Ostatné</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-0 list-none">
                      {uncategorizedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center font-montserrat">
                          <span className="text-blue-500 font-bold mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Reserved Until Notice */}
        {car.reservedUntil && new Date(car.reservedUntil) > new Date() && (
          <div className="w-[90%] md:w-4/5 mx-auto mb-10">
            <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-3 rounded-lg font-montserrat">
              <strong>Rezervované</strong> do {new Date(car.reservedUntil).toLocaleDateString('sk-SK')}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-8 w-[90%] md:w-4/5 mx-auto">
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
