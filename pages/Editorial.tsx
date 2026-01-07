import React from 'react';

const Editorial: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex justify-center">
      <article className="max-w-[65ch] w-full">
        <header className="mb-16 text-center">
          <span className="font-mono text-xs text-brand tracking-[0.2em] uppercase block mb-4">Sobre Nosotros</span>
          <h1 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
            Alta Cultura <br/> <span className="text-white/20">Underground</span>
          </h1>
        </header>

        <div className="prose prose-invert prose-lg md:prose-xl font-serif text-white/80 leading-loose">
          <p>
            <span className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px] first-letter:text-brand font-sans">E</span>
            ditorial Fusiones nace como una respuesta estética y política al algoritmo. En un mundo donde el contenido se optimiza para el consumo rápido, nosotros apostamos por la fricción, la densidad y la elegancia del pensamiento complejo.
          </p>
          <p>
            No somos una editorial convencional. Somos un laboratorio de curaduría que opera en los márgenes del canon establecido. Nos interesan las intersecciones: donde la poesía choca con la tecnología, donde la crónica se encuentra con la ficción especulativa, y donde el diseño gráfico dialoga con la tipografía clásica.
          </p>
          <h3 className="font-sans font-bold text-white uppercase tracking-wider text-sm mt-12 mb-6 border-l-2 border-brand pl-4">Nuestra Misión</h3>
          <p>
            Rescatar obras perdidas del Cono Sur y el Caribe, dándoles una nueva vida a través de formatos digitales experimentales y ediciones impresas limitadas. Creemos que el libro no ha muerto; simplemente está evolucionando hacia un objeto de culto.
          </p>
          <p>
             Operamos bajo una estética de minimalismo digital suave: menos ruido, más señal. Cada publicación es tratada como una pieza de arquitectura, construida para perdurar en el tiempo.
          </p>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="font-sans text-sm font-bold uppercase tracking-widest text-white/40">
            Fundado en 2024 — Montevideo / Santo Domingo
          </p>
        </div>
      </article>
    </div>
  );
};

export default Editorial;