import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  const searchQuery = `*[_type == "post" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    pt::text(body) match $searchTerm + "*"
  )] | order(publishedAt desc)[0...10] {
    _id,
    _type,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt
  }`;

  const params = {
    searchTerm: query.toLowerCase()
  };

  try {
    const posts = await client.fetch(searchQuery, params);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}