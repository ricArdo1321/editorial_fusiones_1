import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            {/* Back Button */}
            <div className="px-6 lg:px-12 mb-8">
                <Link
                    href="/bitacora"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-brand transition-colors font-sans text-sm uppercase tracking-wider"
                >
                    <ArrowLeft size={16} />
                    Volver a Bitácora
                </Link>
            </div>

            {/* Featured Image */}
            {post.image && (
                <div className="relative w-full h-[50vh] mb-12">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
            )}

            {/* Article Content */}
            <article className="px-6 lg:px-12 max-w-4xl mx-auto">
                <header className="mb-12">
                    <span className="font-mono text-xs text-white/40 block mb-6">
                        {post.date}
                    </span>
                    <h1 className="font-sans text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="font-serif text-xl text-white/70 leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                <div
                    className="prose prose-invert prose-lg max-w-none
            prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
            prose-p:font-serif prose-p:text-white/80 prose-p:leading-relaxed
            prose-a:text-brand prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-brand prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic
            prose-strong:text-white prose-strong:font-bold
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-white/80
            prose-img:rounded-none prose-img:my-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            {/* Footer */}
            <div className="px-6 lg:px-12 max-w-4xl mx-auto mt-16 pt-12 border-t border-white/10">
                <Link
                    href="/bitacora"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-brand transition-colors font-sans text-sm uppercase tracking-wider"
                >
                    <ArrowLeft size={16} />
                    Más entradas
                </Link>
            </div>
        </div>
    );
}
