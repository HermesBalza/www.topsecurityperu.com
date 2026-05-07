import { getPosts } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import styles from './page.module.css';

export const metadata = {
    title: 'Blog de Seguridad | Top Security Perú',
    description: 'Artículos sobre seguridad electrónica, videovigilancia e innovación tecnológica en Perú.',
};

export default async function BlogPage() {
    const posts = await getPosts(12);

    return (
        <main className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>BLOG DE SEGURIDAD</h1>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.1em' }}>
                        CONOCIMIENTO Y TECNOLOGÍA PARA TU TRANQUILIDAD
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className={styles.section}>
                <div className={styles.blogGrid}>
                    {posts.map((post) => {
                        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/blog/placeholder.jpg';
                        const date = new Date(post.date).toLocaleDateString('es-PE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });

                        return (
                            <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCard}>
                                <div className={styles.imageWrapper}>
                                    <Image 
                                        src={featuredImage} 
                                        alt={post.title.rendered}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className={styles.featuredImage}
                                    />
                                </div>
                                <div className={styles.postContent}>
                                    <span className={styles.date}>{date}</span>
                                    <h2 className={styles.postTitle} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                    <div 
                                        className={styles.excerpt} 
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                                    />
                                    <div className={styles.readMore}>
                                        LEER ARTÍCULO <span><FaArrowRight /></span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
