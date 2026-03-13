'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';
import { useForemostStore } from '@/lib/store';
import {
  PawPrint, Menu, X, MapPin, Phone, Clock,
  ShoppingBag, Search, ArrowRight,
} from 'lucide-react';

export default function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const { products } = useForemostStore();
  const searchRef = useRef<HTMLInputElement>(null);

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
  }, [pathname]);

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

  return (
    <>
      {/* Top bar */}
      <div style={{
        background: 'var(--fp-navy)',
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
        padding: '8px 0',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={13} /> Sault Ste. Marie, ON
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Phone size={13} /> (705) 759-1234
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} />
            <span>Mon–Sat 9am–6pm • Sun 11am–4pm</span>
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
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
