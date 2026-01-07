'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '../PostForm';

export default function EditPostPage() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/posts/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params.id]);

    if (loading) {
        return <div className="text-white/60">Cargando...</div>;
    }

    if (!post) {
        return <div className="text-white/60">Post no encontrado</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Editar Post</h2>
            <PostForm post={post} />
        </div>
    );
}
