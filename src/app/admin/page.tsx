'use client';

import React, { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import { LOYALTY_CONFIG, STORE_LOCATIONS } from '@/lib/store-config';
import {
  DollarSign, ShoppingCart, Users, TrendingUp, Package,
  ArrowUpRight, ArrowDownRight, PawPrint, Star, Heart,
  Clock, AlertTriangle, Gift, Repeat, BarChart3, CreditCard,
} from 'lucide-react';
import Link from 'next/link';

// ---- Stat Card ----
function StatCard({ icon: Icon, label, value, change, changeType, color, delay = 0 }: {
  icon: React.ElementType; label: string; value: string; change?: string;
  changeType?: 'up' | 'down'; color: string; delay?: number;
}) {
  return (
    <div className="fp-stat-card animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="fp-stat-label">{label}</div>
          <div className="fp-stat-value" style={{ marginTop: 8 }}>{value}</div>
          {change && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4, marginTop: 8,
              fontSize: 13, fontWeight: 600,
              color: changeType === 'up' ? 'var(--fp-success)' : 'var(--fp-error)',
            }}>
              {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {change}
            </div>
          )}
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: 'var(--radius-md)',
          background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color="white" />
        </div>
      </div>
    </div>
  );
}

// ---- Recent Orders Table ----
function RecentOrders() {
  const { orders } = useForemostStore();
  const recentOrders = orders.slice(0, 8);

  return (
    <div className="fp-card-flat" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h3>
        <Link href="/admin/orders" style={{
          fontSize: 13, color: 'var(--fp-amber-dark)', fontWeight: 600,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          View All <ArrowUpRight size={14} />
        </Link>
      </div>
      <table className="fp-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, i) => (
            <tr key={order.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <td style={{ fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{order.orderNumber}</td>
              <td>{order.customerName}</td>
              <td>{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
              <td style={{ fontWeight: 600 }}>${order.totalAmount.toFixed(2)}</td>
              <td>
                <span className={`fp-badge fp-badge-${order.orderStatus === 'completed' ? 'success' : order.orderStatus === 'refunded' ? 'error' : 'warning'}`}>
                  {order.orderStatus}
                </span>
              </td>
              <td style={{ color: 'var(--fp-gray-400)', fontSize: 13 }}>
                {new Date(order.createdAt).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Low Stock Alerts ----
function LowStockAlerts() {
  const { getLowStockProducts } = useForemostStore();
  const lowStock = getLowStockProducts();

  return (
    <div className="fp-card-flat" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <AlertTriangle size={18} color="var(--fp-warning)" />
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>Low Stock Alerts</h3>
        <span className="fp-badge fp-badge-warning">{lowStock.length}</span>
      </div>
      {lowStock.length === 0 ? (
        <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--fp-gray-300)' }}>
          <Package size={32} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 14 }}>All stock levels healthy! 🎉</div>
        </div>
      ) : (
        <div>
          {lowStock.map((product, i) => (
            <div key={product.id} style={{
              padding: '14px 24px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{product.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{product.brand} • {product.sku}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-heading)',
                  color: product.inventory.quantity === 0 ? 'var(--fp-error)' : 'var(--fp-warning)',
                }}>
                  {product.inventory.quantity}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>remaining</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Top Customers ----
function TopCustomers() {
  const { customers } = useForemostStore();
  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  const tierColors: Record<string, string> = {
    'paw': 'var(--fp-tier-paw)',
    'silver-paw': 'var(--fp-tier-silver)',
    'gold-paw': 'var(--fp-tier-gold)',
    'diamond-paw': 'var(--fp-tier-diamond)',
  };

  const tierIcons: Record<string, string> = {
    'paw': '🐾',
    'silver-paw': '🥈',
    'gold-paw': '⭐',
    'diamond-paw': '💎',
  };

  return (
    <div className="fp-card-flat" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>Top Customers</h3>
        <Link href="/admin/customers" style={{
          fontSize: 13, color: 'var(--fp-amber-dark)', fontWeight: 600,
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          View All <ArrowUpRight size={14} />
        </Link>
      </div>
      {topCustomers.map((customer, i) => (
        <div key={customer.id} style={{
          padding: '14px 24px', borderBottom: '1px solid var(--fp-gray-100)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-md)',
            background: `linear-gradient(135deg, ${tierColors[customer.loyaltyTier]}22, ${tierColors[customer.loyaltyTier]}44)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>
            {tierIcons[customer.loyaltyTier]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {customer.firstName} {customer.lastName}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
              {customer.pets.map(p => p.name).join(', ')} • {customer.totalOrders} orders
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              ${customer.totalSpent.toFixed(0)}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600,
              color: tierColors[customer.loyaltyTier],
              textTransform: 'uppercase',
            }}>
              {customer.loyaltyPoints.toLocaleString()} pts
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Quick Actions ----
function QuickActions() {
  const actions = [
    { label: 'New Sale', icon: CreditCard, href: '/admin/pos', color: 'var(--fp-amber)' },
    { label: 'Add Customer', icon: Users, href: '/admin/customers', color: 'var(--fp-info)' },
    { label: 'Add Product', icon: Package, href: '/admin/products', color: 'var(--fp-success)' },
    { label: 'Gift Cards', icon: Gift, href: '/admin/gift-cards', color: '#8b5cf6' },
    { label: 'Promotions', icon: Star, href: '/admin/promotions', color: 'var(--fp-amber-dark)' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'var(--fp-navy)' },
  ];

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12,
      marginBottom: 24,
    }}>
      {actions.map((action, i) => (
        <Link key={action.label} href={action.href} className="fp-card animate-fade-in" style={{
          padding: '18px 16px', textDecoration: 'none', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          animationDelay: `${i * 50}ms`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 'var(--radius-md)',
            background: `${action.color}15`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <action.icon size={20} color={action.color} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-navy)' }}>
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

// ---- Main Dashboard Page ----
export default function DashboardPage() {
  const { getTodaysSales, getCustomerGrowth, getInventoryValue, products, customers, orders } = useForemostStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <AppShell>
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div className="fp-skeleton" style={{ width: 200, height: 30, margin: '0 auto 20px' }} />
          <div className="fp-skeleton" style={{ width: 300, height: 20, margin: '0 auto' }} />
        </div>
      </AppShell>
    );
  }

  const todaysSales = getTodaysSales();
  const customerGrowth = getCustomerGrowth();
  const inventoryValue = getInventoryValue();

  return (
    <AppShell>
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 8,
        }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>
              Welcome back <span style={{ color: 'var(--fp-amber)' }}>👋</span>
            </h1>
            <p style={{ color: 'var(--fp-gray-400)', fontSize: 15, marginTop: 4 }}>
              Here&apos;s what&apos;s happening at Foremost Pets today
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 'var(--radius-full)',
            background: 'var(--fp-amber-glow)', border: '1px solid rgba(245, 158, 11, 0.2)',
          }}>
            <Clock size={14} color="var(--fp-amber-dark)" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fp-amber-dark)' }}>
              {new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <div className="fp-dashboard-grid" style={{ marginBottom: 24 }}>
        <StatCard
          icon={DollarSign} label="Today's Revenue"
          value={`$${todaysSales.revenue.toFixed(2)}`}
          change="+12.5% vs yesterday" changeType="up"
          color="var(--fp-success)" delay={0}
        />
        <StatCard
          icon={ShoppingCart} label="Today's Orders"
          value={todaysSales.orders.toString()}
          change={`$${todaysSales.avgOrder.toFixed(0)} avg`} changeType="up"
          color="var(--fp-amber)" delay={50}
        />
        <StatCard
          icon={Users} label="Total Customers"
          value={customerGrowth.total.toString()}
          change={`${customerGrowth.newThisMonth} new this month`} changeType="up"
          color="var(--fp-info)" delay={100}
        />
        <StatCard
          icon={Package} label="Inventory Value"
          value={`$${inventoryValue.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          change={`${products.length} products`} changeType="up"
          color="var(--fp-navy)" delay={150}
        />
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <RecentOrders />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <TopCustomers />
          <LowStockAlerts />
        </div>
      </div>
    </AppShell>
  );
}
