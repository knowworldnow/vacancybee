import type { Image } from 'sanity';
import type { PortableTextBlock } from '@portabletext/types';

// Base Post type with essential fields
export interface BasePost {
  _id: string;
  _type: 'post';
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
  categories: Category[];
}

// Full Post type extending BasePost
export interface Post extends BasePost {
  author: Author;
  body: PortableTextBlock[];
  viewCount: number;
  popularPosts?: BasePost[];
  relatedPosts?: BasePost[];
  faqs?: FAQ[];
  comments?: Comment[];
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
  posts?: BasePost[];
}

// Category type
export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: { current: string };
  description?: string;
  icon?: SanityImage;
  posts?: BasePost[];
}

// FAQ type
export interface FAQ {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
}

// Comment type
export interface Comment {
  _id: string;
  _type: 'comment';
  name: string;
  email: string;
  comment: string;
  post: Reference;
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

// Sanity Image type
export interface SanityImage extends Image {
  _type: 'image';
  asset: Reference;
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

// Reference type for Sanity references
export interface Reference {
  _ref: string;
  _type: 'reference';
}

// SEO type
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  focusKeyphrase?: string;
  ogImage?: SanityImage;
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
    asset: Reference;
  };
  description?: string;
}

// Post Views type
export interface PostViews {
  _id: string;
  _type: 'postViews';
  post: Reference;
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

// Schema Response types
export interface PostsResponse {
  posts: BasePost[];
  total: number;
  hasMore: boolean;
}

export interface SearchResponse {
  results: BasePost[];
  total: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CommentResponse {
  success: boolean;
  comment?: Comment;
  error?: string;
}

export interface SubscribeResponse {
  success: boolean;
  subscriber?: Subscriber;
  error?: string;
}