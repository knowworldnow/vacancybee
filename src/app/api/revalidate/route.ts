import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Shared secret that only this route and Sanity knows
const secret = process.env.SANITY_WEBHOOK_SECRET;

// Define expected webhook payload types
interface WebhookBody {
  _type: string;
  slug?: {
    current: string;
  };
  post?: {
    _ref: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(req, secret);

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Handle different content types
    switch (body._type) {
      case 'post':
        revalidatePath('/', 'layout'); // Homepage
        if (body.slug?.current) {
          revalidatePath(`/${body.slug.current}`); // Individual post page
        }
        break;

      case 'author':
        revalidatePath('/', 'layout');
        if (body.slug?.current) {
          revalidatePath(`/author/${body.slug.current}`);
        }
        break;

      case 'category':
        revalidatePath('/', 'layout');
        if (body.slug?.current) {
          revalidatePath(`/category/${body.slug.current}`);
        }
        break;

      case 'comment':
        // When a comment is created/updated/deleted, revalidate the associated post page
        if (body.post?._ref) {
          // First, get the post slug using the reference
          const response = await fetch(
            `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/query/production?query=*[_id=="${body.post._ref}"][0].slug.current`
          );
          const data = await response.json();
          const postSlug = data.result;

          if (postSlug) {
            revalidatePath(`/${postSlug}`);
          }
        }
        break;

      default:
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body: body,
    });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return new NextResponse(err.message, { status: 500 });
  }
}

// Required for edge runtime
export const runtime = 'edge';