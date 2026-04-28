'use server';

import { getProducts } from '@/lib/woocommerce';

export async function searchProductsAction(query: string) {
    if (!query || query.length < 3) return [];

    try {
        const products = await getProducts({
            perPage: 5,
            search: query
        });

        return products.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            image: p.images[0]?.src || '',
            category: p.categories[0]?.name || ''
        }));
    } catch (error) {
        console.error('Search Action Error:', error);
        return [];
    }
}
