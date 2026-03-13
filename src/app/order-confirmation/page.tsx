'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  CheckCircle2, Package, MapPin, Clock, Award,
  ArrowRight, Printer, ShoppingBag, PawPrint, Copy, Share2,
} from 'lucide-react';

interface OrderData {
  orderNumber: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  total: number;
  loyaltyPoints: number;
  customer: { name: string; email: string; phone: string; notes: string };
  store: string;
  timestamp: string;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('fp-last-order');
    if (data) {
      setOrder(JSON.parse(data));
    }
  }, []);

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
        <StorefrontHeader />
        <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
          <Package size={48} color="var(--fp-gray-200)" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--fp-navy)', marginBottom: 8 }}>
            No recent order found
          </h1>
          <p style={{ color: 'var(--fp-gray-400)', marginBottom: 24 }}>
            Place an order to see your confirmation here.
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

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      <section style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--fp-success-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'fadeIn 0.4s ease',
          }}>
            <CheckCircle2 size={36} color="var(--fp-success)" />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 900,
            color: 'var(--fp-navy)', marginBottom: 8,
          }}>Order Placed!</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 15 }}>
            Thank you, {order.customer.name}! Your order is being prepared.
          </p>
        </div>

        {/* Order Number Card */}
        <div style={{
          background: 'white', borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--fp-amber)',
          padding: '24px', marginBottom: 20, textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 4 }}>
            Order Number
          </div>
          <div style={{
            fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-heading)',
            color: 'var(--fp-navy)', letterSpacing: '0.05em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {order.orderNumber}
            <button onClick={copyOrderNumber} title="Copy" style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-300)',
            }}>
              <Copy size={16} />
            </button>
          </div>
          {copied && <span style={{ fontSize: 11, color: 'var(--fp-success)', fontWeight: 600 }}>Copied!</span>}
          <p style={{ fontSize: 12, color: 'var(--fp-gray-300)', marginTop: 6 }}>
            Show this number when picking up your order
          </p>
        </div>

        {/* Pickup Info */}
        <div style={{
          background: 'white', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--fp-gray-100)', padding: '24px', marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={16} color="var(--fp-amber)" /> Pickup Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 2, textTransform: 'uppercase' }}>Location</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>Foremost Pets — {order.store}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 2, textTransform: 'uppercase' }}>Estimated Ready</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={14} color="var(--fp-success)" /> Within 2 hours
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 2, textTransform: 'uppercase' }}>Email</div>
              <div style={{ fontSize: 14, color: 'var(--fp-gray-500)' }}>{order.customer.email}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fp-gray-400)', marginBottom: 2, textTransform: 'uppercase' }}>Phone</div>
              <div style={{ fontSize: 14, color: 'var(--fp-gray-500)' }}>{order.customer.phone}</div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={{
          background: 'white', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--fp-gray-100)', padding: '24px', marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fp-navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Package size={16} color="var(--fp-amber)" /> Items ({order.items.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < order.items.length - 1 ? '1px solid var(--fp-gray-50)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px solid var(--fp-gray-100)', marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fp-gray-400)' }}>
              <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fp-gray-400)' }}>
              <span>HST (13%)</span><span>${order.tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)', paddingTop: 8 }}>
              <span>Total Due at Pickup</span><span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Loyalty */}
        <div style={{
          background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
          borderRadius: 'var(--radius-xl)', padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32,
        }}>
          <Award size={28} color="white" />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>
              +{order.loyaltyPoints.toLocaleString()} Paw Rewards Points
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              Points will be credited after pickup
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => window.print()} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '12px 24px', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--fp-gray-200)', background: 'white',
            cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)',
          }}>
            <Printer size={14} /> Print Receipt
          </button>
          <Link href="/shop" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '12px 24px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-navy)', color: 'white',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
          }}>
            <ShoppingBag size={14} /> Continue Shopping
          </Link>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
