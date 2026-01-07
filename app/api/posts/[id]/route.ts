import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const data = await request.json();

        const post = await prisma.post.update({
            where: { id: params.id },
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                type: data.type,
                image: data.image || null,
                published: data.published,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await prisma.post.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}
