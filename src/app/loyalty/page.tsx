'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { LOYALTY_CONFIG } from '@/lib/store-config';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  PawPrint, Medal, Crown, Gem, Heart, Star, Check,
  ShieldCheck, Gift, Repeat, Zap, Sparkles, ArrowRight, ChevronRight,
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

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`sf-section ${className}`}>{children}</div>;
}

const TIER_ICONS: Record<string, React.ElementType> = {
  paw: PawPrint, silver: Medal, gold: Crown, diamond: Gem,
};

export default function PawRewardsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '80px 24px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative icons */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[...Array(5)].map((_, i) => (
            <PawPrint key={i} size={24 + i * 6} style={{
              position: 'absolute',
              top: `${10 + i * 18}%`,
              left: `${5 + i * 20}%`,
              opacity: 0.04, color: 'white',
              transform: `rotate(${-30 + i * 20}deg)`,
            }} />
          ))}
          <div style={{
            position: 'absolute', top: '-20%', right: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%)',
          }} />
        </div>

        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-full)', padding: '6px 16px',
            fontSize: 13, fontWeight: 600, color: '#f59e0b',
            marginBottom: 24,
          }}>
            <Heart size={14} /> Loyalty Program
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 900,
            color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            Paw Rewards
          </h1>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, maxWidth: 520, margin: '0 auto 32px',
          }}>
            Earn points on every purchase and unlock exclusive perks.
            The more you shop, the more you save — it&apos;s that simple.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
            {[
              { value: `${LOYALTY_CONFIG.pointsPerDollar}pts`, label: 'per $1 spent' },
              { value: '4', label: 'reward tiers' },
              { value: 'Free', label: 'to join' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <Section>
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
              }}>
                <Zap size={14} /> Simple & Rewarding
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>How It Works</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
              {[
                {
                  step: '01',
                  icon: ShieldCheck,
                  title: 'Sign Up Free',
                  desc: 'Join at either store location — it only takes 30 seconds. No card needed, just your name and phone number.',
                },
                {
                  step: '02',
                  icon: Star,
                  title: 'Earn Points',
                  desc: `Earn ${LOYALTY_CONFIG.pointsPerDollar} points for every $1 you spend. Points multiply as your tier increases — up to 3x at Diamond level.`,
                },
                {
                  step: '03',
                  icon: Gift,
                  title: 'Redeem & Save',
                  desc: 'Use your points for discounts, free products, grooming sessions, and exclusive member events.',
                },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'var(--fp-amber-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    position: 'relative',
                  }}>
                    <item.icon size={28} color="var(--fp-amber-dark)" />
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--fp-navy)', color: 'white',
                      fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{item.step}</span>
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

      {/* ===== TIER CARDS ===== */}
      <Section>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
              }}>
                <Sparkles size={14} /> Membership Tiers
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>Unlock More as You Grow</h2>
              <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
                Every dollar you spend brings you closer to the next level
              </p>
            </div>

            <div className="sf-tier-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
            }}>
              {LOYALTY_CONFIG.tiers.map((tier) => {
                const TierIcon = TIER_ICONS[tier.icon] || PawPrint;
                return (
                  <div key={tier.tier} style={{
                    background: 'white', borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--fp-gray-100)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}>
                    {/* Tier top color bar */}
                    <div style={{
                      height: 6, width: '100%',
                      background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
                    }} />

                    <div style={{ padding: '32px 24px' }}>
                      {/* Icon */}
                      <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: `${tier.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}>
                        <TierIcon size={30} color={tier.color} />
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
                        color: 'var(--fp-navy)', textAlign: 'center', marginBottom: 4,
                      }}>{tier.name}</h3>

                      <div style={{
                        textAlign: 'center', marginBottom: 20,
                      }}>
                        {tier.minSpend > 0 ? (
                          <span style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>
                            Spend ${tier.minSpend}+
                          </span>
                        ) : (
                          <span style={{ fontSize: 13, color: 'var(--fp-success)', fontWeight: 600 }}>
                            Free to join
                          </span>
                        )}
                      </div>

                      {/* Multiplier */}
                      <div style={{
                        textAlign: 'center', padding: '14px 0',
                        borderTop: '1px solid var(--fp-gray-100)',
                        borderBottom: '1px solid var(--fp-gray-100)',
                        marginBottom: 20,
                      }}>
                        <div style={{
                          fontSize: 32, fontWeight: 900, color: tier.color,
                          fontFamily: 'var(--font-heading)',
                        }}>{tier.pointsMultiplier}x</div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>Points Multiplier</div>
                      </div>

                      {/* Benefits */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {tier.benefits.map((benefit, j) => (
                          <div key={j} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 8,
                            fontSize: 13, color: 'var(--fp-gray-500)', lineHeight: 1.5,
                          }}>
                            <Check size={14} color={tier.color} style={{ flexShrink: 0, marginTop: 3 }} />
                            {benefit}
                          </div>
                        ))}
                      </div>

                      {tier.discountPercent > 0 && (
                        <div style={{
                          marginTop: 20, padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          background: `${tier.color}10`,
                          textAlign: 'center',
                          fontSize: 14, fontWeight: 700, color: tier.color,
                        }}>
                          {tier.discountPercent}% off all purchases
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== AUTOSHIP ===== */}
      <Section>
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #1e293b, #334155)',
        }}>
          <div style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(245,158,11,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Repeat size={24} color="#f59e0b" />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
              color: 'white', marginBottom: 12,
            }}>AutoShip & Save Extra</h2>
            <p style={{
              fontSize: 16, color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7, marginBottom: 32, maxWidth: 550, margin: '0 auto 32px',
            }}>
              Set up automatic deliveries for your pet&apos;s food and supplies.
              AutoShip members earn {LOYALTY_CONFIG.autoShipBonusMultiplier}x bonus points on subscribed products
              — stack that with your tier multiplier for maximum savings.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
              {[
                { icon: Zap, label: `${LOYALTY_CONFIG.autoShipBonusMultiplier}x Bonus Points` },
                { icon: Check, label: 'Never Run Out' },
                { icon: Star, label: 'Cancel Anytime' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600,
                }}>
                  <item.icon size={16} color="#f59e0b" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== CTA ===== */}
      <Section>
        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <PawPrint size={36} color="var(--fp-amber)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
              color: 'var(--fp-navy)', marginBottom: 12,
            }}>Start Earning Today</h2>
            <p style={{ color: 'var(--fp-gray-400)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
              Visit either of our Sault Ste. Marie locations and ask our team to sign you up.
              It&apos;s free, instant, and you&apos;ll start earning points on your very first purchase.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link href="/our-stores" className="sf-cta-primary" style={{
                background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
              }}>
                Find a Store <ArrowRight size={18} />
              </Link>
              <Link href="/shop" className="sf-cta-secondary" style={{
                border: '2px solid var(--fp-navy)', color: 'var(--fp-navy)',
              }}>
                Browse Products <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
