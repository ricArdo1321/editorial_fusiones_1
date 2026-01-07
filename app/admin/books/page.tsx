import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import DeleteBookButton from './DeleteBookButton';

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
    const books = await prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Libros</h2>
                <Link
                    href="/admin/books/new"
                    className="flex items-center gap-2 bg-brand text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                    <Plus size={16} />
                    Nuevo Libro
                </Link>
            </div>

            <div className="border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Autor</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Categoría</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Score</th>
                            <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-4 py-3 font-medium">{book.title}</td>
                                <td className="px-4 py-3 text-white/60 italic">{book.author}</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs font-mono text-brand">{book.category}</span>
                                </td>
                                <td className="px-4 py-3 font-mono">{book.score}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/books/${book.id}`}
                                            className="p-2 hover:bg-white/10 transition-colors"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <DeleteBookButton bookId={book.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                                    No hay libros. Crea el primero.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
