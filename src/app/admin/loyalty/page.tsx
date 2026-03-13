'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import { LOYALTY_CONFIG } from '@/lib/store-config';
import { Heart, Star, Users, TrendingUp, Gift, Crown, ArrowUpRight, PawPrint, Dog, Cat, Fish, Medal, Gem } from 'lucide-react';

const TIER_ICON_MAP: Record<string, React.ElementType> = {
  paw: PawPrint, silver: Medal, gold: Crown, diamond: Gem,
};

export default function LoyaltyPage() {
  const { customers, loyaltyTransactions } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const tierStats = LOYALTY_CONFIG.tiers.map(tier => ({
    ...tier,
    count: customers.filter(c => c.loyaltyTier === tier.tier).length,
    totalPoints: customers.filter(c => c.loyaltyTier === tier.tier).reduce((sum, c) => sum + c.loyaltyPoints, 0),
  }));

  const totalPointsIssued = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);
  const totalMembers = customers.length;

  return (
    <AppShell>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Loyalty Program</h1>
        <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
          Foremost Pets Paw Rewards — Empowering pet parents with every purchase
        </p>
      </div>

      {/* Program Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div className="fp-stat-card animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="fp-stat-label">Total Members</div>
              <div className="fp-stat-value" style={{ marginTop: 8 }}>{totalMembers}</div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--fp-info)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Users size={22} color="white" />
            </div>
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="fp-stat-label">Points Outstanding</div>
              <div className="fp-stat-value" style={{ marginTop: 8, color: 'var(--fp-amber)' }}>
                {totalPointsIssued.toLocaleString()}
              </div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--fp-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={22} color="white" />
            </div>
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="fp-stat-label">Points Value</div>
              <div className="fp-stat-value" style={{ marginTop: 8, color: 'var(--fp-success)' }}>
                ${(totalPointsIssued * LOYALTY_CONFIG.pointsRedemptionRate).toFixed(0)}
              </div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--fp-success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={22} color="white" />
            </div>
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="fp-stat-label">Earn Rate</div>
              <div className="fp-stat-value" style={{ marginTop: 8 }}>{LOYALTY_CONFIG.pointsPerDollar}x</div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--fp-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawPrint size={22} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tier Breakdown */}
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Membership Tiers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {tierStats.map((tier, i) => (
          <div key={tier.tier} className="fp-card animate-fade-in" style={{
            padding: 0, animationDelay: `${i * 75}ms`, overflow: 'hidden',
          }}>
            <div style={{
              padding: '24px 20px', position: 'relative',
              background: `linear-gradient(135deg, ${tier.color}15, ${tier.color}05)`,
              borderBottom: `3px solid ${tier.color}`,
            }}>
              <div style={{ marginBottom: 8 }}>
                {React.createElement(TIER_ICON_MAP[tier.icon] || PawPrint, { size: 36, color: tier.color })}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                {tier.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fp-gray-400)', marginTop: 4 }}>
                {tier.count} member{tier.count !== 1 ? 's' : ''} • ${tier.minSpend}+ spent
              </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 12,
              }}>
                <span style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>Points Multiplier</span>
                <span style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)', color: tier.color }}>
                  {tier.pointsMultiplier}x
                </span>
              </div>
              {tier.discountPercent > 0 && (
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <span style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>Discount</span>
                  <span style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--fp-success)' }}>
                    {tier.discountPercent}%
                  </span>
                </div>
              )}
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'var(--fp-amber-dark)',
                display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12,
              }}>
                <Star size={14} />
                {tier.totalPoints.toLocaleString()} total points
              </div>
              <div style={{
                padding: '12px 14px', borderRadius: 'var(--radius-md)',
                background: 'var(--fp-gray-50)', fontSize: 12, lineHeight: 1.8,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fp-gray-400)' }}>
                  Benefits
                </div>
                {tier.benefits.map((benefit, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ color: tier.color, marginTop: 2 }}>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Loyalty Activity */}
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Top Loyalty Members</h2>
      <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Tier</th>
              <th>Points Balance</th>
              <th>Total Spent</th>
              <th>Multiplier</th>
              <th>Pets</th>
            </tr>
          </thead>
          <tbody>
            {[...customers].sort((a, b) => b.loyaltyPoints - a.loyaltyPoints).map((customer, i) => {
              const tierConfig = LOYALTY_CONFIG.tiers.find(t => t.tier === customer.loyaltyTier);
              return (
                <tr key={customer.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {React.createElement(TIER_ICON_MAP[tierConfig?.icon || 'paw'] || PawPrint, { size: 18, color: tierConfig?.color })}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`fp-tier-badge fp-tier-badge-${customer.loyaltyTier}`}>
                      {tierConfig?.name}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--fp-amber-dark)', fontSize: 16 }}>
                    {customer.loyaltyPoints.toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 600 }}>${customer.totalSpent.toFixed(0)}</td>
                  <td style={{ fontWeight: 700, color: tierConfig?.color }}>{tierConfig?.pointsMultiplier}x</td>
                  <td>
                    {customer.pets.map(p => (
                      <span key={p.id} title={p.name} style={{ fontSize: 16, marginRight: 4 }}>
                        {p.type === 'dog' ? <Dog size={14} /> : p.type === 'cat' ? <Cat size={14} /> : <Fish size={14} />}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
