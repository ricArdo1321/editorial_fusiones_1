import { PageRoute, NavLink, BookCategory } from './types';

export const NAV_LINKS: NavLink[] = [
    { label: 'Inicio', path: PageRoute.HOME },
    { label: 'Curaduría', path: PageRoute.CURADURIA },
    { label: 'Bitácora', path: PageRoute.BITACORA },
    { label: 'Editorial', path: PageRoute.EDITORIAL },
];

export const BOOK_CATEGORIES: readonly BookCategory[] = ['POESÍA', 'ENSAYO', 'NOVELA', 'CRÓNICA'] as const;
export const ALL_CATEGORIES = ['TODO', ...BOOK_CATEGORIES] as const;
