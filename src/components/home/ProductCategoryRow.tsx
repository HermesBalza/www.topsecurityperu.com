import Link from 'next/link';
import ProductCard from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/woocommerce';
import styles from './ProductCategoryRow.module.css';

interface ProductCategoryRowProps {
    title: string;
    categoryIds: string; // "78,80,81"
    excludeIds?: string; // "87"
    limit?: number;
}

export default async function ProductCategoryRow({ title, categoryIds, excludeIds, limit = 4 }: ProductCategoryRowProps) {
    // Fetch real products
    // Nota: getProducts debe soportar 'category' como string de IDs separados por comas
    let products = await getProducts({
        perPage: 12,
        category: categoryIds
    });

    // Client-side filtering for strict exclusion 
    if (excludeIds) {
        const excluded = excludeIds.split(',').map(id => parseInt(id));
        products = products.filter(p =>
            !p.categories.some(cat => excluded.includes(cat.id))
        );
    }

    // Limit final display
    products = products.slice(0, limit);

    if (products.length === 0) return null;

    // Enlace a la tienda filtrando por la primera categoría de la lista (simplificación)
    const firstCatId = categoryIds.split(',')[0];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Link href={`/tienda?category=${firstCatId}`} className={styles.viewMore}>
                    Ver todo &rarr;
                </Link>
            </div>

            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={{
                            id: String(product.id),
                            name: product.name,
                            price: product.price ? parseFloat(product.price) : 0,
                            image: product.images[0]?.src || '/images/placeholder.jpg', // Fallback image
                            category: product.categories[0]?.name || 'Producto'
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
