import React, { useState } from 'react';
import { Car } from '../types/car';
import { equipmentCategories } from '../data/equipmentOptions';

interface CarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (car: Omit<Car, 'id'>) => void;
}

const CarModal: React.FC<CarModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel: 'Petrol',
    transmission: 'Manual',
    image: '',
    engine: '',
    power: '',
    bodyType: '',
    vin: '',
    description: '',
    reservedUntil: '',
    showOnHomepage: false
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      reservedUntil: formData.reservedUntil || undefined
    });
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuel: 'Petrol',
      transmission: 'Manual',
      image: '',
      engine: '',
      power: '',
      bodyType: '',
      vin: '',
      description: '',
      reservedUntil: '',
      showOnHomepage: false
    });
    setSelectedFeatures([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pridať nové vozidlo</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Značka *</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="napr. BMW"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="napr. 320d"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rok výroby *</label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cena (€) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Najazdené km *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Palivo *</label>
              <select
                required
                value={formData.fuel}
                onChange={(e) => setFormData({...formData, fuel: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Petrol">Benzín</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Elektrický</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prevodovka *</label>
              <select
                required
                value={formData.transmission}
                onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Manual">Manuálna</option>
                <option value="Automatic">Automatická</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Motor</label>
              <input
                type="text"
                value={formData.engine}
                onChange={(e) => setFormData({...formData, engine: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="napr. 2.0 TDI"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Výkon</label>
              <input
                type="text"
                value={formData.power}
                onChange={(e) => setFormData({...formData, power: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="napr. 150 PS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Karoséria</label>
              <input
                type="text"
                value={formData.bodyType}
                onChange={(e) => setFormData({...formData, bodyType: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="napr. SUV"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">VIN</label>
              <input
                type="text"
                value={formData.vin}
                onChange={(e) => setFormData({...formData, vin: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Identifikačné číslo vozidla"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">URL obrázka</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Popis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                placeholder="Doplňujúce informácie o vozidle..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rezervované do</label>
              <input
                type="date"
                value={formData.reservedUntil}
                onChange={(e) => setFormData({...formData, reservedUntil: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showOnHomepage"
                checked={formData.showOnHomepage}
                onChange={(e) => setFormData({...formData, showOnHomepage: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="showOnHomepage" className="ml-2 text-sm font-medium">
                Zobraziť na domovskej stránke (Najnovšie vozidlá)
              </label>
            </div>
          </div>

          {/* Equipment Selection */}
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-3">Výbava</h3>
            <div className="space-y-2">
              {equipmentCategories.map((category) => (
                <div key={category.name} className="border rounded">
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center"
                  >
                    <span>{category.name}</span>
                    <span>{expandedCategory === category.name ? '−' : '+'}</span>
                  </button>
                  {expandedCategory === category.name && (
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                      {category.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(option)}
                            onChange={() => toggleFeature(option)}
                            className="rounded text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedFeatures.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium mb-2">Vybraných: {selectedFeatures.length}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFeatures.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Zrušiť
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Pridať vozidlo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;