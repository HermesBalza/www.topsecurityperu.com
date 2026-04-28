'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './SearchBar.module.css';
import { searchProductsAction } from '@/app/actions';

interface PredictedProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    image: string;
    category: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PredictedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce timer
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (query.length >= 3) {
            setIsLoading(true);
            setIsOpen(true);

            if (timerRef.current) clearTimeout(timerRef.current);

            timerRef.current = setTimeout(async () => {
                const data = await searchProductsAction(query);
                setResults(data);
                setIsLoading(false);
            }, 500);
        } else {
            setResults([]);
            setIsLoading(false);
            if (query.length === 0) setIsOpen(false);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [query]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/tienda?search=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className={styles.searchContainer} ref={containerRef}>
            <form className={styles.searchBar} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 3 && setIsOpen(true)}
                />
                
                {query && (
                    <button 
                        type="button" 
                        className={styles.searchBtn} 
                        onClick={() => setQuery('')}
                        style={{ padding: '0 0.5rem', fontSize: '0.9rem', color: '#999' }}
                    >
                        <FaTimes />
                    </button>
                )}

                <button type="submit" className={styles.searchBtn} aria-label="Buscar">
                    <FaSearch />
                </button>
            </form>

            {/* Dropdown Results */}
            {isOpen && (query.length >= 3) && (
                <div className={styles.resultsDropdown}>
                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.loader}></div>
                            <p>Buscando...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/producto/${product.slug}`}
                                    className={styles.resultItem}
                                    onClick={handleResultClick}
                                >
                                    <div className={styles.resultImage}>
                                        {product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={50}
                                                height={50}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.resultInfo}>
                                        <span className={styles.resultCategory}>{product.category}</span>
                                        <h4 className={styles.resultName}>{product.name}</h4>
                                        <span className={styles.resultPrice}>S/ {parseFloat(product.price).toFixed(2)}</span>
                                    </div>
                                </Link>
                            ))}
                            <Link 
                                href={`/tienda?search=${encodeURIComponent(query)}`}
                                className={styles.viewAll}
                                onClick={handleResultClick}
                            >
                                VER TODOS LOS RESULTADOS
                            </Link>
                        </>
                    ) : (
                        <div className={styles.noResults}>
                            No se encontraron productos para "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
