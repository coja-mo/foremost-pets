'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { Gift, Plus, Search, CreditCard, DollarSign, Eye, RefreshCw, X } from 'lucide-react';

export default function GiftCardsPage() {
  const { giftCards, createGiftCard, reloadGiftCard, getGiftCardByCode } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newAmount, setNewAmount] = useState(25);
  const [reloadCode, setReloadCode] = useState('');
  const [reloadAmount, setReloadAmount] = useState(25);
  const [showReload, setShowReload] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const filtered = giftCards.filter(gc => {
    const q = search.toLowerCase();
    return !q || gc.code.toLowerCase().includes(q);
  });

  const totalIssued = giftCards.reduce((sum, gc) => sum + gc.originalBalance, 0);
  const totalActive = giftCards.filter(gc => gc.isActive).reduce((sum, gc) => sum + gc.currentBalance, 0);
  const detail = selectedCard ? giftCards.find(gc => gc.id === selectedCard) : null;

  const presetAmounts = [10, 25, 50, 75, 100, 150, 200, 250];

  return (
    <AppShell>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Gift Cards</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
            {giftCards.length} cards issued • {giftCards.filter(gc => gc.isActive).length} active
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setShowReload(true)} className="fp-btn fp-btn-outline">
            <RefreshCw size={16} /> Reload Card
          </button>
          <button onClick={() => setShowCreate(true)} className="fp-btn fp-btn-primary">
            <Plus size={18} /> Issue New Card
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="fp-stat-card animate-fade-in">
          <div className="fp-stat-label">Total Issued Value</div>
          <div className="fp-stat-value" style={{ marginTop: 6 }}>${totalIssued.toFixed(2)}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div className="fp-stat-label">Outstanding Balance</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-amber)' }}>${totalActive.toFixed(2)}</div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="fp-stat-label">Redeemed Value</div>
          <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-success)' }}>
            ${(totalIssued - totalActive).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="fp-card-flat" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <input
          type="text" placeholder="Search gift cards by code..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="fp-input fp-input-search"
        />
      </div>

      {/* Gift Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map((gc, i) => (
          <div key={gc.id} className="fp-card animate-fade-in" style={{
            padding: 0, animationDelay: `${i * 50}ms`, cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
          }}
            onClick={() => setSelectedCard(gc.id)}>
            {/* Card visual header */}
            <div style={{
              padding: '28px 24px 20px',
              background: gc.isActive
                ? 'linear-gradient(135deg, var(--fp-navy) 0%, var(--fp-navy-light) 50%, #1e3a5f 100%)'
                : 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
              color: 'white', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 16, right: 16, opacity: 0.15, fontSize: 64,
              }}>
                🎁
              </div>
              <div style={{
                fontSize: 12, fontWeight: 600, opacity: 0.7,
                letterSpacing: '0.1em', marginBottom: 8,
              }}>FOREMOST PETS GIFT CARD</div>
              <div style={{
                fontSize: 15, fontFamily: 'monospace', fontWeight: 600,
                letterSpacing: '0.1em', marginBottom: 16,
              }}>
                {gc.code}
              </div>
              <div style={{
                fontSize: 36, fontWeight: 800, fontFamily: 'var(--font-heading)',
              }}>
                ${gc.currentBalance.toFixed(2)}
              </div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                of ${gc.originalBalance.toFixed(2)} original
              </div>
            </div>
            <div style={{ padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`fp-badge fp-badge-${gc.isActive ? 'success' : 'error'}`}>
                {gc.isActive ? 'Active' : 'Used'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                {gc.transactions.length} transaction{gc.transactions.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        ))}
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
            width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)',
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Issue Gift Card</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)' }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Select Amount</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
                {presetAmounts.map(amt => (
                  <button key={amt} onClick={() => setNewAmount(amt)} style={{
                    padding: '12px 8px', borderRadius: 'var(--radius-md)',
                    border: newAmount === amt ? '2px solid var(--fp-amber)' : '1px solid var(--fp-gray-200)',
                    background: newAmount === amt ? 'var(--fp-amber-glow)' : 'transparent',
                    cursor: 'pointer', fontSize: 16, fontWeight: 700,
                    fontFamily: 'var(--font-heading)', color: 'var(--fp-navy)',
                  }}>
                    ${amt}
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Custom Amount</label>
                <input className="fp-input" type="number" min="5" max="500" value={newAmount}
                  onChange={e => setNewAmount(parseFloat(e.target.value))} />
              </div>
              <button onClick={() => {
                const gc = createGiftCard(newAmount);
                toast.success(`Gift card created: ${gc.code}`);
                setShowCreate(false);
              }} className="fp-btn fp-btn-primary" style={{ width: '100%' }}>
                <Gift size={18} /> Issue ${newAmount.toFixed(2)} Gift Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reload Modal */}
      {showReload && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(4px)',
        }}>
          <div className="animate-scale-in" style={{
            background: 'var(--fp-white)', borderRadius: 'var(--radius-xl)',
            width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-xl)',
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Reload Gift Card</h2>
              <button onClick={() => setShowReload(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)' }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Gift Card Code</label>
                <input className="fp-input" placeholder="FP-XXXX-XXXX-XXXX" value={reloadCode}
                  onChange={e => setReloadCode(e.target.value.toUpperCase())} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Reload Amount ($)</label>
                <input className="fp-input" type="number" min="5" value={reloadAmount}
                  onChange={e => setReloadAmount(parseFloat(e.target.value))} />
              </div>
              <button onClick={() => {
                const success = reloadGiftCard(reloadCode, reloadAmount);
                if (success) {
                  toast.success(`Card reloaded with $${reloadAmount.toFixed(2)}`);
                  setShowReload(false);
                  setReloadCode('');
                } else {
                  toast.error('Card not found');
                }
              }} className="fp-btn fp-btn-primary" style={{ width: '100%' }}>
                <RefreshCw size={18} /> Reload Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Detail Drawer */}
      {detail && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'flex-end', zIndex: 100, backdropFilter: 'blur(4px)',
        }}>
          <div className="animate-slide-in-right" style={{
            width: 440, background: 'var(--fp-white)', height: '100%',
            overflowY: 'auto', boxShadow: 'var(--shadow-xl)',
          }}>
            <div style={{
              padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              position: 'sticky', top: 0, background: 'var(--fp-white)', zIndex: 1,
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 800 }}>Gift Card Details</h2>
              <button onClick={() => setSelectedCard(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)',
              }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{
                padding: '24px', borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--fp-navy) 0%, var(--fp-navy-light) 100%)',
                color: 'white', marginBottom: 24, textAlign: 'center',
              }}>
                <div style={{ fontSize: 14, letterSpacing: '0.15em', opacity: 0.7 }}>{detail.code}</div>
                <div style={{ fontSize: 42, fontWeight: 800, fontFamily: 'var(--font-heading)', margin: '8px 0' }}>
                  ${detail.currentBalance.toFixed(2)}
                </div>
                <span className={`fp-badge fp-badge-${detail.isActive ? 'success' : 'error'}`}>
                  {detail.isActive ? 'Active' : 'Used'}
                </span>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Transaction History</h3>
              {detail.transactions.map(tx => (
                <div key={tx.id} style={{
                  padding: '12px 0', borderBottom: '1px solid var(--fp-gray-100)',
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                    }}>
                      {tx.type}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                      {new Date(tx.timestamp).toLocaleString('en-CA')}
                    </div>
                    {tx.note && <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{tx.note}</div>}
                  </div>
                  <div style={{
                    fontWeight: 700, fontFamily: 'var(--font-heading)',
                    color: tx.amount > 0 ? 'var(--fp-success)' : 'var(--fp-error)',
                  }}>
                    {tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
