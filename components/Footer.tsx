import Link from 'next/link';
import { PageRoute } from '@/lib/types';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/10 pt-16 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h2 className="font-serif text-2xl italic text-white/80 mb-2">
                        ¿Buscas dónde publicar?
                    </h2>
                    <p className="text-white/40 text-sm max-w-md">
                        Buscamos voces disidentes. No nos interesa el mercado, nos interesa la obra.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <button className="px-8 py-4 border border-white text-white font-sans font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                        Concursos
                    </button>
                    <button className="px-8 py-4 bg-brand text-white font-sans font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-colors">
                        Kit para Escritores
                    </button>
                </div>
            </div>
            <div className="mt-16 flex justify-between items-center text-[10px] font-mono text-white/20 uppercase">
                <span>© {new Date().getFullYear()} Editorial Fusiones. Todos los derechos reservados.</span>
                <Link href="/admin" className="hover:text-brand transition-colors">
                    Admin
                </Link>
            </div>
        </footer>
    );
}
