'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BookForm from '../BookForm';

export default function EditBookPage() {
    const params = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/admin/books/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBook(data);
                }
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [params.id]);

    if (loading) {
        return <div className="text-white/60">Cargando...</div>;
    }

    if (!book) {
        return <div className="text-white/60">Libro no encontrado</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Editar Libro</h2>
            <BookForm book={book} />
        </div>
    );
}
