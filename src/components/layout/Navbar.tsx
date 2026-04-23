'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';
import MegaMenu from './MegaMenu';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTh } from 'react-icons/fa';

export default function Navbar() {
    const { toggleCart, totalItems, totalPrice } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for MegaMenu

    useEffect(() => setMounted(true), []);

    return (
        <>
            <header className={styles.header}>
                {/* 1. TOP BAR (Rojo Corporativo) */}
                <div className={styles.topBar}>
                    <div className={`container ${styles.topBarContainer}`}>
                        <div className={styles.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                            <a href="https://wa.me/51983428926" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                        </div>
                        <div className={styles.contactInfo}>
                            <span className={styles.contactItem}>
                                <FaPhoneAlt className={styles.icon} /> +51 983 428 926
                            </span>
                            <span className={styles.contactItem}>
                                <FaEnvelope className={styles.icon} /> ventas@topsecurityperu.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN HEADER (Blanco) */}
                <div className={styles.mainHeader}>
                    <div className={`container ${styles.mainHeaderContainer}`}>
                        {/* Logo */}
                        <div className={styles.logo}>
                            <Link href="/">
                                <Image
                                    src="/images/brand/Logo%20Top%20Security%20Per%C3%BA.png"
                                    alt="Top Security Perú"
                                    width={220}
                                    height={80}
                                    style={{ objectFit: 'contain', width: 'auto', height: '60px' }}
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Search Bar "Global" */}
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className={styles.searchInput}
                            />
                            <button className={styles.searchBtn} aria-label="Buscar">
                                <FaSearch />
                            </button>
                        </div>

                        {/* User Actions */}
                        <div className={styles.userActions}>
                            <div className={styles.actionIcons}>
                                <button className={styles.iconBtn} aria-label="Wishlist">
                                    <FaHeart />
                                </button>
                                <button
                                    className={styles.cartBtn}
                                    onClick={toggleCart}
                                    aria-label="Carrito"
                                >
                                    <div className={styles.cartIconWrapper}>
                                        <FaShoppingCart />
                                        <span className={styles.badge}>{mounted ? totalItems : 0}</span>
                                    </div>
                                    <span className={styles.cartTotal}>
                                        S/ {mounted ? totalPrice.toFixed(2) : '0.00'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM NAVIGATION (Negro) */}
                <nav className={styles.bottomNav}>
                    <div className={`container ${styles.navContainer}`}>
                        {/* MEGA MENU TRIGGER */}
                        <button
                            className={styles.menuTrigger}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <FaTh /> PRODUCTOS
                        </button>

                        <ul className={styles.navLinks}>
                            <li><Link href="/">INICIO</Link></li>
                            <li><Link href="/nosotros">NOSOTROS</Link></li>
                            <li><Link href="/tienda">TIENDA</Link></li>
                            <li><Link href="/servicios">SERVICIOS</Link></li>
                            <li><Link href="/blog">BLOG</Link></li>
                            <li><Link href="/contacto">CONTACTO</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Render MegaMenu Overlay */}
            <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
