import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement;

      if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[80vh] bg-gray-400 flex items-center justify-center text-white overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hero section.jpg")',
          height: '120%',
          top: '-10%',
        }}
      />
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-left max-w-4xl px-0 md:px-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-jost hero-title">
            VÍTAME VÁS V AUTOBAZÁRI<br />
            <span className="text-blue-400">MT AUTOS</span>
            <br className="md:hidden" />
            <span className="text-2xl md:text-4xl text-white underline">Sučany pri Martine!</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl leading-relaxed font-montserrat">
            Vyberte si spoľahlivé vozidlo z našej ponuky nových, kontrolovaných
            ojazdených automobilov a nechajte si ho doviesť priamo ku vám.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/ponuka" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-bold text-lg font-montserrat cta-btn border-2 border-white w-full md:w-auto text-center inline-block">
              Pozrite si ponuku
            </Link>
            <Link to="/kontakt" className="bg-black hover:bg-gray-800 px-6 py-3 rounded text-white font-bold text-lg font-montserrat cta-btn border-2 border-white w-full md:w-auto text-center inline-block">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;