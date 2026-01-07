import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const book = await prisma.book.create({
            data: {
                title: data.title,
                author: data.author,
                category: data.category,
                isbn: data.isbn,
                score: data.score,
                coverUrl: data.coverUrl || null,
            },
        });

        return NextResponse.json(book, { status: 201 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
    }
}
