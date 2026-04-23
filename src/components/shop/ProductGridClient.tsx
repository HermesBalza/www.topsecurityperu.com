'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { fetchProductsAction } from '@/lib/actions';
import styles from '@/app/tienda/page.module.css';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
}

interface ProductGridClientProps {
    initialProducts: Product[];
    categoryId?: string;
}

export default function ProductGridClient({ initialProducts, categoryId }: ProductGridClientProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialProducts.length === 20);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Reset when category changes
    useEffect(() => {
        setProducts(initialProducts);
        setPage(1);
        setHasMore(initialProducts.length === 20);
    }, [initialProducts, categoryId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, page, categoryId]);

    const loadMoreProducts = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const newProducts = await fetchProductsAction(nextPage, categoryId);

        if (newProducts.length === 0) {
            setHasMore(false);
        } else {
            setProducts((prev) => [...prev, ...newProducts]);
            setPage(nextPage);
            if (newProducts.length < 20) {
                setHasMore(false);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={`${product.id}-${page}`} product={product} />
                ))}
            </div>

            {hasMore && (
                <div ref={loaderRef} className={styles.loaderWrapper}>
                    {loading ? (
                        <div className={styles.spinner}></div>
                    ) : (
                        <p className={styles.scrollText}>Desliza para ver más...</p>
                    )}
                </div>
            )}

            {!hasMore && products.length > 0 && (
                <p className={styles.endText}>Has llegado al final del catálogo.</p>
            )}
        </>
    );
}
