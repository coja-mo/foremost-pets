'use client';

import { CartProvider } from './CartContext';
import { StoreLocationProvider } from './StoreLocationContext';
import CartDrawer from './CartDrawer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreLocationProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </StoreLocationProvider>
  );
}
