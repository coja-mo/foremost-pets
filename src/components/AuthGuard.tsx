'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForemostStore } from '@/lib/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentEmployee } = useForemostStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !currentEmployee) {
      router.replace('/admin/login');
    }
  }, [mounted, currentEmployee, router]);

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--fp-bg)',
      }}>
        <div style={{
          width: 48, height: 48, border: '4px solid var(--fp-gray-100)',
          borderTopColor: 'var(--fp-amber)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    );
  }

  if (!currentEmployee) {
    return null;
  }

  return <>{children}</>;
}
