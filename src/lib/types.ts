import type { Image } from 'sanity';

export interface BasePost {
  _id: string;
  _type: 'post';
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
}

// Full post type extending BasePost
export interface Post extends BasePost {
  author: Author;
  body: PortableTextBlock[];
  categories: Category[];
  viewCount: number;
  recentPosts?: BasePost[];
  faqs?: FAQ[];
  seo?: SEO;
}

// Author type
export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: { current: string };
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

// Category type
export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: { current: string };
  description?: string;
  icon?: SanityImage;
}

// FAQ type
export interface FAQ {
  question: string;
  answer: PortableTextBlock[];
}

// SEO type
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  focusKeyphrase?: string;
}

// Sanity Image type
export interface SanityImage extends Image {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

// Portable Text Block type
export interface PortableTextBlock {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
    href?: string;
  }[];
  style: string;
}

// Comment type
export interface Comment {
  _id: string;
  _type: 'comment';
  name: string;
  email: string;
  comment: string;
  post: {
    _ref: string;
    _type: 'reference';
  };
  approved: boolean;
  createdAt: string;
}

// Subscriber type
export interface Subscriber {
  _id: string;
  _type: 'subscriber';
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

// Video Embed type
export interface VideoEmbed {
  _type: 'videoEmbed';
  url: string;
  caption?: string;
}

// Audio File type
export interface AudioFile {
  _type: 'audioFile';
  title?: string;
  file: {
    _type: 'file';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  description?: string;
}

// Post Views type
export interface PostViews {
  _id: string;
  _type: 'postViews';
  post: {
    _ref: string;
    _type: 'reference';
  };
  views: number;
  lastUpdated: string;
}

// Page type
export interface Page {
  _id: string;
  _type: 'page';
  title: string;
  slug: { current: string };
  content: PortableTextBlock[];
  seo?: SEO;
}
