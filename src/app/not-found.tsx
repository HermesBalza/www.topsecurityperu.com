import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Página no encontrada</h2>
            <p className={styles.text}>
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <Link href="/" className="btn btn-primary">
                Volver al Inicio
            </Link>
        </div>
    );
}
