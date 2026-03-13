'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useForemostStore } from '@/lib/store';
import AuthGuard from '@/components/AuthGuard';
import {
  Home, ShoppingBag, Users, Package, Gift, Tag, BarChart3,
  Settings, Bell, Search, Menu, X, LogOut, ChevronDown,
  Store, CreditCard, Repeat, Truck, PawPrint, Dog, Cat, Fish,
  Shield, UserCircle, Heart, FileText,
} from 'lucide-react';

// ---- SVG Logo Component ----
function ForemostLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: '12px',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <PawPrint size={22} color="#f59e0b" strokeWidth={2.5} />
      </div>
      {!collapsed && (
        <div>
          <div style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 18, color: 'var(--fp-navy)', lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            FOREMOST
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)', fontWeight: 400,
            fontSize: 12, color: 'var(--fp-gray-400)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            PETS
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Navigation Configuration ----
const mainNav = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/pos', label: 'Point of Sale', icon: CreditCard },
];

const managementNav = [
  { href: '/admin/loyalty', label: 'Loyalty Program', icon: Heart },
  { href: '/admin/gift-cards', label: 'Gift Cards', icon: Gift },
  { href: '/admin/promotions', label: 'Promotions', icon: Tag },
  { href: '/admin/autoship', label: 'AutoShip', icon: Repeat },
  { href: '/admin/inventory', label: 'Inventory', icon: Truck },
];

const analyticsNav = [
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

// ---- Sidebar Component ----
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { currentEmployee } = useForemostStore();

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} onClick={onClose} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px', borderRadius: 'var(--radius-md)',
        color: isActive ? 'var(--fp-navy)' : 'var(--fp-gray-400)',
        background: isActive ? 'var(--fp-amber-glow)' : 'transparent',
        fontWeight: isActive ? 600 : 500, fontSize: 14,
        textDecoration: 'none',
        transition: 'all var(--transition-fast)',
        position: 'relative',
      }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.background = 'var(--fp-gray-50)';
            e.currentTarget.style.color = 'var(--fp-navy)';
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--fp-gray-400)';
          }
        }}
      >
        {isActive && (
          <div style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: 3, height: 20, borderRadius: 4, background: 'var(--fp-amber)',
          }} />
        )}
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        <span>{label}</span>
      </Link>
    );
  };

  const NavSection = ({ title, items }: { title: string; items: typeof mainNav }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: 'var(--fp-gray-300)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '0 16px', marginBottom: 8,
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => <NavItem key={item.href} {...item} />)}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
            zIndex: 40, display: 'none',
          }}
          className="sidebar-overlay"
        />
      )}

      <aside style={{
        width: 'var(--sidebar-width)', height: '100vh',
        position: 'fixed', left: 0, top: 0, zIndex: 50,
        background: 'var(--fp-white)',
        borderRight: '1px solid var(--fp-gray-100)',
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform var(--transition-smooth)',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <ForemostLogo />
          </Link>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)', display: 'none',
          }} className="sidebar-close">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '20px 12px' }}>
          <NavSection title="Main" items={mainNav} />
          <NavSection title="Management" items={managementNav} />
          <NavSection title="System" items={analyticsNav} />
        </nav>

        {/* User section */}
        <div style={{
          padding: '16px 20px', borderTop: '1px solid var(--fp-gray-100)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--fp-amber-glow)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Shield size={18} color="var(--fp-amber-dark)" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: 'var(--fp-navy)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {currentEmployee ? `${currentEmployee.firstName} ${currentEmployee.lastName}` : 'Not Logged In'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fp-gray-400)', textTransform: 'capitalize' }}>
              {currentEmployee?.role || 'Guest'}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ---- Header Component ----
function Header({ onMenuToggle, sidebarOpen }: { onMenuToggle: () => void; sidebarOpen: boolean }) {
  const { notifications, getUnreadCount, currentEmployee, searchQuery, setSearchQuery, selectedLocation, setSelectedLocation, logout } = useForemostStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const unreadCount = getUnreadCount();

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--fp-gray-100)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px', gap: 20,
      position: 'sticky', top: 0, zIndex: 30,
    }}>
      {/* Left: Menu + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
        <button
          onClick={onMenuToggle}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)', padding: 4,
            display: 'flex', alignItems: 'center',
          }}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div style={{ position: 'relative', maxWidth: 400, flex: 1 }}>
          <input
            type="text"
            placeholder="Search products, customers, orders..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="fp-input fp-input-search"
            style={{ height: 42 }}
          />
        </div>
      </div>

      {/* Right: Location + Notifications + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Location Picker */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowLocationPicker(!showLocationPicker)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 14px', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--fp-gray-200)', background: 'var(--fp-white)',
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
            color: 'var(--fp-navy)',
          }}>
            <Store size={16} color="var(--fp-amber)" />
            <span>{selectedLocation === 'second-line' ? 'Second Line' : 'Trunk Road'}</span>
            <ChevronDown size={14} color="var(--fp-gray-400)" />
          </button>
          {showLocationPicker && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              background: 'var(--fp-white)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--fp-gray-100)', boxShadow: 'var(--shadow-xl)',
              minWidth: 220, padding: 6, zIndex: 50,
            }}>
              {['second-line', 'trunk-road'].map(loc => (
                <button key={loc} onClick={() => { setSelectedLocation(loc); setShowLocationPicker(false); }} style={{
                  width: '100%', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                  border: 'none', background: selectedLocation === loc ? 'var(--fp-amber-glow)' : 'transparent',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13,
                  fontWeight: selectedLocation === loc ? 600 : 400, color: 'var(--fp-navy)',
                }}>
                  <Store size={15} color={selectedLocation === loc ? 'var(--fp-amber)' : 'var(--fp-gray-300)'} />
                  {loc === 'second-line' ? '68 Second Line W' : '149 Trunk Rd'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowNotifications(!showNotifications)} style={{
            position: 'relative', background: 'none', border: 'none',
            cursor: 'pointer', padding: 8, borderRadius: 'var(--radius-md)',
            color: 'var(--fp-gray-400)',
          }}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2,
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--fp-error)', color: 'white',
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              background: 'var(--fp-white)', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--fp-gray-100)', boxShadow: 'var(--shadow-xl)',
              width: 360, maxHeight: 420, overflowY: 'auto', zIndex: 50,
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid var(--fp-gray-100)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Notifications</span>
                <button onClick={() => {
                  useForemostStore.getState().markAllNotificationsRead();
                }} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--fp-amber)', fontSize: 12, fontWeight: 600,
                }}>
                  Mark all read
                </button>
              </div>
              {notifications.slice(0, 10).map(n => (
                <div key={n.id} style={{
                  padding: '14px 20px', borderBottom: '1px solid var(--fp-gray-100)',
                  background: n.isRead ? 'transparent' : 'var(--fp-amber-glow)',
                  cursor: 'pointer',
                }} onClick={() => useForemostStore.getState().markNotificationRead(n.id)}>
                  <div style={{
                    fontSize: 13, fontWeight: n.isRead ? 400 : 600,
                    color: 'var(--fp-navy)', marginBottom: 2,
                  }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        {currentEmployee && (
          <button onClick={() => logout()} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, borderRadius: 'var(--radius-md)',
            color: 'var(--fp-gray-400)',
          }}>
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
}

// ---- App Shell ----
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div style={{
          flex: 1,
          marginLeft: sidebarOpen ? 'var(--sidebar-width)' : 0,
          transition: 'margin-left var(--transition-smooth)',
          display: 'flex', flexDirection: 'column',
          minHeight: '100vh',
        }}>
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <main style={{ flex: 1, padding: 28 }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
