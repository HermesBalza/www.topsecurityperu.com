import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import styles from './page.module.css';

export const metadata = {
    title: 'Contacto | Top Security Perú - Expertos en Seguridad Electrónica',
    description: 'Ponte en contacto con los especialistas en seguridad CCTV en Lima. Soporte técnico, asesoría personalizada y cotizaciones rápidas en Top Security Perú.',
};

export default function ContactoPage() {
    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>CONTÁCTANOS</h1>
                    <p>CONECTA CON EL FUTURO DE TU SEGURIDAD</p>
                </div>
            </section>

            {/* Main Section: Form + Info */}
            <section className={styles.mainSection}>
                {/* Information Column */}
                <div className={styles.infoColumn}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>NUESTROS NODOS DE ATENCIÓN</h2>
                        <p style={{ color: 'var(--color-gray-light)', fontSize: '1.1rem' }}>
                            Nuestro equipo de ingeniería está listo para asesorarte. Tu tranquilidad es nuestra misión técnica.
                        </p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3><FaMapMarkerAlt /> SEDE CENTRAL LIMA</h3>
                        <p>Av. Garcilaso de la Vega 1336, Lima</p>
                        <p>Centro Comercial Cyber Plaza, Tienda N° 148, Nivel 2B</p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3><FaPhoneAlt /> CANALES TÉCNICOS</h3>
                        <p>Central: (01) 399-6684</p>
                        <p>Móvil 1: +51 945 035 320</p>
                        <p>Móvil 2: +51 995 228 441</p>
                    </div>

                    <div className={styles.infoCard}>
                        <h3><FaEnvelope /> SOPORTE DIGITAL</h3>
                        <p>ventas@topsecurityperu.com</p>
                        <p>Atención inmediata para cotizaciones y consultas técnicas.</p>
                    </div>

                    <a 
                        href="https://wa.me/51983428926?text=Hola, deseo comunicarme con un asesor de Top Security Perú." 
                        target="_blank" 
                        className={styles.submitBtn}
                        style={{ marginTop: 'auto', textDecoration: 'none' }}
                    >
                        <FaWhatsapp size={24} />
                        ASESORÍA POR WHATSAPP
                    </a>
                </div>

                {/* Form Card */}
                <div className={styles.formCard}>
                    <h2>INICIA TU PROYECTO</h2>
                    <form>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label>Nombre</label>
                                <input type="text" className={styles.input} placeholder="Tu nombre" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Apellidos</label>
                                <input type="text" className={styles.input} placeholder="Tus apellidos" required />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Correo Electrónico</label>
                            <input type="email" className={styles.input} placeholder="ejemplo@correo.com" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Celular</label>
                            <input type="tel" className={styles.input} placeholder="912 345 678" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Comentario o Consulta</label>
                            <textarea className={styles.textarea} placeholder="¿En qué podemos ayudarte hoy?"></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            <FaPaperPlane />
                            ENVIAR MENSAJE
                        </button>
                    </form>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>ESTAMOS EN EL CORAZÓN TECNOLÓGICO</h2>
                </div>
                <div className={styles.mapWrapper}>
                    <Image 
                        src="/images/contact/support_visual.png" 
                        alt="Ubicación Top Security Perú" 
                        fill 
                        className={styles.mapImage}
                        style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', background: 'rgba(0,0,0,0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>VISÍTANOS EN CYBER PLAZA</h3>
                        <p style={{ margin: 0 }}>C.C. Cyber Plaza Tienda N° 148 Nivel 2B</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
