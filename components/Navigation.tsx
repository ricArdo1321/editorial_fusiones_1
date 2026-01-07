import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Inicio', path: PageRoute.HOME },
    { label: 'Curaduría', path: PageRoute.CURADURIA },
    { label: 'Bitácora', path: PageRoute.BITACORA },
    { label: 'Editorial', path: PageRoute.EDITORIAL },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md bg-background/70">
        <Link to={PageRoute.HOME} className="text-xl font-black tracking-tighter uppercase font-sans hover:text-brand transition-colors">
          Editorial<span className="text-brand">.</span> Fusiones
        </Link>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 border border-foreground rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand hover:border-brand transition-all">
            Herramientas
          </button>
          
          <button onClick={toggleMenu} className="focus:outline-none hover:text-brand transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile/Overlay Menu */}
      <div 
        className={`fixed inset-0 z-30 bg-background flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-4xl md:text-6xl font-black tracking-tight font-sans hover:text-brand transition-colors ${
                location.pathname === link.path ? 'text-brand' : 'text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;