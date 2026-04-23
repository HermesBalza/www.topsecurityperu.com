'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import styles from './CategorySidebar.module.css';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent: number;
    count: number;
}

interface CategorySidebarProps {
    categories: Category[];
    currentCategoryId?: string;
}

export default function CategorySidebar({ categories, currentCategoryId }: CategorySidebarProps) {
    // Organize categories into a tree
    const rootCategories = categories.filter(cat => cat.parent === 0 && cat.slug !== 'uncategorized');
    
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>Categorías</h2>
            <ul className={styles.categoryList}>
                {rootCategories.map(category => (
                    <CategoryItem 
                        key={category.id} 
                        category={category} 
                        allCategories={categories}
                        currentCategoryId={currentCategoryId}
                    />
                ))}
            </ul>
        </aside>
    );
}

function CategoryItem({ category, allCategories, currentCategoryId }: { 
    category: Category; 
    allCategories: Category[];
    currentCategoryId?: string;
}) {
    const subcategories = allCategories.filter(cat => cat.parent === category.id);
    const hasSubcategories = subcategories.length > 0;
    
    // Auto-expand if a subcategory is active
    const isChildActive = subcategories.some(sub => String(sub.id) === currentCategoryId);
    const [isOpen, setIsOpen] = useState(isChildActive);

    const isActive = String(category.id) === currentCategoryId;

    return (
        <li className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
                <Link 
                    href={`/tienda?category=${category.id}`} 
                    className={`${styles.catLink} ${isActive ? styles.active : ''}`}
                >
                    <span className={styles.catName}>{category.name}</span>
                    <span className={styles.count}>({category.count})</span>
                </Link>
                
                {hasSubcategories && (
                    <button 
                        className={`${styles.toggleBtn} ${isOpen ? styles.open : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                        aria-label="Ver subcategorías"
                    >
                        <FaChevronRight size={10} />
                    </button>
                )}
            </div>

            {hasSubcategories && (
                <ul className={`${styles.subList} ${isOpen ? styles.open : ''}`}>
                    {subcategories.map(sub => (
                        <li key={sub.id} className={styles.subItem}>
                            <Link 
                                href={`/tienda?category=${sub.id}`} 
                                className={`${styles.subLink} ${String(sub.id) === currentCategoryId ? styles.active : ''}`}
                            >
                                <span className={styles.subName}>{sub.name}</span>
                                <span className={styles.count}>({sub.count})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
