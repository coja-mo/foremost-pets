'use client';

import React from 'react';
import Link from 'next/link';
import { PawPrint, MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export default function StorefrontFooter() {
  return (
    <footer style={{
      background: 'var(--fp-navy)',
      color: 'rgba(255,255,255,0.75)',
      paddingTop: 64,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawPrint size={22} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: 'white' }}>FOREMOST</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)' }}>PETS</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
            Your local pet nutrition experts in Sault Ste. Marie. Premium food, treats, supplies & expert advice for dogs, cats, and fish.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#" style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            }}>
              <Facebook size={16} />
            </a>
            <a href="#" style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            }}>
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop All Products' },
              { href: '/our-stores', label: 'Our Stores' },
              { href: '/loyalty', label: 'Paw Rewards' },
              { href: '/gift-cards', label: 'Gift Cards' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                fontSize: 13, transition: 'color 0.2s',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Second Line Location */}
        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Second Line</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              68 Second Line W, Sault Ste. Marie, ON
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} style={{ flexShrink: 0 }} />
              (705) 759-1234
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mail size={14} style={{ flexShrink: 0 }} />
              secondline@foremostpetfoods.ca
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
              <Clock size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>Mon–Sat: 9am–6pm<br />Sun: 11am–4pm</div>
            </div>
          </div>
        </div>

        {/* Trunk Road Location */}
        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Trunk Road</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              149 Trunk Rd, Sault Ste. Marie, ON
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} style={{ flexShrink: 0 }} />
              (705) 949-2559
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mail size={14} style={{ flexShrink: 0 }} />
              trunkroad@foremostpetfoods.ca
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
              <Clock size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>Mon–Sat: 9am–6pm<br />Sun: 11am–4pm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '24px 24px 0',
        marginTop: 48,
      }}>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: 'rgba(255,255,255,0.4)',
        }}>
          <span>© {new Date().getFullYear()} Foremost Pets. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Proudly serving Sault Ste. Marie since day one <PawPrint size={14} /></span>
        </div>
      </div>
    </footer>
  );
}
