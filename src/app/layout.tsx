import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import RootLayoutContent from '@/components/layout/RootLayoutContent';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LinguaBridge - Find Your Perfect Language Teacher',
  description:
    'Connect with experienced language teachers for personalized learning',
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
