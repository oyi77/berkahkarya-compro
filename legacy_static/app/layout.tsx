import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Berkah Karya — AI Ecosystem',
  description: 'AI Ecosystem untuk bisnis Indonesia. Agency kreatif, AI Tools, dan SaaS platform dalam satu ekosistem.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
