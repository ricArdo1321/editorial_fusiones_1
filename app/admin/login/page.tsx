'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        const isLoggedIn = sessionStorage.getItem('admin_auth');
        if (isLoggedIn) {
            router.push('/admin');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        setLoading(false);

        if (res.ok) {
            sessionStorage.setItem('admin_auth', 'true');
            router.push('/admin');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-center mb-8">
                    Admin
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/20 px-4 py-3 text-white focus:border-brand focus:outline-none"
                            placeholder="Ingresa la contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
