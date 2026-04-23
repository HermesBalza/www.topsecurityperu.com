'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './QuickAccess.module.css';

const ITEMS = [
    {
        id: 1,
        title: 'NUESTROS CLIENTES',
        link: '/clientes',
        // Meeting/Business context
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'COTIZA CON NOSOTROS',
        link: '/cotizar',
        // Planning/Writing context
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'PIDE NUESTROS CATÁLOGOS',
        link: '/catalogos',
        // Reading/Tablet context
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1374&auto=format&fit=crop' 
    },
    {
        id: 4,
        title: 'SERVICIO TÉCNICO',
        link: '/soporte',
        // Tech/Repair context
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1470&auto=format&fit=crop'
    }
];

export default function QuickAccess() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.grid}`}>
                {ITEMS.map((item) => (
                    <Link key={item.id} href={item.link} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                            <div className={styles.overlay} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <div className={styles.line} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
