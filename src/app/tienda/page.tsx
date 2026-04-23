import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/woocommerce';
import CategorySidebar from '@/components/shop/CategorySidebar';
import ProductGridClient from '@/components/shop/ProductGridClient';
import styles from './page.module.css';

export const metadata = {
    title: 'Tienda | Top Security Perú',
    description: 'Catálogo completo de sistemas de seguridad, cámaras y control de acceso.',
};

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category: categoryId } = await searchParams;

    // Parallel fetch for better performance
    const [products, categories] = await Promise.all([
        getProducts({ perPage: 20, page: 1, category: categoryId }),
        getCategories()
    ]);

    // Safe array checks
    const initialProducts = Array.isArray(products) ? products.map(product => ({
        id: String(product.id),
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.price || '0'),
        image: product.images[0]?.src || '',
        category: product.categories[0]?.name || 'Seguridad'
    })) : [];
    
    const categoryList = Array.isArray(categories) ? categories : [];

    return (
        <main className={styles.container}>
            <div className="container">
                <div className={styles.layout}>
                    {/* Sidebar */}
                    <div className={styles.sidebarWrapper}>
                        <CategorySidebar 
                            categories={categoryList} 
                            currentCategoryId={categoryId} 
                        />
                    </div>

                    {/* Main Content */}
                    <div className={styles.contentWrapper}>
                        {initialProducts.length > 0 ? (
                            <ProductGridClient 
                                initialProducts={initialProducts} 
                                categoryId={categoryId} 
                            />
                        ) : (
                            <div className={styles.emptyState}>
                                <p>No se encontraron productos en esta categoría.</p>
                                <Link href="/tienda" className="btn-primary">Ver todos los productos</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
