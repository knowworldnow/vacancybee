import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Image | undefined): ImageUrlBuilder | null => {
  if (!source?.asset?._ref) {
    return null;
  }

  return imageBuilder.image(source)
    .auto('format')
    .fit('max');
};

export const urlForFeaturedImage = (source: Image | undefined): ImageUrlBuilder | null => {
  if (!source?.asset?._ref) {
    return null;
  }

  return imageBuilder.image(source)
    .width(1200)
    .height(800)
    .format('webp')
    .quality(90)
    .fit('crop')
    .crop('entropy');
};

export const urlForThumbnail = (source: Image | undefined): ImageUrlBuilder | null => {
  if (!source?.asset?._ref) {
    return null;
  }

  return imageBuilder.image(source)
    .width(400)
    .height(300)
    .format('webp')
    .quality(90)
    .fit('crop')
    .crop('entropy');
};

// Helper function to safely get image URL with fallback
export const getImageUrl = (imageBuilder: ImageUrlBuilder | null, fallback: string = ''): string => {
  return imageBuilder ? imageBuilder.url() : fallback;
};