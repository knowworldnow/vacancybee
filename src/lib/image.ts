import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlForImage = (source: Image | undefined): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageUrl = imageBuilder?.image(source)
    .auto('format')
    .fit('max')
    .url();

  return imageUrl;
};

export const urlForFeaturedImage = (source: Image | undefined): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageUrl = imageBuilder?.image(source)
    .width(1200)
    .height(800)
    .auto('format')
    .fit('max')
    .url();

  return imageUrl;
};

export const urlForThumbnail = (source: Image | undefined): string | undefined => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageUrl = imageBuilder?.image(source)
    .width(400)
    .height(300)
    .auto('format')
    .fit('max')
    .url();

  return imageUrl;
};