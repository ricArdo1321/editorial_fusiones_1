import Link from 'next/link';
import { FileText, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/posts" className="border border-white/10 p-8 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <FileText size={32} className="text-brand" />
                        <span className="text-2xl font-black uppercase">Posts</span>
                    </div>
                    <p className="text-white/60 text-sm">Gestiona los posts del blog</p>
                </Link>

                <Link href="/admin/books" className="border border-white/10 p-8 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <BookOpen size={32} className="text-brand" />
                        <span className="text-2xl font-black uppercase">Libros</span>
                    </div>
                    <p className="text-white/60 text-sm">Gestiona la curaduría de libros</p>
                </Link>
            </div>

            <div className="mt-12 p-6 border border-white/10 bg-white/5">
                <h3 className="font-bold uppercase tracking-wider mb-2">WordPress CMS</h3>
                <p className="text-white/60 text-sm mb-4">
                    El contenido se gestiona a través de WordPress. Asegúrate de tener configurado el CPT &quot;Libros&quot; y los campos personalizados.
                </p>
                <a
                    href="https://cms.editorialfusiones.com/wp-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand text-sm font-bold uppercase tracking-widest hover:underline"
                >
                    Ir a WordPress Admin →
                </a>
            </div>
        </div>
    );
}
