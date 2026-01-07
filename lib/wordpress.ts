const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.editorialfusiones.com/wp-json/wp/v2';
const WORDPRESS_USER = process.env.WORDPRESS_USER || '';
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || '';

// Types
export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    date: string;
    status: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    status: string;
    image?: string;
}

export interface WPBook {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    status: string;
    acf?: {
        autor: string;
        isbn: string;
        score: number;
        category: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

export interface Book {
    id: number;
    slug: string;
    title: string;
    author: string;
    isbn: string;
    score: number;
    category: string;
    coverUrl?: string;
}

// Transform functions
function transformPost(post: WPPost): Post {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
        content: post.content.rendered,
        date: new Date(post.date).toLocaleDateString('es-ES'),
        status: post.status,
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    };
}

function transformBook(book: WPBook): Book {
    return {
        id: book.id,
        slug: book.slug,
        title: book.title.rendered,
        author: book.acf?.autor || '',
        isbn: book.acf?.isbn || '',
        score: book.acf?.score || 0,
        category: book.acf?.category || 'NOVELA',
        coverUrl: book._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    };
}

// Auth header for write operations
function getAuthHeaders(): HeadersInit {
    if (!WORDPRESS_USER || !WORDPRESS_APP_PASSWORD) {
        throw new Error('WordPress credentials not configured');
    }
    const credentials = Buffer.from(`${WORDPRESS_USER}:${WORDPRESS_APP_PASSWORD}`).toString('base64');
    return {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
    };
}

// ===== READ OPERATIONS (Public) =====

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=100&status=publish`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const posts: WPPost[] = await res.json();
        return posts.map(transformPost);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const posts: WPPost[] = await res.json();
        if (posts.length === 0) return null;
        return transformPost(posts[0]);
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getLatestPosts(count: number = 3): Promise<Post[]> {
    try {
        const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${count}&status=publish`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const posts: WPPost[] = await res.json();
        return posts.map(transformPost);
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        return [];
    }
}

export async function getBooks(): Promise<Book[]> {
    try {
        const res = await fetch(`${WORDPRESS_API_URL}/libro?_embed&per_page=100`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const books: WPBook[] = await res.json();
        return books.map(transformBook);
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// ===== ADMIN OPERATIONS (Authenticated) =====

export async function getAdminPosts(): Promise<Post[]> {
    const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=100&status=any`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts: WPPost[] = await res.json();
    return posts.map(transformPost);
}

export async function getAdminPostById(id: number): Promise<Post | null> {
    const res = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!res.ok) return null;
    const post: WPPost = await res.json();
    return transformPost(post);
}

export async function createPost(data: { title: string; content: string; excerpt: string; status: string }): Promise<Post> {
    const res = await fetch(`${WORDPRESS_API_URL}/posts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create post');
    const post: WPPost = await res.json();
    return transformPost(post);
}

export async function updatePost(id: number, data: { title?: string; content?: string; excerpt?: string; status?: string }): Promise<Post> {
    const res = await fetch(`${WORDPRESS_API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update post');
    const post: WPPost = await res.json();
    return transformPost(post);
}

export async function deletePost(id: number): Promise<void> {
    const res = await fetch(`${WORDPRESS_API_URL}/posts/${id}?force=true`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete post');
}

// Book admin operations
export async function getAdminBooks(): Promise<Book[]> {
    const res = await fetch(`${WORDPRESS_API_URL}/libro?_embed&per_page=100`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch books');
    const books: WPBook[] = await res.json();
    return books.map(transformBook);
}

export async function createBook(data: { title: string; content: string; status: string; acf: { autor: string; isbn: string; score: number; category: string } }): Promise<Book> {
    const res = await fetch(`${WORDPRESS_API_URL}/libro`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create book');
    const book: WPBook = await res.json();
    return transformBook(book);
}

export async function updateBook(id: number, data: { title?: string; content?: string; status?: string; acf?: { autor?: string; isbn?: string; score?: number; category?: string } }): Promise<Book> {
    const res = await fetch(`${WORDPRESS_API_URL}/libro/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update book');
    const book: WPBook = await res.json();
    return transformBook(book);
}

export async function deleteBook(id: number): Promise<void> {
    const res = await fetch(`${WORDPRESS_API_URL}/libro/${id}?force=true`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete book');
}
