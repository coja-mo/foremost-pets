// ============================================================
// FOREMOST PETS - ENTERPRISE TYPE SYSTEM
// ============================================================

// ---- Product & Inventory ----
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  petType: PetType[];
  images: string[];
  price: number;
  compareAtPrice?: number;
  costPrice: number;
  sku: string;
  barcode?: string;
  weight: number;
  weightUnit: 'kg' | 'lb' | 'g' | 'oz';
  dimensions?: { length: number; width: number; height: number };
  inventory: InventoryRecord;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isAutoShipEligible: boolean;
  nutritionInfo?: NutritionInfo;
  ingredients?: string;
  lifestage?: LifeStage[];
  breedSize?: BreedSize[];
  createdAt: string;
  updatedAt: string;
}

export type PetType = 'dog' | 'cat' | 'bird' | 'fish' | 'reptile' | 'small-animal';

export type ProductCategory =
  | 'food'
  | 'treats'
  | 'toys'
  | 'health'
  | 'grooming'
  | 'accessories'
  | 'beds-furniture'
  | 'bowls-feeders'
  | 'collars-leashes'
  | 'crates-carriers'
  | 'aquarium'
  | 'habitat';

export type LifeStage = 'puppy' | 'kitten' | 'adult' | 'senior' | 'all-stages';
export type BreedSize = 'small' | 'medium' | 'large' | 'giant' | 'all-sizes';

export interface NutritionInfo {
  calories: string;
  protein: string;
  fat: string;
  fiber: string;
  moisture: string;
  ingredients: string[];
  guaranteedAnalysis: Record<string, string>;
}

export interface InventoryRecord {
  productId: string;
  quantity: number;
  reorderPoint: number;
  reorderQuantity: number;
  location: string;
  lastRestocked: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued' | 'on-order';
}

// ---- Customer & Loyalty ----
export interface Customer {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address?: Address;
  pets: PetProfile[];
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  totalSpent: number;
  totalOrders: number;
  joinDate: string;
  lastVisit: string;
  preferences: CustomerPreferences;
  autoShipSubscriptions: AutoShipSubscription[];
  giftCards: GiftCardBalance[];
  notes: string;
  tags: string[];
  isActive: boolean;
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface PetProfile {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  birthDate: string;
  weight: number;
  weightUnit: 'kg' | 'lb';
  allergies: string[];
  dietaryNeeds: string[];
  medications: string[];
  veterinarian?: string;
  preferredFood: string[];
  notes: string;
}

export type LoyaltyTier = 'paw' | 'silver-paw' | 'gold-paw' | 'diamond-paw';

export interface CustomerPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoShipReminders: boolean;
  birthdayReminders: boolean;
  preferredPayment?: string;
  communicationLanguage: 'en' | 'fr';
}

export interface AutoShipSubscription {
  id: string;
  customerId: string;
  productId: string;
  productName: string;
  quantity: number;
  frequencyDays: number;
  nextDeliveryDate: string;
  lastDeliveryDate?: string;
  price: number;
  discount: number; // percentage
  status: 'active' | 'paused' | 'cancelled';
  createdAt: string;
}

// ---- Gift Cards ----
export interface GiftCard {
  id: string;
  code: string;
  originalBalance: number;
  currentBalance: number;
  purchasedBy?: string;
  assignedTo?: string;
  expiresAt?: string;
  isActive: boolean;
  transactions: GiftCardTransaction[];
  createdAt: string;
}

export interface GiftCardBalance {
  giftCardId: string;
  code: string;
  balance: number;
}

export interface GiftCardTransaction {
  id: string;
  giftCardId: string;
  type: 'purchase' | 'redemption' | 'reload' | 'refund';
  amount: number;
  balanceAfter: number;
  orderId?: string;
  note: string;
  timestamp: string;
}

// ---- Orders & POS ----
export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  loyaltyPointsEarned: number;
  loyaltyPointsRedeemed: number;
  giftCardAmountUsed: number;
  giftCardId?: string;
  notes: string;
  employeeId: string;
  employeeName: string;
  channel: 'pos' | 'online' | 'phone';
  createdAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  isAutoShip: boolean;
}

export type PaymentMethod = 'cash' | 'credit' | 'debit' | 'gift-card' | 'loyalty-points' | 'split';
export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'partial-refund' | 'failed';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';

// ---- Loyalty & Rewards ----
export interface LoyaltyConfig {
  tiers: LoyaltyTierConfig[];
  pointsPerDollar: number;
  pointsRedemptionRate: number; // dollars per point
  birthdayBonusPoints: number;
  referralBonusPoints: number;
  autoShipBonusMultiplier: number;
}

export interface LoyaltyTierConfig {
  tier: LoyaltyTier;
  name: string;
  icon: string;
  color: string;
  minSpend: number;
  pointsMultiplier: number;
  benefits: string[];
  discountPercent: number;
}

export interface LoyaltyTransaction {
  id: string;
  customerId: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'expired' | 'adjusted';
  points: number;
  balanceAfter: number;
  description: string;
  orderId?: string;
  timestamp: string;
}

// ---- Employee & Staff ----
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  pin: string; // For POS login
  isActive: boolean;
  hireDate: string;
  schedule: ScheduleEntry[];
  permissions: string[];
  salesTotal: number;
  transactionCount: number;
}

export type EmployeeRole = 'owner' | 'manager' | 'cashier' | 'associate' | 'groomer';

export interface ScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  role: string;
  notes: string;
}

// ---- Promotions ----
export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'bundle' | 'loyalty-multiplier';
  value: number;
  conditions: PromotionCondition;
  applicableProducts: string[]; // product IDs, empty = all
  applicableCategories: ProductCategory[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
  maxUsage?: number;
  code?: string;
}

export interface PromotionCondition {
  minPurchase?: number;
  minQuantity?: number;
  loyaltyTierRequired?: LoyaltyTier;
  firstPurchaseOnly?: boolean;
  autoShipOnly?: boolean;
}

// ---- Supplier ----
export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: Address;
  products: string[];
  leadTimeDays: number;
  minimumOrder: number;
  paymentTerms: string;
  notes: string;
  isActive: boolean;
}

// ---- Analytics ----
export interface DailySalesReport {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: { productId: string; name: string; quantity: number; revenue: number }[];
  paymentBreakdown: Record<PaymentMethod, number>;
  newCustomers: number;
  returningCustomers: number;
  loyaltyPointsIssued: number;
  loyaltyPointsRedeemed: number;
}

// ---- Store Configuration ----
export interface StoreConfig {
  name: string;
  tagline: string;
  address: Address;
  phone: string;
  email: string;
  website: string;
  hours: StoreHours;
  taxRate: number;
  currency: string;
  locale: string;
  logo: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface StoreHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

// ---- Notifications ----
export interface Notification {
  id: string;
  type: 'low-stock' | 'order' | 'autoship' | 'loyalty' | 'system' | 'customer';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
