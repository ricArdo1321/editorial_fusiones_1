'use client';

import { useState } from 'react';
import { ALL_CATEGORIES } from '@/lib/constants';
import { BOOKS_MOCK } from '@/lib/data/books';
import BookCard from '@/components/ui/BookCard';

const Curaduria = () => {
    const [activeCategory, setActiveCategory] = useState('TODO');

    const filteredBooks = activeCategory === 'TODO'
        ? BOOKS_MOCK
        : BOOKS_MOCK.filter(b => b.category === activeCategory);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">

            {/* Sticky Filters */}
            <div className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm mb-12 py-4 border-b border-white/10">
                <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
                    {ALL_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="relative group flex-shrink-0"
                        >
                            <span className={`font-sans text-sm font-bold tracking-widest uppercase transition-colors ${activeCategory === cat ? 'text-brand' : 'text-white/60 hover:text-white'
                                }`}>
                                {cat}
                            </span>
                            <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand transition-all duration-300 ${activeCategory === cat ? 'w-full' : 'w-0'
                                }`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Dense Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Curaduria;
