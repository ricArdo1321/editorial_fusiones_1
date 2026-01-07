import { NextRequest, NextResponse } from 'next/server';
import { getAdminPostById, updatePost, deletePost } from '@/lib/wordpress';

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const post = await getAdminPostById(parseInt(params.id));
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const data = await request.json();
        const post = await updatePost(parseInt(params.id), data);
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await deletePost(parseInt(params.id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
