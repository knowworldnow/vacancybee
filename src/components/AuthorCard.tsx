import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { Card, CardContent } from '@/components/ui/card';
import { SocialLinks } from '@/components/SocialLinks';

interface AuthorCardProps {
  author: {
    _id: string;
    name: string;
    slug: { current: string };
    image?: any;
    role?: string;
    social?: {
      twitter?: string;
      instagram?: string;
      facebook?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/author/${author.slug.current}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6 text-center">
          {author.image && (
            <div className="relative w-24 h-24 mx-auto mb-4 bg-muted rounded-full">
              <Image
                src={urlForImage(author.image).url()}
                alt={author.name}
                fill
                className="object-cover rounded-full"
                sizes="96px"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold mb-1">{author.name}</h3>
          {author.role && (
            <p className="text-sm text-muted-foreground mb-4">{author.role}</p>
          )}
          {author.social && <SocialLinks social={author.social} />}
        </CardContent>
      </Card>
    </Link>
  );
}