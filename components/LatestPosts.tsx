import Link from 'next/link';
import { getLatestPosts } from '@/lib/wordpress';
import { ArrowRight } from 'lucide-react';
import { PageRoute } from '@/lib/types';

export default async function LatestPosts() {
    const posts = await getLatestPosts(3);

    if (posts.length === 0) return null;

    return (
        <section className="mb-32">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <h2 className="font-sans text-4xl font-black tracking-tighter uppercase">Bitácora</h2>
                <Link href={PageRoute.BITACORA} className="text-sm font-bold uppercase tracking-widest hover:text-brand transition-colors flex items-center gap-2">
                    Ver Todo <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/bitacora/${post.slug}`}
                        className="group"
                    >
                        <article className="border border-white/10 p-6 h-full flex flex-col hover:bg-white/5 transition-colors">
                            <h3 className="font-sans text-xl font-bold uppercase leading-tight mb-3 group-hover:text-brand transition-colors">
                                {post.title}
                            </h3>
                            <p className="font-serif text-sm text-white/60 leading-relaxed line-clamp-3 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <span className="font-mono text-xs text-white/40">{post.date}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
