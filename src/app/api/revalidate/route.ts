import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import type { SanityDocument } from '@sanity/types';

// Define expected webhook payload types
interface WebhookBody extends SanityDocument {
  _type: string;
  slug?: { current: string };
  post?: {
    _ref: string;
    slug: { current: string };
  };
}

type ParsedWebhookBody = {
  ids: { created?: string[]; deleted?: string[]; updated?: string[]; };
  operation: 'create' | 'update' | 'delete';
  result: WebhookBody;
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const hmac = createHmac('sha256', secret);
  const computedSignature = hmac.update(body).digest('hex');
  return signature === computedSignature;
}

async function readBody(readable: ReadableStream): Promise<string> {
  const chunks = [];
  const reader = readable.getReader();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-sanity-signature');
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (!signature) {
      return new NextResponse('Missing signature', { status: 401 });
    }

    if (!webhookSecret) {
      return new NextResponse('Missing webhook secret', { status: 500 });
    }

    const rawBody = await readBody(req.body!);
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);

    if (!isValid) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const parsedBody = JSON.parse(rawBody) as ParsedWebhookBody;

    if (!parsedBody?.result) {
      return new NextResponse('Invalid webhook body', { status: 400 });
    }

    const { _type, slug } = parsedBody.result;

    // Revalidate tags for different content types
    switch (_type) {
      case 'post':
        if (slug?.current) {
          revalidateTag('posts');
          revalidateTag(`post-${slug.current}`);
          revalidatePath(`/${slug.current}`);
        }
        revalidatePath('/', 'layout');
        break;

      case 'category':
        if (slug?.current) {
          revalidateTag('categories');
          revalidateTag(`category-${slug.current}`);
          revalidatePath(`/category/${slug.current}`);
        }
        revalidatePath('/', 'layout');
        break;

      case 'author':
        if (slug?.current) {
          revalidateTag('authors');
          revalidateTag(`author-${slug.current}`);
          revalidatePath(`/author/${slug.current}`);
        }
        break;

      case 'page':
        if (slug?.current) {
          revalidateTag('pages');
          revalidateTag(`page-${slug.current}`);
          revalidatePath(`/${slug.current}`);
        }
        break;

      case 'comment':
        const postSlug = parsedBody.result.post?.slug?.current;
        if (postSlug) {
          revalidateTag(`post-${postSlug}`);
          revalidatePath(`/${postSlug}`);
        }
        break;

      default:
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      message: 'Revalidation triggered successfully',
      type: _type,
      slug: slug?.current || parsedBody.result.post?.slug?.current || null,
    });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return new NextResponse(err.message, { status: 500 });
  }
}