export interface BasePost {
    _id: string;
    _type: 'post';
    title: string;
    slug: { current: string };
    mainImage: any;
    excerpt: string;
    publishedAt: string;
  }
  
  export interface Post extends BasePost {
    body: any[];
    author: Author;
    categories: Category[];
    viewCount: number;
    faqs?: FAQ[];
  }
  
  export interface Author {
    _id: string;
    _type: 'author';
    name: string;
    slug: { current: string };
    image?: any;
    bio?: any[];
  }
  
  export interface Category {
    _id: string;
    _type: 'category';
    title: string;
    slug: { current: string };
    description?: string;
    icon?: any;
  }
  
  export interface Comment {
    _id: string;
    _type: 'comment';
    name: string;
    email: string;
    comment: string;
    post: { _ref: string };
    approved: boolean;
    createdAt: string;
  }
  
  export interface FAQ {
    question: string;
    answer: any[];
  }
  
  export interface Page {
    _id: string;
    _type: 'page';
    title: string;
    slug: { current: string };
    content: any[];
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };
  }
  
  export interface Subscriber {
    _id: string;
    _type: 'subscriber';
    email: string;
    subscribedAt: string;
    status: 'active' | 'unsubscribed';
  }
  
  export interface VideoEmbed {
    url: string;
    caption?: string;
  }
  
  export interface AudioFile {
    title?: string;
    file: any;
    description?: string;
  }