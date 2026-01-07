'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookFormProps {
    book?: {
        id: string;
        title: string;
        author: string;
        category: string;
        isbn: string;
        score: number;
        coverUrl: string | null;
    };
}

export default function BookForm({ book }: BookFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: book?.title || '',
        author: book?.author || '',
        category: book?.category || 'NOVELA',
        isbn: book?.isbn || '',
        score: book?.score || 0,
        coverUrl: book?.coverUrl || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = book ? `/api/books/${book.id}` : '/api/books';
            const method = book ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/books');
                router.refresh();
            }
        } catch (error) {
            console.error('Error saving book:', error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Autor
                    </label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Categoría
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-background border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                    >
                        <option value="NOVELA">Novela</option>
                        <option value="POESÍA">Poesía</option>
                        <option value="ENSAYO">Ensayo</option>
                        <option value="CRÓNICA">Crónica</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        ISBN
                    </label>
                    <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none font-mono text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Score (0-100)
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) || 0 })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Cover URL
                </label>
                <input
                    type="text"
                    value={formData.coverUrl}
                    onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                    placeholder="https://..."
                />
            </div>

            <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : book ? 'Actualizar' : 'Crear'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="border border-white/20 px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
