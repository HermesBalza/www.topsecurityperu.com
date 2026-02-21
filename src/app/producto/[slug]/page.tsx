import { getProductBySlug } from '@/lib/woocommerce';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

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

import ProductDetailClient from '@/components/shop/ProductDetailClient';
import ProductCategoryRow from '@/components/home/ProductCategoryRow';

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const categoryIds = product.categories?.map(c => c.id).join(',') || '';

    return (
        <div style={{ backgroundColor: 'var(--color-bg)' }}>
            <ProductDetailClient product={product} />

            {categoryIds && (
                <div style={{ maxWidth: '1200px', margin: '4rem auto 2rem', padding: '0 1rem' }}>
                    <ProductCategoryRow
                        title="Productos Relacionados"
                        categoryIds={categoryIds}
                        excludeIds={product.id.toString()}
                        limit={5}
                    />
                </div>
            )}
        </div>
    );
}
