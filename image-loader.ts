'use client';

// Next.js Image loader that works with external URLs (like WooCommerce)
export default function imageLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    return `${src}?w=${width}&q=${quality || 75}`
}
