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
  PawPrint, ChevronLeft, ChevronRight, Flame,
} from 'lucide-react';
import { useRef } from 'react';

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
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = [category !== 'all' ? 1 : 0, petType !== 'all' ? 1 : 0, brand !== 'all' ? 1 : 0, search ? 1 : 0].reduce((a, b) => a + b, 0);

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

      {/* Sticky Department Sub-Nav */}
      <div style={{
        position: 'sticky', top: 72, zIndex: 40,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--fp-gray-100)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 6,
          overflowX: 'auto', paddingBottom: 0,
          scrollbarWidth: 'none',
        }}>
          {/* Pet type quick filters */}
          {PET_TYPES.map(pt => (
            <button key={pt.id} onClick={() => setPetType(pt.id)} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '12px 16px', whiteSpace: 'nowrap',
              borderBottom: `2px solid ${petType === pt.id ? 'var(--fp-amber)' : 'transparent'}`,
              background: 'transparent', border: 'none',
              borderBottomWidth: 2, borderBottomStyle: 'solid',
              borderBottomColor: petType === pt.id ? 'var(--fp-amber)' : 'transparent',
              cursor: 'pointer', fontSize: 13, fontWeight: petType === pt.id ? 700 : 500,
              color: petType === pt.id ? 'var(--fp-amber-dark)' : 'var(--fp-gray-400)',
              transition: 'all 0.2s ease',
            }}>
              <pt.icon size={14} /> {pt.label}
            </button>
          ))}

          <div style={{ width: 1, height: 24, background: 'var(--fp-gray-200)', margin: '0 4px', flexShrink: 0 }} />

          {/* Category quick filters */}
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              padding: '12px 14px', whiteSpace: 'nowrap',
              background: 'transparent', border: 'none',
              borderBottomWidth: 2, borderBottomStyle: 'solid',
              borderBottomColor: category === cat.id ? 'var(--fp-navy)' : 'transparent',
              cursor: 'pointer', fontSize: 13, fontWeight: category === cat.id ? 700 : 500,
              color: category === cat.id ? 'var(--fp-navy)' : 'var(--fp-gray-400)',
              transition: 'all 0.2s ease',
            }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Best Sellers Carousel */}
      <BestSellersCarousel products={activeProducts} addItem={addItem} />

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '32px 24px',
      }}>

        {/* Floating Filter Button — fixed right side */}
        <div style={{
          position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)',
          zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
        }}>
          <button onClick={() => setFiltersOpen(!filtersOpen)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 'var(--radius-full)',
            border: 'none',
            background: filtersOpen ? 'var(--fp-navy)' : 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
            cursor: 'pointer', fontSize: 13, fontWeight: 700,
            color: filtersOpen ? 'white' : 'var(--fp-navy)',
            transition: 'all 0.2s ease',
          }}>
            <SlidersHorizontal size={14} /> Filters
            {activeFilterCount > 0 && (
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                background: filtersOpen ? 'var(--fp-amber)' : 'var(--fp-amber)',
                color: 'white', fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{activeFilterCount}</span>
            )}
            <ChevronDown size={12} style={{
              transition: 'transform 0.2s ease',
              transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0)',
            }} />
          </button>
          {activeFilterCount > 0 && !filtersOpen && (
            <button onClick={() => { setCategory('all'); setPetType('all'); setBrand('all'); setSearch(''); }} style={{
              padding: '8px 14px', borderRadius: 'var(--radius-full)',
              border: 'none', background: 'white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              cursor: 'pointer', fontSize: 11, fontWeight: 600,
              color: 'var(--fp-gray-400)',
            }}>Clear filters</button>
          )}
        </div>

        {/* Filter Panel — floating dropdown */}
        {filtersOpen && (
          <>
            <div onClick={() => setFiltersOpen(false)} style={{
              position: 'fixed', inset: 0, zIndex: 45,
            }} />
            <div style={{
              position: 'fixed', right: 24, top: 'calc(50% + 28px)',
              width: 360, zIndex: 51,
              background: 'white', borderRadius: 'var(--radius-xl)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
              padding: '20px',
              animation: 'fadeIn 0.2s ease',
              display: 'flex', flexDirection: 'column', gap: 20,
              maxHeight: '60vh', overflowY: 'auto',
            }}>
              {/* Search */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>Search</label>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{
                    position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                    color: 'var(--fp-gray-300)',
                  }} />
                  <input
                    type="text" placeholder="Search products..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="fp-input" style={{ paddingLeft: 32, fontSize: 13 }}
                  />
                </div>
              </div>

              {/* Pet Type */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>Pet Type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {PET_TYPES.map(pt => (
                    <button key={pt.id} onClick={() => setPetType(pt.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '6px 12px', borderRadius: 'var(--radius-full)',
                      border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                      background: petType === pt.id ? 'var(--fp-amber-glow)' : 'var(--fp-gray-50)',
                      color: petType === pt.id ? 'var(--fp-amber-dark)' : 'var(--fp-gray-500)',
                    }}>
                      <pt.icon size={12} /> {pt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                      padding: '6px 12px', borderRadius: 'var(--radius-full)',
                      border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                      background: category === cat.id ? 'var(--fp-amber-glow)' : 'var(--fp-gray-50)',
                      color: category === cat.id ? 'var(--fp-amber-dark)' : 'var(--fp-gray-500)',
                    }}>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>Brand</label>
                <select
                  value={brand} onChange={e => setBrand(e.target.value)}
                  className="fp-input" style={{ width: '100%', fontSize: 13 }}
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <button onClick={() => { setCategory('all'); setPetType('all'); setBrand('all'); setSearch(''); }} style={{
                  padding: '10px', borderRadius: 'var(--radius-md)',
                  border: 'none', background: 'var(--fp-gray-50)',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  color: 'var(--fp-gray-400)', textAlign: 'center',
                }}>Clear all filters</button>
              )}
            </div>
          </>
        )}

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

/* ===== Best Sellers Carousel ===== */
function BestSellersCarousel({ products, addItem }: { products: any[]; addItem: (p: any) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = products.filter(p => p.isFeatured).slice(0, 10);

  if (bestSellers.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '32px 24px 8px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #ef4444, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Flame size={16} color="white" />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
            color: 'var(--fp-navy)',
          }}>Best Sellers</h2>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => scroll('left')} style={{
            width: 32, height: 32, borderRadius: 'var(--radius-full)',
            border: '1px solid var(--fp-gray-200)', background: 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fp-gray-400)', transition: 'all 0.2s ease',
          }}><ChevronLeft size={16} /></button>
          <button onClick={() => scroll('right')} style={{
            width: 32, height: 32, borderRadius: 'var(--radius-full)',
            border: '1px solid var(--fp-gray-200)', background: 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fp-gray-400)', transition: 'all 0.2s ease',
          }}><ChevronRight size={16} /></button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
          background: 'linear-gradient(90deg, var(--fp-bg), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 40,
          background: 'linear-gradient(270deg, var(--fp-bg), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div ref={scrollRef} style={{
          display: 'flex', gap: 16, overflowX: 'auto',
          scrollbarWidth: 'none', padding: '4px 0 12px',
          scrollSnapType: 'x mandatory',
        }}>
          {bestSellers.map(product => (
            <Link key={product.id} href={`/shop/${product.slug}`} style={{
              flexShrink: 0, width: 240, scrollSnapAlign: 'start',
              background: 'white', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--fp-gray-100)',
              overflow: 'hidden', textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}>
              {/* Image placeholder */}
              <div style={{
                height: 140, position: 'relative',
                background: `linear-gradient(135deg, ${
                  product.petType.includes('dog') ? '#fef3c7' : product.petType.includes('cat') ? '#dbeafe' : '#d1fae5'
                }, white)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PawPrint size={28} strokeWidth={1.5} color="var(--fp-gray-200)" />
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  fontSize: 9, fontWeight: 700, padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #ef4444, #f97316)',
                  color: 'white', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 3,
                }}>
                  <Star size={8} fill="white" /> Best Seller
                </span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: 'var(--fp-amber-dark)',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2,
                }}>{product.brand}</div>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                  marginBottom: 8, lineHeight: 1.3,
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any,
                }}>{product.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)',
                    color: 'var(--fp-navy)',
                  }}>${product.price.toFixed(2)}</span>
                  <button onClick={(e) => {
                    e.preventDefault();
                    addItem(product);
                    toast.success(`${product.name} added!`);
                  }} style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-full)',
                    background: 'var(--fp-navy)', color: 'white',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                  }}>
                    <ShoppingBag size={13} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
