import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CarModal from './components/CarModal';
import HomePage from './pages/HomePage';
import PonukaPage from './pages/PonukaPage';
import CarDetailPage from './pages/CarDetailPage';
import KontaktPage from './pages/KontaktPage';
import AdminPage from './pages/AdminPage';
import { Car } from './types/car';
import { initialCars } from './data/initialCars';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchAutokazarData } from './services/autokazarApi';

function AppContent() {
  const navigate = useNavigate();
  const [manualCars, setManualCars] = useLocalStorage<Car[]>('mt-autos-manual-cars', []);
  const [xmlCars, setXmlCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load announcements from localStorage
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('mt-autos-announcements');
      setAnnouncements(stored ? JSON.parse(stored) : []);
    } catch {
      setAnnouncements([]);
    }
  }, []);

  // Combine XML cars with manual cars
  const cars = [...xmlCars, ...manualCars];

  useEffect(() => {
    const loadXmlData = async () => {
      try {
        setIsLoading(true);
        console.log('Starting XML data fetch...');
        const xmlData = await fetchAutokazarData();
        console.log('XML data loaded:', xmlData.length, 'cars');
        
        if (xmlData.length > 0) {
          const markedXmlCars = xmlData.map(car => ({ ...car, source: 'xml' as const }));
          setXmlCars(markedXmlCars);
        } else {
          console.log('No cars from XML, using initial cars');
          const markedInitialCars = initialCars.map(car => ({ ...car, source: 'xml' as const }));
          setXmlCars(markedInitialCars);
        }
      } catch (error) {
        console.error('Failed to load XML data:', error);
        // Fallback to initial cars if XML loading fails
        console.log('Loading fallback initial cars');
        const markedFallbackCars = initialCars.map(car => ({ ...car, source: 'xml' as const }));
        setXmlCars(markedFallbackCars);
      } finally {
        setIsLoading(false);
      }
    };

    loadXmlData();
  }, []);

  const handleAddCar = (newCarData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...newCarData,
      id: Date.now().toString(),
      image: newCarData.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNkI3Mjg4Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5Ub3JhZGxvPC90ZXh0Pgo8L3N2Zz4='
    };
    setManualCars([...manualCars, newCar]);
  };

  const handleAddAdminCar = (newCar: Car) => {
    setManualCars([...manualCars, newCar]);
  };

  const handleDeleteAdminCar = (carId: string) => {
    setManualCars(manualCars.filter(car => car.id !== carId));
  };

  const handleEditAdminCar = (updatedCar: Car) => {
    setManualCars(manualCars.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  const handleCarClick = () => {
    // This function is now handled by routing
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cars={cars}
              isLoading={isLoading}
              onCarClick={handleCarClick}
              onAddCarClick={() => navigate('/admin')}
              announcements={announcements}
            />
          }
        />
        <Route
          path="/ponuka"
          element={
            <PonukaPage
              cars={cars}
              isLoading={isLoading}
              onAddCarClick={() => navigate('/admin')}
            />
          }
        />
        <Route
          path="/vozidlo/:slug"
          element={<CarDetailPage cars={cars} />}
        />
        <Route
          path="/kontakt"
          element={<KontaktPage />}
        />
        <Route
          path="/admin"
          element={<AdminPage onAddCar={handleAddAdminCar} onDeleteCar={handleDeleteAdminCar} onEditCar={handleEditAdminCar} adminCars={manualCars} />}
        />
      </Routes>

      <Footer />

      <CarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCar}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
