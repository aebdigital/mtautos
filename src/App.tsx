import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnnouncementPopup from './components/AnnouncementPopup';
import HomePage from './pages/HomePage';
import PonukaPage from './pages/PonukaPage';
import CarDetailPage from './pages/CarDetailPage';
import KontaktPage from './pages/KontaktPage';
import { Car } from './types/car';
import { getCarsForPonuka, PublicCar } from './lib/publicCars';

function AppContent() {
  const [supabaseCars, setSupabaseCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Announcements disabled
  const [announcements] = useState<any[]>([]);

  // Load cars from Supabase
  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        console.log('Loading cars from Supabase...');
        const data = await getCarsForPonuka();
        console.log('Cars loaded:', data.length);

        // Convert PublicCar to Car type
        const cars: Car[] = data.map((car: PublicCar) => ({
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year ?? 0,
          price: car.price ?? 0,
          mileage: car.mileage ?? 0,
          fuel: car.fuel ?? '',
          transmission: car.transmission ?? '',
          image: car.image,
          power: car.power ?? undefined,
          showOnHomepage: car.showOnHomepage ?? false,
        }));

        setSupabaseCars(cars);
      } catch (error) {
        console.error('Failed to load cars from Supabase:', error);
        setSupabaseCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  // Cars come from Supabase
  const cars = supabaseCars;

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
      </Routes>

      <Footer />

      <AnnouncementPopup />
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
