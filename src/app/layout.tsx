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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VacancyBee',
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
    google: '2WXi8QE6BImsj92AnBaQNBRgozkYudZrQX676tGoS5A',
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