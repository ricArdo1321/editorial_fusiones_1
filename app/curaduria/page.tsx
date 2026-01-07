import prisma from '@/lib/prisma';
import CuraduriaClient from './CuraduriaClient';
import { Book } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Curaduria() {
    const booksFromDb = await prisma.book.findMany({
        orderBy: { score: 'desc' },
    });

    // Transform to match Book interface
    const books: Book[] = booksFromDb.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category as Book['category'],
        isbn: book.isbn,
        score: book.score,
        coverUrl: book.coverUrl || undefined,
    }));

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <CuraduriaClient books={books} />
        </div>
    );
}
