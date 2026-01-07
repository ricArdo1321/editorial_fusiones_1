import { NextRequest, NextResponse } from 'next/server';
import { updateBook, deleteBook } from '@/lib/wordpress';

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    // For now, return the book from the list
    // You could add a getBookById function to wordpress.ts
    try {
        const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.editorialfusiones.com/wp-json/wp/v2';
        const res = await fetch(`${WORDPRESS_API_URL}/libro/${params.id}`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }
        const book = await res.json();
        return NextResponse.json({
            id: book.id,
            title: book.title.rendered,
            author: book.acf?.autor || '',
            isbn: book.acf?.isbn || '',
            score: book.acf?.score || 0,
            category: book.acf?.category || 'NOVELA',
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const data = await request.json();
        const book = await updateBook(parseInt(params.id), {
            title: data.title,
            acf: {
                autor: data.author,
                isbn: data.isbn,
                score: data.score,
                category: data.category,
            },
        });
        return NextResponse.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await deleteBook(parseInt(params.id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }
}
