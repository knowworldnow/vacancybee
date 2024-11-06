import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source)
    .auto('format')
    .fit('max');
};

export const urlForFeaturedImage = (source: Image) => {
  return imageBuilder?.image(source)
    .width(1200)
    .height(800)
    .format('webp')
    .quality(90)
    .fit('crop')
    .crop('entropy');
};