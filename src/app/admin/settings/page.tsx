'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { STORE_LOCATIONS, STORE_CONFIG, LOYALTY_CONFIG, TAX_RATE } from '@/lib/store-config';
import { useForemostStore } from '@/lib/store';
import toast from 'react-hot-toast';
import {
  Settings, Store, Clock, Users, Shield, PawPrint,
  Save, MapPin, Phone, Mail, Globe, Percent, DollarSign,
  Bell, Printer, Database, Trash2,
} from 'lucide-react';

export default function SettingsPage() {
  const { employees, currentEmployee } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('store');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const tabs = [
    { id: 'store', label: 'Store Info', icon: Store },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'loyalty', label: 'Loyalty Program', icon: PawPrint },
    { id: 'system', label: 'System', icon: Database },
  ];

  return (
    <AppShell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Settings</h1>
        <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
          Manage store configuration, employees, and system settings
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Tab Navigation */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div className="fp-card-flat" style={{ padding: 8 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--fp-amber-glow)' : 'transparent',
                color: activeTab === tab.id ? 'var(--fp-navy)' : 'var(--fp-gray-400)',
                fontWeight: activeTab === tab.id ? 600 : 400, fontSize: 14,
                fontFamily: 'var(--font-body)', textAlign: 'left',
                transition: 'all var(--transition-fast)',
              }}>
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'store' && (
            <div className="fp-card-flat animate-fade-in" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Store Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Store Name</label>
                    <input className="fp-input" defaultValue={STORE_CONFIG.name} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Tagline</label>
                    <input className="fp-input" defaultValue={STORE_CONFIG.tagline} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      <Mail size={14} style={{ display: 'inline', marginRight: 6 }} />Email
                    </label>
                    <input className="fp-input" defaultValue={STORE_CONFIG.email} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      <Globe size={14} style={{ display: 'inline', marginRight: 6 }} />Website
                    </label>
                    <input className="fp-input" defaultValue={STORE_CONFIG.website} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      <Percent size={14} style={{ display: 'inline', marginRight: 6 }} />Tax Rate (HST)
                    </label>
                    <input className="fp-input" type="number" step="0.01" defaultValue={TAX_RATE * 100} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      <DollarSign size={14} style={{ display: 'inline', marginRight: 6 }} />Currency
                    </label>
                    <input className="fp-input" defaultValue="CAD" />
                  </div>
                </div>
                <button onClick={() => toast.success('Settings saved!')} className="fp-btn fp-btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {STORE_LOCATIONS.map(loc => (
                <div key={loc.id} className="fp-card-flat" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700 }}>{loc.name}</h3>
                      {loc.isPrimary && <span className="fp-badge fp-badge-amber" style={{ marginTop: 6, display: 'inline-block' }}>Primary</span>}
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Store size={22} color="var(--fp-amber)" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 14 }}>
                        <MapPin size={16} color="var(--fp-gray-400)" />
                        {loc.address.street}, {loc.address.city}, {loc.address.province}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 14 }}>
                        <Phone size={16} color="var(--fp-gray-400)" />
                        {loc.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                        <Mail size={16} color="var(--fp-gray-400)" />
                        {loc.email}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Features</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {loc.features.map(f => (
                          <span key={f} className="fp-badge fp-badge-info">{f}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 12, marginBottom: 6 }}>Pet Types</div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {loc.petTypes.map(p => (
                          <span key={p} style={{ fontSize: 20 }}>
                            {p === 'dog' ? 'Dog' : p === 'cat' ? 'Cat' : 'Fish'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="fp-card-flat animate-fade-in" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Employees ({employees.length})</h2>
              </div>
              <table className="fp-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>PIN</th>
                    <th>Sales Total</th>
                    <th>Transactions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{emp.firstName} {emp.lastName}</div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{emp.email}</div>
                      </td>
                      <td>
                        <span className={`fp-badge fp-badge-${emp.role === 'owner' ? 'amber' : emp.role === 'manager' ? 'info' : 'navy'}`}
                          style={{ textTransform: 'capitalize' }}>
                          {emp.role}
                        </span>
                      </td>
                      <td style={{ fontSize: 13 }}>{emp.phone}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600 }}>{emp.pin}</td>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                        ${emp.salesTotal.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                      </td>
                      <td>{emp.transactionCount.toLocaleString()}</td>
                      <td>
                        <span className={`fp-badge fp-badge-${emp.isActive ? 'success' : 'error'}`}>
                          {emp.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="fp-card-flat animate-fade-in" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Loyalty Program Configuration</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Points per $1</label>
                  <input className="fp-input" type="number" defaultValue={LOYALTY_CONFIG.pointsPerDollar} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Redemption Rate ($/point)</label>
                  <input className="fp-input" type="number" step="0.001" defaultValue={LOYALTY_CONFIG.pointsRedemptionRate} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>AutoShip Bonus</label>
                  <input className="fp-input" type="number" step="0.1" defaultValue={LOYALTY_CONFIG.autoShipBonusMultiplier} />
                </div>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Tier Thresholds</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {LOYALTY_CONFIG.tiers.map(tier => (
                  <div key={tier.tier} style={{
                    padding: '14px 20px', borderRadius: 'var(--radius-md)',
                    border: `1px solid ${tier.color}33`, background: `${tier.color}08`,
                    display: 'flex', alignItems: 'center', gap: 16,
                  }}>
                    <span style={{ fontSize: 28 }}>{tier.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{tier.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                        Min spend: ${tier.minSpend} • {tier.pointsMultiplier}x points • {tier.discountPercent}% discount
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success('Loyalty settings saved!')} className="fp-btn fp-btn-primary" style={{ marginTop: 20 }}>
                <Save size={16} /> Save Configuration
              </button>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="fp-card-flat" style={{ padding: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>System Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--fp-gray-100)' }}>
                    <span style={{ color: 'var(--fp-gray-400)' }}>Platform</span>
                    <span style={{ fontWeight: 600 }}>Foremost Pets Suite v1.0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--fp-gray-100)' }}>
                    <span style={{ color: 'var(--fp-gray-400)' }}>Framework</span>
                    <span style={{ fontWeight: 600 }}>Next.js 15</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--fp-gray-100)' }}>
                    <span style={{ color: 'var(--fp-gray-400)' }}>State</span>
                    <span style={{ fontWeight: 600 }}>Zustand (Persisted)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--fp-gray-100)' }}>
                    <span style={{ color: 'var(--fp-gray-400)' }}>Storage</span>
                    <span style={{ fontWeight: 600 }}>LocalStorage + IndexedDB</span>
                  </div>
                </div>
              </div>
              <div className="fp-card-flat" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Data Management</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => {
                    if (confirm('This will clear all data and reset to defaults. Continue?')) {
                      localStorage.removeItem('foremost-pets-store');
                      window.location.reload();
                    }
                  }} className="fp-btn fp-btn-outline" style={{ color: 'var(--fp-error)', borderColor: 'var(--fp-error)' }}>
                    <Trash2 size={16} /> Reset All Data
                  </button>
                  <button onClick={() => {
                    const data = localStorage.getItem('foremost-pets-store');
                    if (data) {
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `foremost-pets-backup-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      toast.success('Backup downloaded!');
                    }
                  }} className="fp-btn fp-btn-outline">
                    <Database size={16} /> Export Backup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
