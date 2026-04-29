import Image from 'next/image';
import { FaRocket, FaMicrochip, FaUsers, FaGlobeAmericas } from 'react-icons/fa';
import styles from './page.module.css';

export const metadata = {
    title: 'Top Security Perú | Expertos en Seguridad Electrónica y Vigilancia Inteligente',
    description: 'Conozca Top Security Perú, líderes en soluciones de seguridad electrónica en Lima y todo el territorio nacional. Aliados estratégicos de Hikvision y Dahua, especialistas en proyectos de seguridad inteligente y vigilancia.',
};

export default function NosotrosPage() {
    const stats = [
        { number: '15+', label: 'Años de Innovación' },
        { number: '5k+', label: 'Proyectos Ejecutados' },
        { number: '100%', label: 'Compromiso Técnico' }
    ];

    const partners = [
        'HIKVISION', 'DAHUA', 'ZKTECO', 'STV', 'FUJIKAM', 'TOPBAND'
    ];

    const values = [
        {
            title: 'Innovación Continua',
            desc: 'Integramos las últimas tendencias mundiales en inteligencia artificial y análisis de video.'
        },
        {
            title: 'Excelencia Técnica',
            desc: 'Nuestro equipo especializado garantiza resultados impecables en cada implementación.'
        },
        {
            title: 'Atención Adaptativa',
            desc: 'Nos ajustamos a las necesidades específicas del mercado peruano con soluciones personalizadas.'
        },
        {
            title: 'Respuesta Inmediata',
            desc: 'La agilidad en la distribución e importación nos permite ofrecer tiempos récord de entrega.'
        }
    ];

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>NOSOTROS</h1>
                    <p>Liderando la revolución de la seguridad inteligente</p>
                </div>
            </section>

            {/* DNA Section */}
            <section className={styles.section}>
                <div className={styles.dnaSection}>
                    <div className={styles.dnaImage}>
                        <Image 
                            src="/images/about/dna_tech.png" 
                            alt="ADN Tecnológico Top Security Perú" 
                            width={600} 
                            height={600} 
                            style={{ objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                    <div className={styles.dnaText}>
                        <h2>NUESTRO ADN EN SEGURIDAD ELECTRÓNICA</h2>
                        <p>
                            En <strong>Top Security Perú</strong>, no solo instalamos cámaras; diseñamos ecosistemas de protección inteligente. 
                            Nacimos en el corazón de <strong>Lima</strong> con una visión clara: redefinir la <strong>seguridad electrónica en Perú</strong> mediante la innovación tecnológica constante.
                        </p>
                        <p>
                            Como aliados estratégicos de gigantes mundiales como <strong>HIKVISION, Dahua y ZKTeco</strong>, 
                            fusionamos nuestra sólida experiencia en importación y distribución con una ejecución técnica de élite. 
                            Nuestra trayectoria en soluciones de control de acceso, asistencia y alarmas de seguridad nos posiciona como el referente de confianza para empresas e industrias en todo el territorio nacional.
                        </p>
                        <div className={styles.statsGrid}>
                            {stats.map((stat, i) => (
                                <div key={i} className={styles.statItem}>
                                    <span className={styles.statNumber}>{stat.number}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className={styles.partnersSection}>
                <div className={styles.section} style={{ padding: 0 }}>
                    <h2>ALIANZAS TECNOLÓGICAS DE ÉLITE</h2>
                    <div className={styles.partnersGrid}>
                        {partners.map((p, i) => (
                            <div key={i} className={styles.partnerLogo}>{p}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.section}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>NUESTROS PILARES</h2>
                    <p style={{ color: 'var(--color-gray-light)', fontSize: '1.2rem' }}>
                        Construimos un futuro más seguro basándonos en principios de ingeniería y confianza.
                    </p>
                </div>
                <div className={styles.valuesGrid}>
                    {values.map((v, i) => (
                        <div key={i} className={styles.valueCard}>
                            <h3>{v.title}</h3>
                            <p>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vision Section */}
            <section className={styles.section} style={{ background: 'rgba(181, 18, 19, 0.05)', borderRadius: 'var(--radius-lg)', marginBottom: '8rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <FaGlobeAmericas style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '2rem' }} />
                    <h2 style={{ fontSize: '2.5rem' }}>COBERTURA INTEGRAL EN TODO PERÚ</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '2', color: 'var(--color-gray-light)' }}>
                        Trabajamos a diario con el compromiso de que cada vez más clientes confíen en nosotros para 
                        proyectos de <strong>videovigilancia y seguridad inteligente</strong>. Nuestra misión es clara: 
                        ofrecer las mejores herramientas y soluciones tecnológicas para que la tranquilidad sea el nuevo 
                        estándar de seguridad en cada rincón del Perú.
                    </p>
                </div>
            </section>
        </div>
    );
}
