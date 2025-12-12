import React, { useState, useEffect } from 'react';
import MiniHero from '../components/MiniHero';
import PrivacyModal from '../components/PrivacyModal';
import { getActivePhonesForSite } from '../lib/publicContact';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const KontaktPage: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [phones, setPhones] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setFormStatus({ type: 'loading', message: 'Odosielam...' });

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Nastala chyba pri odosielaní');
      }

      // Success
      setFormStatus({
        type: 'success',
        message: 'Vaša správa bola úspešne odoslaná. Ozveme sa Vám čo najskôr.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nastala chyba pri odosielaní',
      });
    }
  };

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const activePhones = await getActivePhonesForSite();
        setPhones(activePhones);
      } catch (error) {
        console.error('Error loading phones:', error);
      }
    };

    loadPhones();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="KONTAKT" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Contact Info */}
          <div>
            
            <div className="space-y-6 font-montserrat">
              <div>
                <h3 className="text-lg font-semibold mb-2 font-jost">MT AUTOS s.r.o.</h3>
                <div className="text-gray-700 leading-relaxed">
                  <p>29 Augusta č.2261/145,</p>
                  <p>03852 Sučany, okres Martin</p>
                  <p>(Sučany-Juh, pri Čerpacej stanici Orlen)</p>
                </div>
              </div>
              
              <div>
                {phones.length > 0 ? (
                  <>
                    {phones.map((phone, index) => (
                      <p key={phone} className={`text-gray-700 ${index === 0 ? '' : 'ml-8'}`}>
                        {index === 0 && <span className="font-semibold">Tel: </span>}
                        {phone}
                      </p>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-700">
                    <span className="font-semibold">Tel:</span> Momentálne nedostupné
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <a 
                  href="https://wa.me/+421915834574" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  title="WhatsApp"
                >
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488"/>
                  </svg>
                </a>
                <button 
                  className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors border-none cursor-pointer"
                  title="Viber"
                >
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.9 1.6c.8-.1 1.6-.1 2.4 0C20.1 2.2 22 6.7 22 12c0 5.5-4.5 10-10 10-1.7 0-3.3-.4-4.7-1.2L2 22l1.3-5.3C2.5 15.3 2 13.7 2 12 2 6.5 6.5 2 12 2c.7 0 1.3.1 1.9.2l.8-.1v.1h.1c.4 0 .7.3.8.7 0 .1 0 .2-.1.3-.1.2-.3.3-.5.3h-.1c-.6-.1-1.2-.2-1.9-.2-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8c0-4.2-1.6-7.8-5.1-8.3-.1 0-.2-.1-.2-.2 0-.4.3-.7.7-.7h.3zm.6 6.9c.2.1.4.3.4.5v.1c0 .2-.1.4-.3.5-.1.1-.3.1-.4 0-1.2-.5-2.6-.5-3.8 0-.1.1-.3 0-.4 0-.2-.1-.3-.3-.3-.5v-.1c0-.2.2-.4.4-.5 1.4-.6 3-.6 4.4 0zm-1.3 2.3c.9.3 1.7 1 2.1 1.9.1.2 0 .4-.2.5h-.1c-.2 0-.3-.1-.4-.2-.3-.7-.9-1.2-1.6-1.4-.2-.1-.3-.3-.3-.5s.3-.4.5-.3zm-1.9 2.6c.1.1.1.2.1.3v2.7c0 .5-.4.9-.9.9s-.9-.4-.9-.9v-2.7c0-.5.4-.9.9-.9.3 0 .6.2.8.6zm3.8-1.1c.2 0 .4.2.4.4v4.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-4.4c0-.2.2-.4.4-.4zm-7.5.9c.2 0 .4.2.4.4v2.6c0 .2-.2.4-.4.4s-.4-.2-.4-.4v-2.6c0-.2.2-.4.4-.4z"/>
                  </svg>
                </button>
              </div>
              
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">e-mail:</span> mtautossro@gmail.com
                </p>
              </div>
              
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">IČO:</span> 47384017
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">DIČ:</span> 2023892652
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">IČ DPH:</span> SK2023892652
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2 font-jost">Otváracie hodiny:</h4>
                <div className="text-gray-700">
                  <p>Pondelok - piatok 9:00-17:00</p>
                  <p>Sobota - 9:00 - 13:00</p>
                  <p>Nedeľa - zatvorené</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form Card */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Header image */}
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: 'url("/kontakt bg.jpg")',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-2xl font-bold font-jost">
                  Ak máte otázky, neváhajte sa pýtať!
                </h2>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-600 mb-6 font-montserrat">
                Vyplňte potrebné údaje a zašleme sa Vám na najskôr
              </p>
              
              {formStatus.type !== 'idle' && (
                <div
                  className={`p-4 rounded mb-4 ${
                    formStatus.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : formStatus.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {formStatus.type === 'loading' && (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {formStatus.message}
                    </div>
                  )}
                  {formStatus.type !== 'loading' && formStatus.message}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Meno"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-montserrat"
                    required
                    disabled={formStatus.type === 'loading'}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-montserrat"
                    required
                    disabled={formStatus.type === 'loading'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefón"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-montserrat"
                    disabled={formStatus.type === 'loading'}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Predmet"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 font-montserrat"
                    disabled={formStatus.type === 'loading'}
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Správa"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 font-montserrat"
                  required
                  disabled={formStatus.type === 'loading'}
                />

                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="w-full bg-black text-white py-3 px-6 rounded font-bold font-montserrat hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {formStatus.type === 'loading' ? 'Odosielam...' : 'Odoslať'}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4 font-montserrat">
                Odoslaním súhlasíte pohltom spracovaniu v{' '}
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-blue-600 underline bg-transparent border-none cursor-pointer"
                >
                  ochrane osobných údajov
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  );
};

export default KontaktPage;