'use client';

import React from 'react';
import Link from 'next/link';
import { useForemostStore } from '@/lib/store';
import { BRANDS, LOYALTY_CONFIG, STORE_LOCATIONS } from '@/lib/store-config';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  ArrowRight, Star, Truck, Shield, Heart, MapPin, Phone, Clock,
  PawPrint, Dog, Cat, Fish, Package, Award, Sparkles, ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const { products, customers } = useForemostStore();
  const featuredProducts = products.filter(p => p.isFeatured && p.isActive).slice(0, 8);
  const totalProducts = products.filter(p => p.isActive).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Hero Section */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '100px 24px 120px',
      }}>
        {/* Animated paw prints */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${10 + (i * 12) % 80}%`,
              left: `${5 + (i * 17) % 90}%`,
              fontSize: 30 + i * 6,
              opacity: 0.03 + i * 0.003,
              transform: `rotate(${-40 + i * 25}deg)`,
            }}>🐾</div>
          ))}
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
          }} />
        </div>

        <div style={{
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
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Best Friend</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 480,
            }}>
              Expert advice, premium brands, and everything your pets need to thrive.
              Two convenient locations serving the Soo community.
            </p>

            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 32px', borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white', fontWeight: 700, fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.2s ease',
              }}>
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link href="/our-stores" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 32px', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontWeight: 600, fontSize: 15,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}>
                Visit Our Stores
              </Link>
            </div>
          </div>

          {/* Hero stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
          }}>
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

      {/* Trust Strip */}
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
            { icon: Shield, text: 'Premium Quality Only' },
            { icon: Truck, text: 'AutoShip & Save' },
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

      {/* Featured Products */}
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

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }}>
            {featuredProducts.map(product => (
              <Link key={product.id} href={`/shop/${product.id}`} style={{
                textDecoration: 'none', color: 'inherit',
              }}>
                <div style={{
                  background: 'white', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--fp-gray-100)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}>
                  {/* Product image placeholder */}
                  <div style={{
                    height: 200,
                    background: `linear-gradient(135deg, ${product.petType.includes('dog') ? '#fef3c7' : product.petType.includes('cat') ? '#dbeafe' : '#d1fae5'}, white)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{ fontSize: 64, opacity: 0.3 }}>
                      {product.petType.includes('dog') ? '🐕' : product.petType.includes('cat') ? '🐈' : '🐠'}
                    </div>
                    {product.isFeatured && (
                      <div style={{
                        position: 'absolute', top: 12, left: 12,
                        background: 'var(--fp-amber)', color: 'white',
                        fontSize: 10, fontWeight: 700, padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>Staff Pick</div>
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
                    <div style={{
                      display: 'flex', alignItems: 'baseline', gap: 8,
                    }}>
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
            ))}
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

      {/* Brands Section */}
      <section style={{
        padding: '64px 24px',
        background: 'white', borderTop: '1px solid var(--fp-gray-100)',
        borderBottom: '1px solid var(--fp-gray-100)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
            color: 'var(--fp-navy)', marginBottom: 8,
          }}>
            Brands We Trust
          </h2>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginBottom: 40 }}>
            We carry only the highest quality brands for your pets
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 40,
            flexWrap: 'wrap', alignItems: 'center',
          }}>
            {BRANDS.filter(b => b.featured).map(brand => (
              <div key={brand.id} style={{
                padding: '16px 28px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--fp-gray-100)',
                fontFamily: 'var(--font-heading)',
                fontSize: 18, fontWeight: 800,
                color: 'var(--fp-gray-300)',
                transition: 'all 0.2s ease',
              }}>
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Section */}
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
            }}>
              Loyalty That Pays Off
            </h2>
            <p style={{ color: 'var(--fp-gray-400)', marginTop: 8, fontSize: 15 }}>
              Earn points on every purchase and unlock exclusive rewards
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
          }}>
            {LOYALTY_CONFIG.tiers.map((tier, i) => (
              <div key={tier.tier} style={{
                background: 'white', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--fp-gray-100)',
                padding: '28px 24px',
                textAlign: 'center',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                  background: tier.color,
                }} />
                <span style={{ fontSize: 36 }}>{tier.icon}</span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800,
                  color: 'var(--fp-navy)', marginTop: 12, marginBottom: 4,
                }}>
                  {tier.name}
                </h3>
                <div style={{
                  fontSize: 24, fontWeight: 900, color: tier.color,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 16,
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
            ))}
          </div>
        </div>
      </section>

      {/* Store Locations CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
        }}>
          {STORE_LOCATIONS.map(location => (
            <div key={location.id} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-lg)', padding: '36px 32px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 20,
              }}>
                <MapPin size={20} color="#f59e0b" />
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
                  color: 'white',
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
                  Mon–Sat: 9am–6pm • Sun: 11am–4pm
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {location.features.map(feature => (
                  <span key={feature} style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-full)',
                    background: 'rgba(245,158,11,0.12)', color: '#f59e0b',
                    fontSize: 12, fontWeight: 600,
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                {location.petTypes.map(pet => (
                  <div key={pet} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 12, color: 'rgba(255,255,255,0.5)',
                    textTransform: 'capitalize',
                  }}>
                    {pet === 'dog' ? <Dog size={14} /> : pet === 'cat' ? <Cat size={14} /> : <Fish size={14} />}
                    {pet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ padding: '64px 24px', background: 'white' }}>
        <div style={{
          maxWidth: 600, margin: '0 auto', textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
            color: 'var(--fp-navy)', marginBottom: 8,
          }}>
            Stay Connected 🐾
          </h2>
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
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
