const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.editorialfusiones.com/wp-json/wp/v2';

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    date: string;
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image?: string;
}

function transformPost(post: WPPost): Post {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
        content: post.content.rendered,
        date: new Date(post.date).toLocaleDateString('es-ES'),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    };
}

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=100`, {
            next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
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
        const res = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${count}`, {
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
