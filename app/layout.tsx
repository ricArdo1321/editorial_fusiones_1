import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import NoiseOverlay from '@/components/NoiseOverlay';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-merriweather'
});

export const metadata: Metadata = {
    title: 'EDITORIAL FUSIONES',
    description: 'Editorial Fusiones',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={`${inter.variable} ${merriweather.variable} min-h-screen bg-background text-foreground selection:bg-brand selection:text-white font-serif flex flex-col`}>
                <NoiseOverlay />
                <Navigation />
                <main className="relative z-10 w-full flex-grow px-6 lg:px-12">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
