'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useForemostStore } from '@/lib/store';
import { BRANDS } from '@/lib/store-config';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import { useCart } from '@/components/CartContext';
import toast from 'react-hot-toast';
import {
  Search, Filter, Grid3x3, List, ChevronDown, SlidersHorizontal,
  Dog, Cat, Fish, Package, Star, ArrowUpDown, ShoppingBag,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'dry-food', label: 'Dry Food' },
  { id: 'wet-food', label: 'Wet Food' },
  { id: 'treats', label: 'Treats' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'toys', label: 'Toys' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'grooming', label: 'Grooming' },
  { id: 'bowls-feeders', label: 'Bowls & Feeders' },
  { id: 'beds-furniture', label: 'Beds & Furniture' },
];

const PET_TYPES = [
  { id: 'all', label: 'All Pets', icon: Package },
  { id: 'dog', label: 'Dogs', icon: Dog },
  { id: 'cat', label: 'Cats', icon: Cat },
  { id: 'fish', label: 'Fish', icon: Fish },
];

export default function ShopPage() {
  const { products } = useForemostStore();
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [petType, setPetType] = useState('all');
  const [brand, setBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeProducts = products.filter(p => p.isActive);
  const availableBrands = useMemo(() => {
    const brands = [...new Set(activeProducts.map(p => p.brand))].sort();
    return brands;
  }, [activeProducts]);

  const filtered = useMemo(() => {
    let result = activeProducts;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (petType !== 'all') result = result.filter(p => p.petType.includes(petType as any));
    if (brand !== 'all') result = result.filter(p => p.brand === brand);

    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'name': result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'featured': result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
    }
    return result;
  }, [activeProducts, search, category, petType, brand, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        padding: '48px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 900,
            color: 'white', letterSpacing: '-0.02em',
          }}>Shop All Products</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 4, fontSize: 15 }}>
            {activeProducts.length} products from {availableBrands.length} trusted brands
          </p>
        </div>
      </section>

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '32px 24px',
        display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32,
      }}>
        {/* Sidebar Filters */}
        <aside>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--fp-gray-100)',
            padding: '24px 20px',
            position: 'sticky', top: 100,
          }}>
            <h3 style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 15, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 20,
            }}>
              <SlidersHorizontal size={16} /> Filters
            </h3>

            {/* Search */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--fp-gray-300)',
                }} />
                <input
                  type="text" placeholder="Search products..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="fp-input" style={{ paddingLeft: 36 }}
                />
              </div>
            </div>

            {/* Pet Type */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>Pet Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {PET_TYPES.map(pt => (
                  <button key={pt.id} onClick={() => setPetType(pt.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    textAlign: 'left',
                    background: petType === pt.id ? 'var(--fp-amber-glow)' : 'transparent',
                    color: petType === pt.id ? 'var(--fp-amber-dark)' : 'var(--fp-gray-500)',
                  }}>
                    <pt.icon size={14} /> {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>Category</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                    padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    textAlign: 'left',
                    background: category === cat.id ? 'var(--fp-amber-glow)' : 'transparent',
                    color: category === cat.id ? 'var(--fp-amber-dark)' : 'var(--fp-gray-500)',
                  }}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>Brand</label>
              <select
                value={brand} onChange={e => setBrand(e.target.value)}
                className="fp-input" style={{ width: '100%' }}
              >
                <option value="all">All Brands</option>
                {availableBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          {/* Sort / View controls */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 14, color: 'var(--fp-gray-400)' }}>
              <strong style={{ color: 'var(--fp-navy)' }}>{filtered.length}</strong> products found
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <select
                value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="fp-input" style={{ width: 'auto', fontSize: 13 }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => setViewMode('grid')} style={{
                  padding: 8, borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--fp-gray-200)',
                  background: viewMode === 'grid' ? 'var(--fp-navy)' : 'white',
                  color: viewMode === 'grid' ? 'white' : 'var(--fp-gray-400)',
                  cursor: 'pointer',
                }}>
                  <Grid3x3 size={16} />
                </button>
                <button onClick={() => setViewMode('list')} style={{
                  padding: 8, borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--fp-gray-200)',
                  background: viewMode === 'list' ? 'var(--fp-navy)' : 'white',
                  color: viewMode === 'list' ? 'white' : 'var(--fp-gray-400)',
                  cursor: 'pointer',
                }}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
            gap: viewMode === 'grid' ? 20 : 12,
          }}>
            {filtered.map(product => (
              <Link key={product.id} href={`/shop/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  background: 'white', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--fp-gray-100)',
                  overflow: 'hidden',
                  display: viewMode === 'list' ? 'flex' : 'block',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    height: viewMode === 'grid' ? 180 : 120,
                    width: viewMode === 'list' ? 160 : '100%',
                    minWidth: viewMode === 'list' ? 160 : undefined,
                    background: `linear-gradient(135deg, ${product.petType.includes('dog') ? '#fef3c7' : product.petType.includes('cat') ? '#dbeafe' : '#d1fae5'}, white)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{ opacity: 0.2 }}>
                      {product.petType.includes('dog') ? <Dog size={viewMode === 'grid' ? 48 : 32} strokeWidth={1} color="var(--fp-navy)" /> : product.petType.includes('cat') ? <Cat size={viewMode === 'grid' ? 48 : 32} strokeWidth={1} color="var(--fp-navy)" /> : <Fish size={viewMode === 'grid' ? 48 : 32} strokeWidth={1} color="var(--fp-navy)" />}
                    </div>
                    {product.isFeatured && (
                      <div style={{
                        position: 'absolute', top: 8, left: 8,
                        background: 'var(--fp-amber)', color: 'white',
                        fontSize: 10, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}><Star size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} /> Featured</div>
                    )}
                  </div>
                  <div style={{ padding: '14px 16px 18px', flex: 1 }}>
                    <div style={{
                      fontSize: 11, fontWeight: 600, color: 'var(--fp-amber-dark)',
                      textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4,
                    }}>{product.brand}</div>
                    <h3 style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                      marginBottom: 6, lineHeight: 1.3,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{product.name}</h3>
                    {viewMode === 'list' && (
                      <p style={{
                        fontSize: 13, color: 'var(--fp-gray-400)', marginBottom: 8,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        lineHeight: 1.5,
                      }}>{product.description}</p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{
                        fontSize: 20, fontWeight: 800, color: 'var(--fp-navy)',
                        fontFamily: 'var(--font-heading)',
                      }}>${product.price.toFixed(2)}</span>
                      {product.weight && (
                        <span style={{ fontSize: 12, color: 'var(--fp-gray-300)' }}>/ {product.weight}</span>
                      )}
                    </div>
                    <div style={{
                      display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap',
                    }}>
                      {product.petType.map(pt => (
                        <span key={pt} style={{
                          fontSize: 10, fontWeight: 600, color: 'var(--fp-gray-400)',
                          background: 'var(--fp-gray-50)', padding: '3px 8px',
                          borderRadius: 'var(--radius-full)', textTransform: 'capitalize',
                        }}>
                          {pt}
                        </span>
                      ))}
                      <span style={{
                        fontSize: 10, fontWeight: 600, color: 'var(--fp-gray-400)',
                        background: 'var(--fp-gray-50)', padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        {product.inventory.status === 'in-stock' ? '✓ In Stock' : product.inventory.status === 'low-stock' ? '⚠ Low Stock' : '✗ Out of Stock'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (product.inventory.status !== 'out-of-stock') {
                          addItem(product);
                          toast.success(`Added ${product.name} to cart`);
                        }
                      }}
                      disabled={product.inventory.status === 'out-of-stock'}
                      style={{
                        width: '100%', marginTop: 10, padding: '10px 0',
                        borderRadius: 'var(--radius-md)',
                        border: 'none', cursor: product.inventory.status === 'out-of-stock' ? 'not-allowed' : 'pointer',
                        background: product.inventory.status === 'out-of-stock' ? 'var(--fp-gray-100)' : 'var(--fp-navy)',
                        color: product.inventory.status === 'out-of-stock' ? 'var(--fp-gray-400)' : 'white',
                        fontSize: 12, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        transition: 'all 0.2s ease',
                        opacity: product.inventory.status === 'out-of-stock' ? 0.6 : 1,
                      }}
                    >
                      <ShoppingBag size={13} />
                      {product.inventory.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center', padding: 80,
              color: 'var(--fp-gray-400)', fontSize: 15,
            }}>
              <Package size={40} style={{ opacity: 0.3, marginBottom: 16 }} />
              <p>No products found matching your filters.</p>
              <button onClick={() => { setSearch(''); setCategory('all'); setPetType('all'); setBrand('all'); }}
                style={{
                  marginTop: 12, padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--fp-gray-200)',
                  background: 'white', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)',
                }}
              >Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      <StorefrontFooter />
    </div>
  );
}
