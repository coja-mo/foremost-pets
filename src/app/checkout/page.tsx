'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { useStoreLocation } from '@/components/StoreLocationContext';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  ShoppingBag, MapPin, User, Phone, Mail, FileText,
  ArrowRight, ArrowLeft, Shield, Clock, PawPrint, ChevronDown,
  Minus, Plus, Trash2, Award, Package,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal: cartSubtotal, clearCart } = useCart();
  const { currentStore, allStores, setStoreById } = useStoreLocation();
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: '', notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const TAX_RATE = 0.13;
  const subtotal = cartSubtotal;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const loyaltyPoints = Math.floor(subtotal * 10);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerInfo.name.trim()) errs.name = 'Name is required';
    if (!customerInfo.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) errs.email = 'Valid email required';
    if (!customerInfo.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      const orderNumber = `FP-${Date.now().toString(36).toUpperCase()}`;
      sessionStorage.setItem('fp-last-order', JSON.stringify({
        orderNumber,
        items: items.map(i => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
        subtotal, tax, total, loyaltyPoints,
        customer: customerInfo,
        store: currentStore.shortName,
        timestamp: new Date().toISOString(),
      }));
      clearCart();
      router.push('/order-confirmation');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
        <StorefrontHeader />
        <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
          <ShoppingBag size={48} color="var(--fp-gray-200)" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--fp-navy)', marginBottom: 8 }}>
            Your cart is empty
          </h1>
          <p style={{ color: 'var(--fp-gray-400)', marginBottom: 24 }}>
            Add some products to your cart before checking out.
          </p>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-navy)', color: 'white',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            Browse Shop <ArrowRight size={16} />
          </Link>
        </section>
        <StorefrontFooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, color: 'var(--fp-gray-400)' }}>
          <Link href="/shop" style={{ color: 'var(--fp-gray-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 900,
          color: 'var(--fp-navy)', marginBottom: 32,
        }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32 }}>
          {/* Left — Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Customer Info */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)', padding: '28px',
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <User size={18} color="var(--fp-amber)" /> Your Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-500)', marginBottom: 4, display: 'block' }}>Full Name *</label>
                  <input className="fp-input" placeholder="John Smith" value={customerInfo.name}
                    onChange={e => setCustomerInfo(p => ({ ...p, name: e.target.value }))}
                    style={{ width: '100%', borderColor: errors.name ? 'var(--fp-error)' : undefined }}
                  />
                  {errors.name && <span style={{ fontSize: 11, color: 'var(--fp-error)' }}>{errors.name}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-500)', marginBottom: 4, display: 'block' }}>Email *</label>
                  <input className="fp-input" type="email" placeholder="john@example.com" value={customerInfo.email}
                    onChange={e => setCustomerInfo(p => ({ ...p, email: e.target.value }))}
                    style={{ width: '100%', borderColor: errors.email ? 'var(--fp-error)' : undefined }}
                  />
                  {errors.email && <span style={{ fontSize: 11, color: 'var(--fp-error)' }}>{errors.email}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-500)', marginBottom: 4, display: 'block' }}>Phone *</label>
                  <input className="fp-input" type="tel" placeholder="(705) 555-0123" value={customerInfo.phone}
                    onChange={e => setCustomerInfo(p => ({ ...p, phone: e.target.value }))}
                    style={{ width: '100%', borderColor: errors.phone ? 'var(--fp-error)' : undefined }}
                  />
                  {errors.phone && <span style={{ fontSize: 11, color: 'var(--fp-error)' }}>{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Pickup Location */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)', padding: '28px',
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <MapPin size={18} color="var(--fp-amber)" /> Pickup Location
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {allStores.map(store => (
                  <button key={store.id} onClick={() => setStoreById(store.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${currentStore.id === store.id ? 'var(--fp-amber)' : 'var(--fp-gray-100)'}`,
                    background: currentStore.id === store.id ? 'var(--fp-amber-glow)' : 'white',
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: currentStore.id === store.id ? 'var(--fp-amber)' : 'var(--fp-gray-100)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <MapPin size={18} color={currentStore.id === store.id ? 'white' : 'var(--fp-gray-400)'} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)' }}>
                        {store.shortName}
                        {store.isPrimary && <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--fp-amber-dark)', background: 'rgba(245,158,11,0.15)', padding: '2px 6px', borderRadius: 'var(--radius-full)', marginLeft: 6 }}>MAIN</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{store.address.street} • {store.phone}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)', padding: '28px',
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <FileText size={18} color="var(--fp-amber)" /> Order Notes
                <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--fp-gray-300)' }}>(optional)</span>
              </h2>
              <textarea className="fp-input" rows={3} placeholder="Any special requests or notes for your order..."
                value={customerInfo.notes}
                onChange={e => setCustomerInfo(p => ({ ...p, notes: e.target.value }))}
                style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Right — Order Summary */}
          <div>
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)', padding: '28px',
              position: 'sticky', top: 96,
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Package size={18} color="var(--fp-amber)" /> Order Summary
              </h2>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20, maxHeight: 300, overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>{item.product.brand}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{
                        width: 24, height: 24, borderRadius: 4, border: '1px solid var(--fp-gray-200)',
                        background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><Minus size={10} /></button>
                      <span style={{ fontSize: 13, fontWeight: 700, width: 24, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{
                        width: 24, height: 24, borderRadius: 4, border: '1px solid var(--fp-gray-200)',
                        background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><Plus size={10} /></button>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)', minWidth: 60, textAlign: 'right' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button onClick={() => removeItem(item.product.id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-300)',
                    }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid var(--fp-gray-100)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fp-gray-500)' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fp-gray-500)' }}>
                  <span>HST (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)', borderTop: '2px solid var(--fp-gray-100)', paddingTop: 12, marginTop: 4 }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Loyalty Points */}
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 'var(--radius-md)',
                background: 'var(--fp-amber-glow)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Award size={16} color="var(--fp-amber-dark)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-amber-dark)' }}>
                  Earn {loyaltyPoints.toLocaleString()} Paw Rewards points
                </span>
              </div>

              {/* Pickup info */}
              <div style={{
                marginTop: 12, padding: '12px 16px', borderRadius: 'var(--radius-md)',
                background: 'var(--fp-gray-50)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <MapPin size={14} color="var(--fp-gray-400)" />
                <span style={{ fontSize: 12, color: 'var(--fp-gray-500)' }}>
                  Pickup at <strong>{currentStore.shortName}</strong>
                </span>
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} disabled={submitting} style={{
                width: '100%', marginTop: 20, padding: '16px',
                borderRadius: 'var(--radius-full)',
                background: submitting ? 'var(--fp-gray-300)' : 'var(--fp-navy)',
                color: 'white', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: 15, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s ease',
              }}>
                {submitting ? (
                  <>Processing...</>
                ) : (
                  <>Place Order — ${total.toFixed(2)} <ArrowRight size={16} /></>
                )}
              </button>

              {/* Trust */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { icon: Shield, text: 'Pay in store — no credit card needed' },
                  { icon: Clock, text: 'Ready for pickup within 2 hours' },
                  { icon: PawPrint, text: 'Paw Rewards points earned automatically' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--fp-gray-400)' }}>
                    <item.icon size={12} /> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
