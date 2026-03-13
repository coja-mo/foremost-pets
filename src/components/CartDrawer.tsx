'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import {
  X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, PawPrint, Package,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items, isOpen, closeCart, removeItem, updateQuantity, clearCart,
    itemCount, subtotal, tax, total,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)', zIndex: 200,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Drawer */}
      <div className="animate-slide-in-right" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 440, maxWidth: '90vw', background: 'white',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', zIndex: 201,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--fp-gray-100)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="var(--fp-navy)" />
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
              color: 'var(--fp-navy)',
            }}>Your Cart</h2>
            {itemCount > 0 && (
              <span style={{
                background: 'var(--fp-amber)', color: 'white',
                fontSize: 11, fontWeight: 700, padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}>{itemCount}</span>
            )}
          </div>
          <button onClick={closeCart} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fp-gray-400)', padding: 4,
          }}>
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', minHeight: 300, gap: 16,
            }}>
              <Package size={48} strokeWidth={1} color="var(--fp-gray-200)" />
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fp-gray-400)' }}>
                Your cart is empty
              </div>
              <p style={{ fontSize: 14, color: 'var(--fp-gray-300)', textAlign: 'center', maxWidth: 240 }}>
                Browse our shop and add some treats for your furry friend!
              </p>
              <Link href="/shop" onClick={closeCart} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', borderRadius: 'var(--radius-full)',
                background: 'var(--fp-navy)', color: 'white',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}>
                Browse Shop <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} style={{
                  display: 'flex', gap: 14, padding: '16px 0',
                  borderBottom: '1px solid var(--fp-gray-100)',
                }}>
                  {/* Product image placeholder */}
                  <div style={{
                    width: 72, height: 72, borderRadius: 'var(--radius-md)',
                    background: `linear-gradient(135deg, ${
                      product.petType.includes('dog') ? '#fef3c7' : product.petType.includes('cat') ? '#dbeafe' : '#d1fae5'
                    }, white)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <PawPrint size={20} strokeWidth={1.5} color="var(--fp-gray-300)" />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 600, color: 'var(--fp-amber-dark)',
                      textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2,
                    }}>{product.brand}</div>
                    <div style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                      marginBottom: 6,
                      overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                    }}>{product.name}</div>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      {/* Quantity controls */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 0,
                        border: '1px solid var(--fp-gray-200)', borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                      }}>
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} style={{
                          width: 32, height: 32, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', background: 'var(--fp-gray-50)',
                          border: 'none', cursor: 'pointer', color: 'var(--fp-gray-500)',
                        }}>
                          <Minus size={14} />
                        </button>
                        <span style={{
                          width: 36, textAlign: 'center', fontSize: 13,
                          fontWeight: 700, fontFamily: 'var(--font-heading)',
                        }}>{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} style={{
                          width: 32, height: 32, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', background: 'var(--fp-gray-50)',
                          border: 'none', cursor: 'pointer', color: 'var(--fp-gray-500)',
                        }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: 15, fontWeight: 800, color: 'var(--fp-navy)',
                          fontFamily: 'var(--font-heading)',
                        }}>${(product.price * quantity).toFixed(2)}</div>
                        {quantity > 1 && (
                          <div style={{ fontSize: 11, color: 'var(--fp-gray-400)' }}>
                            ${product.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button onClick={() => removeItem(product.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--fp-gray-300)', padding: 4, alignSelf: 'flex-start',
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {items.length > 0 && (
                <button onClick={clearCart} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: 'var(--fp-gray-400)', padding: '8px 0',
                  textAlign: 'center', fontWeight: 500,
                }}>
                  Clear cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div style={{
            borderTop: '2px solid var(--fp-gray-100)',
            padding: '20px 24px',
            background: 'var(--fp-gray-50)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
              <span style={{ color: 'var(--fp-gray-400)' }}>Subtotal</span>
              <span style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
              <span style={{ color: 'var(--fp-gray-400)' }}>HST (13%)</span>
              <span style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              paddingTop: 12, marginTop: 6,
              borderTop: '1px solid var(--fp-gray-200)',
              fontSize: 18, fontWeight: 900, fontFamily: 'var(--font-heading)',
              color: 'var(--fp-navy)',
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={{
              marginTop: 16, padding: '10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--fp-amber-glow)',
              textAlign: 'center', fontSize: 12, fontWeight: 600,
              color: 'var(--fp-amber-dark)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <PawPrint size={12} />
              You&apos;ll earn {Math.floor(subtotal * 10)} Paw Reward points!
            </div>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/checkout" onClick={closeCart} style={{
                width: '100%', padding: '14px 24px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
                color: 'white', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s ease', textDecoration: 'none',
              }}>
                <ShoppingBag size={16} /> Proceed to Checkout
              </Link>
              <p style={{
                fontSize: 11, color: 'var(--fp-gray-400)',
                textAlign: 'center', lineHeight: 1.6,
              }}>
                Reserve online, pay in-store at either Sault Ste. Marie location
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
