'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForemostStore } from '@/lib/store';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import { useCart } from '@/components/CartContext';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Shield, Truck, RotateCcw, Heart, Star,
  Dog, Cat, Fish, ChevronRight, Package, MapPin, ShoppingBag, Minus, Plus,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const { products } = useForemostStore();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const product = products.find(p => p.id === params.slug);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
        <StorefrontHeader />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <Package size={56} style={{ opacity: 0.2, marginBottom: 16 }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--fp-navy)' }}>
            Product Not Found
          </h1>
          <p style={{ color: 'var(--fp-gray-400)', marginTop: 8 }}>
            This product doesn&apos;t exist or has been removed.
          </p>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 24, padding: '12px 24px',
            borderRadius: 'var(--radius-full)', background: 'var(--fp-navy)',
            color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 14,
          }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>
        <StorefrontFooter />
      </div>
    );
  }

  const relatedProducts = products.filter(
    p => p.id !== product.id && p.isActive && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const PetIcon = product.petType.includes('dog') ? Dog : product.petType.includes('cat') ? Cat : Fish;
  const petGradient = product.petType.includes('dog') ? '#fef3c7' : product.petType.includes('cat') ? '#dbeafe' : '#d1fae5';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Breadcrumb */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '16px 24px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 13, color: 'var(--fp-gray-400)',
      }}>
        <Link href="/" style={{ color: 'var(--fp-gray-400)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" style={{ color: 'var(--fp-gray-400)', textDecoration: 'none' }}>Shop</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--fp-navy)', fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* Product Detail */}
      <section style={{
        maxWidth: 1280, margin: '0 auto', padding: '8px 24px 64px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
      }}>
        {/* Left: Image */}
        <div style={{
          background: `linear-gradient(135deg, ${petGradient}, white)`,
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--fp-gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 480, position: 'relative',
        }}>
          <div style={{ opacity: 0.2 }}><PetIcon size={96} strokeWidth={1} color="var(--fp-navy)" /></div>
          {product.isFeatured && (
            <div style={{
              position: 'absolute', top: 20, left: 20,
              background: 'var(--fp-amber)', color: 'white',
              fontSize: 12, fontWeight: 700, padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Star size={12} /> Staff Pick
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--fp-amber-dark)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
          }}>
            {product.brand}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 900,
            color: 'var(--fp-navy)', lineHeight: 1.2, marginBottom: 12,
          }}>
            {product.name}
          </h1>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 20,
          }}>
            <span style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 'var(--radius-full)',
              background: product.inventory.status === 'in-stock' ? '#dcfce7' : product.inventory.status === 'low-stock' ? '#fef9c3' : '#fee2e2',
              color: product.inventory.status === 'in-stock' ? '#16a34a' : product.inventory.status === 'low-stock' ? '#ca8a04' : '#dc2626',
              fontWeight: 600,
            }}>
              {product.inventory.status === 'in-stock' ? '✓ In Stock' : product.inventory.status === 'low-stock' ? '⚠ Low Stock' : '✗ Out of Stock'}
            </span>
            <span style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>SKU: {product.sku}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 24 }}>
            <span style={{
              fontSize: 36, fontWeight: 900, color: 'var(--fp-navy)',
              fontFamily: 'var(--font-heading)',
            }}>
              ${product.price.toFixed(2)}
            </span>
            {product.weight && (
              <span style={{ fontSize: 15, color: 'var(--fp-gray-400)' }}>/ {product.weight}</span>
            )}
          </div>

          <p style={{
            fontSize: 15, lineHeight: 1.7, color: 'var(--fp-gray-500)',
            marginBottom: 28,
          }}>
            {product.description}
          </p>

          {/* Pet type badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {product.petType.map(pt => (
              <span key={pt} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                background: 'var(--fp-gray-50)', fontSize: 13, fontWeight: 600,
                color: 'var(--fp-gray-500)', textTransform: 'capitalize',
              }}>
                {pt === 'dog' ? <Dog size={14} /> : pt === 'cat' ? <Cat size={14} /> : <Fish size={14} />}
                {pt}
              </span>
            ))}
            <span style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-gray-50)', fontSize: 13, fontWeight: 600,
              color: 'var(--fp-gray-500)', textTransform: 'capitalize',
            }}>
              {product.category.replace(/-/g, ' ')}
            </span>
          </div>

          {/* Add to Cart */}
          <div style={{
            display: 'flex', gap: 12, marginBottom: 28,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '2px solid var(--fp-gray-200)', borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                width: 44, height: 48, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'var(--fp-gray-50)',
                border: 'none', cursor: 'pointer', color: 'var(--fp-gray-500)',
              }}>
                <Minus size={16} />
              </button>
              <span style={{
                width: 48, textAlign: 'center', fontSize: 16,
                fontWeight: 800, fontFamily: 'var(--font-heading)',
              }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{
                width: 44, height: 48, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'var(--fp-gray-50)',
                border: 'none', cursor: 'pointer', color: 'var(--fp-gray-500)',
              }}>
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => {
                if (product.inventory.status !== 'out-of-stock') {
                  addItem(product, qty);
                  toast.success(`Added ${qty}x ${product.name} to cart`);
                }
              }}
              disabled={product.inventory.status === 'out-of-stock'}
              style={{
                flex: 1, padding: '14px 24px',
                borderRadius: 'var(--radius-md)',
                background: product.inventory.status === 'out-of-stock'
                  ? 'var(--fp-gray-200)' : 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
                color: product.inventory.status === 'out-of-stock' ? 'var(--fp-gray-400)' : 'white',
                border: 'none',
                cursor: product.inventory.status === 'out-of-stock' ? 'not-allowed' : 'pointer',
                fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <ShoppingBag size={18} />
              {product.inventory.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* CTA */}
          <div style={{
            background: 'var(--fp-amber-glow)', borderRadius: 'var(--radius-lg)',
            padding: '20px 24px', marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <MapPin size={20} color="var(--fp-amber-dark)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)' }}>
                Available at both locations
              </div>
              <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>
                Visit us at Second Line or Trunk Road
              </div>
            </div>
            <Link href="/our-stores" style={{
              padding: '8px 20px', borderRadius: 'var(--radius-full)',
              background: 'var(--fp-navy)', color: 'white',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>
              Directions
            </Link>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          }}>
            {[
              { icon: Shield, label: 'Quality Guaranteed' },
              { icon: Truck, label: 'AutoShip Available' },
              { icon: RotateCcw, label: 'Easy Returns' },
            ].map((feat, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 6, padding: '16px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--fp-gray-100)',
                fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-400)',
                textAlign: 'center',
              }}>
                <feat.icon size={18} color="var(--fp-amber)" />
                {feat.label}
              </div>
            ))}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 8 }}>Tags</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 10px', fontSize: 11, fontWeight: 500,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--fp-gray-50)', color: 'var(--fp-gray-400)',
                  }}>#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{
          padding: '64px 24px', background: 'white',
          borderTop: '1px solid var(--fp-gray-100)',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
              color: 'var(--fp-navy)', marginBottom: 24,
            }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={`/shop/${rp.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--fp-gray-100)',
                    overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{
                      height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `linear-gradient(135deg, ${rp.petType.includes('dog') ? '#fef3c7' : '#dbeafe'}, white)`,
                    }}>
                      <div style={{ opacity: 0.2 }}>
                        {rp.petType.includes('dog') ? <Dog size={36} strokeWidth={1} color="var(--fp-navy)" /> : <Cat size={36} strokeWidth={1} color="var(--fp-navy)" />}
                      </div>
                    </div>
                    <div style={{ padding: '12px 14px 16px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--fp-amber-dark)', marginBottom: 4 }}>{rp.brand}</div>
                      <h4 style={{
                        fontSize: 13, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 6,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{rp.name}</h4>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--fp-navy)', fontFamily: 'var(--font-heading)' }}>
                        ${rp.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StorefrontFooter />
    </div>
  );
}
