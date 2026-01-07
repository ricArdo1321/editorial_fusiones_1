'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    score: number;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch('/api/admin/books');
            if (!res.ok) throw new Error('Failed to fetch books');
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            setError('Error al cargar libros. Verifica que el CPT "Libros" esté configurado en WordPress.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este libro?')) return;

        try {
            const res = await fetch(`/api/admin/books/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            fetchBooks();
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    if (loading) {
        return <div className="text-white/60">Cargando libros...</div>;
    }

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

            {error && (
                <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-4 py-3 mb-6">
                    {error}
                    <p className="text-xs mt-2 opacity-80">
                        Instala el plugin CPT UI en WordPress y crea un CPT llamado &quot;libro&quot; con show_in_rest habilitado.
                    </p>
                </div>
            )}

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
                                        <Link href={`/admin/books/${book.id}`} className="p-2 hover:bg-white/10 transition-colors">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(book.id)} className="p-2 hover:bg-red-500/20 text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && !error && (
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
