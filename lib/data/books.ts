import { Book } from '../types';

export const RECOMMENDED_BOOKS = [
    { id: '1', title: 'Ficciones del Sur', author: 'Jorge L. Borges', year: '1944' },
    { id: '2', title: 'Los Detectives Salvajes', author: 'Roberto Bolaño', year: '1998' },
    { id: '3', title: 'Cien Años de Soledad', author: 'G. García Márquez', year: '1967' },
    { id: '4', title: 'Rayuela', author: 'Julio Cortázar', year: '1963' },
] as const;

export const BOOKS_MOCK: Book[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `book-${i}`,
    title: [
        'El Aleph', 'Rayuela', 'Pedro Páramo', 'Ficciones', 'Los Detectives Salvajes',
        'El Tunel', 'Sobre Héroes y Tumbas', 'La Ciudad y los Perros', 'Aura',
        'Bestiario', 'El Amor en los Tiempos del Cólera', 'La Invención de Morel'
    ][i % 12],
    author: [
        'Borges', 'Cortázar', 'Rulfo', 'Borges', 'Bolaño',
        'Sabato', 'Sabato', 'Vargas Llosa', 'Fuentes',
        'Cortázar', 'García Márquez', 'Bioy Casares'
    ][i % 12],
    category: (['ENSAYO', 'NOVELA', 'NOVELA', 'ENSAYO', 'NOVELA', 'NOVELA', 'NOVELA', 'NOVELA', 'NOVELA', 'ENSAYO', 'NOVELA', 'NOVELA'] as const)[i % 12],
    isbn: `978-3-16-${1484100 + i}`,
    score: 90 + (i % 9),
    coverUrl: `https://picsum.photos/seed/${i + 100}/400/600`
}));
