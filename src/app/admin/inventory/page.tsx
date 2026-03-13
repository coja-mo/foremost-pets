'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import toast from 'react-hot-toast';
import {
  Truck, Package, AlertTriangle, ArrowUpDown, BarChart3,
  RefreshCw, Search, DollarSign, Boxes, Edit3, Check,
} from 'lucide-react';

export default function InventoryPage() {
  const { products, updateInventory, getInventoryValue, getLowStockProducts } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState(0);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;

  const lowStock = getLowStockProducts();
  const inventoryValue = getInventoryValue();
  const totalItems = products.reduce((sum, p) => sum + p.inventory.quantity, 0);
  const outOfStock = products.filter(p => p.inventory.quantity === 0).length;

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || p.inventory.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => a.inventory.quantity - b.inventory.quantity);

  return (
    <AppShell>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Inventory Management</h1>
        <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
          Track stock levels, set reorder points, and manage suppliers
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="fp-stat-card animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="fp-stat-label">Inventory Value</div>
              <div className="fp-stat-value" style={{ marginTop: 6 }}>
                ${inventoryValue.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <DollarSign size={24} color="var(--fp-success)" />
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="fp-stat-label">Total Units</div>
              <div className="fp-stat-value" style={{ marginTop: 6 }}>{totalItems}</div>
            </div>
            <Boxes size={24} color="var(--fp-info)" />
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="fp-stat-label">Low Stock Items</div>
              <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-warning)' }}>{lowStock.length}</div>
            </div>
            <AlertTriangle size={24} color="var(--fp-warning)" />
          </div>
        </div>
        <div className="fp-stat-card animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="fp-stat-label">Out of Stock</div>
              <div className="fp-stat-value" style={{ marginTop: 6, color: 'var(--fp-error)' }}>{outOfStock}</div>
            </div>
            <Package size={24} color="var(--fp-error)" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="fp-card-flat" style={{ padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12 }}>
        <input
          type="text" placeholder="Search by name, SKU, or brand..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="fp-input fp-input-search" style={{ flex: 1 }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="fp-input" style={{ width: 160 }}>
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="on-order">On Order</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
        <table className="fp-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Location</th>
              <th>Qty on Hand</th>
              <th>Reorder Point</th>
              <th>Cost / Unit</th>
              <th>Total Value</th>
              <th>Status</th>
              <th>Last Restocked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => (
              <tr key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 20}ms` }}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{product.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>{product.brand}</div>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{product.sku}</td>
                <td style={{ fontSize: 13 }}>{product.inventory.location || '—'}</td>
                <td>
                  {editingId === product.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        type="number" value={editQty}
                        onChange={e => setEditQty(parseInt(e.target.value))}
                        style={{ width: 60, padding: '4px 8px', border: '1px solid var(--fp-gray-200)', borderRadius: 6, fontSize: 14 }}
                        autoFocus
                      />
                      <button onClick={() => {
                        const newStatus = editQty === 0 ? 'out-of-stock' : editQty <= product.inventory.reorderPoint ? 'low-stock' : 'in-stock';
                        updateInventory(product.id, {
                          quantity: editQty,
                          status: newStatus,
                          lastRestocked: new Date().toISOString().split('T')[0],
                        });
                        setEditingId(null);
                        toast.success('Stock updated');
                      }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-success)', padding: 4 }}>
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span style={{
                      fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: 16,
                      color: product.inventory.quantity === 0 ? 'var(--fp-error)' :
                             product.inventory.quantity <= product.inventory.reorderPoint ? 'var(--fp-warning)' : 'var(--fp-navy)',
                    }}>
                      {product.inventory.quantity}
                    </span>
                  )}
                </td>
                <td style={{ fontSize: 13 }}>{product.inventory.reorderPoint}</td>
                <td style={{ fontSize: 13 }}>${product.costPrice.toFixed(2)}</td>
                <td style={{ fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                  ${(product.costPrice * product.inventory.quantity).toFixed(2)}
                </td>
                <td>
                  <span className={`fp-badge fp-badge-${
                    product.inventory.status === 'in-stock' ? 'success' :
                    product.inventory.status === 'low-stock' ? 'warning' : 'error'
                  }`}>
                    {product.inventory.status}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                  {product.inventory.lastRestocked}
                </td>
                <td>
                  <button onClick={() => {
                    setEditingId(product.id);
                    setEditQty(product.inventory.quantity);
                  }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fp-gray-400)', padding: 6 }}>
                    <Edit3 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
