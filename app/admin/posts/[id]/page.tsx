import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostForm from '../PostForm';

interface PageProps {
    params: { id: string };
}

export default async function EditPostPage({ params }: PageProps) {
    const post = await prisma.post.findUnique({
        where: { id: params.id },
    });

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Editar Post</h2>
            <PostForm post={post} />
        </div>
    );
}
