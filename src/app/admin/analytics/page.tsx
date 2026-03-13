'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import {
  DollarSign, ShoppingCart, TrendingUp, TrendingDown,
  PawPrint, Star, ArrowUpRight, Calendar, CreditCard,
  Banknote, Gift, BarChart3, PieChart, Users,
  Dog, Cat, Fish,
} from 'lucide-react';

// Simple chart bar component
function BarChart({ data, maxValue }: { data: { label: string; value: number; color?: string }[]; maxValue: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, padding: '0 8px' }}>
      {data.map((item, i) => (
        <div key={i} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fp-navy)' }}>
            {item.value > 0 ? `$${item.value.toFixed(0)}` : ''}
          </span>
          <div style={{
            width: '100%', borderRadius: '6px 6px 0 0',
            background: item.color || 'var(--fp-amber)',
            height: `${maxValue > 0 ? (item.value / maxValue) * 140 : 2}px`,
            minHeight: 2,
            transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
          <span style={{ fontSize: 10, color: 'var(--fp-gray-400)', fontWeight: 500 }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// Donut chart component
function DonutChart({ segments, size = 140 }: {
  segments: { label: string; value: number; color: string }[]; size?: number;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let currentOffset = 0;
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const fraction = total > 0 ? seg.value / total : 0;
          const dashLength = fraction * circumference;
          const dashOffset = currentOffset;
          currentOffset += dashLength;
          return (
            <circle
              key={i}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={seg.color} strokeWidth={16}
              strokeDasharray={`${dashLength} ${circumference}`}
              strokeDashoffset={-dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          );
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{total}</div>
        <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>total</div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { orders, customers, products, getTopSellingProducts, getTodaysSales, getCustomerGrowth, getRevenueByPeriod } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState(7);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const todaysSales = getTodaysSales();
  const customerGrowth = getCustomerGrowth();
  const topProducts = getTopSellingProducts(5);
  const revenueData = getRevenueByPeriod(period);
  const totalRevenue = orders.filter(o => o.orderStatus === 'completed').reduce((s, o) => s + o.totalAmount, 0);

  // Payment method breakdown
  const paymentBreakdown = orders.reduce((acc, o) => {
    if (o.orderStatus === 'completed') {
      acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + o.totalAmount;
    }
    return acc;
  }, {} as Record<string, number>);

  const paymentColors: Record<string, string> = {
    cash: 'var(--fp-success)',
    credit: 'var(--fp-navy)',
    debit: 'var(--fp-info)',
    'gift-card': '#8b5cf6',
    'loyalty-points': 'var(--fp-amber)',
  };

  // Pet type distribution
  const petDistribution = customers.reduce((acc, c) => {
    c.pets.forEach(p => { acc[p.type] = (acc[p.type] || 0) + 1; });
    return acc;
  }, {} as Record<string, number>);

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1);

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Analytics</h1>
        <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
          Business intelligence dashboard for Foremost Pets
        </p>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="fp-stat-card animate-fade-in">
          <div className="fp-stat-label">Total Revenue</div>
          <div className="fp-stat-value" style={{ marginTop: 6 }}>
            ${totalRevenue.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="fp-stat-label">Total Orders</div>
          <div className="fp-stat-value" style={{ marginTop: 6 }}>{orders.filter(o => o.orderStatus === 'completed').length}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="fp-stat-label">Customer Retention</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-success)' }}>
            {customerGrowth.activeRate.toFixed(0)}%
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="fp-stat-label">Avg Order Value</div>
          <div className="fp-stat-value" style={{ marginTop: 6 }}>
            ${orders.length > 0 ? (totalRevenue / orders.filter(o => o.orderStatus === 'completed').length).toFixed(0) : '0'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginBottom: 24 }}>
        {/* Revenue Chart */}
        <div className="fp-card-flat" style={{ padding: 0 }}>
          <div style={{
            padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Revenue Trend</h3>
            <div style={{ display: 'flex', gap: 4 }}>
              {[7, 14, 30].map(d => (
                <button key={d} onClick={() => setPeriod(d)} style={{
                  padding: '4px 12px', borderRadius: 'var(--radius-full)',
                  border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: period === d ? 'var(--fp-navy)' : 'var(--fp-gray-50)',
                  color: period === d ? 'white' : 'var(--fp-gray-400)',
                }}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <BarChart
              data={revenueData.map(d => ({
                label: new Date(d.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
                value: d.revenue,
              }))}
              maxValue={maxRevenue}
            />
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="fp-card-flat" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Payment Methods</h3>
          </div>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <DonutChart
              segments={Object.entries(paymentBreakdown).map(([method, value]) => ({
                label: method, value, color: paymentColors[method] || 'var(--fp-gray-300)',
              }))}
            />
          </div>
          <div style={{ padding: '0 24px 20px' }}>
            {Object.entries(paymentBreakdown).map(([method, value]) => (
              <div key={method} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid var(--fp-gray-100)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: paymentColors[method] || 'var(--fp-gray-300)',
                  }} />
                  <span style={{ fontSize: 13, textTransform: 'capitalize' }}>{method}</span>
                </div>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: 14 }}>
                  ${value.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Top Products */}
        <div className="fp-card-flat" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Top Selling Products</h3>
          </div>
          {topProducts.map((item, i) => (
            <div key={item.product.id} style={{
              padding: '14px 24px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                background: 'var(--fp-amber-glow)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-heading)',
                color: 'var(--fp-amber-dark)',
              }}>
                #{i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.product.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                  {item.totalSold} sold • {item.product.brand}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                ${item.revenue.toFixed(0)}
              </div>
            </div>
          ))}
        </div>

        {/* Pet Distribution */}
        <div className="fp-card-flat" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Pet Population</h3>
          </div>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
            <DonutChart
              segments={Object.entries(petDistribution).map(([type, count]) => ({
                label: type,
                value: count,
                color: type === 'dog' ? 'var(--fp-amber)' : type === 'cat' ? 'var(--fp-info)' : 'var(--fp-success)',
              }))}
              size={160}
            />
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            {Object.entries(petDistribution).map(([type, count]) => (
              <div key={type} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: '1px solid var(--fp-gray-100)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>
                    {type === 'dog' ? <Dog size={14} /> : type === 'cat' ? <Cat size={14} /> : <Fish size={14} />}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize' }}>{type}s</span>
                </div>
                <span style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: 18 }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
