import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const subscriber = await client.create({
      _type: 'subscriber',
      email,
      status: 'active',
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}