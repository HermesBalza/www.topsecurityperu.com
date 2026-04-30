import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton: React.FC = () => {
    const phoneNumber = '51983428926';
    const message = encodeURIComponent('Hola Top Security Perú, deseo solicitar información sobre sus servicios y productos de seguridad.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a 
            href={whatsappUrl} 
            className={styles.whatsappFloat} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
};

export default WhatsAppButton;
