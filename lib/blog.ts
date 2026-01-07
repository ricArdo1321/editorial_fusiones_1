import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostType } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    type: PostType;
    image?: string;
}

export interface BlogPostFull extends BlogPostMeta {
    content: string;
}

export function getAllPosts(): BlogPostMeta[] {
    // Handle case where directory doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((name) => name.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Sin título',
                excerpt: data.excerpt || '',
                date: data.date || '',
                type: data.type || 'STANDARD',
                image: data.image,
            } as BlogPostMeta;
        });

    // Sort by date descending
    return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getLatestPosts(count: number = 3): BlogPostMeta[] {
    return getAllPosts().slice(0, count);
}

export async function getPostBySlug(slug: string): Promise<BlogPostFull | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            title: data.title || 'Sin título',
            excerpt: data.excerpt || '',
            date: data.date || '',
            type: data.type || 'STANDARD',
            image: data.image,
            content: contentHtml,
        };
    } catch {
        return null;
    }
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs.readdirSync(postsDirectory)
        .filter((name) => name.endsWith('.md'))
        .map((name) => name.replace(/\.md$/, ''));
}
