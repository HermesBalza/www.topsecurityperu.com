'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './PageLoader.module.css';

export default function PageLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Hides the loader when the route changes
        setIsLoading(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a');

            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                !anchor.href.includes('#') &&
                anchor.target !== '_blank' &&
                anchor.href !== window.location.href
            ) {
                setIsLoading(true);
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.logoWrapper}>
                <Image 
                    src="/images/brand/Isotipo.png" 
                    alt="Cargando..." 
                    width={100} 
                    height={100}
                    className={styles.logo}
                    priority
                />
            </div>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}></div>
            </div>
        </div>
    );
}
