import React from 'react';
import { Roboto } from 'next/font/google';
import Header from '@/components/layout/Header/Header';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = false;
  const handleLogout = () => {
    console.log('handleLogout');
  };

  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {children}
      </body>
    </html>
  );
}
