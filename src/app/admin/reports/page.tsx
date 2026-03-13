'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import {
  FileText, DollarSign, ShoppingCart, TrendingUp, Users,
  Calendar, Printer, Download, CreditCard, Banknote,
  BarChart3, Clock,
} from 'lucide-react';

export default function ReportsPage() {
  const { orders, employees, currentEmployee, getTodaysSales } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const today = new Date().toISOString().split('T')[0];
  const todaySales = getTodaysSales();

  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    if (period === 'week') start.setDate(start.getDate() - 7);
    else if (period === 'month') start.setDate(start.getDate() - 30);
    return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
  };

  const range = getDateRange();
  const periodOrders = orders.filter(o => {
    const d = o.createdAt.split('T')[0];
    if (period === 'today') return d === today;
    return d >= range.start && d <= range.end;
  });

  const completedOrders = periodOrders.filter(o => o.orderStatus === 'completed');
  const refundedOrders = periodOrders.filter(o => o.orderStatus === 'refunded');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalTax = completedOrders.reduce((sum, o) => sum + o.taxAmount, 0);
  const avgOrder = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
  const refundValue = refundedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Payment method breakdown
  const paymentBreakdown: Record<string, { count: number; total: number }> = {};
  completedOrders.forEach(o => {
    if (!paymentBreakdown[o.paymentMethod]) paymentBreakdown[o.paymentMethod] = { count: 0, total: 0 };
    paymentBreakdown[o.paymentMethod].count++;
    paymentBreakdown[o.paymentMethod].total += o.totalAmount;
  });

  // Employee performance
  const empPerf: Record<string, { name: string; sales: number; orders: number }> = {};
  completedOrders.forEach(o => {
    if (!empPerf[o.employeeId]) empPerf[o.employeeId] = { name: o.employeeName, sales: 0, orders: 0 };
    empPerf[o.employeeId].sales += o.totalAmount;
    empPerf[o.employeeId].orders++;
  });
  const empPerfArr = Object.values(empPerf).sort((a, b) => b.sales - a.sales);

  // Hours breakdown (for today)
  const hourlyData: Record<number, { revenue: number; orders: number }> = {};
  if (period === 'today') {
    completedOrders.forEach(o => {
      const hour = new Date(o.createdAt).getHours();
      if (!hourlyData[hour]) hourlyData[hour] = { revenue: 0, orders: 0 };
      hourlyData[hour].revenue += o.totalAmount;
      hourlyData[hour].orders++;
    });
  }

  // Loyalty points earned
  const totalPointsEarned = completedOrders.reduce((sum, o) => sum + (o.loyaltyPointsEarned || 0), 0);

  const paymentMethodColors: Record<string, string> = {
    cash: 'var(--fp-success)', debit: 'var(--fp-info)', credit: 'var(--fp-navy)', 'gift-card': '#8b5cf6',
  };

  const paymentMethodIcons: Record<string, React.ElementType> = {
    cash: Banknote, debit: CreditCard, credit: CreditCard, 'gift-card': DollarSign,
  };

  return (
    <AppShell>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Reports</h1>
            <p style={{ fontSize: 14, color: 'var(--fp-gray-400)' }}>
              {period === 'today' ? 'Today\'s' : period === 'week' ? 'This Week\'s' : 'This Month\'s'} performance summary
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Period selector */}
            <div style={{ display: 'flex', borderRadius: 'var(--radius-md)', border: '1px solid var(--fp-gray-200)', overflow: 'hidden' }}>
              {(['today', 'week', 'month'] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding: '8px 16px', border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: period === p ? 600 : 400,
                  background: period === p ? 'var(--fp-navy)' : 'white',
                  color: period === p ? 'white' : 'var(--fp-gray-500)',
                  textTransform: 'capitalize',
                }}>{p}</button>
              ))}
            </div>
            <button onClick={() => window.print()} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--fp-gray-200)', background: 'white',
              cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)',
            }}>
              <Printer size={14} /> Print
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'var(--fp-success)' },
            { label: 'Total Orders', value: completedOrders.length.toString(), icon: ShoppingCart, color: 'var(--fp-info)' },
            { label: 'Avg Order Value', value: `$${avgOrder.toFixed(2)}`, icon: TrendingUp, color: 'var(--fp-amber)' },
            { label: 'Tax Collected', value: `$${totalTax.toFixed(2)}`, icon: FileText, color: 'var(--fp-navy)' },
          ].map((stat, i) => (
            <div key={i} className="fp-card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--fp-gray-400)', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)' }}>{stat.value}</div>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: `${stat.color}15`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Payment Method Breakdown */}
          <div className="fp-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={18} color="var(--fp-amber)" /> Payment Methods
            </h3>
            {Object.entries(paymentBreakdown).length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--fp-gray-300)' }}>
                No transactions in this period
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {Object.entries(paymentBreakdown).map(([method, data]) => {
                  const Icon = paymentMethodIcons[method] || DollarSign;
                  return (
                    <div key={method} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 'var(--radius-md)',
                        background: `${paymentMethodColors[method] || 'var(--fp-gray-300)'}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color={paymentMethodColors[method] || 'var(--fp-gray-300)'} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)', textTransform: 'capitalize' }}>
                          {method.replace('-', ' ')}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                          {data.count} transaction{data.count !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)',
                        color: 'var(--fp-navy)',
                      }}>
                        ${data.total.toFixed(2)}
                      </div>
                      <div style={{
                        fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-400)',
                        width: 48, textAlign: 'right',
                      }}>
                        {totalRevenue > 0 ? ((data.total / totalRevenue) * 100).toFixed(0) : 0}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Employee Performance */}
          <div className="fp-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="var(--fp-amber)" /> Staff Performance
            </h3>
            {empPerfArr.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--fp-gray-300)' }}>
                No sales data in this period
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {empPerfArr.map((emp, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: i === 0 ? '#fef3c7' : 'var(--fp-gray-50)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, color: i === 0 ? 'var(--fp-amber-dark)' : 'var(--fp-gray-400)',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>{emp.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                        {emp.orders} order{emp.orders !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)',
                      color: 'var(--fp-navy)',
                    }}>
                      ${emp.sales.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional stats */}
          <div className="fp-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart3 size={18} color="var(--fp-amber)" /> Additional Metrics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Refunds', value: `$${refundValue.toFixed(2)} (${refundedOrders.length})`, color: 'var(--fp-error)' },
                { label: 'Loyalty Points Distributed', value: totalPointsEarned.toLocaleString(), color: 'var(--fp-amber-dark)' },
                { label: 'Items Sold', value: completedOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0).toString(), color: 'var(--fp-success)' },
                { label: 'Unique Customers', value: new Set(completedOrders.filter(o => o.customerId).map(o => o.customerId)).size.toString(), color: 'var(--fp-info)' },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  background: 'var(--fp-gray-50)',
                }}>
                  <span style={{ fontSize: 14, color: 'var(--fp-gray-500)' }}>{stat.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="fp-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="var(--fp-amber)" /> Recent Transactions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
              {periodOrders.slice(0, 10).map(order => (
                <div key={order.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)', background: 'var(--fp-gray-50)',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)' }}>{order.orderNumber}</div>
                    <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                      {order.customerName} • {new Date(order.createdAt).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                    background: order.orderStatus === 'completed' ? '#dcfce7' : '#fee2e2',
                    color: order.orderStatus === 'completed' ? '#16a34a' : '#dc2626',
                    fontWeight: 600,
                  }}>
                    {order.orderStatus}
                  </span>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)' }}>
                    ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              ))}
              {periodOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: 'var(--fp-gray-300)' }}>
                  No transactions in this period
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
