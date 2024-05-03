import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const simmaLugnt = localFont({
  src: [
    {
      path: '../public/assets/fonts/Simma-Lugnt-Sans-Bold.otf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../public/assets/fonts/Simma-Lugnt-Sans-Regular.otf',
      style: 'normal',
      weight: '400',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Arbetsprov utvecklare',
  description: 'Generated by create next app',
  icons: {
    icon: ['/assets/icons/favicon.ico?v=1'],
    apple: ['/assets/icons/apple-touch-icon.png'],
    shortcut: ['assets/icons/apple-touch-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={simmaLugnt.className}>{children}</body>
    </html>
  );
}
