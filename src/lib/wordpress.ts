const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export interface WordPressPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        'author'?: Array<{
            name: string;
        }>;
    };
}

export async function getPosts(limit = 10): Promise<WordPressPost[]> {
    const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=${limit}&_embed`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!response.ok) {
        throw new Error('Failed to fetch posts from WordPress');
    }

    return response.json();
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const response = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch post with slug: ${slug}`);
    }

    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
}
