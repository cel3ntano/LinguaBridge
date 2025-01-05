'use client';

import { Providers } from '@/providers/Providers';
import { useAppSelector } from '@/lib/hooks';
import { selectIsInitialized } from '@/store/auth/authSelectors';
import React from 'react';
import { Roboto } from 'next/font/google';
import Header from '@/components/layout/Header/Header';
import LoadingScreen from '@/components/common/LoadingScreen';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const isInitialized = useAppSelector(selectIsInitialized);

  return isInitialized ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <LoadingScreen />
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Providers>
          <RootLayoutContent>{children}</RootLayoutContent>
        </Providers>
      </body>
    </html>
  );
}
