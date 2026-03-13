'use client';

import React, { useState, useEffect } from 'react';
import { useForemostStore } from '@/lib/store';
import { Product, PaymentMethod, Order } from '@/lib/types';
import ReceiptModal from '@/components/ReceiptModal';
import toast from 'react-hot-toast';
import {
  Search, Plus, Minus, Trash2, User, CreditCard, DollarSign,
  Gift, Star, X, ShoppingCart, PawPrint, Check, ArrowRight,
  Hash, Barcode, Tag, Package,
} from 'lucide-react';

// ---- Product Quick Add ----
function ProductGrid({ onAdd }: { onAdd: (product: Product) => void }) {
  const { products, searchQuery } = useForemostStore();
  const [filter, setFilter] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const filtered = products.filter(p => {
    if (!p.isActive) return false;
    const matchesFilter = filter === 'all' || p.category === filter || p.petType.includes(filter as any);
    const q = localSearch.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'dog', label: '🐕 Dog' },
    { id: 'cat', label: '🐈 Cat' },
    { id: 'food', label: 'Food' },
    { id: 'treats', label: 'Treats' },
    { id: 'toys', label: 'Toys' },
    { id: 'health', label: 'Health' },
    { id: 'grooming', label: 'Grooming' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Scan barcode or search products..."
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
          className="fp-input fp-input-search"
          style={{ height: 48, fontSize: 15, paddingLeft: 48 }}
          autoFocus
        />
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
            padding: '6px 16px', borderRadius: 'var(--radius-full)',
            border: filter === cat.id ? 'none' : '1px solid var(--fp-gray-200)',
            background: filter === cat.id ? 'var(--fp-navy)' : 'var(--fp-white)',
            color: filter === cat.id ? 'var(--fp-white)' : 'var(--fp-gray-500)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {filtered.map(product => (
          <button
            key={product.id}
            onClick={() => onAdd(product)}
            className="fp-pos-item"
            style={{
              width: '100%', border: 'none', background: 'transparent',
              textAlign: 'left', fontFamily: 'var(--font-body)',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-md)',
              background: 'var(--fp-gray-50)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Package size={20} color="var(--fp-gray-300)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {product.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                {product.brand} • {product.sku} • {product.inventory.quantity} in stock
              </div>
            </div>
            <div style={{
              fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-heading)',
              color: 'var(--fp-navy)', flexShrink: 0,
            }}>
              ${product.price.toFixed(2)}
            </div>
            <Plus size={18} color="var(--fp-amber)" style={{ flexShrink: 0 }} />
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--fp-gray-300)' }}>
            <Search size={32} style={{ marginBottom: 8 }} />
            <div>No products found</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Cart Panel ----
function CartPanel() {
  const {
    cartItems, cartCustomer, removeFromCart, updateCartItemQuantity,
    clearCart, setCartCustomer, processOrder, getCartTotal,
    customers, searchCustomers,
  } = useForemostStore();

  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [customerQuery, setCustomerQuery] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const totals = getCartTotal();
  const matchedCustomers = customerQuery ? searchCustomers(customerQuery) : customers.slice(0, 5);

  const handlePayment = (method: PaymentMethod) => {
    const order = processOrder(method);
    if (order) {
      toast.success(`Order ${order.orderNumber} completed! $${order.totalAmount.toFixed(2)}`);
      setShowPayment(false);
      setCompletedOrder(order);
    }
  };

  const tierIcons: Record<string, string> = {
    'paw': '🐾', 'silver-paw': '🥈', 'gold-paw': '⭐', 'diamond-paw': '💎',
  };

  return (
    <>
    <div style={{
      width: 420, background: 'var(--fp-white)', borderLeft: '1px solid var(--fp-gray-100)',
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height))',
    }}>
      {/* Cart Header */}
      <div style={{
        padding: '18px 24px', borderBottom: '1px solid var(--fp-gray-100)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShoppingCart size={20} color="var(--fp-navy)" />
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Current Sale</h2>
          {cartItems.length > 0 && (
            <span className="fp-badge fp-badge-amber">{cartItems.length}</span>
          )}
        </div>
        {cartItems.length > 0 && (
          <button onClick={clearCart} style={{
            background: 'none', border: 'none', color: 'var(--fp-error)',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Trash2 size={14} /> Clear
          </button>
        )}
      </div>

      {/* Customer Selection */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--fp-gray-100)' }}>
        {cartCustomer ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 'var(--radius-md)',
            background: 'var(--fp-amber-glow)', border: '1px solid rgba(245, 158, 11, 0.2)',
          }}>
            <div style={{ fontSize: 20 }}>{tierIcons[cartCustomer.loyaltyTier]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {cartCustomer.firstName} {cartCustomer.lastName}
              </div>
              <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                {cartCustomer.loyaltyPoints.toLocaleString()} points
              </div>
            </div>
            <button onClick={() => setCartCustomer(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--fp-gray-400)', padding: 4,
            }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowCustomerSearch(!showCustomerSearch)}
              className="fp-btn fp-btn-outline"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <User size={16} /> Add Customer (optional)
            </button>
            {showCustomerSearch && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
                background: 'var(--fp-white)', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--fp-gray-100)', boxShadow: 'var(--shadow-xl)',
                zIndex: 20, padding: 8,
              }}>
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={customerQuery}
                  onChange={e => setCustomerQuery(e.target.value)}
                  className="fp-input"
                  style={{ marginBottom: 8 }}
                  autoFocus
                />
                {matchedCustomers.map(c => (
                  <button key={c.id} onClick={() => {
                    setCartCustomer(c);
                    setShowCustomerSearch(false);
                    setCustomerQuery('');
                  }} style={{
                    width: '100%', padding: '10px 14px', display: 'flex',
                    alignItems: 'center', gap: 10, border: 'none',
                    background: 'transparent', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)',
                  }}>
                    <span style={{ fontSize: 16 }}>{tierIcons[c.loyaltyTier]}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {c.firstName} {c.lastName}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                        {c.email}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
        {cartItems.length === 0 ? (
          <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            color: 'var(--fp-gray-300)',
          }}>
            <PawPrint size={48} strokeWidth={1.5} />
            <div style={{ fontSize: 15, fontWeight: 500 }}>No items in cart</div>
            <div style={{ fontSize: 13 }}>Scan or search to add products</div>
          </div>
        ) : (
          cartItems.map(item => (
            <div key={item.id} style={{
              padding: '14px 0', borderBottom: '1px solid var(--fp-gray-100)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14, fontWeight: 600, marginBottom: 2,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {item.productName}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fp-gray-400)' }}>
                  ${item.unitPrice.toFixed(2)} each
                </div>
              </div>
              {/* Quantity controls */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 0,
                border: '1px solid var(--fp-gray-200)', borderRadius: 'var(--radius-md)',
              }}>
                <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} style={{
                  width: 32, height: 32, border: 'none', background: 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--fp-gray-400)',
                }}>
                  <Minus size={14} />
                </button>
                <span style={{
                  width: 32, textAlign: 'center', fontSize: 14, fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                }}>
                  {item.quantity}
                </span>
                <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} style={{
                  width: 32, height: 32, border: 'none', background: 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--fp-amber)',
                }}>
                  <Plus size={14} />
                </button>
              </div>
              <div style={{
                fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                minWidth: 70, textAlign: 'right',
              }}>
                ${item.totalPrice.toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--fp-gray-300)', padding: 4,
              }}>
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Totals & Payment */}
      {cartItems.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--fp-gray-100)',
          padding: '20px 24px',
          background: 'var(--fp-gray-50)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--fp-gray-400)' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${totals.subtotal.toFixed(2)}</span>
            </div>
            {totals.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--fp-success)' }}>Discount</span>
                <span style={{ fontWeight: 600, color: 'var(--fp-success)' }}>-${totals.discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--fp-gray-400)' }}>HST (13%)</span>
              <span style={{ fontWeight: 600 }}>${totals.tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-heading)',
              paddingTop: 8, borderTop: '2px solid var(--fp-gray-200)',
            }}>
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
            {cartCustomer && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: 'var(--fp-amber-dark)', fontWeight: 600,
              }}>
                <Star size={14} />
                {totals.pointsEarned.toLocaleString()} points earned
              </div>
            )}
          </div>

          {/* Payment Buttons */}
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              className="fp-btn fp-btn-amber fp-btn-lg"
              style={{ width: '100%', fontSize: 16, fontWeight: 700 }}
            >
              <CreditCard size={20} /> Charge ${totals.total.toFixed(2)}
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: 'var(--fp-gray-400)',
                textAlign: 'center', marginBottom: 4,
              }}>
                Select Payment Method
              </div>
              {([
                { method: 'cash' as PaymentMethod, label: 'Cash', icon: DollarSign, color: 'var(--fp-success)' },
                { method: 'debit' as PaymentMethod, label: 'Debit', icon: CreditCard, color: 'var(--fp-info)' },
                { method: 'credit' as PaymentMethod, label: 'Credit', icon: CreditCard, color: 'var(--fp-navy)' },
                { method: 'gift-card' as PaymentMethod, label: 'Gift Card', icon: Gift, color: '#8b5cf6' },
              ]).map(pm => (
                <button
                  key={pm.method}
                  onClick={() => handlePayment(pm.method)}
                  className="fp-btn fp-btn-outline"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <pm.icon size={18} color={pm.color} />
                  {pm.label}
                  <ArrowRight size={14} style={{ marginLeft: 'auto' }} color="var(--fp-gray-300)" />
                </button>
              ))}
              <button
                onClick={() => setShowPayment(false)}
                className="fp-btn fp-btn-ghost"
                style={{ width: '100%' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>

      {/* Receipt Modal */}
      {completedOrder && (
        <ReceiptModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
          onNewSale={() => setCompletedOrder(null)}
        />
      )}
    </>
  );
}

// ---- POS Page ----
export default function POSPage() {
  const { addToCart } = useForemostStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div className="fp-skeleton" style={{ width: 200, height: 30, margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', gap: 0,
      margin: '-28px',
      height: 'calc(100vh - var(--header-height))',
    }}>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Point of Sale</h1>
          <p style={{ fontSize: 14, color: 'var(--fp-gray-400)' }}>Scan, search, or browse to add items</p>
        </div>
        <ProductGrid onAdd={(product) => {
          addToCart(product);
          toast.success(`Added ${product.name}`, { duration: 1500, icon: '🐾' });
        }} />
      </div>
      <CartPanel />
    </div>
  );
}
