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
  viewCount?: number;
}

// Full Post type extending BasePost
export interface Post extends BasePost {
  author: Author;
  body: PortableTextBlock[];
  faqs?: FAQ[];
  comments?: Comment[];
  seo?: SEO;
  relatedPosts?: BasePost[];
}

// Author type
export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: { current: string };
  image?: SanityImage;
  role?: string;
  bio?: PortableTextBlock[];
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  featured?: boolean;
  postCount?: number;
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
  parentCategory?: Reference;
  order?: number;
}

// FAQ type
export interface FAQ {
  _key: string;
  question: string;
  answer: PortableTextBlock[];
  order?: number;
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
  updatedAt?: string;
  replies?: Comment[];
  parentComment?: Reference;
}

// Subscriber type
export interface Subscriber {
  _id: string;
  _type: 'subscriber';
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  resubscribedAt?: string;
  unsubscribedAt?: string;
  preferences?: NewsletterPreferences;
  lastEmailSent?: string;
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
  credit?: string;
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
  noIndex?: boolean;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

// Media types
export interface VideoEmbed {
  _type: 'videoEmbed';
  url: string;
  caption?: string;
  provider?: 'youtube' | 'vimeo';
  thumbnail?: SanityImage;
}

export interface AudioFile {
  _type: 'audioFile';
  title?: string;
  file: {
    _type: 'file';
    asset: Reference;
  };
  description?: string;
  duration?: number;
  transcript?: string;
}

// Analytics types
export interface PostViews {
  _id: string;
  _type: 'postViews';
  post: Reference;
  views: number;
  lastUpdated: string;
  dailyViews?: {
    date: string;
    count: number;
  }[];
}

// Page type
export interface Page {
  _id: string;
  _type: 'page';
  title: string;
  slug: { current: string };
  content: PortableTextBlock[];
  seo?: SEO;
  template?: 'default' | 'landing' | 'contact';
  sections?: PageSection[];
}

export interface PageSection {
  _key: string;
  _type: string;
  title?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
  cta?: {
    text: string;
    url: string;
  };
}

// Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SearchResponse {
  results: BasePost[];
  total: number;
  facets?: {
    categories: { _id: string; title: string; count: number }[];
    authors: { _id: string; name: string; count: number }[];
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface CommentResponse extends ApiResponse<Comment> {
  comment?: Comment;
}

export interface SubscribeResponse extends ApiResponse<Subscriber> {
  subscriber?: Subscriber;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  newsletter?: boolean;
}

export interface NewsletterFormData {
  email: string;
  preferences?: {
    categories?: string[];
    frequency?: 'daily' | 'weekly' | 'monthly';
  };
}

export interface NewsletterPreferences {
  frequency: 'daily' | 'weekly' | 'monthly';
  categories?: string[];
}