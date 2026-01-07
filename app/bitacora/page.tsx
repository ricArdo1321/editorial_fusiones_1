import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Bitacora() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });

    const currentDate = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12">
            {/* Newspaper Header */}
            <header className="border-b-4 border-foreground pb-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-4 uppercase font-sans">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Bitácora</h1>
                    <p className="text-xl font-bold mt-2">Volumen 24</p>
                </div>
                <div className="text-right">
                    <p className="font-mono text-xs md:text-sm text-brand tracking-widest">{currentDate}</p>
                </div>
            </header>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                {posts.map((post) => {
                    if (post.type === 'FEATURED') {
                        return (
                            <Link href={`/bitacora/${post.slug}`} key={post.id} className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-white/10 pb-12 group cursor-pointer">
                                <div className="relative overflow-hidden bg-gray-900 aspect-video md:aspect-auto md:min-h-[400px]">
                                    {post.image && (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-brand font-mono text-xs mb-2">FEATURED — {post.createdAt.toLocaleDateString()}</span>
                                    <h2 className="font-sans text-4xl md:text-6xl font-black uppercase leading-tight mb-4 group-hover:text-brand transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        );
                    }

                    if (post.type === 'EDITORIAL') {
                        return (
                            <Link href={`/bitacora/${post.slug}`} key={post.id} className="md:col-span-1 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group h-full">
                                <div>
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 group-hover:underline decoration-brand decoration-2 underline-offset-4">
                                        {post.title}
                                    </h2>
                                    <p className="font-sans text-sm text-white/60 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="font-mono text-xs text-brand">EDITORIAL</span>
                                    <span className="font-mono text-xs text-white/40">{post.createdAt.toLocaleDateString()}</span>
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link href={`/bitacora/${post.slug}`} key={post.id} className="md:col-span-1 group cursor-pointer">
                            <div className="relative overflow-hidden mb-4 aspect-square bg-gray-900">
                                {post.image && (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <h3 className="font-sans text-lg font-bold uppercase leading-tight group-hover:text-brand transition-colors">
                                {post.title}
                            </h3>
                            <p className="font-serif text-xs text-white/60 mt-2 line-clamp-2">
                                {post.excerpt}
                            </p>
                        </Link>
                    );
                })}

                {posts.length === 0 && (
                    <div className="md:col-span-3 text-center py-12 text-white/40">
                        No hay entradas publicadas aún.
                    </div>
                )}
            </div>
        </div>
    );
}
