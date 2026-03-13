'use client';

import React from 'react';
import { STORE_LOCATIONS } from '@/lib/store-config';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  MapPin, Phone, Mail, Clock, Navigation, Dog, Cat, Fish,
  ExternalLink, Star, Sparkles,
} from 'lucide-react';

export default function OurStoresPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        padding: '64px 24px 80px',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 700, color: '#f59e0b',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: 12,
        }}>
          <MapPin size={14} /> Visit Us
        </span>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 900,
          color: 'white', letterSpacing: '-0.02em',
        }}>Our Stores</h1>
        <p style={{
          color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: 16,
          maxWidth: 500, margin: '8px auto 0',
        }}>
          Two convenient locations in Sault Ste. Marie, ON serving you and your furry family
        </p>
      </section>

      {/* Store Cards */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {STORE_LOCATIONS.map((location, idx) => (
            <div key={location.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}>
              {/* Map placeholder */}
              <div style={{
                background: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                position: 'relative', minHeight: 400,
                order: idx % 2 === 1 ? 2 : 1,
              }}>
                <MapPin size={48} style={{ opacity: 0.15, marginBottom: 12 }} />
                <span style={{
                  fontSize: 14, fontWeight: 600, color: 'var(--fp-gray-400)',
                  marginBottom: 16,
                }}>
                  {location.address.street}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px', borderRadius: 'var(--radius-full)',
                    background: 'var(--fp-navy)', color: 'white',
                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  }}
                >
                  <Navigation size={14} /> Open in Google Maps
                </a>
                {location.isPrimary && (
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--fp-amber)', color: 'white',
                    fontSize: 11, fontWeight: 700, padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    <Star size={12} /> Main Location
                  </div>
                )}
              </div>

              {/* Store details */}
              <div style={{
                padding: '40px 36px',
                order: idx % 2 === 1 ? 1 : 2,
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 900,
                  color: 'var(--fp-navy)', marginBottom: 6,
                }}>
                  {location.name}
                </h2>
                <p style={{
                  fontSize: 14, color: 'var(--fp-gray-400)', marginBottom: 28,
                }}>
                  {location.isPrimary ? 'Our flagship store with full product selection' : 'Our satellite store with grooming services'}
                </p>

                {/* Contact info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <MapPin size={18} color="var(--fp-amber-dark)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>Address</div>
                      <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>
                        {location.address.street}, {location.address.city}, {location.address.province} {location.address.postalCode}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Phone size={18} color="var(--fp-amber-dark)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>Phone</div>
                      <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>{location.phone}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Mail size={18} color="var(--fp-amber-dark)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fp-navy)' }}>Email</div>
                      <div style={{ fontSize: 13, color: 'var(--fp-gray-400)' }}>{location.email}</div>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div style={{
                  background: 'var(--fp-gray-50)', borderRadius: 'var(--radius-md)',
                  padding: '16px 20px', marginBottom: 24,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 14, fontWeight: 700, color: 'var(--fp-navy)',
                    marginBottom: 12,
                  }}>
                    <Clock size={16} color="var(--fp-amber)" /> Store Hours
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 13 }}>
                    {Object.entries(location.hours).map(([day, hours]) => (
                      <div key={day} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '4px 0', color: 'var(--fp-gray-500)',
                      }}>
                        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{day}</span>
                        <span>{hours.isClosed ? 'Closed' : `${hours.open}–${hours.close}`}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & Pet Types */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {location.features.map(feature => (
                    <span key={feature} style={{
                      padding: '6px 14px', borderRadius: 'var(--radius-full)',
                      background: 'var(--fp-amber-glow)', color: 'var(--fp-amber-dark)',
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {location.petTypes.map(pet => (
                    <div key={pet} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 600, color: 'var(--fp-gray-400)',
                      textTransform: 'capitalize',
                    }}>
                      {pet === 'dog' ? <Dog size={16} /> : pet === 'cat' ? <Cat size={16} /> : <Fish size={16} />}
                      {pet}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
