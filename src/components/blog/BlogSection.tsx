import { getPosts } from '@/lib/wordpress';
import styles from './BlogSection.module.css';
import BlogCard from './BlogCard';

export default async function BlogSection() {
    const posts = await getPosts(5); // Obtenemos las 5 últimas noticias para completar la fila

    return (
        <section className={styles.section}>
            <div className="container">
                <header className={styles.header}>
                    <h2 className={styles.heading}>ÚLTIMAS NOTICIAS</h2>
                    <p className={styles.subheading}>Innovación y consejos de seguridad directamente de nuestros expertos</p>
                </header>

                <div className={styles.grid}>
                    {posts.map((post) => {
                        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop';
                        const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'GENERAL';

                        return (
                            <div key={post.id} className={styles.gridItem}>
                                <BlogCard 
                                    title={post.title.rendered}
                                    excerpt={post.excerpt.rendered}
                                    image={featuredImage}
                                    category={categoryName}
                                    slug={post.slug}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
