'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PawPrint, Menu, X, MapPin, Phone, Clock } from 'lucide-react';

export default function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/our-stores', label: 'Our Stores' },
    { href: '/loyalty', label: 'Paw Rewards' },
  ];

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

          {/* CTA + Mobile menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/admin" style={{
              padding: '10px 22px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-navy)', color: 'white',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              Staff Portal
            </Link>
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
    </>
  );
}
