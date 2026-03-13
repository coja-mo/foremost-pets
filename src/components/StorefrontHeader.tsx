'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';
import { useStoreLocation } from './StoreLocationContext';
import { useForemostStore } from '@/lib/store';
import {
  PawPrint, Menu, X, MapPin, Phone, Clock,
  ShoppingBag, Search, ArrowRight, ChevronDown, CheckCircle2,
} from 'lucide-react';

export default function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { currentStore, allStores, setStoreById, isOpen, todayHours } = useStoreLocation();
  const { products } = useForemostStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/our-stores', label: 'Our Stores' },
    { href: '/loyalty', label: 'Paw Rewards' },
    { href: '/gift-cards', label: 'Gift Cards' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setMenuOpen(false);
    setPickerOpen(false);
  }, [pathname]);

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const searchResults = searchQuery.length >= 2
    ? products
        .filter(p => p.isActive)
        .filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const storeOpen = isOpen();
  const hours = todayHours();

  return (
    <>
      {/* Top bar — Store Location Picker */}
      <div className="storefront-topbar" style={{
        background: 'var(--fp-navy)',
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
        padding: '8px 0',
        position: 'relative', zIndex: 51,
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {/* Left: Store Picker */}
          <div ref={pickerRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)',
                cursor: 'pointer', padding: '4px 8px', borderRadius: 'var(--radius-md)',
                transition: 'background 0.2s ease', fontSize: 13, fontWeight: 600,
              }}
            >
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: storeOpen ? 'var(--fp-success)' : 'var(--fp-error)',
                boxShadow: storeOpen ? '0 0 6px rgba(16,185,129,0.5)' : '0 0 6px rgba(239,68,68,0.5)',
              }} />
              <MapPin size={13} />
              {currentStore.shortName}
              <ChevronDown size={12} style={{
                transition: 'transform 0.2s ease',
                transform: pickerOpen ? 'rotate(180deg)' : 'rotate(0)',
              }} />
            </button>

            {/* Dropdown */}
            {pickerOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                background: 'white', borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                minWidth: 340, zIndex: 100,
                overflow: 'hidden',
                animation: 'fadeIn 0.15s ease',
              }}>
                <div style={{
                  padding: '14px 16px 10px',
                  borderBottom: '1px solid var(--fp-gray-100)',
                  fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Choose Your Store</div>
                {allStores.map(store => {
                  const isSelected = store.id === currentStore.id;
                  return (
                    <button
                      key={store.id}
                      onClick={() => { setStoreById(store.id); setPickerOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        width: '100%', padding: '14px 16px',
                        background: isSelected ? 'var(--fp-amber-glow)' : 'transparent',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        borderBottom: '1px solid var(--fp-gray-50)',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--fp-amber)' : 'var(--fp-gray-100)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: 2,
                      }}>
                        <MapPin size={16} color={isSelected ? 'white' : 'var(--fp-gray-400)'} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          {store.shortName}
                          {isSelected && <CheckCircle2 size={14} color="var(--fp-amber-dark)" />}
                          {store.isPrimary && (
                            <span style={{
                              fontSize: 9, fontWeight: 800, color: 'var(--fp-amber-dark)',
                              background: 'var(--fp-amber-glow)', padding: '2px 6px',
                              borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                            }}>MAIN</span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-400)', marginTop: 2 }}>
                          {store.address.street}, {store.address.city}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-300)', marginTop: 1 }}>
                          {store.phone}
                        </div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                          {store.features.map(f => (
                            <span key={f} style={{
                              fontSize: 10, fontWeight: 600, padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--fp-gray-50)', color: 'var(--fp-gray-400)',
                            }}>{f}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Center: Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Phone size={13} />
            <span>{currentStore.phone}</span>
          </div>

          {/* Right: Hours + Open/Closed */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={13} />
            <span>
              {hours.isClosed ? 'Closed Today' : `${hours.open.replace(':00', 'am').replace(':00', '')}–${hours.close.replace(':00', 'pm').replace(':00', '')}`}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700,
              padding: '2px 8px', borderRadius: 'var(--radius-full)',
              background: storeOpen ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
              color: storeOpen ? '#10b981' : '#ef4444',
            }}>
              {storeOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--fp-gray-100)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 72,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)',
            }}>
              <PawPrint size={24} color="white" />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontWeight: 800,
                fontSize: 20, color: 'var(--fp-navy)', lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}>FOREMOST</div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontWeight: 400,
                fontSize: 10, color: 'var(--fp-gray-400)',
                letterSpacing: '0.2em',
              }}>PETS</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="storefront-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} style={{
                  padding: '10px 18px', borderRadius: 'var(--radius-full)',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--fp-amber-dark)' : 'var(--fp-navy)',
                  background: isActive ? 'var(--fp-amber-glow)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                width: 40, height: 40, borderRadius: 'var(--radius-full)',
                border: '1px solid var(--fp-gray-200)', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--fp-gray-400)',
                transition: 'all 0.2s ease',
              }}
              title="Search (⌘K)"
            >
              <Search size={16} />
            </button>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              style={{
                width: 40, height: 40, borderRadius: 'var(--radius-full)',
                border: '1px solid var(--fp-gray-200)', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--fp-gray-400)',
                position: 'relative', transition: 'all 0.2s ease',
              }}
            >
              <ShoppingBag size={16} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--fp-amber)',
                  color: 'white', fontSize: 10, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  border: '2px solid white',
                }}>
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Staff Portal */}
            <Link href="/admin" style={{
              padding: '10px 22px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-navy)', color: 'white',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              Staff Portal
            </Link>

            {/* Mobile menu button */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', color: 'var(--fp-navy)', padding: 4,
            }} className="storefront-mobile-menu-btn">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div style={{
            padding: '12px 24px 20px', borderTop: '1px solid var(--fp-gray-100)',
            display: 'flex', flexDirection: 'column', gap: 4,
          }} className="storefront-mobile-nav">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                fontSize: 15, fontWeight: 500, color: 'var(--fp-navy)',
                textDecoration: 'none',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ===== Search Overlay ===== */}
      {searchOpen && (
        <>
          <div onClick={() => setSearchOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)', zIndex: 300,
          }} />
          <div className="animate-scale-in" style={{
            position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)',
            width: 560, maxWidth: '92vw', zIndex: 301,
            background: 'white', borderRadius: 'var(--radius-xl)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}>
            {/* Search input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px', borderBottom: '1px solid var(--fp-gray-100)',
            }}>
              <Search size={18} color="var(--fp-gray-400)" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 16, fontWeight: 500, color: 'var(--fp-navy)',
                  background: 'transparent',
                }}
              />
              <kbd style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 6,
                background: 'var(--fp-gray-100)', color: 'var(--fp-gray-400)',
                fontFamily: 'monospace',
              }}>ESC</kbd>
            </div>

            {/* Results */}
            {searchQuery.length >= 2 && (
              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {searchResults.length === 0 ? (
                  <div style={{
                    padding: 32, textAlign: 'center',
                    color: 'var(--fp-gray-400)', fontSize: 14,
                  }}>
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  searchResults.map(product => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 20px', textDecoration: 'none',
                        borderBottom: '1px solid var(--fp-gray-50)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: 'var(--radius-md)',
                        background: 'var(--fp-gray-50)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <PawPrint size={16} strokeWidth={1.5} color="var(--fp-gray-300)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)',
                          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                        }}>{product.name}</div>
                        <div style={{
                          fontSize: 12, color: 'var(--fp-gray-400)', marginTop: 1,
                        }}>{product.brand} • {product.category.replace(/-/g, ' ')}</div>
                      </div>
                      <div style={{
                        fontSize: 15, fontWeight: 800, color: 'var(--fp-navy)',
                        fontFamily: 'var(--font-heading)', flexShrink: 0,
                      }}>${product.price.toFixed(2)}</div>
                    </Link>
                  ))
                )}

                {searchResults.length > 0 && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 8, padding: '14px 20px', color: 'var(--fp-amber-dark)',
                      fontSize: 13, fontWeight: 600, textDecoration: 'none',
                      borderTop: '1px solid var(--fp-gray-100)',
                    }}
                  >
                    View all results <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            )}

            {searchQuery.length < 2 && (
              <div style={{
                padding: '20px', display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--fp-gray-400)',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4,
                }}>Popular</div>
                {['Fromm', 'GO! Solutions', 'Treats', 'Dry Food', 'Toys'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    style={{
                      padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                      border: 'none', background: 'var(--fp-gray-50)',
                      cursor: 'pointer', fontSize: 13, fontWeight: 500,
                      color: 'var(--fp-gray-500)', textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
