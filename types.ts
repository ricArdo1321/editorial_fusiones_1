export interface Book {
  id: string;
  title: string;
  author: string;
  category: 'POESÍA' | 'ENSAYO' | 'NOVELA' | 'CRÓNICA';
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
  type: 'FEATURED' | 'EDITORIAL' | 'STACK' | 'STANDARD';
}

export enum PageRoute {
  HOME = '/',
  CURADURIA = '/curaduria',
  BITACORA = '/bitacora',
  EDITORIAL = '/editorial'
}