import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import DeletePostButton from './DeletePostButton';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });

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

            <div className="border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Título</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Tipo</th>
                            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Estado</th>
                            <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/60">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-white/10 hover:bg-white/5">
                                <td className="px-4 py-3 font-medium">{post.title}</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs font-mono text-brand">{post.type}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-bold uppercase ${post.published ? 'text-green-500' : 'text-white/40'}`}>
                                        {post.published ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/posts/${post.id}`}
                                            className="p-2 hover:bg-white/10 transition-colors"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <DeletePostButton postId={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
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
