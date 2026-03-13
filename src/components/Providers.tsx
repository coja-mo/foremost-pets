'use client';

import { CartProvider } from './CartContext';
import { StoreLocationProvider } from './StoreLocationContext';
import CartDrawer from './CartDrawer';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreLocationProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <BackToTop />
        <CookieConsent />
      </CartProvider>
    </StoreLocationProvider>
  );
}
