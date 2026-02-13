import { getProductById } from '@/lib/woocommerce';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return {
            title: 'Producto no encontrado',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const productImage = product.images?.[0]?.src || '';
    const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

    return {
        title: product.name,
        description: stripHtml(product.short_description || product.description || '').slice(0, 160),
        openGraph: {
            images: [productImage, ...previousImages],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    // Helper to strip HTML tags from description
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    return (
        <main className={styles.container}>
            <div className="container">
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Inicio</Link>
                    <span>/</span>
                    <Link href="/tienda">Tienda</Link>
                    <span>/</span>
                    <span className={styles.current}>{product.name}</span>
                </nav>

                <div className={styles.grid}>
                    {/* Gallery Section */}
                    <section className={styles.gallery}>
                        <div className={styles.mainImageWrapper}>
                            {product.images?.[0] ? (
                                <Image
                                    loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    className={styles.mainImage}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: 'contain', padding: '2rem' }}
                                    priority
                                />
                            ) : (
                                <div className={styles.placeholder}>SIN IMAGEN</div>
                            )}
                        </div>
                        {/* Thumbnails (Optional/Future) */}
                        <div className={styles.thumbnails}>
                            {product.images?.slice(1, 4).map((img) => (
                                <div key={img.id} className={styles.thumb}>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`}
                                        src={img.src}
                                        alt=""
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Info Section */}
                    <section className={styles.info}>
                        <span className={styles.category}>
                            {product.categories?.[0]?.name || 'Seguridad'}
                        </span>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.prices}>
                            {product.sale_price ? (
                                <>
                                    <span className={styles.oldPrice}>S/ {parseFloat(product.regular_price).toFixed(2)}</span>
                                    <span className={styles.price}>S/ {parseFloat(product.price).toFixed(2)}</span>
                                </>
                            ) : (
                                <span className={styles.price}>S/ {parseFloat(product.price || '0').toFixed(2)}</span>
                            )}
                        </div>

                        <div className={styles.description}>
                            <p>{stripHtml(product.short_description || product.description || 'Sin descripción disponible.')}</p>
                        </div>

                        <div className={styles.actions}>
                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                AÑADIR AL CARRITO
                            </button>
                            <a
                                href={`https://wa.me/51983428926?text=Hola, me interesa el producto: ${product.name}`}
                                target="_blank"
                                className="btn btn-outline"
                                style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}
                            >
                                CONSULTAR POR WHATSAPP
                            </a>
                        </div>

                        <div className={styles.meta}>
                            <p>SKU: <span>{product.id}</span></p>
                            <p>Disponibilidad: <span className={styles.stock}>{product.stock_status === 'instock' ? 'En Stock' : 'Abonar'}</span></p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
