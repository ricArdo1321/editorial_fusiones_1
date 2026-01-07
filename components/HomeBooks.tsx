'use client';

import { useState } from 'react';

interface Book {
    id: string;
    title: string;
    author: string;
    year: string;
}

interface HomeBooksProps {
    books: readonly Book[];
}

export default function HomeBooks({ books }: HomeBooksProps) {
    const [hoveredBook, setHoveredBook] = useState<string | null>(null);

    return (
        <div className="flex flex-col">
            {books.map((book) => (
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
    );
}
