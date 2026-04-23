'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartSidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const { items, isOpen, toggleCart, removeItem, totalPrice } = useCart();

    if (!isOpen) return null;

    const handleCheckout = () => {
        // Generate WhatsApp Message
        const message = `Hola Top Security Perú, quiero cotizar los siguientes productos:%0A%0A${items
            .map((item) => `- ${item.name} (x${item.quantity}) - S/ ${item.price * item.quantity}`)
            .join('%0A')}%0A%0A*Total Estimado: S/ ${totalPrice.toFixed(2)}*`;

        window.open(`https://wa.me/51983428926?text=${message}`, '_blank');
    };

    return (
        <>
            <div className={styles.overlay} onClick={toggleCart} />
            <aside className={styles.sidebar}>
                <div className={styles.header}>
                    <h2>TU CARRITO</h2>
                    <button onClick={toggleCart} className={styles.closeBtn}>×</button>
                </div>

                <div className={styles.items}>
                    {items.length === 0 ? (
                        <p className={styles.empty}>Tu carrito está vacío.</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.imageWrapper}>
                                    {item.image ? (
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <div className={styles.placeholder}>IMG</div>
                                    )}
                                </div>
                                <div className={styles.details}>
                                    <h4>{item.name}</h4>
                                    <p>S/ {item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className={styles.removeBtn}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>Total:</span>
                        <span>S/ {totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                    >
                        FINALIZAR COMPRA (WhatsApp)
                    </button>
                </div>
            </aside>
        </>
    );
}
