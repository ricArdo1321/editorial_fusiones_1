'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    slug: string;
    date: string;
    status: string;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/posts');
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError('Error al cargar posts. Verifica la configuración de WordPress.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este post?')) return;

        try {
            const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            fetchPosts();
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };

    if (loading) {
        return <div className="text-white/60">Cargando posts...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Posts</h2>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-brand text-white px-4 py-2 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                    <Plus size={16} />
                    Nuevo Post
                </Link>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-6">
                    {error}
                </div>
            )}

            <div className="border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Fecha</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Estado</th>
                            <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-4 py-3 font-medium">{post.title}</td>
                                <td className="px-4 py-3 text-white/60 text-sm">{post.date}</td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-bold uppercase ${post.status === 'publish' ? 'text-green-500' : 'text-white/40'}`}>
                                        {post.status === 'publish' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/bitacora/${post.slug}`} target="_blank" className="p-2 hover:bg-white/10 transition-colors text-white/40">
                                            <ExternalLink size={16} />
                                        </Link>
                                        <Link href={`/admin/posts/${post.id}`} className="p-2 hover:bg-white/10 transition-colors">
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-500/20 text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && !error && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                                    No hay posts. Crea el primero.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
