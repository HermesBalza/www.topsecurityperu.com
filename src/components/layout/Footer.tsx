import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                {/* Top Section */}
                <div className={styles.grid}>
                    {/* Brand & About */}
                    <div className={styles.brandCol}>
                        <h2 className={styles.logoText}>TOP <span className="text-secondary">SECURITY</span> PERÚ</h2>
                        <p className={styles.description}>
                            Especialistas en soluciones de seguridad electrónica y vigilancia privada de alto nivel.
                            Protegemos lo que más valoras con tecnología de vanguardia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Mapa del Sitio</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/" className={styles.link}>Inicio</Link></li>
                            <li><Link href="/nosotros" className={styles.link}>Nosotros</Link></li>
                            <li><Link href="/servicios" className={styles.link}>Servicios</Link></li>
                            <li><Link href="/tienda" className={styles.link}>Tienda</Link></li>
                            <li><Link href="/blog" className={styles.link}>Blog de Seguridad</Link></li>
                            <li><Link href="/contacto" className={styles.link}>Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className={styles.linksCol}>
                        <h3 className={styles.colTitle}>Legal</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/politica-de-privacidad" className={styles.link}>Política de Privacidad</Link></li>
                            <li><Link href="/terminos-y-condiciones" className={styles.link}>Términos y Condiciones</Link></li>
                            <li><Link href="/libro-de-reclamaciones" className={styles.link}>Libro de Reclamaciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.contactCol}>
                        <h3 className={styles.colTitle}>Contacto</h3>
                        <p className={styles.contactItem}>
                            <strong>Central:</strong> (01) 123-4567
                        </p>
                        <p className={styles.contactItem}>
                            <strong>WhatsApp:</strong> +51 983 428 926
                        </p>
                        <p className={styles.contactItem}>
                            <strong>Email:</strong> contacto@topsecurityperu.com
                        </p>
                        <p className={styles.contactItem}>
                            <strong>Dirección:</strong> Lima, Perú
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {currentYear} Top Security Perú. Todos los derechos reservados.
                    </p>
                    <p className={styles.credits}>
                        Desarrollado con <span style={{ color: 'var(--color-primary)' }}>♥</span> y Tecnología de Punta
                    </p>
                </div>
            </div>
        </footer>
    );
}
