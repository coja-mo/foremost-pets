'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import toast from 'react-hot-toast';
import {
  ShoppingBag, Search, Filter, Eye, RefreshCw, DollarSign,
  Calendar, User, CreditCard, ArrowUpRight, X, Package, Star,
} from 'lucide-react';

export default function OrdersPage() {
  const { orders, refundOrder } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const filtered = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = filtered.reduce((sum, o) => sum + (o.orderStatus === 'completed' ? o.totalAmount : 0), 0);
  const detail = selectedOrder ? orders.find(o => o.id === selectedOrder) : null;

  return (
    <AppShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Orders</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
            {orders.length} total orders • ${totalRevenue.toFixed(2)} revenue
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Completed', count: orders.filter(o => o.orderStatus === 'completed').length, color: 'var(--fp-success)' },
          { label: 'Processing', count: orders.filter(o => o.orderStatus === 'processing').length, color: 'var(--fp-warning)' },
          { label: 'Refunded', count: orders.filter(o => o.orderStatus === 'refunded').length, color: 'var(--fp-error)' },
          { label: 'Avg Order', count: orders.length > 0 ? `$${(totalRevenue / orders.filter(o => o.orderStatus === 'completed').length).toFixed(0)}` : '$0', color: 'var(--fp-info)' },
        ].map((stat, i) => (
          <div key={stat.label} className="fp-stat-card animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="fp-stat-label">{stat.label}</div>
            <div className="fp-stat-value" style={{ color: stat.color, marginTop: 6 }}>
              {typeof stat.count === 'number' ? stat.count : stat.count}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="fp-card-flat" style={{ padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12 }}>
        <input
          type="text" placeholder="Search orders..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="fp-input fp-input-search" style={{ flex: 1 }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="fp-input" style={{ width: 160 }}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="refunded">Refunded</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <tr key={order.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: 13 }}>
                  {order.orderNumber}
                </td>
                <td>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{order.customerName}</div>
                  <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>{order.channel}</div>
                </td>
                <td>{order.items.length}</td>
                <td>${order.subtotal.toFixed(2)}</td>
                <td style={{ color: 'var(--fp-gray-400)' }}>${order.taxAmount.toFixed(2)}</td>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <span className="fp-badge fp-badge-info" style={{ textTransform: 'capitalize' }}>
                    {order.paymentMethod}
                  </span>
                </td>
                <td>
                  <span className={`fp-badge fp-badge-${order.orderStatus === 'completed' ? 'success' : order.orderStatus === 'refunded' ? 'error' : 'warning'}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-CA')}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => setSelectedOrder(order.id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)', padding: 6,
                    }}>
                      <Eye size={15} />
                    </button>
                    {order.orderStatus === 'completed' && (
                      <button onClick={() => { refundOrder(order.id); toast.success('Order refunded'); }} style={{
                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-300)', padding: 6,
                      }}>
                        <RefreshCw size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail */}
      {detail && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'flex-end', zIndex: 100, backdropFilter: 'blur(4px)',
        }}>
          <div className="animate-slide-in-right" style={{
            width: 480, background: 'var(--fp-white)', height: '100%',
            overflowY: 'auto', boxShadow: 'var(--shadow-xl)',
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              position: 'sticky', top: 0, background: 'var(--fp-white)', zIndex: 1,
            }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{detail.orderNumber}</h2>
                <span className={`fp-badge fp-badge-${detail.orderStatus === 'completed' ? 'success' : 'error'}`}>
                  {detail.orderStatus}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)',
              }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <User size={16} color="var(--fp-gray-400)" />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{detail.customerName}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <Calendar size={16} color="var(--fp-gray-400)" />
                  <span style={{ fontSize: 14 }}>{new Date(detail.createdAt).toLocaleString('en-CA')}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CreditCard size={16} color="var(--fp-gray-400)" />
                  <span style={{ fontSize: 14, textTransform: 'capitalize' }}>{detail.paymentMethod}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Items</h3>
              {detail.items.map(item => (
                <div key={item.id} style={{
                  padding: '12px 0', borderBottom: '1px solid var(--fp-gray-100)',
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.productName}</div>
                    <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                      {item.sku} • Qty: {item.quantity} • ${item.unitPrice.toFixed(2)} each
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    ${item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '2px solid var(--fp-gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <span>Subtotal</span><span>${detail.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <span>HST (13%)</span><span>${detail.taxAmount.toFixed(2)}</span>
                </div>
                {detail.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6, color: 'var(--fp-success)' }}>
                    <span>Discount</span><span>-${detail.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: 8,
                }}>
                  <span>Total</span><span>${detail.totalAmount.toFixed(2)}</span>
                </div>
                {detail.loyaltyPointsEarned > 0 && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--fp-amber-dark)', fontWeight: 600 }}>
                    <Star size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} color="var(--fp-amber)" /> {detail.loyaltyPointsEarned} loyalty points earned
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
