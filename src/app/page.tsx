'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useForemostStore } from '@/lib/store';
import { BRANDS, LOYALTY_CONFIG, STORE_LOCATIONS } from '@/lib/store-config';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import PromoBanner from '@/components/PromoBanner';
import {
  ArrowRight, Star, Truck, Shield, Heart, MapPin, Phone, Clock,
  PawPrint, Dog, Cat, Fish, Package, Award, Sparkles, ChevronRight,
  Zap, Crown, Gem, Medal, Leaf, ShieldCheck, Repeat, Send,
} from 'lucide-react';

// Intersection observer hook for scroll animations
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

// Tier icon mapping (no emojis)
const TIER_ICONS: Record<string, React.ElementType> = {
  paw: PawPrint,
  'silver-paw': Medal,
  'gold-paw': Crown,
  'diamond-paw': Gem,
};

// Pet type icon/gradient mapping (no emojis)
const PET_ICON: Record<string, React.ElementType> = { dog: Dog, cat: Cat, fish: Fish };
const PET_GRADIENT: Record<string, string> = {
  dog: 'linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%)',
  cat: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
  fish: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
};

export default function HomePage() {
  const { products, customers } = useForemostStore();
  const featuredProducts = products.filter(p => p.isFeatured && p.isActive).slice(0, 8);
  const totalProducts = products.filter(p => p.isActive).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <PromoBanner />
      <StorefrontHeader />

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '100px 24px 120px',
      }}>
        {/* Decorative paw prints (SVG, not emoji) */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(6)].map((_, i) => (
            <PawPrint key={i} size={30 + i * 8} style={{
              position: 'absolute',
              top: `${10 + (i * 15) % 80}%`,
              left: `${5 + (i * 18) % 90}%`,
              opacity: 0.03 + i * 0.004,
              transform: `rotate(${-40 + i * 25}deg)`,
              color: 'white',
            }} />
          ))}
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
          }} />
        </div>

        <div className="sf-hero-grid" style={{
          maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 'var(--radius-full)', padding: '6px 16px',
              fontSize: 13, fontWeight: 600, color: '#f59e0b',
              marginBottom: 24,
            }}>
              <PawPrint size={14} /> Sault Ste. Marie&apos;s Premier Pet Store
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 56, fontWeight: 900,
              color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              Premium Nutrition for Your{' '}
              <span className="fp-gradient-text">Best Friend</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 480,
            }}>
              Expert advice, premium brands, and everything your pets need to thrive.
              Two convenient locations serving the Soo community.
            </p>

            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/shop" className="sf-cta-primary">
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link href="/our-stores" className="sf-cta-secondary">
                Visit Our Stores
              </Link>
            </div>
          </div>

          {/* Hero stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { icon: Package, value: `${totalProducts}+`, label: 'Premium Products', color: '#f59e0b' },
              { icon: Award, value: `${BRANDS.length}+`, label: 'Trusted Brands', color: '#3b82f6' },
              { icon: Heart, value: `${customers.length * 100}+`, label: 'Happy Customers', color: '#ef4444' },
              { icon: MapPin, value: '2', label: 'Local Stores', color: '#22c55e' },
            ].map((stat, i) => (
              <div key={i} className="animate-fade-in" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                animationDelay: `${i * 100}ms`,
              }}>
                <stat.icon size={24} color={stat.color} style={{ marginBottom: 12 }} />
                <div style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section style={{
        background: 'white', borderBottom: '1px solid var(--fp-gray-100)',
        padding: '24px 0',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', justifyContent: 'center', gap: 48,
          flexWrap: 'wrap',
        }}>
          {[
            { icon: Star, text: 'Expert Nutrition Advice' },
            { icon: ShieldCheck, text: 'Premium Quality Only' },
            { icon: Repeat, text: 'AutoShip & Save' },
            { icon: Heart, text: 'Loyalty Rewards Program' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)',
            }}>
              <item.icon size={18} color="var(--fp-amber)" />
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <Section>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: 8,
              }}>
                <Sparkles size={14} /> Featured Collection
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800,
                color: 'var(--fp-navy)', letterSpacing: '-0.02em',
              }}>
                Best Sellers & Staff Picks
              </h2>
              <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
                Handpicked by our team for quality, nutrition, and tail-wagging approval
              </p>
            </div>

            <div className="sf-product-grid-4" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
            }}>
              {featuredProducts.map(product => {
                const primaryPet = product.petType[0] || 'dog';
                const PetIcon = PET_ICON[primaryPet] || Dog;
                return (
                  <Link key={product.id} href={`/shop/${product.id}`} style={{
                    textDecoration: 'none', color: 'inherit',
                  }}>
                    <div className="sf-product-card">
                      <div className="sf-product-image" style={{
                        height: 200,
                        background: PET_GRADIENT[primaryPet] || PET_GRADIENT.dog,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative',
                      }}>
                        <PetIcon size={56} strokeWidth={1} style={{ opacity: 0.2, color: 'var(--fp-navy)' }} />
                        {product.isFeatured && (
                          <div style={{
                            position: 'absolute', top: 12, left: 12,
                            background: 'var(--fp-amber)', color: 'white',
                            fontSize: 10, fontWeight: 700, padding: '4px 10px',
                            borderRadius: 'var(--radius-full)',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                            display: 'flex', alignItems: 'center', gap: 4,
                          }}>
                            <Star size={10} /> Staff Pick
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '16px 18px 20px' }}>
                        <div style={{
                          fontSize: 11, fontWeight: 600, color: 'var(--fp-amber-dark)',
                          textTransform: 'uppercase', letterSpacing: '0.05em',
                          marginBottom: 6,
                        }}>
                          {product.brand}
                        </div>
                        <h3 style={{
                          fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                          marginBottom: 8, lineHeight: 1.3,
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {product.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span style={{
                            fontSize: 20, fontWeight: 800, color: 'var(--fp-navy)',
                            fontFamily: 'var(--font-heading)',
                          }}>
                            ${product.price.toFixed(2)}
                          </span>
                          {product.weight && (
                            <span style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                              / {product.weight}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 'var(--radius-full)',
                border: '2px solid var(--fp-navy)',
                color: 'var(--fp-navy)', fontWeight: 700, fontSize: 14,
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}>
                View All Products <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </Section>

      {/* ===== BRANDS ===== */}
      <Section>
        <section style={{
          padding: '64px 24px',
          background: 'white', borderTop: '1px solid var(--fp-gray-100)',
          borderBottom: '1px solid var(--fp-gray-100)',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
              color: 'var(--fp-navy)', marginBottom: 8,
            }}>Brands We Trust</h2>
            <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginBottom: 40 }}>
              We carry only the highest quality brands for your pets
            </p>
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 40,
              flexWrap: 'wrap', alignItems: 'center',
            }}>
              {BRANDS.filter(b => b.featured).map(brand => (
                <div key={brand.id} style={{
                  padding: '16px 28px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--fp-gray-100)',
                  fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800,
                  color: 'var(--fp-gray-300)',
                  transition: 'all 0.2s ease',
                }}>
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== LOYALTY ===== */}
      <Section>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: 8,
              }}>
                <Heart size={14} /> Paw Rewards
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800,
                color: 'var(--fp-navy)', letterSpacing: '-0.02em',
              }}>Loyalty That Pays Off</h2>
              <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
                Earn points on every purchase and unlock exclusive rewards
              </p>
            </div>

            <div className="sf-tier-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
            }}>
              {LOYALTY_CONFIG.tiers.map((tier) => {
                const TierIcon = TIER_ICONS[tier.tier] || PawPrint;
                return (
                  <div key={tier.tier} style={{
                    background: 'white', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--fp-gray-100)',
                    padding: '28px 24px', textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                      background: tier.color,
                    }} />
                    <div className="fp-tier-icon" style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `${tier.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <TierIcon size={26} color={tier.color} />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800,
                      color: 'var(--fp-navy)', marginBottom: 4,
                    }}>{tier.name}</h3>
                    <div style={{
                      fontSize: 24, fontWeight: 900, color: tier.color,
                      fontFamily: 'var(--font-heading)', marginBottom: 16,
                    }}>
                      {tier.pointsMultiplier}x Points
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>
                      {tier.discountPercent > 0 ? `${tier.discountPercent}% off all purchases` : 'No minimum spend'}
                    </div>
                    <div style={{
                      marginTop: 16, paddingTop: 16,
                      borderTop: '1px solid var(--fp-gray-100)',
                      fontSize: 12, color: 'var(--fp-gray-400)',
                    }}>
                      {tier.minSpend > 0 ? `Spend $${tier.minSpend}+ to qualify` : 'Free to join — sign up today!'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== LOCATIONS ===== */}
      <Section>
        <section style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        }}>
          <div className="sf-store-grid" style={{
            maxWidth: 1280, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          }}>
            {STORE_LOCATIONS.map(location => (
              <div key={location.id} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-lg)', padding: '36px 32px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <MapPin size={20} color="#f59e0b" />
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'white',
                  }}>{location.name}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                    <MapPin size={14} style={{ flexShrink: 0 }} />
                    {location.address.street}, {location.address.city}, {location.address.province}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                    <Phone size={14} style={{ flexShrink: 0 }} />
                    {location.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                    <Clock size={14} style={{ flexShrink: 0 }} />
                    Mon–Sat: 9am–6pm / Sun: 11am–4pm
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {location.features.map(feature => (
                    <span key={feature} style={{
                      padding: '6px 14px', borderRadius: 'var(--radius-full)',
                      background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
                      fontSize: 12, fontWeight: 600,
                    }}>{feature}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {location.petTypes.map(pet => {
                    const PIcon = PET_ICON[pet] || Dog;
                    return (
                      <div key={pet} style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize',
                      }}>
                        <PIcon size={14} /> {pet}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <Section>
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8,
              }}>
                <Heart size={14} /> What Pet Parents Say
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>Trusted by Sault Ste. Marie&apos;s Pet Community</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                {
                  name: 'Sarah M.', pet: 'Dog Mom to Max',
                  text: 'The staff really knows their stuff! They helped us find the perfect food for Max\'s sensitive stomach. We\'ve been shopping here for 3 years and wouldn\'t go anywhere else.',
                  rating: 5,
                },
                {
                  name: 'James T.', pet: 'Cat Dad to Luna & Milo',
                  text: 'Finally a pet store that stocks premium brands at fair prices. The Paw Rewards program is great — I\'ve already saved over $200 this year.',
                  rating: 5,
                },
                {
                  name: 'Emily R.', pet: 'Aquarium Enthusiast',
                  text: 'Love the fish selection at the Second Line location! The team always has great advice on tank maintenance and compatible species. Truly passionate about pets.',
                  rating: 5,
                },
              ].map((review, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--fp-gray-100)',
                  padding: '28px 24px',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: 14, color: 'var(--fp-gray-500)', lineHeight: 1.8,
                    flex: 1, fontStyle: 'italic',
                  }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div style={{ marginTop: 18, borderTop: '1px solid var(--fp-gray-100)', paddingTop: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)' }}>{review.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{review.pet}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== BRAND TRUST STRIP ===== */}
      <Section>
        <section style={{ padding: '40px 24px', background: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-300)',
              textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24,
            }}>Trusted Brands We Carry</p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20,
            }}>
              {['Fromm', 'GO! Solutions', 'ACANA', 'ORIJEN', 'Stella & Chewy\'s', 'Open Farm', 'Ziwi Peak', 'Nulo'].map(brand => (
                <span key={brand} style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--fp-gray-300)',
                  fontFamily: 'var(--font-heading)',
                  transition: 'color 0.2s ease',
                }}>{brand}</span>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ===== NEWSLETTER ===== */}
      <Section>
        <section style={{ padding: '64px 24px', background: 'var(--fp-gray-50)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'var(--fp-amber-glow)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Send size={24} color="var(--fp-amber-dark)" />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
              color: 'var(--fp-navy)', marginBottom: 8,
            }}>Stay Connected</h2>
            <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginBottom: 24 }}>
              Get exclusive deals, new product alerts, and pet care tips delivered to your inbox
            </p>
            <div style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="fp-input"
                style={{ flex: 1, height: 48 }}
              />
              <button className="fp-button fp-button-primary" style={{
                height: 48, padding: '0 28px', borderRadius: 'var(--radius-full)',
                fontWeight: 700, whiteSpace: 'nowrap',
                background: 'var(--fp-navy)', color: 'white', border: 'none', cursor: 'pointer',
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
