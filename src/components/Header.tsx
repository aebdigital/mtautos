import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/90 backdrop-blur-md text-black fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center h-16">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo-removebg-preview (1).png"
              alt="MT AUTOS"
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex h-full items-center">
          <Link to="/ponuka" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4">Ponuka</Link>
          <Link to="/dovoz" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4">Dovoz</Link>
          <Link to="/leasing" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4">Leasing</Link>
          <Link to="/vykup" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4">Výkup</Link>
          <Link to="/pzp" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4">PZP</Link>
          <Link to="/kontakt" className="text-black font-bold font-jost hover:text-gray-600 flex items-center px-4 h-full">Kontakt</Link>
        </nav>

        {/* Right Side: Banner (Desktop) + Hamburger (Mobile) */}
        <div className="flex items-center">
          <img
            src="/header baner.jpg"
            alt="MT AUTOS Banner"
            className="hidden md:block h-12 w-auto"
          />

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="md:hidden p-2 ml-4 focus:outline-none bg-transparent border-none cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay (Full Screen) */}
      <div
        className={`fixed top-0 left-0 w-full h-[100dvh] bg-white z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center h-16 border-b border-gray-100 bg-white">
          <Link to="/" onClick={toggleMenu}>
            <img
              src="/logo-removebg-preview (1).png"
              alt="MT AUTOS"
              className="h-12 w-auto"
            />
          </Link>
          <button onClick={toggleMenu} className="p-2 focus:outline-none bg-transparent border-none cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col justify-start p-4 h-full bg-white" style={{ gap: '20px' }}>
          <Link to="/ponuka" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>Ponuka</Link>
          <Link to="/dovoz" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>Dovoz</Link>
          <Link to="/leasing" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>Leasing</Link>
          <Link to="/vykup" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>Výkup</Link>
          <Link to="/pzp" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>PZP</Link>
          <Link to="/kontakt" className="text-black font-bold font-jost hover:text-gray-600 text-5xl" onClick={toggleMenu}>Kontakt</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;