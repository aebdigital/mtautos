import React, { useState } from 'react';
import { Car } from '../types/car';

interface AdminPageProps {
  onAddCar: (car: Car) => void;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  createdAt: Date;
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddCar }) => {
  const [activeTab, setActiveTab] = useState<'cars' | 'announcements'>('cars');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
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
    images: [] as string[]
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');
  
  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: ''
  });

  const handleCarFormChange = (field: string, value: any) => {
    setCarForm(prev => ({ ...prev, [field]: value }));
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

  const addImage = () => {
    if (newImage.trim()) {
      setCarForm(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setCarForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitCar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!carForm.brand || !carForm.model || !carForm.fuel || !carForm.transmission) {
      alert('Prosím vyplňte všetky povinné polia');
      return;
    }

    const newCar: Car = {
      id: `admin-${Date.now()}`,
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
      source: 'admin'
    };

    onAddCar(newCar);
    
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
      images: []
    });
    
    alert('Vozidlo bolo úspešne pridané!');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 font-jost">Admin Panel</h1>
        
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
            onClick={() => setActiveTab('announcements')}
            className={`px-6 py-3 rounded-lg font-montserrat ${
              activeTab === 'announcements'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Oznamy
          </button>
        </div>

        {/* Car Addition Tab */}
        {activeTab === 'cars' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 font-jost">Pridať nové vozidlo</h2>
            
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
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Pridajte položku výbavy a stlačte Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-montserrat"
                  >
                    Pridať
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {carForm.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm font-montserrat"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-semibold mb-2 font-jost">Fotografie</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                    placeholder="URL fotografie"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-montserrat"
                  >
                    Pridať
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {carForm.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Fotografia ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold text-lg font-montserrat transition-colors"
              >
                Pridať vozidlo
              </button>
            </form>
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
      </div>
    </div>
  );
};

export default AdminPage;