'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForemostStore } from '@/lib/store';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  Repeat, Truck, Percent, Clock, ShieldCheck, PawPrint, ArrowRight,
  CheckCircle2, Package, CreditCard, CalendarCheck, Star, Zap,
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

export default function AutoShipPage() {
  const { products } = useForemostStore();
  const eligibleProducts = products.filter(p => p.isAutoShipEligible && p.isActive).slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
        padding: '72px 24px 88px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          background: 'radial-gradient(circle at 30% 40%, var(--fp-amber) 0%, transparent 50%), radial-gradient(circle at 70% 60%, var(--fp-amber) 0%, transparent 50%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 'var(--radius-full)',
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)',
            marginBottom: 24,
          }}>
            <Repeat size={14} color="var(--fp-amber)" />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fp-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AutoShip & Save
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 900,
            color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            Never Run Out of{' '}
            <span style={{ color: 'var(--fp-amber)' }}>Pet Essentials</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: 16, marginTop: 16,
            lineHeight: 1.7, maxWidth: 560, margin: '16px auto 0',
          }}>
            Set it and forget it. Schedule automatic deliveries of your pet&apos;s favourite food, 
            treats, and supplies — and save 10% on every order.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-amber)', color: 'white',
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              Start AutoShip <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Section>
        <section style={{ padding: '72px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>How AutoShip Works</h2>
              <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
                Three simple steps to automatic savings
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                {
                  step: '01', icon: Package, title: 'Choose Products',
                  desc: 'Add AutoShip-eligible products to your subscription. Choose from food, treats, supplements, and supplies.',
                },
                {
                  step: '02', icon: CalendarCheck, title: 'Set Your Schedule',
                  desc: 'Pick a delivery frequency that works — every 2, 4, 6, or 8 weeks. Adjust anytime.',
                },
                {
                  step: '03', icon: Truck, title: 'We Deliver',
                  desc: 'Your order is prepared and ready for in-store pickup on schedule. Skip, pause, or cancel anytime.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '36px 28px',
                  background: 'white', borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--fp-gray-100)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--fp-amber)', color: 'white',
                    fontSize: 12, fontWeight: 800, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                  }}>{item.step}</div>
                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                    background: 'var(--fp-amber-glow)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '12px auto 16px',
                  }}>
                    <item.icon size={24} color="var(--fp-amber-dark)" />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700,
                    color: 'var(--fp-navy)', marginBottom: 8,
                  }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--fp-gray-400)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Benefits */}
      <Section>
        <section style={{ padding: '64px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
              color: 'var(--fp-navy)', textAlign: 'center', marginBottom: 48,
            }}>AutoShip Benefits</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {[
                { icon: Percent, title: 'Save 10% Every Order', desc: 'Automatic discount applied to every AutoShip delivery — no coupon needed.', color: 'var(--fp-success)' },
                { icon: Repeat, title: 'Flexible Scheduling', desc: 'Every 2 to 8 weeks. Skip, pause, or cancel your subscriptions anytime.', color: 'var(--fp-info)' },
                { icon: Star, title: '2x Loyalty Points', desc: 'Earn double Paw Rewards points on every AutoShip order.', color: 'var(--fp-amber)' },
                { icon: ShieldCheck, title: 'Never Run Out', desc: 'Guaranteed stock reserved for AutoShip members. Your pet never misses a meal.', color: '#8b5cf6' },
                { icon: CreditCard, title: 'Pay In Store', desc: 'Pick up and pay at the register — no credit card stored online required.', color: 'var(--fp-navy)' },
                { icon: Zap, title: 'Priority Preparation', desc: 'AutoShip orders are prepared first, ready for pickup when you arrive.', color: 'var(--fp-amber-dark)' },
              ].map((benefit, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, padding: '24px',
                  background: 'var(--fp-gray-50)', borderRadius: 'var(--radius-lg)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                    background: `${benefit.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <benefit.icon size={20} color={benefit.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 4 }}>
                      {benefit.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--fp-gray-400)', lineHeight: 1.6 }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* Eligible Products */}
      {eligibleProducts.length > 0 && (
        <Section>
          <section style={{ padding: '64px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
                  color: 'var(--fp-navy)',
                }}>AutoShip Eligible Products</h2>
                <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 14 }}>
                  Start saving on these popular items
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {eligibleProducts.map(product => (
                  <Link key={product.id} href={`/shop/${product.slug}`} style={{
                    background: 'white', borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--fp-gray-100)', padding: '24px',
                    textDecoration: 'none', display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }} className="sf-product-card">
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      marginBottom: 12,
                    }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--fp-success-light)', color: 'var(--fp-success)',
                        textTransform: 'uppercase',
                      }}>AutoShip</span>
                      <div style={{
                        fontSize: 12, fontWeight: 700, color: 'var(--fp-success)',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <Percent size={12} /> Save 10%
                      </div>
                    </div>
                    <h3 style={{
                      fontSize: 15, fontWeight: 700, color: 'var(--fp-navy)',
                      marginBottom: 4, lineHeight: 1.3,
                    }}>{product.name}</h3>
                    <span style={{ fontSize: 12, color: 'var(--fp-gray-400)', marginBottom: 12 }}>
                      {product.brand}
                    </span>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)',
                        color: 'var(--fp-navy)',
                      }}>${(product.price * 0.9).toFixed(2)}</span>
                      <span style={{
                        fontSize: 13, color: 'var(--fp-gray-300)',
                        textDecoration: 'line-through',
                      }}>${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <Link href="/shop" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 'var(--radius-full)',
                  background: 'var(--fp-navy)', color: 'white',
                  fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                  View All Eligible Products <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <section style={{
          padding: '64px 24px',
          background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <PawPrint size={40} color="rgba(255,255,255,0.3)" style={{ marginBottom: 16 }} />
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 900,
              color: 'white', marginBottom: 12,
            }}>Ready to Save?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, marginBottom: 28 }}>
              Join thousands of pet parents who save time and money with AutoShip.
            </p>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 36px', borderRadius: 'var(--radius-full)',
              background: 'white', color: 'var(--fp-amber-dark)',
              fontSize: 15, fontWeight: 800, textDecoration: 'none',
            }}>
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
