'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import toast from 'react-hot-toast';
import {
  Tag, Plus, Edit3, Trash2, Calendar, Percent, DollarSign,
  Gift, Star, Zap, X, Clock, Check,
} from 'lucide-react';

export default function PromotionsPage() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', type: 'percentage' as const,
    value: 10, code: '', startDate: '', endDate: '',
    minPurchase: 0, isActive: true,
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const activePromos = promotions.filter(p => p.isActive);
  const expiredPromos = promotions.filter(p => !p.isActive || new Date(p.endDate) < new Date());

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addPromotion({
      name: form.name,
      description: form.description,
      type: form.type,
      value: form.value,
      code: form.code || undefined,
      startDate: form.startDate,
      endDate: form.endDate,
      isActive: form.isActive,
      conditions: { minPurchase: form.minPurchase || undefined },
      applicableProducts: [],
      applicableCategories: [],
      maxUsage: undefined,
    });
    toast.success('Promotion created! 🎉');
    setShowCreate(false);
    setForm({ name: '', description: '', type: 'percentage', value: 10, code: '', startDate: '', endDate: '', minPurchase: 0, isActive: true });
  };

  const typeIcons: Record<string, React.ElementType> = {
    percentage: Percent,
    fixed: DollarSign,
    bogo: Gift,
    'loyalty-multiplier': Star,
    bundle: Zap,
  };

  const typeLabels: Record<string, string> = {
    percentage: '% Off',
    fixed: '$ Off',
    bogo: 'BOGO',
    'loyalty-multiplier': 'Points Boost',
    bundle: 'Bundle',
  };

  return (
    <AppShell>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Promotions</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
            {activePromos.length} active promotions
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="fp-btn fp-btn-primary">
          <Plus size={18} /> Create Promotion
        </button>
      </div>

      {/* Active Promotions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
        {promotions.map((promo, i) => {
          const Icon = typeIcons[promo.type] || Tag;
          const isExpired = new Date(promo.endDate) < new Date();
          return (
            <div key={promo.id} className="fp-card animate-fade-in" style={{
              padding: 0, animationDelay: `${i * 50}ms`,
              opacity: isExpired ? 0.6 : 1,
            }}>
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--fp-gray-100)',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: promo.isActive && !isExpired ? 'var(--fp-amber-glow)' : 'var(--fp-gray-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={22} color={promo.isActive && !isExpired ? 'var(--fp-amber)' : 'var(--fp-gray-300)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{promo.name}</span>
                    <span className={`fp-badge fp-badge-${promo.isActive && !isExpired ? 'success' : 'error'}`}>
                      {isExpired ? 'Expired' : promo.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>{promo.description}</div>
                </div>
              </div>
              <div style={{
                padding: '16px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                  <div>
                    <span style={{ color: 'var(--fp-gray-400)' }}>Value: </span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-amber-dark)' }}>
                      {promo.type === 'percentage' ? `${promo.value}%` :
                       promo.type === 'fixed' ? `$${promo.value}` :
                       promo.type === 'loyalty-multiplier' ? `${promo.value}x` : promo.value}
                    </span>
                  </div>
                  {promo.code && (
                    <div>
                      <span style={{ color: 'var(--fp-gray-400)' }}>Code: </span>
                      <span style={{
                        fontWeight: 700, fontFamily: 'monospace',
                        background: 'var(--fp-gray-50)', padding: '2px 6px',
                        borderRadius: 4, fontSize: 12,
                      }}>
                        {promo.code}
                      </span>
                    </div>
                  )}
                  <div>
                    <span style={{ color: 'var(--fp-gray-400)' }}>Used: </span>
                    <span style={{ fontWeight: 600 }}>{promo.usageCount}x</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => {
                    updatePromotion(promo.id, { isActive: !promo.isActive });
                    toast.success(promo.isActive ? 'Promotion deactivated' : 'Promotion activated');
                  }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--fp-gray-400)', padding: 6,
                  }}>
                    {promo.isActive ? <X size={15} /> : <Check size={15} />}
                  </button>
                  <button onClick={() => {
                    deletePromotion(promo.id);
                    toast.success('Promotion deleted');
                  }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--fp-gray-300)', padding: 6,
                  }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div style={{
                padding: '10px 24px', borderTop: '1px solid var(--fp-gray-100)',
                fontSize: 12, color: 'var(--fp-gray-400)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Calendar size={12} />
                {new Date(promo.startDate).toLocaleDateString('en-CA')} — {new Date(promo.endDate).toLocaleDateString('en-CA')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(4px)',
        }}>
          <div className="animate-scale-in" style={{
            background: 'var(--fp-white)', borderRadius: 'var(--radius-xl)',
            width: '100%', maxWidth: 500, boxShadow: 'var(--shadow-xl)',
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Create Promotion</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)' }}>
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Name</label>
                <input className="fp-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
                <textarea className="fp-input" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Type</label>
                  <select className="fp-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })}>
                    <option value="percentage">Percentage Off</option>
                    <option value="fixed">Fixed Amount Off</option>
                    <option value="bogo">Buy One Get One</option>
                    <option value="loyalty-multiplier">Loyalty Multiplier</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Value</label>
                  <input className="fp-input" type="number" value={form.value} onChange={e => setForm({ ...form, value: parseFloat(e.target.value) })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Start Date</label>
                  <input className="fp-input" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>End Date</label>
                  <input className="fp-input" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Promo Code (optional)</label>
                  <input className="fp-input" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. SPRING15" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Min Purchase ($)</label>
                  <input className="fp-input" type="number" min="0" value={form.minPurchase} onChange={e => setForm({ ...form, minPurchase: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreate(false)} className="fp-btn fp-btn-outline">Cancel</button>
                <button type="submit" className="fp-btn fp-btn-primary">Create Promotion</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
