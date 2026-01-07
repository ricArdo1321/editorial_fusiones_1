'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
    post?: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        type: string;
        image: string | null;
        published: boolean;
    };
}

export default function PostForm({ post }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        type: post?.type || 'STANDARD',
        image: post?.image || '',
        published: post?.published || false,
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: post ? formData.slug : generateSlug(title),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = post ? `/api/posts/${post.id}` : '/api/posts';
            const method = post ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/admin/posts');
                router.refresh();
            }
        } catch (error) {
            console.error('Error saving post:', error);
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
                        onChange={handleTitleChange}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none font-mono text-sm"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Extracto
                </label>
                <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none resize-none"
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Contenido (HTML)
                </label>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none resize-none font-mono text-sm"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Tipo
                    </label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-background border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                    >
                        <option value="STANDARD">Standard</option>
                        <option value="FEATURED">Featured</option>
                        <option value="EDITORIAL">Editorial</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                        Imagen URL
                    </label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                        placeholder="https://..."
                    />
                </div>

                <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 accent-brand"
                        />
                        <span className="text-sm font-bold uppercase tracking-widest">Publicado</span>
                    </label>
                </div>
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
