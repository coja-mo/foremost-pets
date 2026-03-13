'use client';

import React from 'react';
import { useForemostStore } from '@/lib/store';
import { STORE_CONFIG, STORE_LOCATIONS } from '@/lib/store-config';
import {
  X, Printer, Mail, ShoppingBag, PawPrint, Heart,
  MapPin, Phone, Clock, Check,
} from 'lucide-react';
import type { Order } from '@/lib/types';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
  onNewSale: () => void;
}

export default function ReceiptModal({ order, onClose, onNewSale }: ReceiptModalProps) {
  const { selectedLocation, customers 
  } = useForemostStore();
  const location = STORE_LOCATIONS.find(l => l.id === selectedLocation) || STORE_LOCATIONS[0];
  const customer = order.customerId ? customers.find(c => c.id === order.customerId) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
    }}>
      <div className="animate-scale-in" style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        width: 420, maxHeight: '90vh', overflowY: 'auto',
        boxShadow: 'var(--shadow-xl)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--fp-success)', fontSize: 14, fontWeight: 700,
          }}>
            <Check size={18} /> Sale Complete!
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)',
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Receipt Content - printable area */}
        <div id="receipt-content" style={{ padding: '0 24px' }}>
          {/* Store header */}
          <div style={{ textAlign: 'center', paddingBottom: 16, borderBottom: '2px dashed var(--fp-gray-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
              <PawPrint size={18} color="var(--fp-amber)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18, color: 'var(--fp-navy)' }}>
                FOREMOST PETS
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fp-gray-400)', lineHeight: 1.6 }}>
              <div>{location.address.street}, {location.address.city}, {location.address.province}</div>
              <div>{location.phone}</div>
            </div>
          </div>

          {/* Order info */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '12px 0', fontSize: 12, color: 'var(--fp-gray-400)',
            borderBottom: '1px solid var(--fp-gray-100)',
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>{order.orderNumber}</div>
              <div>{new Date(order.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              <div>{new Date(order.createdAt).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>
                {customer ? `${customer.firstName} ${customer.lastName}` : 'Walk-in Customer'}
              </div>
              <div>Served by: {order.employeeName}</div>
            </div>
          </div>

          {/* Line items */}
          <div style={{ padding: '12px 0', borderBottom: '1px solid var(--fp-gray-100)' }}>
            {order.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '6px 0', fontSize: 13,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>{item.productName}</div>
                  <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                    {item.quantity} × ${item.unitPrice.toFixed(2)}
                  </div>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>
                  ${item.totalPrice.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ padding: '12px 0', fontSize: 13, borderBottom: '2px dashed var(--fp-gray-200)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: 'var(--fp-gray-500)' }}>
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: 'var(--fp-success)' }}>
                <span>Discount</span>
                <span>-${order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--fp-gray-500)' }}>
              <span>HST (13%)</span>
              <span>${order.taxAmount.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 18, fontWeight: 900, fontFamily: 'var(--font-heading)',
              color: 'var(--fp-navy)',
            }}>
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment & Loyalty */}
          <div style={{ padding: '12px 0', fontSize: 12, color: 'var(--fp-gray-400)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>Payment Method</span>
              <span style={{ fontWeight: 600, color: 'var(--fp-navy)', textTransform: 'capitalize' }}>
                {order.paymentMethod.replace('-', ' ')}
              </span>
            </div>
            {order.loyaltyPointsEarned > 0 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, padding: '10px', marginTop: 8,
                background: 'var(--fp-amber-glow)', borderRadius: 'var(--radius-md)',
                color: 'var(--fp-amber-dark)', fontWeight: 600, fontSize: 13,
              }}>
                <Heart size={14} /> +{order.loyaltyPointsEarned} Paw Reward Points Earned!
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center', padding: '12px 0 4px',
            borderTop: '1px solid var(--fp-gray-100)',
            fontSize: 11, color: 'var(--fp-gray-300)',
          }}>
            <p>Thank you for shopping with Foremost Pets! 🐾</p>
            <p>www.foremostpetfoods.ca</p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          padding: '16px 24px 20px',
          display: 'flex', gap: 10,
        }}>
          <button onClick={handlePrint} style={{
            flex: 1, padding: '12px 0', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--fp-gray-200)', background: 'white',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            color: 'var(--fp-navy)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Printer size={14} /> Print
          </button>
          <button onClick={() => {}} style={{
            flex: 1, padding: '12px 0', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--fp-gray-200)', background: 'white',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            color: 'var(--fp-navy)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Mail size={14} /> Email
          </button>
          <button onClick={onNewSale} style={{
            flex: 1.5, padding: '12px 0', borderRadius: 'var(--radius-md)',
            border: 'none', background: 'var(--fp-navy)',
            cursor: 'pointer', fontSize: 13, fontWeight: 700,
            color: 'white', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <ShoppingBag size={14} /> New Sale
          </button>
        </div>
      </div>
    </div>
  );
}
