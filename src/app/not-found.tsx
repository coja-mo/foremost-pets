'use client';

import React from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import { PawPrint, Home, ShoppingBag, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      <section style={{
        padding: '80px 24px 120px',
        textAlign: 'center',
        maxWidth: 600, margin: '0 auto',
      }}>
        {/* Animated paw prints */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16,
          marginBottom: 32, opacity: 0.12,
        }}>
          {[0, 1, 2].map(i => (
            <PawPrint key={i} size={40} style={{
              transform: `rotate(${-20 + i * 20}deg)`,
              animation: `fadeIn 0.4s ease ${i * 0.15}s both`,
            }} />
          ))}
        </div>

        {/* 404 number */}
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: 120, fontWeight: 900,
          background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: 1, marginBottom: 16,
        }}>
          404
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
          color: 'var(--fp-navy)', marginBottom: 12,
        }}>
          Oops! This page has wandered off
        </h1>
        <p style={{
          fontSize: 15, color: 'var(--fp-gray-400)', lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Looks like this page got distracted by a squirrel. Don&apos;t worry though — 
          let&apos;s get you back on track!
        </p>

        {/* Action buttons */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          maxWidth: 360, margin: '0 auto',
        }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-navy)', color: 'white',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/shop" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-amber-glow)', color: 'var(--fp-amber-dark)',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            border: '2px solid var(--fp-amber)',
            transition: 'transform 0.2s ease',
          }}>
            <ShoppingBag size={16} /> Browse the Shop
          </Link>
        </div>

        {/* Fun suggestion */}
        <div style={{
          marginTop: 48, padding: '20px 24px',
          background: 'white', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--fp-gray-100)',
        }}>
          <p style={{
            fontSize: 13, color: 'var(--fp-gray-400)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Search size={14} /> Try searching for what you need with
            <kbd style={{
              padding: '2px 6px', borderRadius: 4,
              background: 'var(--fp-gray-50)', border: '1px solid var(--fp-gray-200)',
              fontSize: 11, fontWeight: 700, fontFamily: 'monospace',
            }}>⌘K</kbd>
          </p>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
