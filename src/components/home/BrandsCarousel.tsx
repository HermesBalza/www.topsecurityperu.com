'use client';

import Image from 'next/image';
import { BRANDS } from '@/lib/mockData';
import styles from './BrandsCarousel.module.css';

export default function BrandsCarousel() {
    return (
        <section className={styles.section}>
            <h3 className={styles.title}>NUESTROS ALIADOS ESTRATÉGICOS</h3>

            <div className={styles.carouselContainer}>
                {/* Duplicamos la lista para efecto infinito seamless */}
                <div className={styles.track}>
                    {[...BRANDS, ...BRANDS].map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className={styles.brandItem}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={150}
                                    height={60}
                                    className={styles.logo}
                                    style={{ objectFit: 'contain' }}
                                    unoptimized // Para evitar configurar dominios externos en demo
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
