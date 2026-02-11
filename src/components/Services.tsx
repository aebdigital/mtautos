import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Predaj',
      image: '/predaj.jpeg',
      link: '/ponuka',
    },
    {
      title: 'Dovoz',
      image: '/dovoz.jpg',
      link: '/dovoz',
    },
    {
      title: 'Leasing',
      image: '/leasing.jpg',
      link: '/leasing',
    },
    {
      title: 'Výkup',
      image: '/vykup.webp',
      link: '/vykup',
    },
    {
      title: 'Poistenie',
      image: '/pzp.jpg',
      link: '/pzp',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-12 font-jost">NAŠE SLUŽBY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Link
              to={service.link}
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg block"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-bold font-jost text-white">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;