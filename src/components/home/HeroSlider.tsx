'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

// Imágenes de alta calidad de Unsplash (Maquetación)
const SLIDES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop',
        alt: 'CCTV Monitoring Modern City',
        category: 'VIGILANCIA 24/7'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop',
        alt: 'Server Room Security',
        category: 'INFRAESTRUCTURA CIBERNÉTICA'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
        alt: 'Tech Team working on code',
        category: 'SOPORTE ESPECIALIZADO'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
        alt: 'Future Interface',
        category: 'TECNOLOGÍA DE PUNTA'
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.sliderContainer}>
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === current ? styles.active : ''}`}
                >
                    <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        className={styles.image}
                        quality={90}
                    />
                    <div className={styles.overlay} />
                </div>
            ))}
        </div>
    );
}
