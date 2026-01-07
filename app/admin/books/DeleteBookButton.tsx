'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteBookButton({ bookId }: { bookId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de eliminar este libro?')) return;

        setLoading(true);
        try {
            await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
            router.refresh();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 hover:bg-red-500/20 text-red-500 transition-colors disabled:opacity-50"
        >
            <Trash2 size={16} />
        </button>
    );
}
