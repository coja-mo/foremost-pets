'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  Heart, Shield, MapPin, Users, Leaf, Sparkles,
  PawPrint, ArrowRight, Star, Truck,
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

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '80px 24px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)',
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
            <Heart size={14} /> Our Story
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 900,
            color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16,
          }}>
            More Than a Pet Store
          </h1>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
            maxWidth: 550, margin: '0 auto',
          }}>
            We&apos;re a family of pet lovers dedicated to bringing the best nutrition
            and supplies to pet parents in Sault Ste. Marie.
          </p>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <Section>
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
          }}>
            <div>
              <span style={{
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12,
              }}>
                <Sparkles size={14} /> Our Mission
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)', lineHeight: 1.2, marginBottom: 16,
              }}>
                Every Pet Deserves the Best
              </h2>
              <p style={{ fontSize: 15, color: 'var(--fp-gray-500)', lineHeight: 1.8, marginBottom: 16 }}>
                At Foremost Pets, we believe that proper nutrition is the foundation
                of a happy, healthy pet. That&apos;s why we carefully curate every product
                on our shelves, working directly with trusted brands like Fromm, GO! Solutions,
                ACANA, and ORIJEN.
              </p>
              <p style={{ fontSize: 15, color: 'var(--fp-gray-500)', lineHeight: 1.8 }}>
                We&apos;re not a big box store. We&apos;re your neighbors — pet owners
                just like you. We take the time to understand your pet&apos;s unique needs
                and help you find the perfect food, treats, and supplies.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, var(--fp-amber-glow), #fef3c7)',
              borderRadius: 'var(--radius-xl)',
              padding: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 360,
            }}>
              <PawPrint size={120} strokeWidth={0.8} color="var(--fp-amber)" style={{ opacity: 0.3 }} />
            </div>
          </div>
        </section>
      </Section>

      {/* ===== VALUES ===== */}
      <Section>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>What Makes Us Different</h2>
              <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
                We&apos;re redefining what a local pet store can be
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                {
                  icon: Shield,
                  title: 'Premium Only',
                  desc: 'We stock only the brands we trust. No fillers, no by-products, no compromise on quality.',
                  color: '#3b82f6',
                },
                {
                  icon: Users,
                  title: 'Expert Guidance',
                  desc: 'Our team is trained in pet nutrition. We help you make informed decisions tailored to your pet.',
                  color: '#10b981',
                },
                {
                  icon: Heart,
                  title: 'Community First',
                  desc: 'Two locations in Sault Ste. Marie, serving pet families across the region with local pride.',
                  color: '#ef4444',
                },
                {
                  icon: Star,
                  title: 'Rewards Program',
                  desc: 'Earn points on every purchase. Unlock exclusive perks, discounts, and seasonal events.',
                  color: '#f59e0b',
                },
                {
                  icon: Leaf,
                  title: 'Sustainable Choices',
                  desc: 'We partner with brands committed to sustainable sourcing and eco-friendly packaging.',
                  color: '#22c55e',
                },
                {
                  icon: Truck,
                  title: 'AutoShip',
                  desc: 'Never run out of your pet\'s essentials. Set up automatic deliveries with bonus points.',
                  color: '#8b5cf6',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--fp-gray-100)',
                  padding: '32px 24px',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--radius-lg)',
                    background: `${item.color}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800,
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

      {/* ===== BRANDS ===== */}
      <Section>
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
              color: 'var(--fp-navy)', marginBottom: 12,
            }}>Trusted Brands We Carry</h2>
            <p style={{ color: 'var(--fp-gray-400)', fontSize: 15, marginBottom: 40 }}>
              We partner with the industry&apos;s best to bring you premium pet nutrition
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16,
            }}>
              {['Fromm', 'GO! Solutions', 'ACANA', 'ORIJEN', 'Stella & Chewy\'s', 'Open Farm', 'Ziwi Peak', 'Nulo'].map(brand => (
                <div key={brand} style={{
                  padding: '14px 28px', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--fp-gray-200)',
                  fontFamily: 'var(--font-heading)', fontWeight: 700,
                  fontSize: 14, color: 'var(--fp-navy)',
                  transition: 'all 0.2s ease',
                }}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== CTA ===== */}
      <Section>
        <section style={{
          padding: '80px 24px', textAlign: 'center',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <PawPrint size={36} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
              color: 'white', marginBottom: 12,
            }}>Come Visit Us</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              We&apos;d love to meet you and your furry, feathery, or scaly friends.
              Stop by either location for expert guidance and premium products.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link href="/our-stores" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white', fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                <MapPin size={16} /> Find a Store
              </Link>
              <Link href="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 'var(--radius-full)',
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'white', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                Browse Shop <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
