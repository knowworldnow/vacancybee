import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlForImage = (source: Image): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }
  
  return imageBuilder?.image(source)
    .fit('max')
    .auto('format')
    .url();
};

export const urlForFeaturedImage = (source: Image): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source)
    .width(1200)
    .height(800)
    .fit('max')
    .auto('format')
    .url();
};

export const urlForCategoryIcon = (source: Image): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source)
    .width(128)
    .height(128)
    .fit('max')
    .auto('format')
    .url();
};