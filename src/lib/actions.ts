'use server';

import { getProducts } from './woocommerce';

export async function fetchProductsAction(page: number, categoryId?: string) {
    try {
        const products = await getProducts({ 
            perPage: 20, 
            page, 
            category: categoryId 
        });
        
        return products.map(product => ({
            id: String(product.id),
            name: product.name,
            slug: product.slug,
            price: parseFloat(product.price || '0'),
            image: product.images[0]?.src || '',
            category: product.categories[0]?.name || 'Seguridad'
        }));
    } catch (error) {
        console.error('Action error:', error);
        return [];
    }
}
