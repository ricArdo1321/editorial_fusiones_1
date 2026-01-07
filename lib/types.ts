// Type aliases for stricter typing
export type BookCategory = 'POESÍA' | 'ENSAYO' | 'NOVELA' | 'CRÓNICA';
export type PostType = 'FEATURED' | 'EDITORIAL' | 'STACK' | 'STANDARD';

// Core data types
export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  isbn: string;
  score: number;
  coverUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  type: PostType;
}

// Navigation types
export interface NavLink {
  label: string;
  path: PageRoute;
}

export enum PageRoute {
  HOME = '/',
  CURADURIA = '/curaduria',
  BITACORA = '/bitacora',
  EDITORIAL = '/editorial'
}

// Recommended book (simplified for home page)
export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  year: string;
}