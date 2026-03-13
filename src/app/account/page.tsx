'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForemostStore } from '@/lib/store';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  User, Phone, Search, Award, ShoppingBag, Package, Clock,
  Star, Crown, Gem, ChevronRight, PawPrint, Heart,
  ArrowRight, Mail, Shield, Calendar,
} from 'lucide-react';
import { LOYALTY_CONFIG } from '@/lib/store-config';

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

const TIER_ICONS: Record<string, React.ElementType> = {
  bronze: PawPrint, silver: Star, gold: Crown, platinum: Gem,
};

const TIER_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  bronze: { bg: 'linear-gradient(135deg, #CD7F32, #A0522D)', text: '#8B4513', accent: '#CD7F32' },
  silver: { bg: 'linear-gradient(135deg, #C0C0C0, #808080)', text: '#555', accent: '#C0C0C0' },
  gold: { bg: 'linear-gradient(135deg, #FFD700, #DAA520)', text: '#996515', accent: '#FFD700' },
  platinum: { bg: 'linear-gradient(135deg, #7c3aed, #4c1d95)', text: '#5b21b6', accent: '#8b5cf6' },
};

export default function AccountPage() {
  const { customers, orders } = useForemostStore();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const results = search.length >= 2
    ? customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  const customer = selectedId ? customers.find(c => c.id === selectedId) : null;
  const customerOrders = customer
    ? orders.filter(o => o.customerId === customer.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const tierInfo = customer ? TIER_COLORS[customer.loyaltyTier] || TIER_COLORS.bronze : null;
  const TierIcon = customer ? TIER_ICONS[customer.loyaltyTier] || PawPrint : PawPrint;

  if (!mounted) return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div className="fp-skeleton" style={{ width: '100%', height: 200 }} />
      </div>
      <StorefrontFooter />
    </div>
  );

  // Not logged in — show lookup
  if (!customer) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
        <StorefrontHeader />

        <section style={{ maxWidth: 500, margin: '0 auto', padding: '60px 24px 100px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--fp-amber-glow)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <User size={28} color="var(--fp-amber-dark)" />
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 900,
              color: 'var(--fp-navy)', marginBottom: 8,
            }}>My Account</h1>
            <p style={{ fontSize: 14, color: 'var(--fp-gray-400)' }}>
              Look up your Paw Rewards account to view points, order history, and more.
            </p>
          </div>

          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)', padding: '28px',
          }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>
              Search by name, email, or phone
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--fp-gray-300)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="fp-input"
                placeholder="e.g. John Smith or (705) 555-0123"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', paddingLeft: 40 }}
              />
            </div>

            {results.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {results.map(c => {
                  const colors = TIER_COLORS[c.loyaltyTier] || TIER_COLORS.bronze;
                  const Icon = TIER_ICONS[c.loyaltyTier] || PawPrint;
                  return (
                    <button key={c.id} onClick={() => { setSelectedId(c.id); setSearch(''); }} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      borderRadius: 'var(--radius-md)', border: '1px solid var(--fp-gray-100)',
                      background: 'var(--fp-gray-50)', cursor: 'pointer', width: '100%', textAlign: 'left',
                      transition: 'background 0.15s ease',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: colors.bg, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>{c.firstName} {c.lastName}</div>
                        <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>{c.email}</div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 8px',
                        borderRadius: 'var(--radius-full)', textTransform: 'uppercase',
                        color: colors.text, background: `${colors.accent}20`,
                      }}>{c.loyaltyTier}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {search.length >= 2 && results.length === 0 && (
              <div style={{ marginTop: 16, textAlign: 'center', padding: 20, color: 'var(--fp-gray-300)', fontSize: 13 }}>
                No accounts found. Visit us in-store to join Paw Rewards!
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/loyalty" style={{
              fontSize: 13, fontWeight: 600, color: 'var(--fp-amber-dark)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              Not a member? Learn about Paw Rewards <ArrowRight size={12} />
            </Link>
          </div>
        </section>

        <StorefrontFooter />
      </div>
    );
  }

  // Logged in — profile
  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Breadcrumb */}
        <button onClick={() => setSelectedId(null)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, color: 'var(--fp-gray-400)', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ← Back to lookup
        </button>

        {/* Profile Card */}
        <Section>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)', overflow: 'hidden', marginBottom: 24,
          }}>
            <div style={{ background: tierInfo?.bg, height: 80, position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: -28, left: 28,
                width: 56, height: 56, borderRadius: '50%',
                background: 'white', border: '3px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <TierIcon size={24} color={tierInfo?.accent} />
              </div>
            </div>
            <div style={{ padding: '36px 28px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
                    color: 'var(--fp-navy)',
                  }}>{customer.firstName} {customer.lastName}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--fp-gray-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Mail size={12} /> {customer.email}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--fp-gray-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={12} /> {customer.phone}
                    </span>
                  </div>
                </div>
                <span style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-full)',
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  background: `${tierInfo?.accent}20`, color: tierInfo?.text,
                }}>
                  {customer.loyaltyTier} Member
                </span>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
                {[
                  { label: 'Points Balance', value: customer.loyaltyPoints.toLocaleString(), icon: Award, color: 'var(--fp-amber)' },
                  { label: 'Total Spent', value: `$${customer.totalSpent.toFixed(0)}`, icon: ShoppingBag, color: 'var(--fp-success)' },
                  { label: 'Total Orders', value: customer.totalOrders.toString(), icon: Package, color: 'var(--fp-info)' },
                  { label: 'Member Since', value: new Date(customer.joinDate).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' }), icon: Calendar, color: '#8b5cf6' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '16px', borderRadius: 'var(--radius-md)',
                    background: 'var(--fp-gray-50)', textAlign: 'center',
                  }}>
                    <stat.icon size={18} color={stat.color} style={{ marginBottom: 6 }} />
                    <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)' }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Loyalty Progress */}
        <Section>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)', padding: '24px', marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="var(--fp-amber)" /> Loyalty Tier Progress
            </h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {LOYALTY_CONFIG.tiers.map(tier => {
                const isActive = tier.name === customer.loyaltyTier;
                const colors = TIER_COLORS[tier.name] || TIER_COLORS.bronze;
                const Icon = TIER_ICONS[tier.name] || PawPrint;
                return (
                  <div key={tier.name} style={{
                    flex: 1, padding: '14px 12px', borderRadius: 'var(--radius-md)',
                    border: `2px solid ${isActive ? colors.accent : 'var(--fp-gray-100)'}`,
                    background: isActive ? `${colors.accent}10` : 'transparent',
                    textAlign: 'center',
                  }}>
                    <Icon size={18} color={isActive ? colors.accent : 'var(--fp-gray-300)'} style={{ marginBottom: 4 }} />
                    <div style={{
                      fontSize: 12, fontWeight: 700, color: isActive ? colors.text : 'var(--fp-gray-400)',
                      textTransform: 'capitalize',
                    }}>{tier.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--fp-gray-300)' }}>
                      {tier.minSpend > 0 ? `$${tier.minSpend}+` : 'Start'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Order History */}
        <Section>
          <div style={{
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)', padding: '24px',
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Package size={18} color="var(--fp-amber)" /> Order History
            </h2>
            {customerOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--fp-gray-300)' }}>
                No orders yet. <Link href="/shop" style={{ color: 'var(--fp-amber-dark)', fontWeight: 600 }}>Start shopping!</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {customerOrders.slice(0, 10).map(order => (
                  <div key={order.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px', borderRadius: 'var(--radius-md)',
                    background: 'var(--fp-gray-50)', transition: 'background 0.15s ease',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: order.orderStatus === 'completed' ? '#dcfce7' : '#fef3c7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Package size={16} color={order.orderStatus === 'completed' ? '#16a34a' : 'var(--fp-amber-dark)'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>{order.orderNumber}</div>
                      <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {' • '}{order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px',
                      borderRadius: 'var(--radius-full)', textTransform: 'capitalize',
                      background: order.orderStatus === 'completed' ? '#dcfce7' : '#fef3c7',
                      color: order.orderStatus === 'completed' ? '#16a34a' : 'var(--fp-amber-dark)',
                    }}>{order.orderStatus}</span>
                    <div style={{ fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)' }}>
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
      </section>

      <StorefrontFooter />
    </div>
  );
}
