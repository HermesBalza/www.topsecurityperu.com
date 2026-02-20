'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaShoppingCart, FaShieldAlt, FaTruck, FaHeadset, FaMinus, FaPlus } from 'react-icons/fa';
import styles from './ProductDetailClient.module.css';
import { Product } from '@/lib/woocommerce';

interface Props {
    product: Product;
}

export default function ProductDetailClient({ product }: Props) {
    const [selectedImage, setSelectedImage] = useState(product.images?.[0] || null);
    const [quantity, setQuantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    // Ensure we have at least one image to show
    const mainImage = selectedImage || { src: '', alt: 'Sin imagen' };

    // Calculate discount percentage if sale price exists
    const calculateDiscount = () => {
        if (!product.sale_price || !product.regular_price) return 0;
        const regular = parseFloat(product.regular_price);
        const sale = parseFloat(product.sale_price);
        if (regular <= 0) return 0;
        return Math.round(((regular - sale) / regular) * 100);
    };

    const discount = calculateDiscount();

    const handleQuantityChange = (delta: number) => {
        const newQty = quantity + delta;
        if (newQty >= 1) setQuantity(newQty);
    };

    // Helper to strip HTML tags from description
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <main className={styles.container}>
            {/* Breadcrumb - Minimalist */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--color-gray-med)' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <Link href="/tienda" style={{ textDecoration: 'none', color: 'inherit' }}>Tienda</Link>
                <span style={{ margin: '0 0.5rem' }}>/</span>
                <span style={{ color: 'var(--color-primary)' }}>{product.name}</span>
            </nav>

            <div className={styles.grid}>
                {/* Left Column: Gallery */}
                <div className={styles.galleryInfoWrapper}>
                    {/* Thumbnails */}
                    <div className={styles.thumbnails}>
                        {product.images?.map((img) => (
                            <div
                                key={img.id}
                                className={`${styles.thumb} ${selectedImage?.id === img.id ? styles.active : ''}`}
                                onMouseEnter={() => setSelectedImage(img)}
                                onClick={() => setSelectedImage(img)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt || product.name}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className={styles.mainImageWrapper}>
                        {mainImage.src ? (
                            <Image
                                src={mainImage.src}
                                alt={mainImage.alt || product.name}
                                fill
                                className={styles.mainImage}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div style={{ color: '#ccc' }}>Sin Imagen</div>
                        )}
                        {discount > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: '#FF0000',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                zIndex: 10
                            }}>
                                -{discount}%
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Info */}
                <div className={styles.infoColumn}>
                    <div className={styles.metaInfo}>
                        <span>SKU: {product.sku || product.id}</span>
                        <span className={styles.metaDivider}>|</span>
                        <span style={{ color: 'var(--color-primary)' }}>
                            {product.categories?.[0]?.name || 'Seguridad'}
                        </span>
                        <span className={styles.metaDivider}>|</span>
                        <span>{product.stock_status === 'instock' ? 'En Stock' : 'Abonar'}</span>
                    </div>

                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceWrapper}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                                {product.sale_price ? (
                                    <>
                                        <span className={styles.currentPrice}>S/ {parseFloat(product.price).toFixed(2)}</span>
                                        <span className={styles.oldPrice}>S/ {parseFloat(product.regular_price).toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className={styles.currentPrice}>S/ {parseFloat(product.price || '0').toFixed(2)}</span>
                                )}
                            </div>
                            <span style={{
                                fontSize: '0.9rem',
                                color: '#dc2626',
                                fontWeight: 700,
                                marginTop: '-0.2rem'
                            }}>
                                Incluye IGV
                            </span>
                        </div>
                    </div>

                    {/* Description Intro */}
                    <div style={{ marginBottom: '2rem', color: '#333333', lineHeight: '1.6' }}>
                        <p>{stripHtml(product.short_description || product.description || '').slice(0, 250)}...</p>
                    </div>

                    <div className={styles.actionsWrapper}>
                        {/* Quantity Selector */}
                        <div className={styles.quantitySelector}>
                            <span className={styles.qtyLabel}>CANTIDAD</span>
                            <div className={styles.qtyControls}>
                                <button onClick={() => handleQuantityChange(-1)} className={styles.qtyBtn}><FaMinus size={12} /></button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className={styles.qtyBtn}><FaPlus size={12} /></button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className={styles.buttons}>
                            <a
                                href={`https://wa.me/51983428926?text=Hola, estoy interesado en ${quantity} unidad(es) del producto: ${product.name} (SKU: ${product.sku || product.id})`}
                                target="_blank"
                                className={styles.btnSecondary}
                            >
                                <FaWhatsapp size={20} />
                                CONSULTAR
                            </a>
                            <button className={styles.btnPrimary}>
                                <FaShoppingCart size={18} />
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className={styles.trustBadges}>
                        <div className={styles.trustItem}>
                            <FaShieldAlt className={styles.trustIcon} />
                            <span className={styles.trustText}>Garantía<br />Oficial</span>
                        </div>
                        <div className={styles.trustItem}>
                            <FaTruck className={styles.trustIcon} />
                            <span className={styles.trustText}>Envíos a<br />Todo Perú</span>
                        </div>
                        <div className={styles.trustItem}>
                            <FaHeadset className={styles.trustIcon} />
                            <span className={styles.trustText}>Soporte<br />Técnico</span>
                        </div>
                    </div>

                    {/* Extended Description */}
                    <div className={styles.description}>
                        <h3 className={styles.sectionTitle}>Descripción del Producto</h3>
                        <div
                            className={styles.descriptionContent}
                            dangerouslySetInnerHTML={{ __html: product.description || '' }}
                        />
                    </div>
                </div>
            </div>
        </main >
    );
}
