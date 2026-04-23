'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

// Cinematic Slides Data
const SLIDES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop',
        alt: 'Centro de Monitoreo Avanzado',
        category: 'VIGILANCIA 24/7',
        title: 'TECNOLOGÍA QUE NUNCA DUERME',
        desc: 'Sistemas de CCTV con Inteligencia Artificial para protección continua.'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop',
        alt: 'Seguridad de Servidores',
        category: 'INFRAESTRUCTURA CRÍTICA',
        title: 'PROTECCIÓN DE DATOS NIVEL MILITAR',
        desc: 'Blindaje físico y lógico para tus activos más valiosos.'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop', // Industrial/Electric Fence
        alt: 'Seguridad Perimetral',
        category: 'PERÍMETROS SEGUROS',
        title: 'BARRERAS INFRANQUEABLES',
        desc: 'Cercos eléctricos y sensores de última generación.'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop', // Futuristic Network/Global
        alt: 'Conectividad Global',
        category: 'TELECOMUNICACIONES',
        title: 'CONECTIVIDAD SIN LÍMITES',
        desc: 'Redes de fibra óptica y enlaces inalámbricos de alta disponibilidad.'
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000); // 6 seconds per slide to allow reading
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.sliderContainer}>
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === current ? styles.active : ''}`}
                >
                    {/* Image Layer with Ken Burns */}
                    <div className={styles.imageWrapper}>
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            className={styles.image}
                            quality={95}
                        />
                    </div>

                    {/* Cinematic Overlay */}
                    <div className={styles.overlay} />

                    {/* Text Content Layer */}
                    <div className={styles.content}>
                        <span className={styles.categoryTag}>{slide.category}</span>
                        <h2 className={styles.title}>{slide.title}</h2>
                        <p className={styles.description}>{slide.desc}</p>
                    </div>
                </div>
            ))}

            {/* Progress Indicators */}
            <div className={styles.indicators}>
                {SLIDES.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === current ? styles.active : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
}
