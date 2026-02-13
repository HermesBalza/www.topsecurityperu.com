'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

import { useCart } from '@/context/CartContext';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    };

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                {product.image ? (
                    <Image
                        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.productImage}
                        style={{ objectFit: 'contain', padding: '10px' }}
                    />
                ) : (
                    <div className={styles.placeholderImage}>
                        <span>IMG</span>
                    </div>
                )}
                <div className={styles.overlay}>
                    <Link href={`/producto/${product.id}`} className={styles.viewBtn}>
                        Ver Detalles
                    </Link>
                </div>
            </div>

            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.name}>
                    <Link href={`/producto/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <div className={styles.bottom}>
                    <span className={styles.price}>S/ {product.price.toFixed(2)}</span>
                    <button
                        className={styles.addBtn}
                        aria-label="Añadir al carrito"
                        onClick={handleAddToCart}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}
