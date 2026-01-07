import { NextResponse } from 'next/server';
import { getAdminBooks, createBook } from '@/lib/wordpress';

export async function GET() {
    try {
        const books = await getAdminBooks();
        return NextResponse.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const book = await createBook({
            title: data.title,
            content: '',
            status: 'publish',
            acf: {
                autor: data.author,
                isbn: data.isbn,
                score: data.score,
                category: data.category,
            },
        });
        return NextResponse.json(book, { status: 201 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }
}
