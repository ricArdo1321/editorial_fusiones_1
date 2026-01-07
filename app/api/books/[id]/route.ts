import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const data = await request.json();

        const book = await prisma.book.update({
            where: { id: params.id },
            data: {
                title: data.title,
                author: data.author,
                category: data.category,
                isbn: data.isbn,
                score: data.score,
                coverUrl: data.coverUrl || null,
            },
        });

        return NextResponse.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await prisma.book.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
    }
}
