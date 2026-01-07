import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const post = await prisma.post.create({
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

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}
