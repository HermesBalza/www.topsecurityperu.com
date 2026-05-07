import { getPostBySlug } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import styles from './page.module.css';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: 'Post no encontrado' };

    return {
        title: `${post.title.rendered} | Blog Top Security Perú`,
        description: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop';
    const date = new Date(post.date).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const author = post._embedded?.['author']?.[0]?.name || 'Top Security Perú';

    return (
        <article className={styles.articleContainer}>
            {/* Header / Hero */}
            <header className={styles.header}>
                <Image 
                    src={featuredImage} 
                    alt={post.title.rendered}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className={styles.headerOverlay} />
                <div className={styles.headerContent}>
                    <div className="container">
                        <span className={styles.meta}>
                            <FaCalendarAlt /> {date} <span style={{ margin: '0 1rem', opacity: 0.5 }}>|</span> <FaUser /> {author}
                        </span>
                        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </div>
                </div>
            </header>

            <div className="container">
                <div className={styles.contentWrapper}>
                    <Link href="/blog" className={styles.backBtn}>
                        <FaArrowLeft /> VOLVER AL BLOG
                    </Link>
                    
                    <div 
                        className={styles.content} 
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
                    />
                </div>
            </div>
        </article>
    );
}
