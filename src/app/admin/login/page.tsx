'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForemostStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { PawPrint, Lock, Delete, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
  const { loginWithPin, currentEmployee } = useForemostStore();
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (mounted && currentEmployee) {
      router.replace('/admin');
    }
  }, [mounted, currentEmployee, router]);

  const handlePinEntry = useCallback((digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      // Try login
      setTimeout(() => {
        const employee = loginWithPin(newPin);
        if (employee) {
          setSuccess(true);
          setTimeout(() => router.push('/admin'), 800);
        } else {
          setError('Invalid PIN. Please try again.');
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setPin('');
          }, 600);
        }
      }, 200);
    }
  }, [pin, loginWithPin, router]);

  const handleBackspace = useCallback(() => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handlePinEntry(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePinEntry, handleBackspace]);

  if (!mounted) return null;

  const padButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated background shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite reverse',
        }} />
        {/* Paw prints scattered */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${15 + i * 15}%`,
            left: `${10 + (i % 3) * 30}%`,
            fontSize: 40 + i * 8,
            opacity: 0.03 + i * 0.005,
            transform: `rotate(${-30 + i * 20}deg)`,
          }}>
            <PawPrint size={28} color="var(--fp-amber)" />
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div className="animate-fade-in" style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
          }}>
            <PawPrint size={30} color="white" />
          </div>
          <div>
            <div style={{
              fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-heading)',
              color: 'white', letterSpacing: '-0.02em',
            }}>
              FOREMOST
            </div>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)', marginTop: -2,
            }}>
              PETS
            </div>
          </div>
        </div>

        <p className="animate-fade-in" style={{
          color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 40,
          animationDelay: '100ms',
        }}>
          Employee Portal • Sault Ste. Marie
        </p>

        {/* PIN Card */}
        <div className="animate-scale-in" style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 24, padding: '36px 32px 28px',
          width: 340,
          animation: shake ? 'shake 0.5s ease-in-out' : undefined,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginBottom: 28, fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
          }}>
            <Lock size={16} />
            Enter your PIN
          </div>

          {/* PIN Dots */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 28,
          }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 18, height: 18, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.2)',
                background: i < pin.length
                  ? success ? 'var(--fp-success)' : '#f59e0b'
                  : 'transparent',
                transition: 'all 0.2s ease',
                boxShadow: i < pin.length ? '0 0 12px rgba(245,158,11,0.4)' : 'none',
                transform: i < pin.length ? 'scale(1.1)' : 'scale(1)',
              }} />
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              textAlign: 'center', color: '#ef4444',
              fontSize: 13, fontWeight: 600, marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div style={{
              textAlign: 'center', color: '#22c55e',
              fontSize: 14, fontWeight: 700, marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Shield size={16} /> Welcome in!
            </div>
          )}

          {/* PIN Pad */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}>
            {padButtons.map((btn, i) => {
              if (btn === '') return <div key={i} />;
              if (btn === 'back') {
                return (
                  <button key={i} onClick={handleBackspace} style={{
                    width: '100%', height: 58,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 16, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}>
                    <Delete size={20} />
                  </button>
                );
              }
              return (
                <button key={i} onClick={() => handlePinEntry(btn)} style={{
                  width: '100%', height: 58,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}>
                  {btn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="animate-fade-in" style={{
          color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 20,
          animationDelay: '300ms',
        }}>
          Use keyboard or tap to enter PIN
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        button:hover {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(245,158,11,0.3) !important;
          transform: scale(1.04);
        }
        button:active {
          transform: scale(0.96) !important;
          background: rgba(245,158,11,0.2) !important;
        }
      `}</style>
    </div>
  );
}
