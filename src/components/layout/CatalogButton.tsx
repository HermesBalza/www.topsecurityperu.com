import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import styles from './CatalogButton.module.css';

const CatalogButton: React.FC = () => {
    const phoneNumber = '51983428926';
    const message = encodeURIComponent('Hola Top Security Perú, deseo solicitar sus catálogos de productos de seguridad.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a 
            href={whatsappUrl} 
            className={styles.catalogFloat} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Pedir Catálogos"
        >
            <FaBookOpen className={styles.catalogIcon} />
            <span>PIDE NUESTROS CATÁLOGOS</span>
        </a>
    );
};

export default CatalogButton;
