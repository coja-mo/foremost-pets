'use client';

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useForemostStore } from '@/lib/store';
import { Product, ProductCategory, PetType } from '@/lib/types';
import toast from 'react-hot-toast';
import {
  Search, Plus, Edit3, Trash2, Package, Filter, Grid3X3,
  List, Star, Tag, BarChart3, ArrowUpDown, Eye, X,
  PawPrint, DollarSign, Boxes, ChevronDown,
} from 'lucide-react';

// ---- Add/Edit Product Modal ----
function ProductModal({ product, onClose, onSave }: {
  product?: Product; onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || 'food',
    subcategory: product?.subcategory || '',
    petType: product?.petType || ['dog'],
    price: product?.price || 0,
    costPrice: product?.costPrice || 0,
    sku: product?.sku || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    weight: product?.weight || 0,
    weightUnit: product?.weightUnit || 'kg',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    isAutoShipEligible: product?.isAutoShipEligible ?? false,
    quantity: product?.inventory?.quantity || 0,
    reorderPoint: product?.inventory?.reorderPoint || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, backdropFilter: 'blur(4px)',
    }}>
      <div className="animate-scale-in" style={{
        background: 'var(--fp-white)', borderRadius: 'var(--radius-xl)',
        width: '100%', maxWidth: 640, maxHeight: '85vh', overflowY: 'auto',
        boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid var(--fp-gray-100)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, background: 'var(--fp-white)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', zIndex: 1,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)', padding: 4,
          }}>
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Name & Brand */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Product Name</label>
              <input className="fp-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Brand</label>
              <input className="fp-input" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
            </div>
          </div>
          {/* Category & SKU */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Category</label>
              <select className="fp-input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as ProductCategory })}>
                <option value="food">Food</option>
                <option value="treats">Treats</option>
                <option value="toys">Toys</option>
                <option value="health">Health</option>
                <option value="grooming">Grooming</option>
                <option value="accessories">Accessories</option>
                <option value="beds-furniture">Beds & Furniture</option>
                <option value="bowls-feeders">Bowls & Feeders</option>
                <option value="collars-leashes">Collars & Leashes</option>
                <option value="aquarium">Aquarium</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>SKU</label>
              <input className="fp-input" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Pet Type</label>
              <select className="fp-input" value={formData.petType[0]} onChange={e => setFormData({ ...formData, petType: [e.target.value as PetType] })}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="fish">Fish</option>
              </select>
            </div>
          </div>
          {/* Pricing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Sell Price ($)</label>
              <input className="fp-input" type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Cost Price ($)</label>
              <input className="fp-input" type="number" step="0.01" value={formData.costPrice} onChange={e => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })} required />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Weight</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="fp-input" type="number" step="0.1" value={formData.weight} onChange={e => setFormData({ ...formData, weight: parseFloat(e.target.value) })} style={{ flex: 1 }} />
                <select className="fp-input" value={formData.weightUnit} onChange={e => setFormData({ ...formData, weightUnit: e.target.value as any })} style={{ width: 70 }}>
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                  <option value="g">g</option>
                </select>
              </div>
            </div>
          </div>
          {/* Inventory */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Stock Quantity</label>
              <input className="fp-input" type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Reorder Point</label>
              <input className="fp-input" type="number" value={formData.reorderPoint} onChange={e => setFormData({ ...formData, reorderPoint: parseInt(e.target.value) })} />
            </div>
          </div>
          {/* Description */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea className="fp-input" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ resize: 'vertical' }} />
          </div>
          {/* Toggles */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { key: 'isActive', label: 'Active' },
              { key: 'isFeatured', label: 'Featured' },
              { key: 'isAutoShipEligible', label: 'AutoShip Eligible' },
            ].map(toggle => (
              <label key={toggle.key} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={(formData as any)[toggle.key]}
                  onChange={e => setFormData({ ...formData, [toggle.key]: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: 'var(--fp-amber)' }}
                />
                {toggle.label}
              </label>
            ))}
          </div>
          {/* Submit */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="fp-btn fp-btn-outline">Cancel</button>
            <button type="submit" className="fp-btn fp-btn-primary">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Products Page ----
export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <AppShell><div className="fp-skeleton" style={{ width: '100%', height: 400 }} /></AppShell>;
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesPetType = petTypeFilter === 'all' || p.petType.includes(petTypeFilter as PetType);
    return matchesSearch && matchesCategory && matchesPetType;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'stock') return a.inventory.quantity - b.inventory.quantity;
    return 0;
  });

  const handleSave = (data: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...data,
        inventory: { ...editingProduct.inventory, quantity: data.quantity, reorderPoint: data.reorderPoint },
      });
      toast.success('Product updated!');
    } else {
      addProduct({
        ...data,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        images: [],
        tags: [],
        inventory: {
          productId: '',
          quantity: data.quantity,
          reorderPoint: data.reorderPoint,
          reorderQuantity: data.reorderPoint * 3,
          location: '',
          lastRestocked: new Date().toISOString().split('T')[0],
          supplier: '',
          status: data.quantity > data.reorderPoint ? 'in-stock' : data.quantity === 0 ? 'out-of-stock' : 'low-stock',
        },
      });
      toast.success('Product added!');
    }
    setShowModal(false);
    setEditingProduct(undefined);
  };

  const stockStatusColor = (p: Product) => {
    if (p.inventory.quantity === 0) return 'var(--fp-error)';
    if (p.inventory.quantity <= p.inventory.reorderPoint) return 'var(--fp-warning)';
    return 'var(--fp-success)';
  };

  return (
    <AppShell>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Products</h1>
          <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, marginTop: 4 }}>
            {products.length} products • {products.filter(p => p.isActive).length} active
          </p>
        </div>
        <button
          onClick={() => { setEditingProduct(undefined); setShowModal(true); }}
          className="fp-btn fp-btn-primary"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="fp-card-flat" style={{
        padding: '16px 20px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="fp-input fp-input-search"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="fp-input"
          style={{ width: 160 }}
        >
          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="treats">Treats</option>
          <option value="toys">Toys</option>
          <option value="health">Health</option>
          <option value="grooming">Grooming</option>
          <option value="accessories">Accessories</option>
          <option value="beds-furniture">Beds & Furniture</option>
          <option value="collars-leashes">Collars & Leashes</option>
          <option value="bowls-feeders">Bowls & Feeders</option>
          <option value="aquarium">Aquarium</option>
        </select>
        <select
          value={petTypeFilter}
          onChange={e => setPetTypeFilter(e.target.value)}
          className="fp-input"
          style={{ width: 120 }}
        >
          <option value="all">All Pets</option>
          <option value="dog">🐕 Dog</option>
          <option value="cat">🐈 Cat</option>
          <option value="fish">🐠 Fish</option>
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="fp-input"
          style={{ width: 140 }}
        >
          <option value="name">Sort: Name</option>
          <option value="price-asc">Price: Low-High</option>
          <option value="price-desc">Price: High-Low</option>
          <option value="stock">Stock: Low-High</option>
        </select>
        <div style={{ display: 'flex', border: '1px solid var(--fp-gray-200)', borderRadius: 'var(--radius-md)' }}>
          <button onClick={() => setViewMode('list')} style={{
            padding: '8px 12px', border: 'none', cursor: 'pointer',
            background: viewMode === 'list' ? 'var(--fp-navy)' : 'transparent',
            color: viewMode === 'list' ? 'white' : 'var(--fp-gray-400)',
            borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', display: 'flex',
          }}>
            <List size={16} />
          </button>
          <button onClick={() => setViewMode('grid')} style={{
            padding: '8px 12px', border: 'none', cursor: 'pointer',
            background: viewMode === 'grid' ? 'var(--fp-navy)' : 'transparent',
            color: viewMode === 'grid' ? 'white' : 'var(--fp-gray-400)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0', display: 'flex',
          }}>
            <Grid3X3 size={16} />
          </button>
        </div>
      </div>

      {/* Product Table */}
      {viewMode === 'list' ? (
        <div className="fp-card-flat" style={{ overflow: 'hidden' }}>
          <table className="fp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Margin</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const margin = ((product.price - product.costPrice) / product.price * 100).toFixed(0);
                return (
                  <tr key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                          background: 'var(--fp-gray-50)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Package size={18} color="var(--fp-gray-300)" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{product.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                            {product.brand} • {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="fp-badge fp-badge-info" style={{ textTransform: 'capitalize' }}>
                        {product.petType.join(', ')}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>${product.price.toFixed(2)}</td>
                    <td style={{ color: 'var(--fp-gray-400)' }}>${product.costPrice.toFixed(2)}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: parseInt(margin) > 30 ? 'var(--fp-success)' : 'var(--fp-warning)' }}>
                        {margin}%
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 700, fontFamily: 'var(--font-heading)',
                        color: stockStatusColor(product),
                      }}>
                        {product.inventory.quantity}
                      </span>
                    </td>
                    <td>
                      <span className={`fp-badge fp-badge-${product.isActive ? 'success' : 'error'}`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => { setEditingProduct(product); setShowModal(true); }} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--fp-gray-400)', padding: 6,
                        }}>
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => {
                          deleteProduct(product.id);
                          toast.success('Product deleted');
                        }} style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--fp-gray-300)', padding: 6,
                        }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="fp-product-grid">
          {filtered.map((product, i) => (
            <div key={product.id} className="fp-card animate-fade-in" style={{
              padding: 0, animationDelay: `${i * 50}ms`,
            }}>
              <div style={{
                height: 160, background: 'var(--fp-gray-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Package size={48} color="var(--fp-gray-200)" />
                {product.isFeatured && (
                  <span style={{
                    position: 'absolute', top: 12, left: 12,
                  }} className="fp-badge fp-badge-amber">⭐ Featured</span>
                )}
                <span className={`fp-badge fp-badge-${product.isActive ? 'success' : 'error'}`} style={{
                  position: 'absolute', top: 12, right: 12,
                }}>
                  {product.inventory.quantity} in stock
                </span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 11, color: 'var(--fp-gray-400)', fontWeight: 500, marginBottom: 4 }}>
                  {product.brand}
                </div>
                <div style={{
                  fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {product.name}
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-heading)',
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="fp-btn fp-btn-ghost fp-btn-sm">
                      <Edit3 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => { setShowModal(false); setEditingProduct(undefined); }}
          onSave={handleSave}
        />
      )}
    </AppShell>
  );
}
