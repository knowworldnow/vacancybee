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
      {categories.map((category) => (
        <Link key={category._id} href={`/category/${category.slug.current}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            {category.icon && (
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src={urlForImage(category.icon).url()}
                  alt={category.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-center">{category.title}</h3>
          </Card>
        </Link>
      ))}
    </div>
  );
}