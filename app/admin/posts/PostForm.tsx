'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
    post?: {
        id: number;
        title: string;
        content: string;
        excerpt: string;
        status: string;
    };
}

export default function PostForm({ post }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: post?.title || '',
        content: post?.content || '',
        excerpt: post?.excerpt || '',
        status: post?.status || 'draft',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
            const method = post ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save');
            router.push('/admin/posts');
            router.refresh();
        } catch (err) {
            setError('Error al guardar. Verifica la configuración de WordPress.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Título
                </label>
                <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                    required
                />
            </div>

            <div>
                <label htmlFor="excerpt" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Extracto
                </label>
                <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none resize-none"
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Contenido (HTML)
                </label>
                <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none resize-none font-mono text-sm"
                    required
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Estado
                </label>
                <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-background border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                >
                    <option value="draft">Borrador</option>
                    <option value="publish">Publicado</option>
                </select>
            </div>

            <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : post ? 'Actualizar' : 'Crear'}
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
