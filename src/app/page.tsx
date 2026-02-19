// import ScannerMenu from '@/components/home/ScannerMenu'; // REMOVED
import Link from 'next/link';
import styles from './page.module.css';
import { getProducts, getCategories } from '@/lib/woocommerce';
// import { getProducts } from '@/lib/woocommerce'; // REMOVED DUPLICATE
import ProductCard from '@/components/shop/ProductCard';
import Image from 'next/image';
import HeroSlider from '@/components/home/HeroSlider'; // Importamos el slider
import QuickAccess from '@/components/home/QuickAccess';
import ProductCategoryRow from '@/components/home/ProductCategoryRow';
import BrandsCarousel from '@/components/home/BrandsCarousel';
import BlogSection from '@/components/blog/BlogSection';

async function getFeaturedProducts() {
  // Simulación de carga de datos
  return [
    {
      id: 1,
      name: 'Sistema de Cámaras IP 4K',
      price: 1299.00,
      image: '/images/products/camera-system.jpg',
      category: 'CCTV'
    },
    // ... otros productos
  ];
}



export default async function Home() {
  // Debug Categories
  const categories = await getCategories();
  console.log('--- WOOCOMMERCE CATEGORIES ---');
  categories.forEach((c: any) => console.log(`${c.id}: ${c.name} (${c.slug})`));
  console.log('------------------------------');

  const products = []; // Placeholder temporal para evitar errores mientras depuramos

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>

        {/* Fondo: Slider Automático 
            Se coloca primero para que el z-index CSS lo maneje (o por orden natural si no se usa z-index)
        */}
        <HeroSlider />

        <div className={styles.heroGrid}>

          {/* Contenido Principal Centrado */}
          {/* Contenido Principal ELIMINADO a petición del usuario para dejar solo el slider */}

          {/* 
              El Hero queda como un lienzo visual limpio.
              La navegación se hace vía Navbar o el botón flotante del ScannerMenu.
          */}

          {/* Menú Overlay (Maneja su propia visibilidad y posición) */}
          {/* Menú Overlay ELIMINADO a petición del usuario */}

        </div>
      </section>

      {/* Sección Accesos Rápidos */}
      <QuickAccess />

      {/* Secciones de Productos por Categoría */}
      {/* Secciones de Productos por Categoría (Datos Reales) */}
      {/* Secciones de Productos por Categoría (Datos Reales) */}
      <div style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>

        {/* 1. Cámaras de Seguridad (Analog + IP + DVR + NVR) - Excluyendo WiFi (87) */}
        <ProductCategoryRow
          title="CÁMARAS DE SEGURIDAD"
          categoryIds="80,78,81,79"
          excludeIds="87"
          limit={6}
        />

        {/* 2. Cámaras IP WiFi */}
        <ProductCategoryRow
          title="CÁMARAS IP WIFI"
          categoryIds="87"
          limit={6}
        />

        {/* 3. Controles de Acceso y/o Asistencia */}
        <ProductCategoryRow
          title="CONTROL DE ACCESO & ASISTENCIA"
          categoryIds="82"
          limit={6}
        />

        {/* 4. Alarmas */}
        <ProductCategoryRow
          title="SISTEMAS DE ALARMA"
          categoryIds="85"
          limit={6}
        />

        {/* 5. Videoporteros */}
        <ProductCategoryRow
          title="VIDEOPORTEROS"
          categoryIds="86"
          limit={6}
        />

      </div>

      {/* Carrusel de Marcas Aliadas */}
      <BrandsCarousel />

      {/* Sección de Blog (Últimas Noticias) */}
      <BlogSection />

    </main>
  );
}
