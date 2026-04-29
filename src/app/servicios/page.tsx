import Image from 'next/image';
import Link from 'next/link';
import { 
    FaCamera, 
    FaWifi, 
    FaTools, 
    FaExchangeAlt, 
    FaWalking, 
    FaGraduationCap, 
    FaWhatsapp,
    FaShieldAlt
} from 'react-icons/fa';
import styles from './page.module.css';

export const metadata = {
    title: 'Instalación de Cámaras de Seguridad y CCTV en Perú | Top Security',
    description: 'Especialistas en instalación, configuración y mantenimiento de cámaras de seguridad CCTV en Perú. Soluciones de seguridad electrónica avanzada para hogares, empresas e industrias con tecnología de vanguardia.',
};

export default function ServiciosPage() {
    const services = [
        {
            title: 'Instalación de cámaras de seguridad',
            desc: 'Montaje profesional de sistemas CCTV con los más altos estándares de calidad y precisión.',
            icon: <FaCamera />
        },
        {
            title: 'Configuración de cámaras a internet',
            desc: 'Sincronización total para visualización remota en tiempo real desde cualquier dispositivo y lugar.',
            icon: <FaWifi />
        },
        {
            title: 'Mantenimiento preventivo y correctivo',
            desc: 'Aseguramos la operatividad continua de sus equipos con revisiones técnicas especializadas.',
            icon: <FaTools />
        },
        {
            title: 'Migración a tecnologías modernas',
            desc: 'Actualizamos sus sistemas antiguos a las últimas innovaciones en resolución e inteligencia artificial.',
            icon: <FaExchangeAlt />
        },
        {
            title: 'Migración física de sistemas',
            desc: 'Reubicación y optimización de infraestructuras de seguridad existentes con mínima interrupción.',
            icon: <FaWalking />
        },
        {
            title: 'Capacitación de uso profesional',
            desc: 'Instrucción detallada para que usted y su personal dominen el control total de sus sistemas.',
            icon: <FaGraduationCap />
        }
    ];

    const sectors = [
        'Oficinas', 'Colegios', 'Centros de Salud', 
        'Comercios', 'Hogares', 'Bingos y Casinos', 
        'Industrias', 'Hoteles', 'Vecindarios'
    ];

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>CÁMARAS DE SEGURIDAD Y CCTV</h1>
                    <p>Expertos en Ingeniería de Seguridad Electrónica con cobertura integral en todo el Perú.</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className={styles.section}>
                <div className={styles.introGrid}>
                    <div className={styles.introText}>
                        <h2>ESPECIALISTAS EN SEGURIDAD ELECTRÓNICA</h2>
                        <p>
                            En <strong>Top Security Perú</strong>, somos expertos altamente capacitados en la 
                            <strong> instalación de cámaras de seguridad CCTV</strong> para residencias, corporativos e industrias. 
                            Si busca optimizar la vigilancia de su casa o establecimiento comercial en Lima o provincias, 
                            le ofrecemos asesoría técnica personalizada de primer nivel.
                        </p>
                        <p>
                            Implementamos soluciones integrales que abarcan desde una cámara IP individual hasta el 
                            montaje de centros de monitoreo avanzados para una vigilancia 24/7 de alta resolución.
                        </p>
                    </div>
                    <div className={styles.introImage}>
                        <Image 
                            src="/images/services/installation_tech.png" 
                            alt="Instalación Tecnológica Top Security" 
                            width={600} 
                            height={400} 
                            style={{ objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>NUESTRO CATÁLOGO TÉCNICO</h2>
                </div>
                <div className={styles.servicesGrid}>
                    {services.map((s, i) => (
                        <div key={i} className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sectors Section */}
            <section className={styles.sectorsSection}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <FaShieldAlt style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '2rem' }} />
                    <h2 style={{ fontSize: '3rem' }}>VIGILANCIA EN TODOS LOS SECTORES</h2>
                    <p style={{ color: 'var(--color-gray-light)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        Nuestros sistemas de cámaras de seguridad ofrecen aplicaciones exitosas en entornos críticos:
                    </p>
                    <div className={styles.sectorsGrid}>
                        {sectors.map((sector, i) => (
                            <div key={i} className={styles.sectorItem}>
                                <h4>{sector}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaBox}>
                    <h2>¿LISTO PARA ELEVAR SU SEGURIDAD?</h2>
                    <p>
                        Cada solución posee características específicas que debemos analizar juntos. 
                        Contáctenos hoy mismo para una consultoría técnica personalizada.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="https://wa.me/51983428926?text=Hola Top Security Perú, deseo solicitar una asesoría técnica sobre sus servicios de seguridad electrónica." className="btn btn-primary" target="_blank">
                            <FaWhatsapp style={{ marginRight: '0.5rem' }} />
                            SOLICITAR ASESORÍA
                        </Link>
                        <Link href="/contacto" className="btn btn-outline">
                            VER OFICINAS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
