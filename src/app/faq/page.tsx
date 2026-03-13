'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  HelpCircle, ChevronDown, Search, ShoppingBag, Award,
  Repeat, MapPin, Truck, CreditCard, Package, Shield,
  PawPrint, Store, ArrowRight,
} from 'lucide-react';

const FAQ_SECTIONS = [
  {
    category: 'Shopping',
    icon: ShoppingBag,
    color: 'var(--fp-amber)',
    items: [
      { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. Your order will be prepared for in-store pickup at your chosen location.' },
      { q: 'Can I pay online?', a: 'We currently operate on an in-store payment model. Reserve your items online and pay when you pick up at either of our Sault Ste. Marie locations.' },
      { q: 'Do you offer delivery?', a: 'At this time, all orders are prepared for in-store pickup. This ensures your items are fresh and properly handled.' },
      { q: 'What brands do you carry?', a: 'We carry premium brands including Fromm, GO! Solutions, ACANA, ORIJEN, Stella & Chewy\'s, Open Farm, and many more. Visit our shop page to browse the full selection.' },
      { q: 'Can I return a product?', a: 'Yes! Unopened products can be returned within 30 days with your receipt. Please bring returns to the store location where you made your purchase.' },
    ],
  },
  {
    category: 'Paw Rewards',
    icon: Award,
    color: '#8b5cf6',
    items: [
      { q: 'How do I join Paw Rewards?', a: 'Sign up in-store at either location. It\'s free to join and you start earning points immediately!' },
      { q: 'How do I earn points?', a: 'Earn 10 points per $1 spent on eligible purchases. AutoShip orders earn double points (20 per $1).' },
      { q: 'What are the loyalty tiers?', a: 'We have four tiers: Bronze (start), Silver ($500+ spent), Gold ($1,500+ spent), and Platinum ($3,000+ spent). Higher tiers unlock better discounts and exclusive perks.' },
      { q: 'How do I redeem points?', a: 'Points can be redeemed in-store at checkout. 500 points = $5 off, with no limit on redemption.' },
      { q: 'Do my points expire?', a: 'Points remain active as long as you make a purchase within 12 months. Inactive accounts may have points reset.' },
    ],
  },
  {
    category: 'AutoShip',
    icon: Repeat,
    color: 'var(--fp-success)',
    items: [
      { q: 'What is AutoShip?', a: 'AutoShip is our automatic reorder service. Schedule recurring orders for your pet\'s essentials and save 10% on every order.' },
      { q: 'How often can I schedule deliveries?', a: 'Choose a frequency that works: every 2, 4, 6, or 8 weeks. You can adjust your schedule anytime.' },
      { q: 'Can I skip or pause an AutoShip?', a: 'Absolutely! Skip individual orders, pause your subscription, or cancel anytime — no penalties or commitments.' },
      { q: 'Which products are eligible?', a: 'Most food, treats, and supplements are AutoShip eligible. Look for the AutoShip badge on product pages.' },
    ],
  },
  {
    category: 'Our Stores',
    icon: Store,
    color: 'var(--fp-info)',
    items: [
      { q: 'Where are your stores located?', a: 'We have two locations in Sault Ste. Marie, Ontario: our main store on Second Line and our Trunk Road location.' },
      { q: 'What are your hours?', a: 'Both locations are open Monday–Saturday 9am–6pm and Sunday 11am–4pm. Holiday hours may vary.' },
      { q: 'Do both stores carry the same products?', a: 'While we maintain a consistent core selection, each store may have location-specific inventory. The Trunk Road location specializes in fish & aquatics, while Second Line focuses on grooming services.' },
      { q: 'Do you offer grooming services?', a: 'Yes! Our Second Line location offers full grooming services. Book an appointment in-store or by phone.' },
    ],
  },
];

type CategoryType = string;

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

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(FAQ_SECTIONS[0].category);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const activeSection = FAQ_SECTIONS.find(s => s.category === activeCategory)!;

  const allFilteredItems = searchQuery.length >= 2
    ? FAQ_SECTIONS.flatMap(s => s.items
        .filter(item =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(item => ({ ...item, category: s.category, color: s.color }))
      )
    : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        padding: '56px 24px 72px', textAlign: 'center',
      }}>
        <HelpCircle size={32} color="var(--fp-amber)" style={{ marginBottom: 12 }} />
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 900,
          color: 'white', marginBottom: 8,
        }}>Frequently Asked Questions</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
          Everything you need to know about shopping with Foremost Pets
        </p>

        {/* Search */}
        <div style={{ maxWidth: 480, margin: '28px auto 0', position: 'relative' }}>
          <Search size={18} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', fontSize: 14, outline: 'none',
            }}
          />
        </div>
      </section>

      <Section>
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* Search results mode */}
          {allFilteredItems ? (
            <div>
              <p style={{ fontSize: 13, color: 'var(--fp-gray-400)', marginBottom: 20 }}>
                {allFilteredItems.length} result{allFilteredItems.length !== 1 ? 's' : ''} found
              </p>
              {allFilteredItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 48, color: 'var(--fp-gray-300)' }}>
                  No matching questions found. Try a different search term.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {allFilteredItems.map((item, i) => (
                    <div key={i} style={{
                      background: 'white', borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--fp-gray-100)', overflow: 'hidden',
                    }}>
                      <button onClick={() => toggleItem(`search-${i}`)} style={{
                        width: '100%', padding: '18px 24px',
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: `${item.color}15`, color: item.color,
                          textTransform: 'uppercase', flexShrink: 0,
                        }}>{item.category}</span>
                        <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--fp-navy)' }}>{item.q}</span>
                        <ChevronDown size={16} color="var(--fp-gray-300)" style={{
                          transition: 'transform 0.2s ease',
                          transform: openItems.has(`search-${i}`) ? 'rotate(180deg)' : 'rotate(0)',
                        }} />
                      </button>
                      {openItems.has(`search-${i}`) && (
                        <div style={{
                          padding: '0 24px 18px 24px',
                          fontSize: 14, color: 'var(--fp-gray-500)', lineHeight: 1.7,
                        }}>{item.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Category tabs */}
              <div style={{
                display: 'flex', gap: 8, marginBottom: 32,
                overflowX: 'auto', paddingBottom: 4,
              }}>
                {FAQ_SECTIONS.map(section => (
                  <button key={section.category} onClick={() => setActiveCategory(section.category)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px', borderRadius: 'var(--radius-full)',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    whiteSpace: 'nowrap', transition: 'all 0.2s ease',
                    background: activeCategory === section.category ? 'var(--fp-navy)' : 'white',
                    color: activeCategory === section.category ? 'white' : 'var(--fp-gray-400)',
                    boxShadow: activeCategory === section.category ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
                  }}>
                    <section.icon size={14} /> {section.category}
                  </button>
                ))}
              </div>

              {/* FAQ items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeSection.items.map((item, i) => {
                  const key = `${activeCategory}-${i}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key} style={{
                      background: 'white', borderRadius: 'var(--radius-lg)',
                      border: `1px solid ${isOpen ? 'var(--fp-amber)' : 'var(--fp-gray-100)'}`,
                      overflow: 'hidden', transition: 'border-color 0.2s ease',
                    }}>
                      <button onClick={() => toggleItem(key)} style={{
                        width: '100%', padding: '18px 24px',
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 'var(--radius-sm)',
                          background: `${activeSection.color}15`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <HelpCircle size={14} color={activeSection.color} />
                        </div>
                        <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--fp-navy)' }}>{item.q}</span>
                        <ChevronDown size={16} color="var(--fp-gray-300)" style={{
                          transition: 'transform 0.2s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        }} />
                      </button>
                      {isOpen && (
                        <div style={{
                          padding: '0 24px 18px 64px',
                          fontSize: 14, color: 'var(--fp-gray-500)', lineHeight: 1.7,
                        }}>{item.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Still need help? */}
          <div style={{
            marginTop: 48, textAlign: 'center', padding: '32px',
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)',
          }}>
            <PawPrint size={28} color="var(--fp-gray-200)" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 6 }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: 13, color: 'var(--fp-gray-400)', marginBottom: 16 }}>
              Our friendly team is here to help!
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 24px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-navy)', color: 'white',
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}>
              Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
