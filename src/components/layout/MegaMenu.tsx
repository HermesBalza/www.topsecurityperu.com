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
        name: 'Cámaras de Seguridad', // Title Case looks better for "normal" size
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=cctv',
        subcategories: [
            { name: 'Cámaras IP', link: '/tienda?cat=cctv&sub=ip' },
            { name: 'Cámaras Analógicas', link: '/tienda?cat=cctv&sub=analog' },
            { name: 'Grabadores DVR/NVR', link: '/tienda?cat=cctv&sub=recorders' },
            { name: 'Kits de Vigilancia', link: '/tienda?cat=cctv&sub=kits' },
            { name: 'Accesorios', link: '/tienda?cat=cctv&sub=accessories' }
        ]
    },
    {
        id: 'access',
        name: 'Control de Acceso y Asistencia',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=access',
        subcategories: [
            { name: 'Biométricos', link: '/tienda?cat=access&sub=bio' },
            { name: 'Tarjetas de Proximidad', link: '/tienda?cat=access&sub=cards' },
            { name: 'Cerraduras Electromagnéticas', link: '/tienda?cat=access&sub=locks' },
            { name: 'Torniquetes', link: '/tienda?cat=access&sub=turnstiles' }
        ]
    },
    {
        id: 'alarms',
        name: 'Alarmas',
        image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=alarms',
        subcategories: [
            { name: 'Paneles de Alarma', link: '/tienda?cat=alarms&sub=panels' },
            { name: 'Sensores de Movimiento', link: '/tienda?cat=alarms&sub=sensors' },
            { name: 'Sirenas', link: '/tienda?cat=alarms&sub=sirens' },
            { name: 'Detectores de Humo', link: '/tienda?cat=alarms&sub=smoke' }
        ]
    },
    {
        id: 'videophone',
        name: 'Videoporteros',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=2070&auto=format&fit=crop',
        link: '/tienda?category=videophone',
        subcategories: [
            { name: 'Kits Unifamiliares', link: '/tienda?cat=videophone&sub=single' },
            { name: 'Sistemas Edificios', link: '/tienda?cat=videophone&sub=multi' },
            { name: 'Porteros IP', link: '/tienda?cat=videophone&sub=ip' }
        ]
    },
    {
        id: 'networks',
        name: 'Redes',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2071&auto=format&fit=crop', // Server/Network
        link: '/tienda?category=networks',
        subcategories: [
            { name: 'Switches', link: '/tienda?cat=networks&sub=switches' },
            { name: 'Routers', link: '/tienda?cat=networks&sub=routers' },
            { name: 'Cableado Estructurado', link: '/tienda?cat=networks&sub=cabling' },
            { name: 'Racks y Gabinetes', link: '/tienda?cat=networks&sub=racks' }
        ]
    },
    {
        id: 'telephony',
        name: 'Telefonía IP',
        image: 'https://images.unsplash.com/photo-1587573578202-b271d471b40d?q=80&w=2070&auto=format&fit=crop', // VoIP Phone
        link: '/tienda?category=telephony',
        subcategories: [
            { name: 'Teléfonos IP', link: '/tienda?cat=telephony&sub=phones' },
            { name: 'Centrales Telefónicas', link: '/tienda?cat=telephony&sub=pbx' },
            { name: 'Diademas', link: '/tienda?cat=telephony&sub=headsets' }
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
