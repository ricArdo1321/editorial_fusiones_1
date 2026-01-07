import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface PostCardProps {
    post: BlogPost;
}

export function FeaturedPost({ post }: PostCardProps) {
    return (
        <article className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b border-white/10 pb-12 group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-900 aspect-video md:aspect-auto md:min-h-[400px]">
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-brand font-mono text-xs mb-2">FEATURED — {post.date}</span>
                <h2 className="font-sans text-4xl md:text-6xl font-black uppercase leading-tight mb-4 group-hover:text-brand transition-colors">
                    {post.title}
                </h2>
                <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed">
                    {post.excerpt}
                </p>
            </div>
        </article>
    );
}

export function EditorialPost({ post }: PostCardProps) {
    return (
        <article className="md:col-span-1 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group h-full">
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
                <span className="font-mono text-xs text-white/40">{post.date}</span>
            </div>
        </article>
    );
}

export function StackPost({ post }: PostCardProps) {
    return (
        <article className="md:col-span-1 flex flex-col h-full group cursor-pointer">
            <div className="relative flex-grow overflow-hidden mb-4 min-h-[300px]">
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                )}
                <div className="absolute top-2 left-2 w-full h-full border border-white/20 z-0 translate-x-2 translate-y-2" />
            </div>
            <h3 className="font-sans text-xl font-bold uppercase mt-auto group-hover:text-brand transition-colors">
                {post.title}
            </h3>
            <span className="font-mono text-[10px] text-white/50 mt-1">{post.date}</span>
        </article>
    );
}

export function StandardPost({ post }: PostCardProps) {
    return (
        <article className="md:col-span-1 group cursor-pointer">
            <div className="relative overflow-hidden mb-4 aspect-square bg-gray-900">
                {post.imageUrl && (
                    <Image
                        src={post.imageUrl}
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
        </article>
    );
}

export default function PostCard({ post }: PostCardProps) {
    switch (post.type) {
        case 'FEATURED':
            return <FeaturedPost post={post} />;
        case 'EDITORIAL':
            return <EditorialPost post={post} />;
        case 'STACK':
            return <StackPost post={post} />;
        default:
            return <StandardPost post={post} />;
    }
}
