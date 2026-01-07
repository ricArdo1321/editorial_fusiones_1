import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Book } from '../types';

const categories = ['TODO', 'POESÍA', 'ENSAYO', 'NOVELA', 'CRÓNICA'];

const booksMock: Book[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `book-${i}`,
  title: [
    'El Aleph', 'Rayuela', 'Pedro Páramo', 'Ficciones', 'Los Detectives Salvajes', 
    'El Tunel', 'Sobre Héroes y Tumbas', 'La Ciudad y los Perros', 'Aura', 
    'Bestiario', 'El Amor en los Tiempos del Cólera', 'La Invención de Morel'
  ][i % 12],
  author: [
    'Borges', 'Cortázar', 'Rulfo', 'Borges', 'Bolaño', 
    'Sabato', 'Sabato', 'Vargas Llosa', 'Fuentes', 
    'Cortázar', 'García Márquez', 'Bioy Casares'
  ][i % 12],
  category: ['ENSAYO', 'NOVELA', 'NOVELA', 'ENSAYO', 'NOVELA', 'NOVELA', 'NOVELA', 'NOVELA', 'NOVELA', 'ENSAYO', 'NOVELA', 'NOVELA'][i % 12] as any,
  isbn: `978-3-16-${1484100 + i}`,
  score: 90 + (i % 9),
  coverUrl: `https://picsum.photos/seed/${i + 100}/400/600`
}));

const Curaduria: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('TODO');

  const filteredBooks = activeCategory === 'TODO' 
    ? booksMock 
    : booksMock.filter(b => b.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      
      {/* Sticky Filters */}
      <div className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm mb-12 py-4 border-b border-white/10">
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative group flex-shrink-0"
            >
              <span className={`font-sans text-sm font-bold tracking-widest uppercase transition-colors ${
                activeCategory === cat ? 'text-brand' : 'text-white/60 hover:text-white'
              }`}>
                {cat}
              </span>
              {/* Animated Underline */}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand transition-all duration-300 ${
                activeCategory === cat ? 'w-full' : 'w-0'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Dense Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {filteredBooks.map((book) => (
          <article key={book.id} className="group cursor-pointer flex flex-col h-full">
            {/* Image container */}
            <div className="relative aspect-[2/3] overflow-hidden mb-4 bg-gray-900 border border-white/5">
               <img 
                 src={book.coverUrl} 
                 alt={book.title} 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
               />
               <div className="absolute top-2 right-2 bg-black text-white p-1">
                 <ArrowUpRight size={16} />
               </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1 mt-auto">
              <div className="flex justify-between items-start border-t border-white/10 pt-2">
                <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">{book.category}</span>
                <span className="font-mono text-[10px] text-brand tracking-wider">{book.score} PTS</span>
              </div>
              
              <h3 className="font-sans text-lg font-black uppercase leading-tight group-hover:text-brand transition-colors mt-1">
                {book.title}
              </h3>
              
              <p className="font-serif italic text-white/70 text-sm">
                {book.author}
              </p>
              
              <span className="font-mono text-[10px] text-white/30 mt-2">
                ISBN: {book.isbn}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Curaduria;