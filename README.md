# @streampayments/stream-sdk

Official Node.js/TypeScript SDK for StreamPay API - Payment processing with consumers, products, subscriptions, invoices, and payment links.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

- 🔐 API Key and Bearer Token authentication
- 👥 Consumer management
- 📦 Product catalog
- 🎟️ Coupons and discounts
- 💳 Payment links
- 🔄 Subscriptions
- 🧾 Invoices
- 💰 Payments and refunds
- 📝 Full TypeScript support
- ⚡ ES Modules and CommonJS

## Installation

```bash
npm install github:streampayments/stream-sdk#v1.0.0
```

Or add to `package.json`:

```json
{
  "dependencies": {
    "@streampayments/stream-sdk": "github:streampayments/stream-sdk#v1.0.0"
  }
}
```

## Quick Start

```typescript
import StreamSDK from "@streampayments/stream-sdk";

const client = StreamSDK.init(process.env.STREAM_API_KEY!);

// Create a consumer
const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com",
  phone_number: "+966501234567"
});

// Create a product
const product = await client.createProduct({
  name: "Premium Plan",
  price: 99.99,
  currency: "SAR"
});

// Generate a payment link
const paymentLink = await client.createLink({
  name: "Payment",
  consumerId: consumer.id,
  productId: product.id,
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure"
});

console.log("Payment URL:", client.getPaymentUrl(paymentLink));
```

## Environment Configuration

```typescript
const client = StreamSDK.init("your-api-key", {
  baseUrl: "https://stream-app-service.streampay.sa"
});
```

For staging environment:

```typescript
const client = StreamSDK.init("your-api-key", {
  baseUrl: "https://staging.streampay.sa"
});
```

## API Reference

### Consumers

```typescript
// Create
const consumer = await client.createConsumer({
  name: "Jane Smith",
  email: "jane@example.com",
  phone_number: "+966501234567",
  preferred_language: "ar"
});

// List
const consumers = await client.listConsumers({ page: 1, size: 20 });

// Get
const consumer = await client.getConsumer("consumer-id");

// Update
const updated = await client.updateConsumer("consumer-id", {
  name: "Jane Doe"
});

// Delete
await client.deleteConsumer("consumer-id");
```

### Products

```typescript
// Create
const product = await client.createProduct({
  name: "Premium Subscription",
  price: 149.99,
  currency: "SAR",
  type: "SERVICE"
});

// List
const products = await client.listProducts({ page: 1, size: 10 });

// Get
const product = await client.getProduct("product-id");

// Update
const updated = await client.updateProduct("product-id", { price: 129.99 });

// Delete
await client.deleteProduct("product-id");
```

### Coupons

```typescript
// Create
const coupon = await client.createCoupon({
  code: "SUMMER2024",
  discount_type: "PERCENTAGE",
  discount_value: 25,
  active: true
});

// List
const coupons = await client.listCoupons({ page: 1, size: 10 });

// Get
const coupon = await client.getCoupon("coupon-id");

// Update
const updated = await client.updateCoupon("coupon-id", { active: false });

// Delete
await client.deleteCoupon("coupon-id");
```

### Payment Links

```typescript
// Create
const link = await client.createLink({
  name: "Product Payment",
  productId: "product-id",
  consumerId: "consumer-id",
  coupons: ["SAVE20"],
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure"
});

// List
const links = await client.listPaymentLinks({ page: 1, size: 10 });

// Get
const link = await client.getPaymentLink("link-id");

// Get payment URL
const url = client.getPaymentUrl(link);
```

### Subscriptions

```typescript
// Create
const subscription = await client.createSubscription({
  organization_consumer_id: "consumer-id",
  items: [{ product_id: "product-id", quantity: 1 }],
  billing_cycle: "MONTHLY"
});

// List
const subscriptions = await client.listSubscriptions({ page: 1, size: 10 });

// Get
const subscription = await client.getSubscription("subscription-id");

// Update
const updated = await client.updateSubscription("subscription-id", {
  items: [{ product_id: "new-product-id", quantity: 2 }]
});

// Freeze
const freeze = await client.freezeSubscription("subscription-id", {
  start_date: new Date().toISOString(),
  end_date: new Date("2024-12-31").toISOString()
});

// Delete
await client.deleteSubscription("subscription-id");
```

### Invoices

```typescript
// List
const invoices = await client.listInvoices({ page: 1, size: 20 });

// Get
const invoice = await client.getInvoice("invoice-id");
```

### Payments

```typescript
// List
const payments = await client.listPayments();

// Get
const payment = await client.getPayment("payment-id");

// Refund
const refund = await client.refundPayment("payment-id", {
  reason: "CUSTOMER_REQUEST"
});
```

## Error Handling

```typescript
import { StreamSDKError } from "@streampayments/stream-sdk";

try {
  const consumer = await client.createConsumer(data);
} catch (error) {
  if (error instanceof StreamSDKError) {
    console.error("Status:", error.status);
    console.error("Request ID:", error.requestId);
    console.error("Body:", error.body);
  }
}
```

## TypeScript Support

```typescript
import StreamSDK, {
  ConsumerCreate,
  ProductDto,
  PaymentLinkDetailed
} from "@streampayments/stream-sdk";

const createConsumer = async (data: ConsumerCreate) => {
  return await client.createConsumer(data);
};
```

## Framework Support

Works with all Node.js frameworks:

- Express, Fastify, Koa, NestJS, Hono
- Next.js, Remix, SvelteKit, Nuxt
- AWS Lambda, Vercel, Cloudflare Workers

See [FRAMEWORK_SUPPORT.md](./FRAMEWORK_SUPPORT.md) for examples.

## Examples

Run the example scripts:

```bash
export STREAM_API_KEY="your-api-key"
npm run build
node examples/basic.mjs
node examples/comprehensive.mjs
```

## Development

```bash
# Generate types from OpenAPI
npm run gen

# Build
npm run build

# Type check
npm run typecheck

# Watch mode
npm run dev
```

## Support

- **Email**: support@streampay.sa
- **Issues**: https://github.com/streampayments/stream-sdk/issues
- **Documentation**: https://github.com/streampayments/stream-sdk

## License

MIT

---

**Maintained by**: Ibtisam (ibtisam@streampay.sa)
**Base URL**: `https://stream-app-service.streampay.sa`
