'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Gift, Sparkles, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('fp-promo-dismissed');
    if (!wasDismissed) {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('fp-promo-dismissed', 'true');
  };

  if (dismissed || !visible) return null;

  return (
    <div className="animate-fade-in" style={{
      background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 3s ease infinite',
      padding: '10px 24px',
      position: 'relative', zIndex: 49,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <Sparkles size={14} color="white" />
        <span style={{
          fontSize: 13, fontWeight: 700, color: 'white',
          letterSpacing: '0.02em',
        }}>
          Join Paw Rewards — Earn 10 points per $1 spent!
        </span>
        <Link href="/loyalty" style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 14px', borderRadius: 'var(--radius-full)',
          background: 'rgba(255,255,255,0.25)', color: 'white',
          fontSize: 12, fontWeight: 700, textDecoration: 'none',
          backdropFilter: 'blur(4px)',
        }}>
          Learn More <ArrowRight size={12} />
        </Link>
        <button onClick={handleDismiss} style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)', padding: 4,
        }}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
