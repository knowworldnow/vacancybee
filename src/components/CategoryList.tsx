import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { Card } from '@/components/ui/card';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: any;
}

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const imageUrl = category.icon ? urlForImage(category.icon) : undefined;

        return (
          <Link key={category._id} href={`/category/${category.slug.current}/`}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              {imageUrl && (
                <div className="w-16 h-16 mx-auto mb-4 relative bg-muted rounded-lg">
                  <Image
                    src={imageUrl.toString()}
                    alt={category.title}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-center">{category.title}</h3>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}