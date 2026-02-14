'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { toggleCart, totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <header className={styles.navbar}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <img
                            src="/images/brand/Logo Top Security Perú.png"
                            alt="Top Security Perú"
                            style={{ height: '50px', width: 'auto' }} // Ajuste directo para evitar distorsión
                        />
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.link}>Inicio</Link>
                    <Link href="/nosotros" className={styles.link}>Nosotros</Link>
                    <Link href="/servicios" className={styles.link}>Servicios</Link>
                    <Link href="/tienda" className={styles.link}>Tienda</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>

                    <button
                        onClick={toggleCart}
                        className={styles.cartBtn}
                        aria-label="Abrir Carrito"
                    >
                        🛒 <span className={styles.badge}>{mounted ? totalItems : 0}</span>
                    </button>

                    <Link href="/contacto" className="btn btn-primary">
                        Contacto
                    </Link>
                </nav>
            </div>
        </header>
    );
}
