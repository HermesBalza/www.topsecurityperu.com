'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import styles from './MegaMenu.module.css';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    {
        id: 'cctv',
        name: 'Cámaras de Seguridad',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=77',
        subcategories: [
            { name: 'Cámaras IP', link: '/tienda?category=78' },
            { name: 'Cámaras Analógicas', link: '/tienda?category=80' },
            { name: 'Grabadores DVR/NVR', link: '/tienda?category=81,79' },
            { name: 'Kits de Vigilancia', link: '/tienda?category=75' },
            { name: 'Accesorios', link: '/tienda?category=89' }
        ]
    },
    {
        id: 'access',
        name: 'Control de Acceso y Asistencia',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=82',
        subcategories: [
            { name: 'Biométricos', link: '/tienda?category=84' },
            { name: 'Tarjetas de Proximidad', link: '/tienda?category=240' },
            { name: 'Cerraduras Electromecánicas', link: '/tienda?category=235' },
            { name: 'Torniquetes y Barreras', link: '/tienda?category=239' }
        ]
    },
    {
        id: 'alarms',
        name: 'Alarmas',
        image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=85',
        subcategories: [
            { name: 'Sistemas de Alarma', link: '/tienda?category=85' },
            { name: 'Alarmas Comunitarias', link: '/tienda?category=197' },
            { name: 'Sensores y Sirenas', link: '/tienda?category=85' }
        ]
    },
    {
        id: 'videophone',
        name: 'Videoporteros',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=86',
        subcategories: [
            { name: 'Intercomunicadores', link: '/tienda?category=209' },
            { name: 'Sistemas IP', link: '/tienda?category=86' },
            { name: 'Kits Residenciales', link: '/tienda?category=86' }
        ]
    },
    {
        id: 'networks',
        name: 'Redes',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2071&auto=format&fit=crop',
        link: '/tienda?category=241',
        subcategories: [
            { name: 'Switches', link: '/tienda?category=88' },
            { name: 'Routers WIFI', link: '/tienda?category=242' },
            { name: 'Cableado y Conectividad', link: '/tienda?category=244' },
            { name: 'Racks y Gabinetes', link: '/tienda?category=243' }
        ]
    },
    {
        id: 'telephony',
        name: 'Telefonía IP',
        image: 'https://images.unsplash.com/photo-1587573578202-b271d471b40d?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=92',
        subcategories: [
            { name: 'Teléfonos IP', link: '/tienda?category=92' },
            { name: 'Centrales IP', link: '/tienda?category=92' },
            { name: 'Accesorios VoIP', link: '/tienda?category=92' }
        ]
    }
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 500);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            {/* Background Image Layer */}
            <div
                className={styles.backgroundImage}
                style={{ backgroundImage: `url(${activeCategory.image})` }}
            />

            {/* Dark Gradient Overlay - More opaque for readability */}
            <div className={styles.gradientOverlay} />

            {/* Content Container */}
            <div className={`container ${styles.contentContainer}`}>
                {/* Header of Overlay */}
                <div className={styles.header}>
                    <div className={styles.brandTitle}>
                        CATÁLOGO DE PRODUCTOS <span className={styles.redDot}></span>
                    </div>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <FaTimes /> CERRAR
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className={styles.menuGrid}>
                    {/* Left Column: Categories */}
                    <div className={styles.categoriesColumn}>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={cat.link}
                                className={`${styles.categoryItem} ${activeCategory.id === cat.id ? styles.active : ''}`}
                                onMouseEnter={() => setActiveCategory(cat)}
                                onClick={onClose}
                            >
                                <span className={styles.catName}>{cat.name}</span>
                                <FaArrowRight className={styles.arrow} />
                            </Link>
                        ))}
                    </div>

                    {/* Right Column: Subcategories & Info */}
                    <div className={styles.detailsColumn}>
                        <h3 className={styles.subTitle}>Categorías de {activeCategory.name}</h3>
                        <div className={styles.subCategoriesGrid}>
                            {activeCategory.subcategories?.map((sub) => (
                                <Link
                                    key={sub.name}
                                    href={sub.link}
                                    className={styles.subCategoryItem}
                                    onClick={onClose}
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>

                        <div className={styles.ctaWrapper}>
                            <Link href={activeCategory.link} className={styles.viewAllBtn} onClick={onClose}>
                                VER TODO {activeCategory.name.toUpperCase()}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer of Overlay */}
                <div className={styles.footer}>
                    <p>TOP SECURITY PERÚ — Soluciones Integrales de Seguridad</p>
                </div>
            </div>
        </div>
    );
}
