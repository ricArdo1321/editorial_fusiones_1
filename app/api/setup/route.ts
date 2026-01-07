import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // Check if admin already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: 'sqsricardo@gmail.com' },
        });

        if (existingUser) {
            return NextResponse.json({
                message: 'Setup already completed. Admin user exists.',
                status: 'already_done'
            });
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('Cuba2024', 10);
        await prisma.user.create({
            data: {
                email: 'sqsricardo@gmail.com',
                password: hashedPassword,
            },
        });

        // Create sample posts
        const posts = [
            {
                title: 'La Muerte del Autor en la Era Digital',
                slug: 'muerte-del-autor-era-digital',
                excerpt: 'Revisitando a Barthes desde la perspectiva de la inteligencia artificial generativa.',
                content: '<h2>El Fin de la Autoría Tradicional</h2><p>En 1967, Roland Barthes publicó su influyente ensayo...</p>',
                type: 'FEATURED',
                image: 'https://picsum.photos/seed/post1/1200/600',
                published: true,
            },
            {
                title: 'Manifiesto Nº 5: Contra el Ruido',
                slug: 'manifiesto-contra-el-ruido',
                excerpt: 'El silencio como herramienta de resistencia política.',
                content: '<p>El mundo moderno está saturado de información...</p>',
                type: 'EDITORIAL',
                published: true,
            },
            {
                title: 'El Jazz y la Prosa de Cortázar',
                slug: 'jazz-y-prosa-cortazar',
                excerpt: 'Ritmo sincopado en la escritura.',
                content: '<p>Julio Cortázar no solo escuchaba jazz; lo vivía...</p>',
                type: 'STANDARD',
                image: 'https://picsum.photos/seed/jazz/800/600',
                published: true,
            },
        ];

        for (const post of posts) {
            await prisma.post.upsert({
                where: { slug: post.slug },
                update: {},
                create: post,
            });
        }

        // Create sample books
        const books = [
            { title: 'Paradiso', author: 'José Lezama Lima', category: 'NOVELA', isbn: '978-84-376-0494-7', score: 98 },
            { title: 'Los Detectives Salvajes', author: 'Roberto Bolaño', category: 'NOVELA', isbn: '978-84-339-6663-6', score: 95 },
            { title: 'Rayuela', author: 'Julio Cortázar', category: 'NOVELA', isbn: '978-84-376-0398-8', score: 97 },
            { title: 'El Túnel', author: 'Ernesto Sabato', category: 'NOVELA', isbn: '978-84-322-0831-5', score: 91 },
        ];

        for (const book of books) {
            await prisma.book.upsert({
                where: { isbn: book.isbn },
                update: {},
                create: book,
            });
        }

        return NextResponse.json({
            message: 'Setup completed! Admin user created: sqsricardo@gmail.com',
            status: 'success',
            data: {
                user: 'sqsricardo@gmail.com',
                posts: posts.length,
                books: books.length,
            }
        });

    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({
            message: 'Setup failed',
            error: String(error),
            status: 'error'
        }, { status: 500 });
    }
}
