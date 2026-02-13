import Link from 'next/link';
import styles from './page.module.css';
import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/shop/ProductCard';

export default async function Home() {
  // Fetch real products at build/request time
  const fetchedProducts = await getProducts(4); // Get top 4 products
  const products = Array.isArray(fetchedProducts) ? fetchedProducts : [];

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            SEGURIDAD DE <span className={styles.highlight}>ALTURA</span>
          </h1>
          <p className={styles.subtitle}>
            Protegemos lo que más valoras con tecnología de vigilancia avanzada
            y sistemas de control de última generación.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/tienda" className="btn btn-primary">
              Ver Productos
            </Link>
            <Link href="/contacto" className="btn btn-outline">
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products from WooCommerce */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <h2 className="text-center" style={{ textAlign: 'center', marginBottom: '2rem' }}>PRODUCTOS DESTACADOS</h2>

        {products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: String(product.id),
                  name: product.name,
                  price: parseFloat(product.price || '0'),
                  image: product.images[0]?.src || '',
                  category: product.categories[0]?.name || 'Seguridad'
                }}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>Cargando catálogo...</p>
        )}
      </section>
    </main>
  );
}
