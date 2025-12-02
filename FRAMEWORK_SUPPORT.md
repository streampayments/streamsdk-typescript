# Framework Support

The `@streampayments/stream-sdk` is a **framework-agnostic** Node.js SDK that works with all popular frameworks and environments.

## ✅ Supported Frameworks & Environments

### Backend Frameworks

#### **Express.js**
```javascript
import express from 'express';
import StreamSDK from '@streampayments/stream-sdk';

const app = express();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

app.post('/api/create-payment', async (req, res) => {
  try {
    const paymentLink = await streamClient.createLink({
      name: "Payment",
      productId: req.body.productId,
      consumerId: req.body.consumerId,
      successRedirectUrl: "https://yourapp.com/success",
      failureRedirectUrl: "https://yourapp.com/failure"
    });
    res.json({ url: streamClient.getPaymentUrl(paymentLink) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### **NestJS**
```typescript
import { Injectable } from '@nestjs/common';
import StreamSDK from '@streampayments/stream-sdk';

@Injectable()
export class PaymentService {
  private streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

  async createPayment(data: PaymentDto) {
    return await this.streamClient.createLink(data);
  }
}
```

#### **Fastify**
```javascript
import Fastify from 'fastify';
import StreamSDK from '@streampayments/stream-sdk';

const fastify = Fastify();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

fastify.post('/payment', async (request, reply) => {
  const link = await streamClient.createLink(request.body);
  return { url: streamClient.getPaymentUrl(link) };
});
```

#### **Koa**
```javascript
import Koa from 'koa';
import StreamSDK from '@streampayments/stream-sdk';

const app = new Koa();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

app.use(async ctx => {
  const link = await streamClient.createLink(ctx.request.body);
  ctx.body = { url: streamClient.getPaymentUrl(link) };
});
```

#### **Hono** (Edge Runtime Compatible)
```typescript
import { Hono } from 'hono';
import StreamSDK from '@streampayments/stream-sdk';

const app = new Hono();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

app.post('/payment', async (c) => {
  const link = await streamClient.createLink(await c.req.json());
  return c.json({ url: streamClient.getPaymentUrl(link) });
});
```

### Full-Stack Frameworks

#### **Next.js (App Router)**
```typescript
// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import StreamSDK from '@streampayments/stream-sdk';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const paymentLink = await streamClient.createLink({
    name: "Payment",
    productId: body.productId,
    consumerId: body.consumerId,
    successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/success`,
    failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/failure`
  });

  return NextResponse.json({
    url: streamClient.getPaymentUrl(paymentLink)
  });
}
```

#### **Next.js (Pages Router)**
```typescript
// pages/api/payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import StreamSDK from '@streampayments/stream-sdk';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const paymentLink = await streamClient.createLink(req.body);
  res.json({ url: streamClient.getPaymentUrl(paymentLink) });
}
```

#### **Remix**
```typescript
// app/routes/api.payment.ts
import { ActionFunction, json } from '@remix-run/node';
import StreamSDK from '@streampayments/stream-sdk';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.json();

  const paymentLink = await streamClient.createLink(formData);

  return json({ url: streamClient.getPaymentUrl(paymentLink) });
};
```

#### **SvelteKit**
```typescript
// src/routes/api/payment/+server.ts
import { json } from '@sveltejs/kit';
import StreamSDK from '@streampayments/stream-sdk';
import { STREAM_API_KEY } from '$env/static/private';

const streamClient = StreamSDK.init(STREAM_API_KEY);

export async function POST({ request }) {
  const data = await request.json();
  const paymentLink = await streamClient.createLink(data);

  return json({ url: streamClient.getPaymentUrl(paymentLink) });
}
```

#### **Nuxt 3**
```typescript
// server/api/payment.post.ts
import StreamSDK from '@streampayments/stream-sdk';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const paymentLink = await streamClient.createLink(body);

  return { url: streamClient.getPaymentUrl(paymentLink) };
});
```

### Serverless & Edge Runtimes

#### **AWS Lambda**
```javascript
import StreamSDK from '@streampayments/stream-sdk';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  const paymentLink = await streamClient.createLink(body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      url: streamClient.getPaymentUrl(paymentLink)
    })
  };
};
```

#### **Vercel Edge Functions**
```typescript
import StreamSDK from '@streampayments/stream-sdk';

export const config = {
  runtime: 'edge',
};

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default async function handler(request: Request) {
  const body = await request.json();
  const paymentLink = await streamClient.createLink(body);

  return new Response(JSON.stringify({
    url: streamClient.getPaymentUrl(paymentLink)
  }));
}
```

#### **Cloudflare Workers**
```typescript
import StreamSDK from '@streampayments/stream-sdk';

export default {
  async fetch(request: Request, env: Env) {
    const streamClient = StreamSDK.init(env.STREAM_API_KEY);

    const body = await request.json();
    const paymentLink = await streamClient.createLink(body);

    return new Response(JSON.stringify({
      url: streamClient.getPaymentUrl(paymentLink)
    }));
  }
};
```

### TypeScript Support

The SDK is written in TypeScript and provides full type definitions for all frameworks:

```typescript
import StreamSDK, {
  ConsumerCreate,
  ProductDto,
  PaymentLinkCreateDto
} from '@streampayments/stream-sdk';

// Full type safety
const consumer: ConsumerCreate = {
  name: "John Doe",
  email: "john@example.com",
  phone_number: "+966501234567"
};

const client = StreamSDK.init(process.env.STREAM_API_KEY!);
const result = await client.createConsumer(consumer);
// result is typed as ConsumerResponse
```

## 🔧 Environment Support

- ✅ **Node.js**: 18+ (LTS recommended)
- ✅ **ES Modules**: Full support
- ✅ **CommonJS**: Full support via `require()`
- ✅ **TypeScript**: Native support with `.d.ts` files
- ✅ **Edge Runtimes**: Compatible with Vercel Edge, Cloudflare Workers
- ✅ **Serverless**: AWS Lambda, Google Cloud Functions, Azure Functions

## 📦 Module Systems

### ES Modules (Recommended)
```javascript
import StreamSDK from '@streampayments/stream-sdk';
```

### CommonJS
```javascript
const StreamSDK = require('@streampayments/stream-sdk');
```

## 🚫 Not Supported

- ❌ **Browser/Client-side**: This SDK is for **server-side only**
  - API keys should never be exposed in browser code
  - Use this SDK in your backend/API routes only
  - For frontend, call your backend API which uses this SDK

## 🎯 Best Practices

### 1. **Initialize Once**
```javascript
// Good: Initialize once at module level
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

// Bad: Don't initialize on every request
app.get('/api/consumers', async (req, res) => {
  const client = StreamSDK.init(process.env.STREAM_API_KEY); // ❌
});
```

### 2. **Environment Variables**
```javascript
// Use environment variables for API keys
const client = StreamSDK.init(process.env.STREAM_API_KEY);

// Different environments
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://stream-app-service.streampay.sa'
  : 'https://staging.streampay.sa';

const client = StreamSDK.init(process.env.STREAM_API_KEY, { baseUrl });
```

### 3. **Error Handling**
```javascript
import { StreamSDKError } from '@streampayments/stream-sdk';

try {
  const consumer = await streamClient.createConsumer(data);
} catch (error) {
  if (error instanceof StreamSDKError) {
    console.error('API Error:', error.status, error.message);
    // Handle API-specific errors
  } else {
    console.error('Unexpected error:', error);
    // Handle other errors
  }
}
```

## 🌍 Multi-Environment Setup

```javascript
// config/stream.js
import StreamSDK from '@streampayments/stream-sdk';

const environments = {
  development: {
    apiKey: process.env.STREAM_DEV_API_KEY,
    baseUrl: 'https://staging.streampay.sa'
  },
  staging: {
    apiKey: process.env.STREAM_STAGING_API_KEY,
    baseUrl: 'https://staging.streampay.sa'
  },
  production: {
    apiKey: process.env.STREAM_PROD_API_KEY,
    baseUrl: 'https://stream-app-service.streampay.sa'
  }
};

const env = process.env.NODE_ENV || 'development';
const config = environments[env];

export const streamClient = StreamSDK.init(config.apiKey, {
  baseUrl: config.baseUrl
});
```

## 📚 Framework-Specific Examples

Check the [examples](./examples) directory for more framework-specific examples:

- `examples/basic.mjs` - Basic usage
- `examples/comprehensive.mjs` - Full CRUD operations
- `examples/express.js` - Express.js integration (coming soon)
- `examples/nextjs/` - Next.js integration (coming soon)

## 🆘 Need Help?

If you encounter issues with a specific framework:

1. Check the framework's documentation for API route setup
2. Ensure you're using the SDK in **server-side code only**
3. Verify your API key is correctly set in environment variables
4. Contact support: support@streampay.sa

## 🔄 Future SDKs

StreamPay is planning SDKs for:
- Python (Django, Flask, FastAPI)
- PHP (Laravel, Symfony)
- Ruby (Rails)
- Go
- Java (Spring Boot)

Stay tuned for updates!
