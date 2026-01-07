import { NextResponse } from 'next/server';
import { getAdminPosts, createPost } from '@/lib/wordpress';

export async function GET() {
    try {
        const posts = await getAdminPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const post = await createPost(data);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
