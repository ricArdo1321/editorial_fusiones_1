import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BookForm from '../BookForm';

interface PageProps {
    params: { id: string };
}

export default async function EditBookPage({ params }: PageProps) {
    const book = await prisma.book.findUnique({
        where: { id: params.id },
    });

    if (!book) {
        notFound();
    }

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Editar Libro</h2>
            <BookForm book={book} />
        </div>
    );
}
