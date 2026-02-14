const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET || !WORDPRESS_URL) {
    throw new Error('Faltan las variables de entorno de WooCommerce');
}

// Basic Authentication Helper
function getAuthHeader() {
    const credentials = btoa(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`);
    return `Basic ${credentials}`;
}

// Types (Simplified for display)
export interface Product {
    id: number;
    name: string;
    price: string;
    regular_price: string;
    sale_price: string;
    description: string;
    short_description: string;
    images: { id: number; src: string; alt: string }[];
    categories: { id: number; name: string }[];
    permalink: string;
    stock_status: string;
}

/**
 * Fetch products from WooCommerce
 * @param perPage Number of products to fetch
 */
interface FetchProductsParams {
    perPage?: number;
    category?: string; // Comma separated IDs
    exclude?: string; // Comma separated IDs to exclude
}

export async function getProducts({ perPage = 10, category, exclude }: FetchProductsParams = {}): Promise<Product[]> {
    try {
        let url = `${WORDPRESS_URL}/wp-json/wc/v3/products?per_page=${perPage}&status=publish`;

        if (category) url += `&category=${category}`;
        if (exclude) url += `&exclude=${exclude}`; // Ojo: API WC usa 'exclude' para IDs de productos, no categorías. Para excluir categorías la API estándar no tiene param directo simple, a veces se usa 'category_exclude' depende de la versión o plugin. 
        // Corrección: La API v3 de WC tiene 'category' para incluir. Para excluir productos de una categoría específica, se suele filtrar post-fetch o usar un param personalizado si existe.
        // Sin embargo, si pedimos productos de categorías X, Y, Z explícitamente, no necesitamos excluir nada si la categoría 'wifi' no está en la lista. 
        // El problema es que si pido la categoría 'Camaras IP' (padre), me traerá las 'Wifi' (hija).
        // WC API no tiene 'category_exclude' nativo fácil. 
        // Solución robusta: Fetch y filtrar en código TS si es necesario, o confiar en pedir solo las categorías específicas.

        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('WooCommerce Error:', res.status, errorText);
            throw new Error(`Error fetching products: ${res.status}`);
        }

        const data = await res.json();
        return data as Product[];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

/**
 * Fetch a single product by ID
 * @param id Product ID
 */
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/products/${id}`;
        console.log(`[WooCommerce] Fetching Product: ${url}`);

        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error('WooCommerce Product Error:', res.status, await res.text());
            return null;
        }

        const data = await res.json();
        return data as Product;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}
/**
 * Fetch all product categories
 */
export async function getCategories() {
    try {
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?per_page=100`;
        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error(await res.text());
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}
