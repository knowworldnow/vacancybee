import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create a new client with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    );

    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate unsubscribed user
        await client
          .patch(existingSubscriber._id)
          .set({
            status: 'active',
            resubscribedAt: new Date().toISOString(),
          })
          .commit();

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }

      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Create new subscriber
    const subscriber = await client.create({
      _type: 'subscriber',
      email,
      status: 'active',
      subscribedAt: new Date().toISOString(),
      preferences: {
        frequency: 'weekly',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscriber,
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      {
        error: 'Failed to subscribe to newsletter',
        details: error.message,
      },
      { status: 500 }
    );
  }
}