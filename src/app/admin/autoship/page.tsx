'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import { Repeat, Calendar, User, Package, DollarSign, Pause, Play, X, Plus, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AutoShipPage() {
  const { customers, cancelAutoShip, updateAutoShip } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const allSubscriptions = customers.flatMap(c =>
    c.autoShipSubscriptions.map(sub => ({ ...sub, customer: c }))
  );

  const active = allSubscriptions.filter(s => s.status === 'active');
  const paused = allSubscriptions.filter(s => s.status === 'paused');
  const upcomingThisWeek = active.filter(s => {
    const nextDate = new Date(s.nextDeliveryDate);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextDate >= now && nextDate <= weekFromNow;
  });

  const totalMonthlyRevenue = active.reduce((sum, s) => {
    const monthlyOrders = 30 / s.frequencyDays;
    return sum + (s.price * (1 - s.discount / 100) * monthlyOrders);
  }, 0);

  return (
    <AppShell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>AutoShip Subscriptions</h1>
        <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
          Automated recurring orders — set it and forget it
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="fp-stat-card animate-fade-in">
          <div className="fp-stat-label">Active Subscriptions</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-success)' }}>{active.length}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="fp-stat-label">Estimated Monthly Revenue</div>
          <div className="fp-stat-value" style={{ marginTop: 6 }}>${totalMonthlyRevenue.toFixed(0)}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="fp-stat-label">Due This Week</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-amber)' }}>{upcomingThisWeek.length}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="fp-stat-label">Paused</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-gray-400)' }}>{paused.length}</div>
        </div>
      </div>

      {/* Upcoming this week */}
      {upcomingThisWeek.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} color="var(--fp-amber)" />
            Due This Week
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
            {upcomingThisWeek.map(sub => (
              <div key={sub.id} className="fp-card" style={{
                padding: '18px 20px', borderLeft: '4px solid var(--fp-amber)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{sub.productName}</div>
                    <div style={{ fontSize: 13, color: 'var(--fp-gray-400)', marginTop: 2 }}>
                      {sub.customer.firstName} {sub.customer.lastName}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                      ${(sub.price * (1 - sub.discount / 100)).toFixed(2)}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fp-success)', fontWeight: 600 }}>
                      {sub.discount}% off
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 13, color: 'var(--fp-amber-dark)', fontWeight: 600,
                  marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Calendar size={14} />
                  Next: {new Date(sub.nextDeliveryDate).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Subscriptions */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>All Subscriptions</h2>
      <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Frequency</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Next Delivery</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allSubscriptions.map((sub, i) => (
              <tr key={sub.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {sub.customer.firstName} {sub.customer.lastName}
                  </div>
                </td>
                <td style={{ maxWidth: 200 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 500,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {sub.productName}
                  </div>
                </td>
                <td>Every {sub.frequencyDays} days</td>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>${sub.price.toFixed(2)}</td>
                <td>
                  <span className="fp-badge fp-badge-success">{sub.discount}% off</span>
                </td>
                <td style={{ fontSize: 13 }}>
                  {new Date(sub.nextDeliveryDate).toLocaleDateString('en-CA')}
                </td>
                <td>
                  <span className={`fp-badge fp-badge-${sub.status === 'active' ? 'success' : sub.status === 'paused' ? 'warning' : 'error'}`}>
                    {sub.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {sub.status === 'active' && (
                      <button onClick={() => {
                        updateAutoShip(sub.customerId, sub.id, { status: 'paused' });
                        toast.success('Subscription paused');
                      }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)', padding: 6 }}>
                        <Pause size={15} />
                      </button>
                    )}
                    {sub.status === 'paused' && (
                      <button onClick={() => {
                        updateAutoShip(sub.customerId, sub.id, { status: 'active' });
                        toast.success('Subscription resumed');
                      }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-success)', padding: 6 }}>
                        <Play size={15} />
                      </button>
                    )}
                    {sub.status !== 'cancelled' && (
                      <button onClick={() => {
                        cancelAutoShip(sub.customerId, sub.id);
                        toast.success('Subscription cancelled');
                      }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-300)', padding: 6 }}>
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
