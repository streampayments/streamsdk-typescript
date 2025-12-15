# Framework Support

The `streamsdk-typescript` package is a **framework-agnostic** Node.js SDK that works with all popular frameworks and environments.

## ✅ Supported Frameworks & Environments

### Backend & Full-Stack Frameworks

#### **Fastify**
```javascript
import Fastify from 'fastify';
import StreamSDK from '@streamsdk/typescript';

const fastify = Fastify();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

fastify.post('/payment', async (request, reply) => {
  const { amount, customerPhone, customerName, productName } = request.body;

  const paymentData = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return { paymentUrl: result.paymentUrl };
});
```

#### **Express**
```typescript
// routes/payment.ts
import express from 'express';
import StreamSDK from '@streamsdk/typescript';

const router = express.Router();
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

router.post('/payment', async (req, res) => {
  const { amount, customerPhone, customerName, productName } = req.body;

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  try {
    const result = await streamClient.createSimplePaymentLink(paymentData);
    return res.json({ paymentUrl: result.paymentUrl });
  } catch (err) {
    console.error('Stream SDK Error:', err);
    return res.status(500).json({ error: 'Failed to create payment link' });
  }
});

export default router;
```

👉 For a full Express SDK with built-in helpers, see the [`streamsdk/express`](https://github.com/streampay/streamsdk/tree/main/express) repo.

### Full-Stack Frameworks

#### **Next.js (App Router)**
```typescript
// app/api/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import StreamSDK from '@streamsdk/typescript';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export async function POST(request: NextRequest) {
  const { amount, customerPhone, customerName, productName } = await request.json();

  const paymentData: any = {
    name: productName,
    amount,
    product: {
      name: productName,
      price: amount
    },
    successRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/success`,
    failureRedirectUrl: `${process.env.NEXT_PUBLIC_URL}/failure`
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = {
      phone: customerPhone,
      name: customerName
    };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  const response: any = {
    paymentUrl: result.paymentUrl,
    productId: result.productId
  };

  // Only include consumerId if consumer was created
  if (result.consumerId) {
    response.consumerId = result.consumerId;
  }

  return NextResponse.json(response);
}
```

#### **Next.js (Pages Router)**
```typescript
// pages/api/payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import StreamSDK from '@streamsdk/typescript';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, customerPhone, customerName, productName } = req.body;

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  res.json({ paymentUrl: result.paymentUrl });
}
```

#### **Remix**
```typescript
// app/routes/api.payment.ts
import { ActionFunction, json } from '@remix-run/node';
import StreamSDK from '@streamsdk/typescript';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export const action: ActionFunction = async ({ request }) => {
  const { amount, customerPhone, customerName, productName } = await request.json();

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return json({ paymentUrl: result.paymentUrl });
};
```

#### **SvelteKit**
```typescript
// src/routes/api/payment/+server.ts
import { json } from '@sveltejs/kit';
import StreamSDK from '@streamsdk/typescript';
import { STREAM_API_KEY } from '$env/static/private';

const streamClient = StreamSDK.init(STREAM_API_KEY);

export async function POST({ request }) {
  const { amount, customerPhone, customerName, productName } = await request.json();

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return json({ paymentUrl: result.paymentUrl });
}
```

#### **Nuxt 3**
```typescript
// server/api/payment.post.ts
import StreamSDK from '@streamsdk/typescript';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default defineEventHandler(async (event) => {
  const { amount, customerPhone, customerName, productName } = await readBody(event);

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return { paymentUrl: result.paymentUrl };
});
```

### Serverless & Edge Runtimes

#### **AWS Lambda**
```javascript
import StreamSDK from '@streamsdk/typescript';

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

export const handler = async (event) => {
  const { amount, customerPhone, customerName, productName } = JSON.parse(event.body);

  const paymentData = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return {
    statusCode: 200,
    body: JSON.stringify({
      paymentUrl: result.paymentUrl
    })
  };
};
```

#### **Vercel Edge Functions**
```typescript
import StreamSDK from '@streamsdk/typescript';

export const config = {
  runtime: 'edge',
};

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY!);

export default async function handler(request: Request) {
  const { amount, customerPhone, customerName, productName } = await request.json();

  const paymentData: any = {
    name: productName,
    amount,
    product: { name: productName, price: amount }
  };

  // Add consumer only if both phone and name are provided (optional for guest checkout)
  if (customerPhone && customerName) {
    paymentData.consumer = { phone: customerPhone, name: customerName };
  }

  const result = await streamClient.createSimplePaymentLink(paymentData);

  return new Response(JSON.stringify({
    paymentUrl: result.paymentUrl
  }));
}
```

#### **Cloudflare Workers**
```typescript
import StreamSDK from '@streamsdk/typescript';

export default {
  async fetch(request: Request, env: Env) {
    const streamClient = StreamSDK.init(env.STREAM_API_KEY);

    const { amount, customerPhone, customerName, productName } = await request.json();

    const paymentData: any = {
      name: productName,
      amount,
      product: { name: productName, price: amount }
    };

    // Add consumer only if both phone and name are provided (optional for guest checkout)
    if (customerPhone && customerName) {
      paymentData.consumer = { phone: customerPhone, name: customerName };
    }

    const result = await streamClient.createSimplePaymentLink(paymentData);

    return new Response(JSON.stringify({
      paymentUrl: result.paymentUrl
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
} from '@streamsdk/typescript';

// Full type safety
const consumer: ConsumerCreate = {
  name: "Ahmad Ali",
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
import StreamSDK from '@streamsdk/typescript';
```

### CommonJS
```javascript
const StreamSDK = require('@streamsdk/typescript');
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
import { StreamSDKError } from '@streamsdk/typescript';

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
import StreamSDK from '@streamsdk/typescript';

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

Check the [examples](./examples) directory for more framework-specific examples.

## 🆘 Need Help?

If you encounter issues with a specific framework:

1. Check the framework's documentation for API route setup
2. Ensure you're using the SDK in **server-side code only**
3. Verify your API key is correctly set in environment variables
4. Contact support: support@streampay.sa
