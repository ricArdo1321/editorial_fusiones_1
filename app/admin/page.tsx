import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [postCount, bookCount] = await Promise.all([
        prisma.post.count(),
        prisma.book.count(),
    ]);

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/posts" className="border border-white/10 p-8 hover:bg-white/5 transition-colors group">
                    <div className="text-5xl font-black text-brand mb-2">{postCount}</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                        Posts
                    </div>
                </Link>

                <Link href="/admin/books" className="border border-white/10 p-8 hover:bg-white/5 transition-colors group">
                    <div className="text-5xl font-black text-brand mb-2">{bookCount}</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                        Libros
                    </div>
                </Link>
            </div>
        </div>
    );
}
