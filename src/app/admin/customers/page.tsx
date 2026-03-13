'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import { Customer, PetProfile } from '@/lib/types';
import { LOYALTY_CONFIG } from '@/lib/store-config';
import toast from 'react-hot-toast';
import {
  Search, Plus, Edit3, Trash2, Users, User, Mail, Phone,
  MapPin, PawPrint, Star, Heart, Eye, X, Dog, Cat, Fish,
  ArrowUpRight, Calendar, CreditCard, Gift, Repeat,
  Medal, Crown, Gem,
} from 'lucide-react';

// ---- Customer Detail Panel ----
function CustomerDetail({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const { getOrdersByCustomer, loyaltyTransactions } = useForemostStore();
  const orders = getOrdersByCustomer(customer.id);
  const transactions = loyaltyTransactions.filter(t => t.customerId === customer.id).slice(0, 10);

  const tierConfig = LOYALTY_CONFIG.tiers.find(t => t.tier === customer.loyaltyTier);
  const nextTier = LOYALTY_CONFIG.tiers[LOYALTY_CONFIG.tiers.findIndex(t => t.tier === customer.loyaltyTier) + 1];

  const tierColors: Record<string, string> = {
    'paw': 'var(--fp-tier-paw)', 'silver-paw': 'var(--fp-tier-silver)',
    'gold-paw': 'var(--fp-tier-gold)', 'diamond-paw': 'var(--fp-tier-diamond)',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'flex-end', zIndex: 100,
      backdropFilter: 'blur(4px)',
    }}>
      <div className="animate-slide-in-right" style={{
        width: 520, background: 'var(--fp-white)', height: '100%',
        overflowY: 'auto', boxShadow: 'var(--shadow-xl)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          position: 'sticky', top: 0, background: 'var(--fp-white)', zIndex: 1,
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--radius-lg)',
              background: `linear-gradient(135deg, ${tierColors[customer.loyaltyTier]}22, ${tierColors[customer.loyaltyTier]}55)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawPrint size={24} color={tierColors[customer.loyaltyTier]} />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>
                {customer.firstName} {customer.lastName}
              </h2>
              <span className={`fp-tier-badge fp-tier-badge-${customer.loyaltyTier}`}>
                {tierConfig?.name}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)', padding: 4,
          }}>
            <X size={22} />
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          padding: '20px 28px',
        }}>
          <div className="fp-stat-card" style={{ padding: 16, textAlign: 'center' }}>
            <div className="fp-stat-value" style={{ fontSize: 22 }}>${customer.totalSpent.toFixed(0)}</div>
            <div className="fp-stat-label">Total Spent</div>
          </div>
          <div className="fp-stat-card" style={{ padding: 16, textAlign: 'center' }}>
            <div className="fp-stat-value" style={{ fontSize: 22 }}>{customer.totalOrders}</div>
            <div className="fp-stat-label">Orders</div>
          </div>
          <div className="fp-stat-card" style={{ padding: 16, textAlign: 'center' }}>
            <div className="fp-stat-value" style={{ fontSize: 22, color: 'var(--fp-amber)' }}>
              {customer.loyaltyPoints.toLocaleString()}
            </div>
            <div className="fp-stat-label">Points</div>
          </div>
        </div>

        {/* Tier Progress */}
        {nextTier && (
          <div style={{ padding: '0 28px 20px' }}>
            <div style={{
              padding: '16px 20px', borderRadius: 'var(--radius-md)',
              background: 'var(--fp-gray-50)', border: '1px solid var(--fp-gray-100)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fp-gray-400)' }}>
                  Progress to {nextTier.name}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-navy)' }}>
                  ${customer.totalSpent.toFixed(0)} / ${nextTier.minSpend}
                </span>
              </div>
              <div style={{
                height: 8, borderRadius: 4, background: 'var(--fp-gray-200)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: `linear-gradient(90deg, ${tierColors[customer.loyaltyTier]}, var(--fp-amber))`,
                  width: `${Math.min((customer.totalSpent / nextTier.minSpend) * 100, 100)}%`,
                  transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--fp-gray-400)', marginTop: 6 }}>
                ${(nextTier.minSpend - customer.totalSpent).toFixed(0)} more to reach {nextTier.name}
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div style={{ padding: '0 28px 20px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Contact Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
              <Mail size={16} color="var(--fp-gray-400)" />
              <span>{customer.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
              <Phone size={16} color="var(--fp-gray-400)" />
              <span>{customer.phone}</span>
            </div>
            {customer.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                <MapPin size={16} color="var(--fp-gray-400)" />
                <span>{customer.address.street}, {customer.address.city}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
              <Calendar size={16} color="var(--fp-gray-400)" />
              <span>Member since {new Date(customer.joinDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </div>

        {/* Pets */}
        <div style={{ padding: '0 28px 20px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            <PawPrint size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> Pets ({customer.pets.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {customer.pets.map(pet => (
              <div key={pet.id} style={{
                padding: '14px 16px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--fp-gray-100)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--fp-amber-glow)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {pet.type === 'dog' ? <Dog size={18} color="var(--fp-amber-dark)" /> : pet.type === 'cat' ? <Cat size={18} color="var(--fp-amber-dark)" /> : <Fish size={18} color="var(--fp-amber-dark)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{pet.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                    {pet.breed} • {pet.weight}{pet.weightUnit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AutoShip */}
        {customer.autoShipSubscriptions.length > 0 && (
          <div style={{ padding: '0 28px 20px' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
              <Repeat size={14} style={{ display: 'inline', marginRight: 6 }} />
              AutoShip Subscriptions
            </h3>
            {customer.autoShipSubscriptions.map(sub => (
              <div key={sub.id} style={{
                padding: '14px 16px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--fp-gray-100)', marginBottom: 8,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{sub.productName}</div>
                <div style={{
                  fontSize: 12, color: 'var(--fp-gray-400)', marginTop: 4,
                  display: 'flex', gap: 12,
                }}>
                  <span>Every {sub.frequencyDays} days</span>
                  <span>•</span>
                  <span>${sub.price.toFixed(2)}</span>
                  <span>•</span>
                  <span className={`fp-badge fp-badge-${sub.status === 'active' ? 'success' : 'warning'}`}>
                    {sub.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fp-amber-dark)', fontWeight: 500, marginTop: 4 }}>
                  Next delivery: {new Date(sub.nextDeliveryDate).toLocaleDateString('en-CA')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Orders */}
        <div style={{ padding: '0 28px 28px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Recent Orders</h3>
          {orders.length === 0 ? (
            <div style={{ fontSize: 14, color: 'var(--fp-gray-300)', textAlign: 'center', padding: 20 }}>
              No orders yet
            </div>
          ) : (
            orders.slice(0, 5).map(order => (
              <div key={order.id} style={{
                padding: '12px 0', borderBottom: '1px solid var(--fp-gray-100)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{order.orderNumber}</div>
                  <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-CA')} • {order.items.length} items
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    ${order.totalAmount.toFixed(2)}
                  </div>
                  <span className={`fp-badge fp-badge-${order.orderStatus === 'completed' ? 'success' : 'error'}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Customers Page ----
export default function CustomersPage() {
  const { customers, addCustomer, deleteCustomer, searchCustomers } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;
  }

  const filtered = customers.filter(c => {
    const matchesTier = tierFilter === 'all' || c.loyaltyTier === tierFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.pets.some(p => p.name.toLowerCase().includes(q));
    return matchesTier && matchesSearch;
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  const tierIconMap: Record<string, React.ElementType> = {
    'paw': PawPrint, 'silver-paw': Medal, 'gold-paw': Crown, 'diamond-paw': Gem,
  };

  const tierStats = LOYALTY_CONFIG.tiers.map(t => ({
    ...t,
    count: customers.filter(c => c.loyaltyTier === t.tier).length,
  }));

  return (
    <AppShell>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Customers</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
            {customers.length} total members • Foremost Pets loyalty program
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="fp-btn fp-btn-primary">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Tier Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {tierStats.map((tier, i) => (
          <button key={tier.tier}
            onClick={() => setTierFilter(tierFilter === tier.tier ? 'all' : tier.tier)}
            className={`fp-stat-card animate-fade-in ${tierFilter === tier.tier ? '' : ''}`}
            style={{
              animationDelay: `${i * 50}ms`, cursor: 'pointer', textAlign: 'left',
              border: tierFilter === tier.tier ? `2px solid ${tier.color}` : '1px solid var(--fp-gray-100)',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span>{React.createElement(tierIconMap[tier.tier] || PawPrint, { size: 24, color: tier.color })}</span>
              <span style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-heading)', color: tier.color }}>
                {tier.count}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{tier.name}</div>
            <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{tier.pointsMultiplier}x points</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="fp-card-flat" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name, email, phone, or pet name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="fp-input fp-input-search"
        />
      </div>

      {/* Customer Table */}
      <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Tier</th>
              <th>Pets</th>
              <th>Points</th>
              <th>Total Spent</th>
              <th>Orders</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer, i) => (
              <tr key={customer.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms`, cursor: 'pointer' }}
                onClick={() => setSelectedCustomer(customer)}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-gray-50)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      {React.createElement(tierIconMap[customer.loyaltyTier] || PawPrint, { size: 18, color: 'var(--fp-gray-400)' })}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`fp-tier-badge fp-tier-badge-${customer.loyaltyTier}`}>
                    {LOYALTY_CONFIG.tiers.find(t => t.tier === customer.loyaltyTier)?.name}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {customer.pets.map(pet => (
                      <span key={pet.id} title={`${pet.name} (${pet.breed})`}>
                        {pet.type === 'dog' ? <Dog size={16} color="var(--fp-amber-dark)" /> : pet.type === 'cat' ? <Cat size={16} color="var(--fp-amber-dark)" /> : <Fish size={16} color="var(--fp-amber-dark)" />}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-amber-dark)' }}>
                  {customer.loyaltyPoints.toLocaleString()}
                </td>
                <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  ${customer.totalSpent.toFixed(0)}
                </td>
                <td>{customer.totalOrders}</td>
                <td style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>
                  {new Date(customer.lastVisit).toLocaleDateString('en-CA')}
                </td>
                <td>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--fp-gray-400)', padding: 6,
                  }}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <AddCustomerModal onClose={() => setShowAddModal(false)} />
      )}
    </AppShell>
  );
}

// ---- Add Customer Modal ----
function AddCustomerModal({ onClose }: { onClose: () => void }) {
  const { addCustomer } = useForemostStore();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    petName: '', petType: 'dog' as PetType, petBreed: '',
  });

  type PetType = 'dog' | 'cat' | 'fish';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = addCustomer({
      email: form.email,
      phone: form.phone,
      firstName: form.firstName,
      lastName: form.lastName,
      pets: form.petName ? [{
        id: `pet-${Date.now()}`,
        name: form.petName,
        type: form.petType,
        breed: form.petBreed,
        birthDate: '',
        weight: 0,
        weightUnit: 'kg',
        allergies: [],
        dietaryNeeds: [],
        medications: [],
        preferredFood: [],
        notes: '',
      }] : [],
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        autoShipReminders: true,
        birthdayReminders: true,
        communicationLanguage: 'en',
      },
      autoShipSubscriptions: [],
      giftCards: [],
      notes: '',
      tags: [],
      isActive: true,
    });
    toast.success(`Welcome ${form.firstName}!`);
    onClose();
  };

  return (
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
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>New Customer</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)' }}>
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>First Name</label>
              <input className="fp-input" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Last Name</label>
              <input className="fp-input" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email</label>
            <input className="fp-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Phone</label>
            <input className="fp-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div style={{
            padding: '16px 20px', borderRadius: 'var(--radius-md)',
            background: 'var(--fp-gray-50)', border: '1px solid var(--fp-gray-100)',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><PawPrint size={14} /> Add a Pet (Optional)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 4 }}>Pet Name</label>
                <input className="fp-input" value={form.petName} onChange={e => setForm({ ...form, petName: e.target.value })} placeholder="e.g. Luna" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 4 }}>Type</label>
                <select className="fp-input" value={form.petType} onChange={e => setForm({ ...form, petType: e.target.value as PetType })}>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="fish">Fish</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 4 }}>Breed</label>
              <input className="fp-input" value={form.petBreed} onChange={e => setForm({ ...form, petBreed: e.target.value })} placeholder="e.g. Golden Retriever" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="fp-btn fp-btn-outline">Cancel</button>
            <button type="submit" className="fp-btn fp-btn-primary">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
