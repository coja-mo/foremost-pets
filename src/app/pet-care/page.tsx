'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  BookOpen, Dog, Cat, Fish, Heart, Clock, ArrowRight,
  Leaf, Droplets, Shield, Apple, Sparkles, Sun,
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

const ARTICLES = [
  {
    id: 1, title: 'Choosing the Right Food for Your Dog',
    excerpt: 'Not all dog food is created equal. Learn how to read labels, understand ingredient quality, and find the perfect match for your pup\'s nutritional needs.',
    category: 'dog', icon: Dog, readTime: '5 min',
    gradient: 'linear-gradient(135deg, #fef3c7, #fff7ed)',
    accent: 'var(--fp-amber)',
  },
  {
    id: 2, title: 'Indoor Cat Enrichment: Beyond the Basics',
    excerpt: 'Keep your feline friend mentally stimulated and physically active with creative enrichment strategies that go beyond the standard scratching post.',
    category: 'cat', icon: Cat, readTime: '4 min',
    gradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
    accent: 'var(--fp-info)',
  },
  {
    id: 3, title: 'Setting Up Your First Freshwater Aquarium',
    excerpt: 'From tank selection to cycling, filtration, and stocking — everything a beginner needs to know to create a thriving aquatic ecosystem.',
    category: 'fish', icon: Fish, readTime: '7 min',
    gradient: 'linear-gradient(135deg, #d1fae5, #ecfdf5)',
    accent: 'var(--fp-success)',
  },
  {
    id: 4, title: 'Spring Grooming Essentials for Dogs',
    excerpt: 'As your dog sheds their winter coat, proper grooming becomes essential. Our guide covers brushing, bathing, nail care, and seasonal skin health.',
    category: 'dog', icon: Sun, readTime: '4 min',
    gradient: 'linear-gradient(135deg, #fef3c7, #fff7ed)',
    accent: 'var(--fp-amber)',
  },
  {
    id: 5, title: 'Understanding Your Cat\'s Nutritional Needs',
    excerpt: 'Cats are obligate carnivores with unique dietary requirements. Learn about protein ratios, hydration, and why grain-free isn\'t always better.',
    category: 'cat', icon: Apple, readTime: '6 min',
    gradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
    accent: 'var(--fp-info)',
  },
  {
    id: 6, title: 'Canadian Pet Care: Winter Safety Tips',
    excerpt: 'Protect your pets from harsh Canadian winters. From paw care and salt sensitivity to safe outdoor temperatures and indoor heating precautions.',
    category: 'dog', icon: Shield, readTime: '5 min',
    gradient: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    accent: '#8b5cf6',
  },
  {
    id: 7, title: 'Fish Tank Maintenance: Weekly Routine',
    excerpt: 'Keep your aquarium crystal clear and your fish healthy with this simple weekly maintenance checklist covering water changes, testing, and feeding.',
    category: 'fish', icon: Droplets, readTime: '3 min',
    gradient: 'linear-gradient(135deg, #d1fae5, #ecfdf5)',
    accent: 'var(--fp-success)',
  },
  {
    id: 8, title: 'Natural Treats: What to Look For',
    excerpt: 'Single-ingredient, freeze-dried, and dehydrated treats are trending — but which are actually worth buying? Our ingredient guide breaks it down.',
    category: 'dog', icon: Leaf, readTime: '4 min',
    gradient: 'linear-gradient(135deg, #fef3c7, #fff7ed)',
    accent: 'var(--fp-amber)',
  },
  {
    id: 9, title: 'Multi-Cat Households: Harmony Tips',
    excerpt: 'Managing multiple cats under one roof requires strategy. Learn about litter box ratios, feeding stations, vertical space, and conflict resolution.',
    category: 'cat', icon: Heart, readTime: '5 min',
    gradient: 'linear-gradient(135deg, #fce7f3, #fdf2f8)',
    accent: '#ec4899',
  },
];

type FilterType = 'all' | 'dog' | 'cat' | 'fish';

export default function PetCareTipsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredArticles = filter === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === filter);

  const filters: { value: FilterType; label: string; icon: React.ElementType }[] = [
    { value: 'all', label: 'All Tips', icon: BookOpen },
    { value: 'dog', label: 'Dogs', icon: Dog },
    { value: 'cat', label: 'Cats', icon: Cat },
    { value: 'fish', label: 'Fish', icon: Fish },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        padding: '64px 24px 80px',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 700, color: 'var(--fp-amber)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: 12,
        }}>
          <BookOpen size={14} /> Expert Advice
        </span>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 900,
          color: 'white', letterSpacing: '-0.02em',
        }}>Pet Care Tips</h1>
        <p style={{
          color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: 16,
          maxWidth: 500, margin: '8px auto 0',
        }}>
          Expert advice from our team to help your pets live their healthiest, happiest lives
        </p>
      </section>

      {/* Filters */}
      <section style={{
        maxWidth: 1200, margin: '-24px auto 0', padding: '0 24px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center',
          background: 'white', borderRadius: 'var(--radius-xl)',
          padding: '8px', boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--fp-gray-100)',
          maxWidth: 440, margin: '0 auto',
        }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 'var(--radius-lg)',
                fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: filter === f.value ? 'var(--fp-navy)' : 'transparent',
                color: filter === f.value ? 'white' : 'var(--fp-gray-400)',
              }}
            >
              <f.icon size={14} /> {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      <Section>
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            background: 'white', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--fp-gray-100)', overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{
              background: ARTICLES[0].gradient,
              padding: '64px 48px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <Sparkles size={32} color={ARTICLES[0].accent} style={{ opacity: 0.4, marginBottom: 16 }} />
              <span style={{
                fontSize: 11, fontWeight: 700, color: ARTICLES[0].accent,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>Featured Article</span>
            </div>
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 'var(--radius-full)',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  background: 'var(--fp-amber-glow)', color: 'var(--fp-amber-dark)',
                }}>Dog Care</span>
                <span style={{ fontSize: 12, color: 'var(--fp-gray-300)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} /> {ARTICLES[0].readTime} read
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
                color: 'var(--fp-navy)', marginBottom: 12, lineHeight: 1.3,
              }}>{ARTICLES[0].title}</h2>
              <p style={{ fontSize: 14, color: 'var(--fp-gray-400)', lineHeight: 1.7, marginBottom: 20 }}>
                {ARTICLES[0].excerpt}
              </p>
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                  cursor: 'pointer',
                }}>
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* Article Grid */}
      <Section>
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filteredArticles.slice(filter === 'all' ? 1 : 0).map((article, i) => (
              <div key={article.id} style={{
                background: 'white', borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--fp-gray-100)', overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }} className="sf-product-card">
                <div style={{
                  height: 120, background: article.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <article.icon size={36} color={article.accent} style={{ opacity: 0.3 }} />
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: 'var(--radius-full)',
                      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                      background: `${article.accent}15`, color: article.accent,
                    }}>{article.category}</span>
                    <span style={{ fontSize: 11, color: 'var(--fp-gray-300)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {article.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)',
                    lineHeight: 1.3, marginBottom: 8,
                  }}>{article.title}</h3>
                  <p style={{
                    fontSize: 13, color: 'var(--fp-gray-400)', lineHeight: 1.6,
                  }}>{article.excerpt}</p>
                  <div style={{ marginTop: 16 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: article.accent,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
