import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Book } from '@/lib/types';

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <article className="group cursor-pointer flex flex-col h-full">
            {/* Image container */}
            <div className="relative aspect-[2/3] overflow-hidden mb-4 bg-gray-900 border border-white/5">
                <Image
                    src={book.coverUrl || ''}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black text-white p-1">
                    <ArrowUpRight size={16} />
                </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1 mt-auto">
                <div className="flex justify-between items-start border-t border-white/10 pt-2">
                    <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
                        {book.category}
                    </span>
                    <span className="font-mono text-[10px] text-brand tracking-wider">
                        {book.score} PTS
                    </span>
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
    );
}
