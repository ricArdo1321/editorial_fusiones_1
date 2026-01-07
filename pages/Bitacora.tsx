import React from 'react';
import { BlogPost } from '../types';

const posts: BlogPost[] = [
  { id: '1', type: 'FEATURED', title: 'La Muerte del Autor en la Era Digital', excerpt: 'Revisitando a Barthes desde la perspectiva de la inteligencia artificial generativa y la pérdida de la subjetividad.', date: 'OCT 12', imageUrl: 'https://picsum.photos/seed/b1/1200/600' },
  { id: '2', type: 'EDITORIAL', title: 'Manifiesto Nº 5: Contra el Ruido', excerpt: 'El silencio como herramienta de resistencia política. Una exploración necesaria en tiempos de saturación informativa.', date: 'OCT 10' },
  { id: '3', type: 'STACK', title: 'Archivo Visual: Brutalismo Caribeño', excerpt: 'Fotografía análoga de estructuras abandonadas.', date: 'OCT 08', imageUrl: 'https://picsum.photos/seed/b3/600/800' },
  { id: '4', type: 'STANDARD', title: 'Poesía Concreta', excerpt: 'Nuevas voces desde Sao Paulo.', date: 'OCT 05', imageUrl: 'https://picsum.photos/seed/b4/400/400' },
  { id: '5', type: 'STANDARD', title: 'El Jazz y la Prosa', excerpt: 'Ritmo sincopado en la escritura de Cortázar.', date: 'OCT 02', imageUrl: 'https://picsum.photos/seed/b5/400/400' },
  { id: '6', type: 'STANDARD', title: 'Futurismo Andino', excerpt: 'Ciencia ficción desde los Andes.', date: 'SEP 28', imageUrl: 'https://picsum.photos/seed/b6/400/400' },
];

const Bitacora: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12">
      
      {/* Newspaper Header */}
      <header className="border-b-4 border-foreground pb-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-4 uppercase font-sans">
        <div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Bitácora</h1>
          <p className="text-xl font-bold mt-2">Volumen 24</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs md:text-sm text-brand tracking-widest">{currentDate}</p>
        </div>
      </header>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
        
        {posts.map((post, index) => {
          // Determine styling based on type
          if (post.type === 'FEATURED') {
            return (
              <article key={post.id} className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-white/10 pb-12 group cursor-pointer">
                <div className="overflow-hidden bg-gray-900 aspect-video md:aspect-auto">
                   <img src={post.imageUrl} className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt={post.title} />
                </div>
                <div className="flex flex-col justify-center">
                   <span className="text-brand font-mono text-xs mb-2">FEATURED — {post.date}</span>
                   <h2 className="font-sans text-4xl md:text-6xl font-black uppercase leading-tight mb-4 group-hover:text-brand transition-colors">{post.title}</h2>
                   <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            );
          }

          if (post.type === 'EDITORIAL') {
            return (
              <article key={post.id} className="md:col-span-1 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group h-full">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 group-hover:underline decoration-brand decoration-2 underline-offset-4">{post.title}</h2>
                  <p className="font-sans text-sm text-white/60 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="font-mono text-xs text-brand">EDITORIAL</span>
                  <span className="font-mono text-xs text-white/40">{post.date}</span>
                </div>
              </article>
            );
          }

          if (post.type === 'STACK') {
            return (
               <article key={post.id} className="md:col-span-1 flex flex-col h-full group cursor-pointer">
                 <div className="relative flex-grow overflow-hidden mb-4">
                    <img src={post.imageUrl} className="absolute inset-0 w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" alt={post.title} />
                    {/* Simulated Stack Effect */}
                    <div className="absolute top-2 left-2 w-full h-full border border-white/20 z-0 translate-x-2 translate-y-2" />
                 </div>
                 <h3 className="font-sans text-xl font-bold uppercase mt-auto group-hover:text-brand transition-colors">{post.title}</h3>
                 <span className="font-mono text-[10px] text-white/50 mt-1">{post.date}</span>
               </article>
            );
          }

          return (
            <article key={post.id} className="md:col-span-1 group cursor-pointer">
               <div className="overflow-hidden mb-4 aspect-square bg-gray-900">
                  <img src={post.imageUrl} className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" alt={post.title} />
               </div>
               <h3 className="font-sans text-lg font-bold uppercase leading-tight group-hover:text-brand transition-colors">{post.title}</h3>
               <p className="font-serif text-xs text-white/60 mt-2 line-clamp-2">{post.excerpt}</p>
            </article>
          );
        })}

      </div>
    </div>
  );
};

export default Bitacora;