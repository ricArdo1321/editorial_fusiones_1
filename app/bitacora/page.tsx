import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

export default async function Bitacora() {
    const posts = await getPosts();

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
                {posts.map((post, index) => {
                    // First post is featured
                    if (index === 0) {
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
                                    <span className="text-brand font-mono text-xs mb-2">DESTACADO — {post.date}</span>
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
                            <span className="font-mono text-xs text-brand mt-2 block">{post.date}</span>
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
