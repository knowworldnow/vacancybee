import Link from 'next/link';
import { GlobeIcon, LinkedinIcon } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';

// Custom X (Twitter) icon
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

// Custom Instagram icon
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Custom YouTube icon
function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-12 pb-12 border-b">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest celebrity news and updates.
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About VacancyBee</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for celebrity news, interviews, and updates from various fields.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about/" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/contact/" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/privacy-policy/" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/category/movies/" className="text-sm text-muted-foreground hover:text-foreground">
                Movies
              </Link>
              <Link href="/category/music/" className="text-sm text-muted-foreground hover:text-foreground">
                Music
              </Link>
              <Link href="/category/sports/" className="text-sm text-muted-foreground hover:text-foreground">
                Sports
              </Link>
              <Link href="/category/tech/" className="text-sm text-muted-foreground hover:text-foreground">
                Tech
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/vacancybee" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <XIcon />
                <span className="sr-only">Follow us on X</span>
              </a>
              <a href="https://instagram.com/vacancybee" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <InstagramIcon />
                <span className="sr-only">Follow us on Instagram</span>
              </a>
              <a href="https://linkedin.com/company/vacancybee" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">Follow us on LinkedIn</span>
              </a>
              <a href="https://youtube.com/@vacancybee" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <YoutubeIcon />
                <span className="sr-only">Subscribe on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VacancyBee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}