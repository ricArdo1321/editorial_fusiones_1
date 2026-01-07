'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import HalftoneDot from '@/components/HalftoneDot';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { PageRoute } from '@/lib/types';
import { RECOMMENDED_BOOKS } from '@/lib/data/books';

const Home = () => {
    const [hoveredBook, setHoveredBook] = useState<string | null>(null);

    return (
        <div className="w-full min-h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col">

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-[70vh] relative mb-24">
                <HalftoneDot />

                <blockquote className="max-w-4xl text-center mt-8 z-10 mix-blend-difference">
                    <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-foreground font-light italic">
                        "La realidad no está obligada a ser convincente"
                    </p>
                    <footer className="mt-6 text-sm font-sans font-bold tracking-widest text-brand uppercase">
                        — Borges
                    </footer>
                </blockquote>
            </section>

            {/* Value Prop */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 border-t border-white/10 pt-12">
                <div className="md:col-span-4">
                    <h2 className="font-sans text-xs font-bold tracking-widest text-white/50 uppercase mb-4">Manifiesto</h2>
                </div>
                <div className="md:col-span-8">
                    <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground/90">
                        Somos una plataforma de curaduría literaria enfocada en el <span className="text-brand">Caribe</span> y el <span className="text-brand">Cono Sur</span>.
                        Rescatamos voces underground y clásicos olvidados en la era del ruido digital.
                    </p>
                </div>
            </section>

            {/* Recommended Readings */}
            <section className="mb-32">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <h2 className="font-sans text-4xl font-black tracking-tighter uppercase">Lecturas</h2>
                    <Link href={PageRoute.CURADURIA} className="text-sm font-bold uppercase tracking-widest hover:text-brand transition-colors flex items-center gap-2">
                        Ver Todo <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="flex flex-col">
                    {RECOMMENDED_BOOKS.map((book) => (
                        <div
                            key={book.id}
                            className="group relative border-b border-white/10 py-8 cursor-pointer transition-all duration-300 hover:bg-white/5 hover:pl-4"
                            onMouseEnter={() => setHoveredBook(book.id)}
                            onMouseLeave={() => setHoveredBook(null)}
                        >
                            <div className="flex justify-between items-baseline relative z-10">
                                <h3 className="font-sans text-xl md:text-4xl font-bold uppercase tracking-tight group-hover:text-brand transition-colors">
                                    {book.title}
                                </h3>
                                <div className="flex gap-4 md:gap-12 items-baseline text-right">
                                    <span className="font-serif italic text-white/60">{book.author}</span>
                                    <span className="font-mono text-xs text-brand hidden md:inline-block">{book.year}</span>
                                </div>
                            </div>

                            {/* Hover Image Reveal Effect */}
                            <div
                                className={`hidden lg:block absolute right-32 top-1/2 -translate-y-1/2 w-48 h-64 bg-gray-800 pointer-events-none transition-all duration-300 z-20 overflow-hidden ${hoveredBook === book.id ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-90 rotate-0'
                                    }`}
                            >
                                <img
                                    src={`https://picsum.photos/seed/${book.id}/300/400`}
                                    alt="Cover"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
