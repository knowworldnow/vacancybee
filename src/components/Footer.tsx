import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/category/model/" className="text-sm text-muted-foreground hover:text-foreground">
                Model
              </Link>
              <Link href="/category/musician/" className="text-sm text-muted-foreground hover:text-foreground">
                Musician
              </Link>
              <Link href="/category/business-person/" className="text-sm text-muted-foreground hover:text-foreground">
                Business Person
              </Link>
              <Link href="/category/social-media-influencer/" className="text-sm text-muted-foreground hover:text-foreground">
                Social Media Influencer 
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VacancyBee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}