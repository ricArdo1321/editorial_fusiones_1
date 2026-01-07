'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FileText, BookOpen, LogOut, Home } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Skip auth check on login page
        if (pathname === '/admin/login') {
            setIsAuth(true);
            return;
        }

        const auth = sessionStorage.getItem('admin_auth');
        if (!auth) {
            router.push('/admin/login');
        } else {
            setIsAuth(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        router.push('/admin/login');
    };

    // Show login page without layout
    if (pathname === '/admin/login') {
        return children;
    }

    if (isAuth === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white/60">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Admin Header */}
                <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Backoffice</h1>
                        <p className="text-white/60 text-sm mt-1">Gestión de contenidos</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-white/60 hover:text-brand transition-colors text-sm uppercase tracking-wider"
                    >
                        <LogOut size={16} />
                        Salir
                    </button>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <nav className="space-y-2">
                        <Link
                            href="/admin"
                            className={`flex items-center gap-3 px-4 py-3 border border-white/10 hover:bg-white/5 transition-colors ${pathname === '/admin' ? 'bg-white/5 border-brand' : ''}`}
                        >
                            <Home size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/posts"
                            className={`flex items-center gap-3 px-4 py-3 border border-white/10 hover:bg-white/5 transition-colors ${pathname?.startsWith('/admin/posts') ? 'bg-white/5 border-brand' : ''}`}
                        >
                            <FileText size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Posts</span>
                        </Link>
                        <Link
                            href="/admin/books"
                            className={`flex items-center gap-3 px-4 py-3 border border-white/10 hover:bg-white/5 transition-colors ${pathname?.startsWith('/admin/books') ? 'bg-white/5 border-brand' : ''}`}
                        >
                            <BookOpen size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Libros</span>
                        </Link>
                    </nav>

                    <div className="md:col-span-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
