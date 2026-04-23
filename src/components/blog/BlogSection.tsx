'use client';

import styles from './BlogSection.module.css';
import BlogCard from './BlogCard';

// Mock Data inicial
const POSTS = [
    {
        id: 1,
        title: 'GUÍA COMPLETA SOBRE CÁMARAS DE RECONOCIMIENTO DE PLACAS (ANPR)',
        category: 'TECNOLOGÍA',
        date: '15 FEB 2026',
        excerpt: 'En la era de la tecnología avanzada, el reconocimiento automático de placas de autos (ANPR) se ha convertido en un estándar de seguridad...',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop',
        slug: 'guia-reconocimiento-placas-anpr'
    },
    {
        id: 2,
        title: 'CÓMO ELEGIR EL MEJOR SISTEMA DE ALARMA PARA TU NEGOCIO',
        category: 'CONSEJOS',
        date: '12 FEB 2026',
        excerpt: 'Proteger tu patrimonio es prioridad. Analizamos los puntos clave para seleccionar un sistema de alarma robusto y escalable...',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2670&auto=format&fit=crop',
        slug: 'elegir-mejor-sistema-alarma'
    },
    {
        id: 3,
        title: 'INTEGRACIÓN DE CONTROL DE ACCESO CON BIOMETRÍA AVANZADA',
        category: 'INNOVACIÓN',
        date: '10 FEB 2026',
        excerpt: 'La biometría ha dejado de ser ciencia ficción. Descubre cómo los controles de acceso modernos mejoran la seguridad y flujos...',
        image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop',
        slug: 'integracion-control-acceso-biometria'
    },
    {
        id: 4,
        title: 'MANTENIMIENTO PREVENTIVO DE SISTEMAS CCTV: GUÍA RÁPIDA',
        category: 'SOPORTE',
        date: '05 FEB 2026',
        excerpt: 'Un sistema sin mantenimiento es un riesgo. Aprende los pasos básicos para asegurar la operatividad de tus cámaras 24/7...',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
        slug: 'mantenimiento-preventivo-cctv'
    },
    {
        id: 5,
        title: 'TENDENCIAS DE CIBERSEGURIDAD FÍSICA PARA 2026',
        category: 'TENDENCIAS',
        date: '01 FEB 2026',
        excerpt: 'La convergencia entre seguridad física y digital es inevitable. Repasamos las tendencias que definirán el sector este año...',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
        slug: 'tendencias-seguridad-2026'
    }
];

export default function BlogSection() {
    return (
        <section className={styles.section}>
            <div className="container">
                <header className={styles.header}>
                    <h2 className={styles.heading}>ÚLTIMAS NOTICIAS</h2>
                    <p className={styles.subheading}>Innovación y consejos de seguridad directamente de nuestros expertos</p>
                </header>

                <div className={styles.grid}>
                    {POSTS.map((post) => (
                        <div key={post.id} className={styles.gridItem}>
                            <BlogCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
