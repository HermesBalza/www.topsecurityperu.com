import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';
import styles from './page.module.css';

export const metadata = {
    title: 'Tienda | Top Security Perú',
    description: 'Catálogo completo de sistemas de seguridad, cámaras y control de acceso.',
};

export default async function ShopPage() {
    const products = await getProducts(20); // Fetch top 20 products

    // Safe array check
    const productList = Array.isArray(products) ? products : [];

    return (
        <main className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        NUESTRO <span className="text-secondary">CATÁLOGO</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Explora nuestra selección de equipos de seguridad de alta gama.
                    </p>
                </div>

                {productList.length > 0 ? (
                    <div className={styles.grid}>
                        {productList.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    id: String(product.id),
                                    name: product.name,
                                    price: parseFloat(product.price || '0'),
                                    image: product.images[0]?.src || '',
                                    category: product.categories[0]?.name || 'Seguridad'
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Cargando productos...</p>
                    </div>
                )}
            </div>
        </main>
    );
}
