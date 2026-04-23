'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    slug: string;
}

export default function BlogCard({ title, image, category, slug }: BlogCardProps) {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw"
                />
                <span className={styles.categoryBadge}>{category}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h3>
                <div className={styles.spacer} />
                <Link href={`/blog/${slug}`} className={styles.readMore}>
                    Leer más
                </Link>
            </div>
        </article>
    );
}
