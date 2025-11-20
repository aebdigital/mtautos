import React, { useState, useEffect } from 'react';
import { Car } from '../types/car';
import MiniHero from '../components/MiniHero';
import { equipmentCategories } from '../data/equipmentOptions';

interface AdminPageProps {
  onAddCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onEditCar: (car: Car) => void;
  adminCars: Car[];
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  createdAt: Date;
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddCar, onDeleteCar, onEditCar, adminCars }) => {
  const [activeTab, setActiveTab] = useState<'cars' | 'announcements' | 'manage' | 'vacation'>('cars');
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // Load announcements from localStorage
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const stored = window.localStorage.getItem('mt-autos-announcements');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load vacation status from localStorage
  const [vacationPhones, setVacationPhones] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem('mt-autos-vacation-phones');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  // Car form state
  const [carForm, setCarForm] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel: '',
    transmission: '',
    engine: '',
    power: '',
    bodyType: '',
    drivetrain: '',
    vin: '',
    description: '',
    features: [] as string[],
    images: [] as string[],
    reservedUntil: '',
    showOnHomepage: false
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: ''
  });

  // Persist announcements to localStorage
  useEffect(() => {
    window.localStorage.setItem('mt-autos-announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Persist vacation phones to localStorage
  useEffect(() => {
    window.localStorage.setItem('mt-autos-vacation-phones', JSON.stringify(vacationPhones));
  }, [vacationPhones]);

  const handleCarFormChange = (field: string, value: any) => {
    setCarForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setCarForm(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setCarForm(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setCarForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target?.result as string;
          setCarForm(prev => ({
            ...prev,
            images: [...prev.images, imageDataUrl]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset the input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setCarForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const startEditCar = (car: Car) => {
    setEditingCar(car);
    setIsEditMode(true);
    setCarForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuel: car.fuel,
      transmission: car.transmission,
      engine: car.engine || '',
      power: car.power || '',
      bodyType: car.bodyType || '',
      drivetrain: car.drivetrain || '',
      vin: car.vin || '',
      description: car.description || '',
      features: car.features || [],
      images: car.images || [],
      reservedUntil: car.reservedUntil || '',
      showOnHomepage: car.showOnHomepage || false
    });
    setActiveTab('cars');
  };

  const cancelEdit = () => {
    setEditingCar(null);
    setIsEditMode(false);
    setCarForm({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel: '',
      transmission: '',
      engine: '',
      power: '',
      bodyType: '',
      drivetrain: '',
      vin: '',
      description: '',
      features: [],
      images: [],
      reservedUntil: '',
      showOnHomepage: false
    });
  };

  const handleSubmitCar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!carForm.brand || !carForm.model || !carForm.fuel || !carForm.transmission) {
      alert('Prosím vyplňte všetky povinné polia');
      return;
    }

    const carData: Car = {
      id: isEditMode && editingCar ? editingCar.id : `admin-${Date.now()}`,
      brand: carForm.brand,
      model: carForm.model,
      year: carForm.year,
      price: carForm.price,
      mileage: carForm.mileage,
      fuel: carForm.fuel,
      transmission: carForm.transmission,
      image: carForm.images[0] || 'https://via.placeholder.com/400x300?text=No+Image',
      images: carForm.images.length > 0 ? carForm.images : undefined,
      features: carForm.features.length > 0 ? carForm.features : undefined,
      engine: carForm.engine || undefined,
      power: carForm.power || undefined,
      bodyType: carForm.bodyType || undefined,
      drivetrain: carForm.drivetrain || undefined,
      vin: carForm.vin || undefined,
      description: carForm.description || undefined,
      reservedUntil: carForm.reservedUntil || undefined,
      showOnHomepage: carForm.showOnHomepage,
      source: 'admin'
    };

    if (isEditMode && editingCar) {
      onEditCar(carData);
      alert('Vozidlo bolo úspešne upravené!');
    } else {
      onAddCar(carData);
      alert('Vozidlo bolo úspešne pridané!');
    }
    
    // Reset form
    setCarForm({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel: '',
      transmission: '',
      engine: '',
      power: '',
      bodyType: '',
      drivetrain: '',
      vin: '',
      description: '',
      features: [],
      images: [],
      reservedUntil: '',
      showOnHomepage: false
    });
    
    setIsEditMode(false);
    setEditingCar(null);
    
    // Switch to manage vehicles tab
    setActiveTab('manage');
  };

  const handleSubmitAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!announcementForm.title || !announcementForm.message) {
      alert('Prosím vyplňte názov a správu');
      return;
    }

    const newAnnouncement: Announcement = {
      id: `announcement-${Date.now()}`,
      title: announcementForm.title,
      message: announcementForm.message,
      isActive: true,
      createdAt: new Date()
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setAnnouncementForm({ title: '', message: '' });
    alert('Oznam bol úspešne pridaný!');
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(ann =>
        ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
      )
    );
  };

  const deleteAnnouncement = (id: string) => {
    if (window.confirm('Ste si istí, že chcete odstrániť tento oznam?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    }
  };

  const deleteCar = (carId: string) => {
    if (window.confirm('Ste si istí, že chcete odstrániť toto vozidlo?')) {
      onDeleteCar(carId);
    }
  };

  const toggleVacationPhone = (phone: string) => {
    setVacationPhones(prev => {
      if (prev.includes(phone)) {
        return prev.filter(p => p !== phone);
      } else {
        return [...prev, phone];
      }
    });
  };

  const availablePhones = ['+421 915 511 111', '+421 915 834 574'];

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="ADMIN PANEL" />
      <div className="container mx-auto px-4 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-3 rounded-lg font-montserrat ${
              activeTab === 'cars'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pridať vozidlo
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 rounded-lg font-montserrat ${
              activeTab === 'manage'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Spravovať vozidlá ({adminCars.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-3 rounded-lg font-montserrat ${
              activeTab === 'announcements'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Oznamy
          </button>
          <button
            onClick={() => setActiveTab('vacation')}
            className={`px-6 py-3 rounded-lg font-montserrat ${
              activeTab === 'vacation'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dovolenka
          </button>
        </div>

        {/* Car Addition Tab */}
        {activeTab === 'cars' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold font-jost">
                {isEditMode ? 'Upraviť vozidlo' : 'Pridať nové vozidlo'}
              </h2>
              {isEditMode && (
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-montserrat"
                >
                  Zrušiť
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmitCar} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Značka *</label>
                  <input
                    type="text"
                    value={carForm.brand}
                    onChange={(e) => handleCarFormChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Model *</label>
                  <input
                    type="text"
                    value={carForm.model}
                    onChange={(e) => handleCarFormChange('model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Rok</label>
                  <input
                    type="number"
                    value={carForm.year}
                    onChange={(e) => handleCarFormChange('year', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Cena (€)</label>
                  <input
                    type="number"
                    value={carForm.price}
                    onChange={(e) => handleCarFormChange('price', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Najazdené (km)</label>
                  <input
                    type="number"
                    value={carForm.mileage}
                    onChange={(e) => handleCarFormChange('mileage', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Palivo *</label>
                  <select
                    value={carForm.fuel}
                    onChange={(e) => handleCarFormChange('fuel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  >
                    <option value="">Vyberte palivo</option>
                    <option value="Benzín">Benzín</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Elektro">Elektro</option>
                    <option value="LPG">LPG</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Prevodovka *</label>
                  <select
                    value={carForm.transmission}
                    onChange={(e) => handleCarFormChange('transmission', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  >
                    <option value="">Vyberte prevodovku</option>
                    <option value="Manuálna">Manuálna</option>
                    <option value="Automatická">Automatická</option>
                    <option value="Poloautomatická">Poloautomatická</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Motor</label>
                  <input
                    type="text"
                    value={carForm.engine}
                    onChange={(e) => handleCarFormChange('engine', e.target.value)}
                    placeholder="napr. 2.0 TDI"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Výkon</label>
                  <input
                    type="text"
                    value={carForm.power}
                    onChange={(e) => handleCarFormChange('power', e.target.value)}
                    placeholder="napr. 150 kW (204 PS)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Karoséria</label>
                  <input
                    type="text"
                    value={carForm.bodyType}
                    onChange={(e) => handleCarFormChange('bodyType', e.target.value)}
                    placeholder="napr. Hatchback"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Pohon</label>
                  <input
                    type="text"
                    value={carForm.drivetrain}
                    onChange={(e) => handleCarFormChange('drivetrain', e.target.value)}
                    placeholder="napr. Predný"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">VIN</label>
                  <input
                    type="text"
                    value={carForm.vin}
                    onChange={(e) => handleCarFormChange('vin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2 font-jost">Popis</label>
                <textarea
                  value={carForm.description}
                  onChange={(e) => handleCarFormChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  placeholder="Detailný popis vozidla..."
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold mb-2 font-jost">Výbava</label>

                {/* Equipment categories */}
                <div className="space-y-2">
                  {equipmentCategories.map((category) => (
                    <div key={category.name} className="border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-semibold flex items-center justify-between font-jost"
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-600 font-montserrat">
                          {carForm.features.filter(f => category.options.includes(f)).length}/{category.options.length} {expandedCategory === category.name ? '▲' : '▼'}
                        </span>
                      </button>
                      {expandedCategory === category.name && (
                        <div className="p-4 bg-white grid grid-cols-2 md:grid-cols-3 gap-2">
                          {category.options.map((option) => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                              <input
                                type="checkbox"
                                checked={carForm.features.includes(option)}
                                onChange={() => toggleFeature(option)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-sm font-montserrat">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-semibold mb-2 font-jost">Fotografie</label>
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-sm text-gray-500 mt-2 font-montserrat">Vyberte jeden alebo viacero obrázkov (JPG, PNG, GIF)</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6" style={{ gap: '5px' }}>
                  {carForm.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Fotografia ${index + 1}`}
                        className="w-full h-28 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Date */}
              <div>
                <label className="block text-sm font-semibold mb-2 font-jost">Rezervované do</label>
                <input
                  type="date"
                  value={carForm.reservedUntil}
                  onChange={(e) => handleCarFormChange('reservedUntil', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                />
                <p className="text-sm text-gray-500 mt-1 font-montserrat">Ak je vozidlo rezervované, vyberte dátum do kedy</p>
              </div>

              {/* Show on Homepage */}
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  id="showOnHomepage"
                  checked={carForm.showOnHomepage}
                  onChange={(e) => handleCarFormChange('showOnHomepage', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="showOnHomepage" className="ml-3 text-sm font-semibold text-blue-900 font-jost">
                  Zobraziť na domovskej stránke v sekcii "Najnovšie vozidlá"
                </label>
              </div>
              <p className="text-sm text-gray-600 font-montserrat -mt-2">
                ⓘ Maximálne 4 vozidlá sa zobrazia na domovskej stránke. Ak nie je označené žiadne, zobrazia sa najnovšie 4 vozidlá.
              </p>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold text-lg font-montserrat transition-colors"
              >
                {isEditMode ? 'Upraviť vozidlo' : 'Pridať vozidlo'}
              </button>
            </form>
          </div>
        )}

        {/* Manage Cars Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 font-jost">Spravovať vozidlá</h2>
            
            {adminCars.length === 0 ? (
              <p className="text-gray-500 font-montserrat">Žiadne admin vozidlá</p>
            ) : (
              <div className="space-y-4">
                {adminCars.map((car) => (
                  <div key={car.id} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                    <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold font-jost truncate">
                        {car.brand} {car.model}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 font-montserrat">
                        <span>Rok: {car.year}</span>
                        <span>Cena: {car.price.toLocaleString()} €</span>
                        <span>Najazdené: {car.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="text-xs text-gray-500 font-montserrat mt-1">
                        ID: {car.id}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-montserrat rounded-full">
                        ADMIN
                      </span>
                      <button
                        onClick={() => startEditCar(car)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-montserrat text-sm transition-colors"
                        title="Upraviť"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-montserrat text-sm transition-colors"
                      >
                        Odstrániť
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            {/* Add Announcement Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 font-jost">Pridať oznam</h2>
              
              <form onSubmit={handleSubmitAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Názov</label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 font-jost">Správa</label>
                  <textarea
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-bold font-montserrat transition-colors"
                >
                  Pridať oznam
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 font-jost">Oznamy</h2>
              
              {announcements.length === 0 ? (
                <p className="text-gray-500 font-montserrat">Žiadne oznamy</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold font-jost">{announcement.title}</h3>
                          <p className="text-gray-600 font-montserrat mt-1">{announcement.message}</p>
                          <p className="text-xs text-gray-400 font-montserrat mt-2">
                            {announcement.createdAt.toLocaleString('sk-SK')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-montserrat ${
                            announcement.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {announcement.isActive ? 'Aktívny' : 'Neaktívny'}
                          </span>
                          <button
                            onClick={() => toggleAnnouncement(announcement.id)}
                            className="text-blue-600 hover:text-blue-800 font-montserrat text-sm"
                          >
                            {announcement.isActive ? 'Deaktivovať' : 'Aktivovať'}
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(announcement.id)}
                            className="text-red-600 hover:text-red-800 font-montserrat text-sm"
                          >
                            Odstrániť
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vacation Tab */}
        {activeTab === 'vacation' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 font-jost">Dovolenka - Správa telefónnych čísel</h2>
            <p className="text-gray-600 mb-6 font-montserrat">
              Aktivujte dovolenku pre telefónne čísla. Čísla na dovolenke nebudú zobrazené v pätičke ani na kontaktnej stránke.
            </p>

            <div className="space-y-4">
              {availablePhones.map((phone) => (
                <div key={phone} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                  <div>
                    <p className="text-lg font-semibold font-montserrat">{phone}</p>
                    <p className="text-sm text-gray-600 font-montserrat">
                      {vacationPhones.includes(phone) ? 'Na dovolenke - číslo je skryté' : 'Aktívne - číslo je zobrazené'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleVacationPhone(phone)}
                    className={`px-6 py-2 rounded-lg font-montserrat font-semibold transition-colors ${
                      vacationPhones.includes(phone)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {vacationPhones.includes(phone) ? 'Ukončiť dovolenku' : 'Aktivovať dovolenku'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;