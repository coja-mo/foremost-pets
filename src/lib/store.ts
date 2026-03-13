// ============================================================
// FOREMOST PETS - ZUSTAND GLOBAL STATE STORE
// Enterprise-grade state management
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Product, Customer, Employee, Order, OrderItem, GiftCard,
  Promotion, Notification, LoyaltyTransaction, AutoShipSubscription,
  PaymentMethod, InventoryRecord,
} from './types';
import {
  SEED_PRODUCTS, SEED_CUSTOMERS, SEED_EMPLOYEES,
  SEED_ORDERS, SEED_GIFT_CARDS, SEED_PROMOTIONS,
} from './seed-data';
import { LOYALTY_CONFIG } from './store-config';

// ---- Utility ----
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9999) + 1;
  return `FP-${year}-${String(num).padStart(4, '0')}`;
}

function generateGiftCardCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'FP-';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 3) code += '-';
  }
  return code;
}

// ---- Store Interface ----
interface ForemostStore {
  // Data
  products: Product[];
  customers: Customer[];
  employees: Employee[];
  orders: Order[];
  giftCards: GiftCard[];
  promotions: Promotion[];
  notifications: Notification[];
  loyaltyTransactions: LoyaltyTransaction[];

  // UI State
  currentEmployee: Employee | null;
  selectedLocation: string;
  cartItems: OrderItem[];
  cartCustomer: Customer | null;
  searchQuery: string;
  activeCategory: string;
  activePetType: string;
  sidebarOpen: boolean;
  posMode: boolean;

  // ---- Auth Actions ----
  loginWithPin: (pin: string) => Employee | null;
  logout: () => void;

  // ---- Product Actions ----
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateInventory: (productId: string, updates: Partial<InventoryRecord>) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByPetType: (petType: string) => Product[];
  getFeaturedProducts: () => Product[];
  getLowStockProducts: () => Product[];
  searchProducts: (query: string) => Product[];

  // ---- Customer Actions ----
  addCustomer: (customer: Omit<Customer, 'id' | 'joinDate' | 'lastVisit' | 'loyaltyTier' | 'loyaltyPoints' | 'totalSpent' | 'totalOrders'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomerById: (id: string) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];
  addLoyaltyPoints: (customerId: string, points: number, description: string, orderId?: string) => void;
  redeemLoyaltyPoints: (customerId: string, points: number, description: string) => boolean;
  updateLoyaltyTier: (customerId: string) => void;

  // ---- Order / POS Actions ----
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCartCustomer: (customer: Customer | null) => void;
  processOrder: (paymentMethod: PaymentMethod, notes?: string) => Order | null;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByCustomer: (customerId: string) => Order[];
  refundOrder: (orderId: string) => void;
  getCartTotal: () => { subtotal: number; tax: number; discount: number; total: number; pointsEarned: number };

  // ---- Gift Card Actions ----
  createGiftCard: (amount: number, purchasedBy?: string) => GiftCard;
  redeemGiftCard: (code: string, amount: number, orderId?: string) => boolean;
  reloadGiftCard: (code: string, amount: number) => boolean;
  getGiftCardByCode: (code: string) => GiftCard | undefined;

  // ---- Promotion Actions ----
  addPromotion: (promotion: Omit<Promotion, 'id' | 'usageCount'>) => Promotion;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  validatePromoCode: (code: string, cartTotal: number, customer?: Customer) => Promotion | null;

  // ---- Notification Actions ----
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  getUnreadCount: () => number;

  // ---- AutoShip Actions ----
  addAutoShip: (customerId: string, subscription: Omit<AutoShipSubscription, 'id' | 'createdAt'>) => void;
  updateAutoShip: (customerId: string, subscriptionId: string, updates: Partial<AutoShipSubscription>) => void;
  cancelAutoShip: (customerId: string, subscriptionId: string) => void;

  // ---- UI Actions ----
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setActivePetType: (petType: string) => void;
  setSelectedLocation: (location: string) => void;
  toggleSidebar: () => void;
  togglePosMode: () => void;

  // ---- Analytics ----
  getTodaysSales: () => { revenue: number; orders: number; avgOrder: number };
  getTopSellingProducts: (limit?: number) => { product: Product; totalSold: number; revenue: number }[];
  getRevenueByPeriod: (days: number) => { date: string; revenue: number; orders: number }[];
  getCustomerGrowth: () => { total: number; newThisMonth: number; activeRate: number };
  getInventoryValue: () => number;
}

export const useForemostStore = create<ForemostStore>()(
  persist(
    (set, get) => ({
      // ---- Initial Data ----
      products: SEED_PRODUCTS,
      customers: SEED_CUSTOMERS,
      employees: SEED_EMPLOYEES,
      orders: SEED_ORDERS,
      giftCards: SEED_GIFT_CARDS,
      promotions: SEED_PROMOTIONS,
      notifications: [
        {
          id: 'notif-001',
          type: 'low-stock',
          title: 'Low Stock Alert',
          message: 'Orthopedic Memory Foam Dog Bed - Large is running low (8 remaining)',
          priority: 'medium',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'notif-002',
          type: 'loyalty',
          title: 'New Diamond Member!',
          message: 'Mike Thompson has reached Diamond Paw status!',
          priority: 'low',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'notif-003',
          type: 'autoship',
          title: 'AutoShip Reminder',
          message: '3 AutoShip orders are scheduled for next week',
          priority: 'medium',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ],
      loyaltyTransactions: [],

      // ---- UI State ----
      currentEmployee: null,
      selectedLocation: 'second-line',
      cartItems: [],
      cartCustomer: null,
      searchQuery: '',
      activeCategory: 'all',
      activePetType: 'all',
      sidebarOpen: true,
      posMode: false,

      // ---- Auth ----
      loginWithPin: (pin: string) => {
        const employee = get().employees.find(e => e.pin === pin && e.isActive);
        if (employee) {
          set({ currentEmployee: employee });
          return employee;
        }
        return null;
      },
      logout: () => set({ currentEmployee: null, posMode: false, cartItems: [], cartCustomer: null }),

      // ---- Products ----
      addProduct: (productData) => {
        const product: Product = {
          ...productData,
          id: generateId('prod'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ products: [...state.products, product] }));
        return product;
      },
      updateProduct: (id, updates) => {
        set(state => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },
      deleteProduct: (id) => {
        set(state => ({ products: state.products.filter(p => p.id !== id) }));
      },
      updateInventory: (productId, updates) => {
        set(state => ({
          products: state.products.map(p =>
            p.id === productId
              ? {
                  ...p,
                  inventory: { ...p.inventory, ...updates },
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },
      getProductById: (id) => get().products.find(p => p.id === id),
      getProductsByCategory: (category) => {
        if (category === 'all') return get().products.filter(p => p.isActive);
        return get().products.filter(p => p.category === category && p.isActive);
      },
      getProductsByPetType: (petType) => {
        if (petType === 'all') return get().products.filter(p => p.isActive);
        return get().products.filter(p => p.petType.includes(petType as any) && p.isActive);
      },
      getFeaturedProducts: () => get().products.filter(p => p.isFeatured && p.isActive),
      getLowStockProducts: () =>
        get().products.filter(p => p.inventory.quantity <= p.inventory.reorderPoint && p.isActive),
      searchProducts: (query) => {
        const q = query.toLowerCase();
        return get().products.filter(
          p =>
            p.isActive &&
            (p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q) ||
              p.tags.some(t => t.toLowerCase().includes(q)))
        );
      },

      // ---- Customers ----
      addCustomer: (customerData) => {
        const customer: Customer = {
          ...customerData,
          id: generateId('cust'),
          loyaltyTier: 'paw',
          loyaltyPoints: 0,
          totalSpent: 0,
          totalOrders: 0,
          joinDate: new Date().toISOString().split('T')[0],
          lastVisit: new Date().toISOString().split('T')[0],
        };
        set(state => ({ customers: [...state.customers, customer] }));
        get().addNotification({
          type: 'customer',
          title: 'New Member!',
          message: `${customer.firstName} ${customer.lastName} just joined the Foremost Pets family!`,
          priority: 'low',
        });
        return customer;
      },
      updateCustomer: (id, updates) => {
        set(state => ({
          customers: state.customers.map(c => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },
      deleteCustomer: (id) => {
        set(state => ({ customers: state.customers.filter(c => c.id !== id) }));
      },
      getCustomerById: (id) => get().customers.find(c => c.id === id),
      searchCustomers: (query) => {
        const q = query.toLowerCase();
        return get().customers.filter(
          c =>
            c.firstName.toLowerCase().includes(q) ||
            c.lastName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.phone.includes(q) ||
            c.pets.some(p => p.name.toLowerCase().includes(q))
        );
      },
      addLoyaltyPoints: (customerId, points, description, orderId) => {
        const customer = get().getCustomerById(customerId);
        if (!customer) return;
        const multiplier = LOYALTY_CONFIG.tiers.find(t => t.tier === customer.loyaltyTier)?.pointsMultiplier || 1;
        const earnedPoints = Math.floor(points * multiplier);
        const newBalance = customer.loyaltyPoints + earnedPoints;

        set(state => ({
          customers: state.customers.map(c =>
            c.id === customerId ? { ...c, loyaltyPoints: newBalance } : c
          ),
          loyaltyTransactions: [
            ...state.loyaltyTransactions,
            {
              id: generateId('lt'),
              customerId,
              type: 'earned',
              points: earnedPoints,
              balanceAfter: newBalance,
              description: `${description} (${multiplier}x multiplier)`,
              orderId,
              timestamp: new Date().toISOString(),
            },
          ],
        }));
        get().updateLoyaltyTier(customerId);
      },
      redeemLoyaltyPoints: (customerId, points, description) => {
        const customer = get().getCustomerById(customerId);
        if (!customer || customer.loyaltyPoints < points) return false;
        const newBalance = customer.loyaltyPoints - points;
        set(state => ({
          customers: state.customers.map(c =>
            c.id === customerId ? { ...c, loyaltyPoints: newBalance } : c
          ),
          loyaltyTransactions: [
            ...state.loyaltyTransactions,
            {
              id: generateId('lt'),
              customerId,
              type: 'redeemed',
              points: -points,
              balanceAfter: newBalance,
              description,
              timestamp: new Date().toISOString(),
            },
          ],
        }));
        return true;
      },
      updateLoyaltyTier: (customerId) => {
        const customer = get().getCustomerById(customerId);
        if (!customer) return;
        const tiers = [...LOYALTY_CONFIG.tiers].sort((a, b) => b.minSpend - a.minSpend);
        const newTier = tiers.find(t => customer.totalSpent >= t.minSpend);
        if (newTier && newTier.tier !== customer.loyaltyTier) {
          set(state => ({
            customers: state.customers.map(c =>
              c.id === customerId ? { ...c, loyaltyTier: newTier.tier } : c
            ),
          }));
          if (LOYALTY_CONFIG.tiers.findIndex(t => t.tier === newTier.tier) > LOYALTY_CONFIG.tiers.findIndex(t => t.tier === customer.loyaltyTier)) {
            get().addNotification({
              type: 'loyalty',
              title: 'Tier Upgrade! 🎉',
              message: `${customer.firstName} ${customer.lastName} has been promoted to ${newTier.name}!`,
              priority: 'medium',
            });
          }
        }
      },

      // ---- Cart / POS ----
      addToCart: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.cartItems.find(item => item.productId === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * item.unitPrice }
                  : item
              ),
            };
          }
          const newItem: OrderItem = {
            id: generateId('ci'),
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            quantity,
            unitPrice: product.price,
            discount: 0,
            totalPrice: product.price * quantity,
            isAutoShip: false,
          };
          return { cartItems: [...state.cartItems, newItem] };
        });
      },
      removeFromCart: (itemId) => {
        set(state => ({ cartItems: state.cartItems.filter(i => i.id !== itemId) }));
      },
      updateCartItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.id === itemId
              ? { ...item, quantity, totalPrice: quantity * item.unitPrice - item.discount }
              : item
          ),
        }));
      },
      clearCart: () => set({ cartItems: [], cartCustomer: null }),
      setCartCustomer: (customer) => set({ cartCustomer: customer }),

      getCartTotal: () => {
        const state = get();
        const subtotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const discount = state.cartItems.reduce((sum, item) => sum + item.discount, 0);
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * 0.13;
        const total = taxableAmount + tax;
        const tierConfig = state.cartCustomer
          ? LOYALTY_CONFIG.tiers.find(t => t.tier === state.cartCustomer!.loyaltyTier)
          : null;
        const multiplier = tierConfig?.pointsMultiplier || 1;
        const pointsEarned = Math.floor(subtotal * LOYALTY_CONFIG.pointsPerDollar * multiplier);
        return { subtotal, tax, discount, total, pointsEarned };
      },

      processOrder: (paymentMethod, notes = '') => {
        const state = get();
        if (state.cartItems.length === 0) return null;
        const totals = state.getCartTotal();

        const order: Order = {
          id: generateId('ord'),
          orderNumber: generateOrderNumber(),
          customerId: state.cartCustomer?.id,
          customerName: state.cartCustomer
            ? `${state.cartCustomer.firstName} ${state.cartCustomer.lastName}`
            : 'Walk-in Customer',
          items: [...state.cartItems],
          subtotal: totals.subtotal,
          taxAmount: totals.tax,
          discountAmount: totals.discount,
          totalAmount: totals.total,
          paymentMethod,
          paymentStatus: 'completed',
          orderStatus: 'completed',
          loyaltyPointsEarned: totals.pointsEarned,
          loyaltyPointsRedeemed: 0,
          giftCardAmountUsed: 0,
          notes,
          employeeId: state.currentEmployee?.id || 'emp-001',
          employeeName: state.currentEmployee
            ? `${state.currentEmployee.firstName} ${state.currentEmployee.lastName}`
            : 'System',
          channel: 'pos',
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        };

        // Update inventory
        state.cartItems.forEach(item => {
          const product = state.products.find(p => p.id === item.productId);
          if (product) {
            const newQty = Math.max(0, product.inventory.quantity - item.quantity);
            const newStatus = newQty === 0 ? 'out-of-stock' : newQty <= product.inventory.reorderPoint ? 'low-stock' : 'in-stock';
            get().updateInventory(item.productId, { quantity: newQty, status: newStatus });
            if (newStatus === 'low-stock') {
              get().addNotification({
                type: 'low-stock',
                title: 'Low Stock Alert',
                message: `${product.name} is running low (${newQty} remaining)`,
                priority: 'high',
              });
            }
          }
        });

        // Update customer stats & loyalty
        if (state.cartCustomer) {
          const cust = state.cartCustomer;
          get().updateCustomer(cust.id, {
            totalSpent: cust.totalSpent + totals.total,
            totalOrders: cust.totalOrders + 1,
            lastVisit: new Date().toISOString().split('T')[0],
          });
          get().addLoyaltyPoints(cust.id, Math.floor(totals.subtotal * LOYALTY_CONFIG.pointsPerDollar), `Purchase ${order.orderNumber}`, order.id);
        }

        // Update employee stats
        if (state.currentEmployee) {
          set(s => ({
            employees: s.employees.map(e =>
              e.id === state.currentEmployee!.id
                ? { ...e, salesTotal: e.salesTotal + totals.total, transactionCount: e.transactionCount + 1 }
                : e
            ),
          }));
        }

        set(s => ({
          orders: [order, ...s.orders],
          cartItems: [],
          cartCustomer: null,
        }));

        return order;
      },

      getOrderById: (id) => get().orders.find(o => o.id === id),
      getOrdersByCustomer: (customerId) => get().orders.filter(o => o.customerId === customerId),
      refundOrder: (orderId) => {
        set(state => ({
          orders: state.orders.map(o =>
            o.id === orderId
              ? { ...o, orderStatus: 'refunded', paymentStatus: 'refunded' }
              : o
          ),
        }));
      },

      // ---- Gift Cards ----
      createGiftCard: (amount, purchasedBy) => {
        const gc: GiftCard = {
          id: generateId('gc'),
          code: generateGiftCardCode(),
          originalBalance: amount,
          currentBalance: amount,
          purchasedBy,
          isActive: true,
          transactions: [
            {
              id: generateId('gct'),
              giftCardId: '',
              type: 'purchase',
              amount,
              balanceAfter: amount,
              note: 'Gift card purchased',
              timestamp: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
        };
        gc.transactions[0].giftCardId = gc.id;
        set(state => ({ giftCards: [...state.giftCards, gc] }));
        return gc;
      },
      redeemGiftCard: (code, amount, orderId) => {
        const gc = get().giftCards.find(g => g.code === code && g.isActive);
        if (!gc || gc.currentBalance < amount) return false;
        const newBalance = gc.currentBalance - amount;
        set(state => ({
          giftCards: state.giftCards.map(g =>
            g.code === code
              ? {
                  ...g,
                  currentBalance: newBalance,
                  isActive: newBalance > 0,
                  transactions: [
                    ...g.transactions,
                    {
                      id: generateId('gct'),
                      giftCardId: g.id,
                      type: 'redemption' as const,
                      amount: -amount,
                      balanceAfter: newBalance,
                      orderId,
                      note: `Redeemed $${amount.toFixed(2)}`,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : g
          ),
        }));
        return true;
      },
      reloadGiftCard: (code, amount) => {
        const gc = get().giftCards.find(g => g.code === code);
        if (!gc) return false;
        const newBalance = gc.currentBalance + amount;
        set(state => ({
          giftCards: state.giftCards.map(g =>
            g.code === code
              ? {
                  ...g,
                  currentBalance: newBalance,
                  isActive: true,
                  transactions: [
                    ...g.transactions,
                    {
                      id: generateId('gct'),
                      giftCardId: g.id,
                      type: 'reload' as const,
                      amount,
                      balanceAfter: newBalance,
                      note: `Reloaded $${amount.toFixed(2)}`,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : g
          ),
        }));
        return true;
      },
      getGiftCardByCode: (code) => get().giftCards.find(g => g.code === code),

      // ---- Promotions ----
      addPromotion: (promoData) => {
        const promo: Promotion = { ...promoData, id: generateId('promo'), usageCount: 0 };
        set(state => ({ promotions: [...state.promotions, promo] }));
        return promo;
      },
      updatePromotion: (id, updates) => {
        set(state => ({
          promotions: state.promotions.map(p => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },
      deletePromotion: (id) => {
        set(state => ({ promotions: state.promotions.filter(p => p.id !== id) }));
      },
      validatePromoCode: (code, cartTotal, customer) => {
        const promo = get().promotions.find(
          p => p.code === code && p.isActive && new Date(p.startDate) <= new Date() && new Date(p.endDate) >= new Date()
        );
        if (!promo) return null;
        if (promo.conditions.minPurchase && cartTotal < promo.conditions.minPurchase) return null;
        if (promo.conditions.loyaltyTierRequired && customer?.loyaltyTier !== promo.conditions.loyaltyTierRequired) return null;
        if (promo.maxUsage && promo.usageCount >= promo.maxUsage) return null;
        return promo;
      },

      // ---- Notifications ----
      addNotification: (notifData) => {
        const notification: Notification = {
          ...notifData,
          id: generateId('notif'),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ notifications: [notification, ...state.notifications] }));
      },
      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        }));
      },
      markAllNotificationsRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        }));
      },
      getUnreadCount: () => get().notifications.filter(n => !n.isRead).length,

      // ---- AutoShip ----
      addAutoShip: (customerId, subscription) => {
        const sub: AutoShipSubscription = {
          ...subscription,
          id: generateId('as'),
          createdAt: new Date().toISOString(),
        };
        set(state => ({
          customers: state.customers.map(c =>
            c.id === customerId
              ? { ...c, autoShipSubscriptions: [...c.autoShipSubscriptions, sub] }
              : c
          ),
        }));
      },
      updateAutoShip: (customerId, subscriptionId, updates) => {
        set(state => ({
          customers: state.customers.map(c =>
            c.id === customerId
              ? {
                  ...c,
                  autoShipSubscriptions: c.autoShipSubscriptions.map(s =>
                    s.id === subscriptionId ? { ...s, ...updates } : s
                  ),
                }
              : c
          ),
        }));
      },
      cancelAutoShip: (customerId, subscriptionId) => {
        get().updateAutoShip(customerId, subscriptionId, { status: 'cancelled' });
      },

      // ---- UI Actions ----
      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      setActivePetType: (petType) => set({ activePetType: petType }),
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      togglePosMode: () => set(state => ({ posMode: !state.posMode })),

      // ---- Analytics ----
      getTodaysSales: () => {
        const today = new Date().toISOString().split('T')[0];
        const todaysOrders = get().orders.filter(
          o => o.createdAt.split('T')[0] === today && o.orderStatus === 'completed'
        );
        const revenue = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        return {
          revenue,
          orders: todaysOrders.length,
          avgOrder: todaysOrders.length > 0 ? revenue / todaysOrders.length : 0,
        };
      },
      getTopSellingProducts: (limit = 5) => {
        const productSales: Record<string, { quantity: number; revenue: number }> = {};
        get().orders
          .filter(o => o.orderStatus === 'completed')
          .forEach(order => {
            order.items.forEach(item => {
              if (!productSales[item.productId]) {
                productSales[item.productId] = { quantity: 0, revenue: 0 };
              }
              productSales[item.productId].quantity += item.quantity;
              productSales[item.productId].revenue += item.totalPrice;
            });
          });
        return Object.entries(productSales)
          .map(([productId, stats]) => ({
            product: get().products.find(p => p.id === productId)!,
            totalSold: stats.quantity,
            revenue: stats.revenue,
          }))
          .filter(item => item.product)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, limit);
      },
      getRevenueByPeriod: (days) => {
        const result: { date: string; revenue: number; orders: number }[] = [];
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayOrders = get().orders.filter(
            o => o.createdAt.split('T')[0] === dateStr && o.orderStatus === 'completed'
          );
          result.push({
            date: dateStr,
            revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
            orders: dayOrders.length,
          });
        }
        return result;
      },
      getCustomerGrowth: () => {
        const customers = get().customers;
        const thisMonth = new Date().toISOString().slice(0, 7);
        const newThisMonth = customers.filter(c => c.joinDate.startsWith(thisMonth)).length;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeCount = customers.filter(c => new Date(c.lastVisit) >= thirtyDaysAgo).length;
        return {
          total: customers.length,
          newThisMonth,
          activeRate: customers.length > 0 ? (activeCount / customers.length) * 100 : 0,
        };
      },
      getInventoryValue: () => {
        return get().products.reduce(
          (sum, p) => sum + p.costPrice * p.inventory.quantity,
          0
        );
      },
    }),
    {
      name: 'foremost-pets-store',
      version: 2,
      partialize: (state) => ({
        products: state.products,
        customers: state.customers,
        employees: state.employees,
        orders: state.orders,
        giftCards: state.giftCards,
        promotions: state.promotions,
        notifications: state.notifications,
        loyaltyTransactions: state.loyaltyTransactions,
        currentEmployee: state.currentEmployee,
        selectedLocation: state.selectedLocation,
      }),
      merge: (persistedState: any, currentState: ForemostStore) => {
        // Always use fresh seed product images — merge persisted inventory/quantity 
        // changes but keep images from seed data
        const mergedProducts = currentState.products.map(seedProduct => {
          const persisted = persistedState?.products?.find((p: Product) => p.id === seedProduct.id);
          if (persisted) {
            return { ...persisted, images: seedProduct.images };
          }
          return seedProduct;
        });
        return {
          ...currentState,
          ...persistedState,
          products: mergedProducts,
        };
      },
    }
  )
);
