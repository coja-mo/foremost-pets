'use client';

import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('fp-cookies-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('fp-cookies-accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, right: 24,
      maxWidth: 480, zIndex: 60,
      background: 'white', borderRadius: 'var(--radius-xl)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
      padding: '20px 24px',
      animation: 'fadeIn 0.3s ease',
      display: 'flex', gap: 14, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-md)',
        background: 'var(--fp-amber-glow)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Shield size={18} color="var(--fp-amber-dark)" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 4 }}>
          We use cookies 🍪
        </div>
        <p style={{ fontSize: 12, color: 'var(--fp-gray-400)', lineHeight: 1.6, marginBottom: 12 }}>
          We use cookies to improve your experience and remember your preferences, like your selected store location.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={accept} style={{
            padding: '8px 20px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-navy)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 700,
          }}>Accept All</button>
          <button onClick={accept} style={{
            padding: '8px 20px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-gray-50)', color: 'var(--fp-gray-500)',
            border: '1px solid var(--fp-gray-200)',
            cursor: 'pointer', fontSize: 12, fontWeight: 600,
          }}>Essential Only</button>
        </div>
      </div>
      <button onClick={accept} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--fp-gray-300)', padding: 2,
      }}><X size={16} /></button>
    </div>
  );
}
