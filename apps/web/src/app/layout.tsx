import './globals.css';
import type { ReactNode } from 'react';

export const metadata = { title: 'Angelmind V4.0', description: 'Unified Security Operations Platform' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}
