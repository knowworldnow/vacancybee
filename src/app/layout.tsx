import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const Header = dynamic(() => import('@/components/Header'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'VacancyBee - Celebrity News',
    template: '%s | VacancyBee'
  },
  description: 'Your trusted source for celebrity news, interviews, and updates',
  keywords: ['celebrity news', 'entertainment news', 'celebrity interviews', 'celebrity updates'],
  authors: [{ name: 'VacancyBee' }],
  creator: 'VacancyBee',
  metadataBase: new URL('https://vacancybee.com'),
  alternates: {
    canonical: 'https://vacancybee.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VacancyBee',
    url: 'https://vacancybee.com',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@vacancybee',
    site: '@vacancybee',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'xLcSNUWWlC1Eq4bSIPWp8Xa2xnwgv7BFTNx4abFDXAY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}