import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash('Cuba2024', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'sqsricardo@gmail.com' },
        update: {},
        create: {
            email: 'sqsricardo@gmail.com',
            password: hashedPassword,
        },
    });

    console.log('Created admin user:', admin.email);

    // Migrate existing markdown posts to database
    const posts = [
        {
            title: 'La Muerte del Autor en la Era Digital',
            slug: 'muerte-del-autor-era-digital',
            excerpt: 'Revisitando a Barthes desde la perspectiva de la inteligencia artificial generativa y la pérdida de la subjetividad.',
            content: `<h2>El Fin de la Autoría Tradicional</h2><p>En 1967, Roland Barthes publicó su influyente ensayo "La muerte del autor"...</p>`,
            type: 'FEATURED',
            image: 'https://picsum.photos/seed/post1/1200/600',
            published: true,
        },
        {
            title: 'Manifiesto Nº 5: Contra el Ruido',
            slug: 'manifiesto-contra-el-ruido',
            excerpt: 'El silencio como herramienta de resistencia política.',
            content: `<p>El mundo moderno está saturado de información...</p>`,
            type: 'EDITORIAL',
            published: true,
        },
        {
            title: 'El Jazz y la Prosa de Cortázar',
            slug: 'jazz-y-prosa-cortazar',
            excerpt: 'Ritmo sincopado en la escritura: cómo el bebop influyó en la literatura latinoamericana.',
            content: `<p>Julio Cortázar no solo escuchaba jazz; lo vivía, lo respiraba, lo escribía...</p>`,
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

    console.log('Created', posts.length, 'posts');

    // Seed some books
    const books = [
        { title: 'Paradiso', author: 'José Lezama Lima', category: 'NOVELA', isbn: '978-84-376-0494-7', score: 98, coverUrl: 'https://picsum.photos/seed/paradiso/300/400' },
        { title: 'Los Detectives Salvajes', author: 'Roberto Bolaño', category: 'NOVELA', isbn: '978-84-339-6663-6', score: 95, coverUrl: 'https://picsum.photos/seed/detectives/300/400' },
        { title: 'Rayuela', author: 'Julio Cortázar', category: 'NOVELA', isbn: '978-84-376-0398-8', score: 97, coverUrl: 'https://picsum.photos/seed/rayuela/300/400' },
        { title: 'El Túnel', author: 'Ernesto Sabato', category: 'NOVELA', isbn: '978-84-322-0831-5', score: 91, coverUrl: 'https://picsum.photos/seed/tunel/300/400' },
    ];

    for (const book of books) {
        await prisma.book.upsert({
            where: { isbn: book.isbn },
            update: {},
            create: book,
        });
    }

    console.log('Created', books.length, 'books');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
