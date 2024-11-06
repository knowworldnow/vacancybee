import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create a new client with the token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { name, email, comment, postId } = await request.json();

    // Validate required fields
    if (!name || !email || !comment || !postId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create the comment document in Sanity
    const newComment = await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      approved: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully and awaiting moderation',
      comment: newComment,
    });
  } catch (error: any) {
    console.error('Comment submission error:', error);
    
    // Handle Sanity-specific errors
    const errorMessage = error.response?.body?.error?.description || 
                        error.message || 
                        'Failed to submit comment';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}