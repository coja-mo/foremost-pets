// ============================================================
// FOREMOST PET FOODS - STORE CONFIGURATION
// Real business data for Sault Ste. Marie, ON locations
// ============================================================

import { StoreConfig, StoreHours, LoyaltyConfig } from './types';

const standardHours: StoreHours = {
  monday:    { open: '09:00', close: '18:00', isClosed: false },
  tuesday:   { open: '09:00', close: '18:00', isClosed: false },
  wednesday: { open: '09:00', close: '18:00', isClosed: false },
  thursday:  { open: '09:00', close: '18:00', isClosed: false },
  friday:    { open: '09:00', close: '18:00', isClosed: false },
  saturday:  { open: '09:00', close: '18:00', isClosed: false },
  sunday:    { open: '11:00', close: '16:00', isClosed: false },
};

export const STORE_LOCATIONS = [
  {
    id: 'second-line',
    name: 'Foremost Pets — Second Line',
    shortName: 'Second Line',
    address: {
      street: '68 Second Line W',
      city: 'Sault Ste. Marie',
      province: 'ON',
      postalCode: 'P6A 0A1',
      country: 'CA',
    },
    phone: '(705) 759-1234',
    email: 'secondline@foremostpetfoods.ca',
    hours: standardHours,
    features: ['In-Store Shopping', 'In-Store Pickup', 'Fish & Aquatics'],
    petTypes: ['dog', 'cat', 'fish'] as const,
    isPrimary: true,
    coordinates: { lat: 46.5136, lng: -84.3358 },
  },
  {
    id: 'trunk-road',
    name: 'Foremost Pets — Trunk Road',
    shortName: 'Trunk Road',
    address: {
      street: '149 Trunk Rd',
      city: 'Sault Ste. Marie',
      province: 'ON',
      postalCode: 'P6A 3S5',
      country: 'CA',
    },
    phone: '(705) 949-2559',
    email: 'trunkroad@foremostpetfoods.ca',
    hours: standardHours,
    features: ['In-Store Shopping', 'Onsite Services', 'Grooming'],
    petTypes: ['dog', 'cat'] as const,
    isPrimary: false,
    coordinates: { lat: 46.5270, lng: -84.2980 },
  },
] as const;

export const STORE_CONFIG: StoreConfig = {
  name: 'Foremost Pets',
  tagline: 'Your Local Pet Nutrition Experts Since Day One',
  address: STORE_LOCATIONS[0].address,
  phone: STORE_LOCATIONS[0].phone,
  email: 'hello@foremostpetfoods.ca',
  website: 'foremostpetfoods.ca',
  hours: standardHours,
  taxRate: 0.13, // Ontario HST
  currency: 'CAD',
  locale: 'en-CA',
  logo: '/logo.svg',
  socialMedia: {
    facebook: 'https://facebook.com/foremostpetfoods',
    instagram: 'https://instagram.com/foremostpetfoods',
  },
};

// ---- Loyalty Program Configuration ----
export const LOYALTY_CONFIG: LoyaltyConfig = {
  pointsPerDollar: 10,
  pointsRedemptionRate: 0.01, // 1 cent per point ($1 = 100 points redeemed)
  birthdayBonusPoints: 500,
  referralBonusPoints: 250,
  autoShipBonusMultiplier: 1.5,
  tiers: [
    {
      tier: 'paw',
      name: 'Paw Member',
      icon: '🐾',
      color: '#78716c',
      minSpend: 0,
      pointsMultiplier: 1,
      discountPercent: 0,
      benefits: [
        'Earn 10 points per $1 spent',
        'Birthday treat for your pet',
        'Exclusive member pricing',
        'Digital receipts & history',
      ],
    },
    {
      tier: 'silver-paw',
      name: 'Silver Paw',
      icon: '🥈',
      color: '#94a3b8',
      minSpend: 500,
      pointsMultiplier: 1.5,
      discountPercent: 5,
      benefits: [
        '1.5x points on all purchases',
        '5% off store-wide',
        'Early access to promotions',
        'Free nail trims (monthly)',
        'Priority AutoShip scheduling',
      ],
    },
    {
      tier: 'gold-paw',
      name: 'Gold Paw',
      icon: '⭐',
      color: '#eab308',
      minSpend: 1500,
      pointsMultiplier: 2,
      discountPercent: 10,
      benefits: [
        '2x points on all purchases',
        '10% off store-wide',
        'Free grooming session (quarterly)',
        'Exclusive Gold Paw events',
        'Priority customer support',
        'Free delivery on orders $40+',
      ],
    },
    {
      tier: 'diamond-paw',
      name: 'Diamond Paw',
      icon: '💎',
      color: '#60a5fa',
      minSpend: 5000,
      pointsMultiplier: 3,
      discountPercent: 15,
      benefits: [
        '3x points on all purchases',
        '15% off store-wide',
        'Free grooming anytime',
        'Annual VIP gift package',
        'Personal nutrition consultant',
        'Free same-day local delivery',
        'Exclusive Diamond events & previews',
      ],
    },
  ],
};

// ---- Brands carried ----
export const BRANDS = [
  { id: 'fromm', name: 'Fromm Family Foods', logo: '/brands/fromm.png', featured: true },
  { id: 'go-solutions', name: 'GO! Solutions', logo: '/brands/go.png', featured: true },
  { id: 'now-fresh', name: 'NOW FRESH', logo: '/brands/now.png', featured: true },
  { id: 'acana', name: 'ACANA', logo: '/brands/acana.png', featured: true },
  { id: 'orijen', name: 'ORIJEN', logo: '/brands/orijen.png', featured: true },
  { id: 'royal-canin', name: 'Royal Canin', logo: '/brands/royal-canin.png', featured: false },
  { id: 'purina-pro', name: 'Purina Pro Plan', logo: '/brands/purina.png', featured: false },
  { id: 'blue-buffalo', name: 'Blue Buffalo', logo: '/brands/blue-buffalo.png', featured: false },
  { id: 'kong', name: 'KONG', logo: '/brands/kong.png', featured: false },
  { id: 'greenies', name: 'GREENIES', logo: '/brands/greenies.png', featured: false },
  { id: 'wellness', name: 'Wellness', logo: '/brands/wellness.png', featured: false },
  { id: 'nutro', name: 'NUTRO', logo: '/brands/nutro.png', featured: false },
] as const;

export const TAX_RATE = 0.13;
export const CURRENCY_SYMBOL = '$';
export const CURRENCY_CODE = 'CAD';
