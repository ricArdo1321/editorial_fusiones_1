'use client';

import { BLOG_POSTS } from '@/lib/data/posts';
import PostCard from '@/components/ui/PostCard';

const Bitacora = () => {
    const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
                {BLOG_POSTS.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Bitacora;
