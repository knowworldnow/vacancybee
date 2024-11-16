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
  const imageUrl = author.image ? urlForImage(author.image) : undefined;

  return (
    <Link href={`/author/${author.slug.current}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6 text-center">
          {imageUrl && (
            <div className="relative w-24 h-24 mx-auto mb-4 bg-muted rounded-full">
              <Image
                src={imageUrl.toString()}
                alt={author.name}
                fill
                className="object-cover rounded-full"
                sizes="96px"
              />
            </div>
          )}
          <p className="text-lg font-semibold mb-1">{author.name}</p>
          {author.role && (
            <p className="text-sm text-muted-foreground mb-4">{author.role}</p>
          )}
          {author.social && <SocialLinks social={author.social} />}
        </CardContent>
      </Card>
    </Link>
  );
}