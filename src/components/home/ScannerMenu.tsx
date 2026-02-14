'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ScannerMenu.module.css';

const CATEGORIES = [
    { id: 'cctv', name: 'CÁMARAS DE SEGURIDAD', href: '/tienda?cat=cctv' },
    { id: 'access', name: 'CONTROL DE ACCESO', href: '/tienda?cat=access' },
    { id: 'alarms', name: 'ALARMAS Y SENSORES', href: '/tienda?cat=alarms' },
    { id: 'intercom', name: 'VIDEO PORTEROS', href: '/tienda?cat=intercom' },
    { id: 'network', name: 'REDES Y CONECTIVIDAD', href: '/tienda?cat=network' },
];

export default function ScannerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Bloquear scroll cuando el menú está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Trigger Button - Visible cuando el menú está cerrado (o siempre, y cambia de estado) */}
            <button
                className={`${styles.triggerBtn} ${isOpen ? styles.hidden : ''}`}
                onClick={toggleMenu}
                aria-label="Abrir menú de productos"
            >
                <span className={styles.triggerIcon}>⚡</span>
                <span className={styles.triggerText}>EXPLORAR PRODUCTOS</span>
            </button>

            {/* Overlay del Menú */}
            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>

                {/* Botón de Cerrar */}
                <button className={styles.closeBtn} onClick={toggleMenu} aria-label="Cerrar menú">
                    <span className={styles.closeIcon}>✕</span>
                    <span className={styles.closeText}>ABORTAR</span>
                </button>

                <nav className={styles.scannerNav} aria-label="Categorías Principales">
                    <ul className={styles.scannerList}>
                        {CATEGORIES.map((cat, index) => (
                            <li
                                key={cat.id}
                                className={styles.scannerItem}
                                style={{ '--i': index } as React.CSSProperties} // Para animación escalonada
                                onMouseEnter={() => setActiveId(cat.id)}
                                onMouseLeave={() => setActiveId(null)}
                            >
                                <Link href={cat.href} className={styles.scannerLink} onClick={toggleMenu}>
                                    <span className={styles.scannerNumber}>0{index + 1}</span>
                                    <span className={styles.scannerText} data-text={cat.name}>
                                        {cat.name}
                                    </span>
                                    <div className={`${styles.scanLine} ${activeId === cat.id ? styles.active : ''}`} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Decoración de fondo */}
                <div className={styles.gridOverlay}></div>
            </div>
        </>
    );
}
