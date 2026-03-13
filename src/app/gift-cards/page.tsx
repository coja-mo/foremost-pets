'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  Gift, CreditCard, Heart, Mail, Check, ArrowRight,
  PawPrint, Star, Sparkles,
} from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="sf-section">{children}</div>;
}

const DENOMINATIONS = [25, 50, 75, 100, 150, 200];
const CARD_DESIGNS = [
  { id: 'classic', name: 'Classic', gradient: 'linear-gradient(135deg, #1e293b, #334155)' },
  { id: 'amber', name: 'Golden Paw', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [recipientName, setRecipientName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const design = CARD_DESIGNS.find(d => d.id === selectedDesign) || CARD_DESIGNS[0];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '64px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%)',
          }} />
        </div>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-full)', padding: '6px 16px',
            fontSize: 13, fontWeight: 600, color: '#f59e0b', marginBottom: 24,
          }}>
            <Gift size={14} /> Gift Cards
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 900,
            color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16,
          }}>
            The Purrfect Gift
          </h1>
          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
            maxWidth: 480, margin: '0 auto',
          }}>
            Give the gift of premium pet nutrition. Available in any denomination
            and redeemable at both Sault Ste. Marie locations.
          </p>
        </div>
      </section>

      {/* ===== CARD BUILDER ===== */}
      <Section>
        <section style={{ padding: '64px 24px' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
            alignItems: 'flex-start',
          }}>
            {/* Card Preview */}
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{
                background: design.gradient,
                borderRadius: 20,
                padding: '40px 36px',
                minHeight: 260,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                transition: 'all 0.4s ease',
              }}>
                {/* Decorative paw prints */}
                <PawPrint size={120} style={{
                  position: 'absolute', right: -20, bottom: -20,
                  opacity: 0.1, color: 'white',
                }} />
                <PawPrint size={60} style={{
                  position: 'absolute', left: '40%', top: '10%',
                  opacity: 0.06, color: 'white', transform: 'rotate(25deg)',
                }} />

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 32,
                }}>
                  <PawPrint size={22} color="rgba(255,255,255,0.8)" />
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                    color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.02em',
                  }}>FOREMOST PETS</span>
                </div>

                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 900,
                  color: 'white', marginBottom: 8,
                }}>
                  ${selectedAmount}
                </div>

                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  GIFT CARD
                </div>

                {recipientName && (
                  <div style={{
                    position: 'absolute', bottom: 36, left: 36,
                    fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    For: {recipientName}
                  </div>
                )}
              </div>

              {/* Card design selector */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center' }}>
                {CARD_DESIGNS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesign(d.id)}
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: d.gradient,
                      border: selectedDesign === d.id ? '3px solid var(--fp-amber)' : '3px solid transparent',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: selectedDesign === d.id ? '0 0 0 2px white, 0 0 0 4px var(--fp-amber)' : 'none',
                    }}
                    title={d.name}
                  />
                ))}
              </div>
            </div>

            {/* Builder Form */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
                color: 'var(--fp-navy)', marginBottom: 24,
              }}>Customize Your Card</h2>

              {/* Amount */}
              <div style={{ marginBottom: 28 }}>
                <label style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--fp-gray-500)',
                  marginBottom: 10, display: 'block',
                }}>Select Amount</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {DENOMINATIONS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      style={{
                        padding: '16px 12px', borderRadius: 'var(--radius-md)',
                        border: selectedAmount === amt
                          ? '2px solid var(--fp-amber)'
                          : '2px solid var(--fp-gray-200)',
                        background: selectedAmount === amt ? 'var(--fp-amber-glow)' : 'white',
                        cursor: 'pointer',
                        fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)',
                        color: selectedAmount === amt ? 'var(--fp-amber-dark)' : 'var(--fp-navy)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--fp-gray-500)',
                  marginBottom: 6, display: 'block',
                }}>Recipient Name (Optional)</label>
                <input
                  className="fp-input"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  placeholder="e.g. Sarah & Buddy"
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <label style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--fp-gray-500)',
                  marginBottom: 6, display: 'block',
                }}>Personal Message (Optional)</label>
                <textarea
                  className="fp-input"
                  value={senderMessage}
                  onChange={e => setSenderMessage(e.target.value)}
                  placeholder="Wishing you and your furry friend all the best..."
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Purchase */}
              <div style={{
                padding: '24px',
                background: 'var(--fp-gray-50)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--fp-gray-100)',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 16,
                }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)' }}>Total</span>
                  <span style={{
                    fontSize: 28, fontWeight: 900, color: 'var(--fp-navy)',
                    fontFamily: 'var(--font-heading)',
                  }}>${selectedAmount}.00</span>
                </div>

                <button style={{
                  width: '100%', padding: '16px 24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
                  color: 'white', border: 'none', cursor: 'pointer',
                  fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s ease',
                }}>
                  <CreditCard size={18} /> Purchase In-Store
                </button>
                <p style={{
                  fontSize: 12, color: 'var(--fp-gray-400)', textAlign: 'center',
                  marginTop: 10, lineHeight: 1.6,
                }}>
                  Visit either Sault Ste. Marie location to complete your purchase.
                  Gift cards can also be loaded with additional funds anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ===== FEATURES ===== */}
      <Section>
        <section style={{ padding: '64px 24px', background: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
              color: 'var(--fp-navy)', textAlign: 'center', marginBottom: 40,
            }}>Why Foremost Pets Gift Cards?</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { icon: Star, title: 'Earn Rewards', desc: 'Purchasers earn loyalty points. Recipients earn points when they redeem.' },
                { icon: Gift, title: 'Never Expires', desc: 'No expiration dates, no hidden fees. Full value, always.' },
                { icon: Heart, title: 'Reloadable', desc: 'Add funds at any time at either location.' },
              ].map((feat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--fp-amber-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <feat.icon size={24} color="var(--fp-amber-dark)" />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                    color: 'var(--fp-navy)', marginBottom: 6,
                  }}>{feat.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--fp-gray-400)', lineHeight: 1.7 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
