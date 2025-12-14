# Stream SDK Express Adapter

The Stream SDK Express Adapter provides a clean, declarative way to integrate Stream payments into your Express.js applications, inspired by [Polar's SDK approach](https://polar.sh/docs/integrate/sdk/adapters/express).

## Features

- 🚀 **Simple Integration** - Drop-in handlers for checkout and webhooks
- 🔒 **Type-Safe** - Full TypeScript support with type definitions
- 🎯 **Event-Driven** - Clean event handlers for webhook processing
- 🔄 **Flexible** - Supports both guest and authenticated checkout flows
- 📦 **Lightweight** - Minimal dependencies, optional peer dependency on Express

## Installation

```bash
npm install @streampayments/stream-sdk express
```

## Quick Start

### Basic Setup

```typescript
import express from 'express';
import { Checkout, Webhooks } from '@streampayments/stream-sdk/express';

const app = express();
app.use(express.json());

// Checkout handler
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));

// Webhook handler
app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY!,
  onPaymentCompleted: async (data) => {
    console.log('Payment completed:', data);
  }
}));

app.listen(3000);
```

## Checkout Handler

The `Checkout` handler creates payment links and redirects users to the Stream checkout page.

### Configuration

```typescript
interface CheckoutConfig {
  apiKey: string;           // Stream API key (required)
  successUrl: string;       // Redirect URL after successful payment (required)
  returnUrl?: string;       // Redirect URL on cancellation (optional)
  baseUrl?: string;         // Custom Stream API base URL (optional)
  defaultName?: string;     // Default name for payment links (optional)
}
```

### Query Parameters

The checkout handler accepts the following query parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `products` | string | Yes | Product ID(s), comma-separated for multiple |
| `name` | string | No | Custom name for payment link (overrides defaultName) |
| `customerId` | string | No | Existing customer/consumer ID |
| `customerEmail` | string | No | Customer email for new customers |
| `customerName` | string | No | Customer name for new customers |
| `customerPhone` | string | No | Customer phone for new customers |
| `metadata` | string | No | URL-encoded JSON metadata |

### Examples

**Single Product with New Customer:**
```
/checkout?products=prod_123&customerPhone=%2B966501234567&customerName=Mohammad%20Ahmad
```

**Multiple Products:**
```
/checkout?products=prod_123,prod_456&customerId=cons_789
```

**With Metadata:**
```
/checkout?products=prod_123&metadata=%7B%22orderId%22%3A%22ORD-123%22%7D
```

### Complete Example

```typescript
import express from 'express';
import { Checkout } from '@streampayments/stream-sdk/express';

const app = express();

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: 'https://myapp.com/payment/success',
  returnUrl: 'https://myapp.com/payment/cancelled',
  defaultName: 'My Store Checkout'
}));

app.get('/payment/success', (req, res) => {
  res.send('Payment successful!');
});

app.get('/payment/cancelled', (req, res) => {
  res.send('Payment cancelled.');
});
```

## Webhook Handler

The `Webhooks` handler processes webhook events from Stream.

### Configuration

```typescript
interface WebhookConfig {
  apiKey: string;
  webhookSecret?: string;

  // Specific event handlers
  onPaymentCreated?: (data: any) => void | Promise<void>;
  onPaymentCompleted?: (data: any) => void | Promise<void>;
  onPaymentFailed?: (data: any) => void | Promise<void>;
  onSubscriptionCreated?: (data: any) => void | Promise<void>;
  onSubscriptionUpdated?: (data: any) => void | Promise<void>;
  onSubscriptionCancelled?: (data: any) => void | Promise<void>;
  onInvoiceCreated?: (data: any) => void | Promise<void>;
  onInvoicePaid?: (data: any) => void | Promise<void>;

  // Catch-all handler
  onWebhook?: (event: string, data: any) => void | Promise<void>;
}
```

### Supported Events

- `payment.created` - Payment link created
- `payment.completed` / `payment.paid` - Payment successfully processed
- `payment.failed` - Payment failed
- `subscription.created` - New subscription created
- `subscription.updated` - Subscription modified
- `subscription.cancelled` - Subscription cancelled
- `invoice.created` - Invoice generated
- `invoice.paid` - Invoice payment received

### Complete Example

```typescript
import express from 'express';
import { Webhooks } from '@streampayments/stream-sdk/express';

const app = express();
app.use(express.json());

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY!,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  onPaymentCompleted: async (data) => {
    console.log('Payment completed!');
    console.log('Payment ID:', data.id);
    console.log('Amount:', data.amount, data.currency);

    // Update your database
    await db.orders.update({
      where: { paymentId: data.id },
      data: { status: 'paid', paidAt: new Date() }
    });

    // Send confirmation email
    await sendEmail({
      to: data.customer_email,
      subject: 'Payment Confirmed',
      template: 'payment-confirmation',
      data: { amount: data.amount, orderId: data.metadata?.orderId }
    });
  },

  onPaymentFailed: async (data) => {
    console.log('Payment failed:', data.failure_reason);

    // Notify customer
    await sendEmail({
      to: data.customer_email,
      subject: 'Payment Failed',
      template: 'payment-failed',
      data: { reason: data.failure_reason }
    });
  },

  onSubscriptionCreated: async (data) => {
    console.log('New subscription:', data.id);

    // Grant access to subscription features
    await db.users.update({
      where: { consumerId: data.consumer_id },
      data: {
        subscriptionId: data.id,
        subscriptionStatus: 'active',
        subscriptionTier: data.product_id
      }
    });
  },

  onSubscriptionCancelled: async (data) => {
    console.log('Subscription cancelled:', data.id);

    // Revoke access (or schedule for end of period)
    await db.users.update({
      where: { subscriptionId: data.id },
      data: { subscriptionStatus: 'cancelled' }
    });
  },

  // Catch-all for logging all events
  onWebhook: async (event, data) => {
    console.log(`Webhook: ${event}`, data);
    await logWebhookEvent(event, data);
  }
}));
```

## Advanced Usage

### Custom Error Handling

```typescript
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));

// Add error handler after checkout route
app.use((error, req, res, next) => {
  console.error('Checkout error:', error);
  res.status(500).json({
    error: 'Failed to create checkout session',
    message: error.message
  });
});
```

### Dynamic Configuration

```typescript
app.get('/checkout/:tier', (req, res, next) => {
  const { tier } = req.params;

  // Get product ID based on tier
  const productId = getProductIdForTier(tier);

  // Add product to query
  req.query.products = productId;

  next();
}, Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: `https://myapp.com/success?tier=${req.params.tier}`,
  returnUrl: 'https://myapp.com/cancel'
}));
```

### Testing Webhooks Locally

Use tools like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) to expose your local webhook endpoint:

```bash
# Using ngrok
ngrok http 3000

# Update your Stream webhook URL to:
# https://your-ngrok-url.ngrok.io/webhooks/stream
```

## Migration from Manual Implementation

If you're currently using the manual Express implementation, here's how to migrate:

**Before (Manual):**
```typescript
app.post('/api/create-payment', async (req, res) => {
  try {
    const { productIds, customerPhone } = req.body;
    const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

    // ... lots of boilerplate code ...

    const paymentLink = await streamClient.createPaymentLink(data);
    const paymentUrl = streamClient.getPaymentUrl(paymentLink);

    res.json({ paymentUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**After (Express Adapter):**
```typescript
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));

// That's it! Call with: /checkout?products=prod_123&customerPhone=...
```

## TypeScript Support

The adapter is fully typed and exports all necessary types:

```typescript
import type {
  CheckoutConfig,
  CheckoutQuery,
  CheckoutRequest,
  WebhookConfig,
  WebhookPayload
} from '@streampayments/stream-sdk/express';
```

## Environment Variables

Recommended environment variables:

```bash
# Required
STREAM_API_KEY=your_stream_api_key

# Optional
STREAM_WEBHOOK_SECRET=your_webhook_secret
STREAM_BASE_URL=https://stream-app-service.streampay.sa
BASE_URL=https://myapp.com
PORT=3000
```

## Best Practices

1. **Always use HTTPS in production** for webhook endpoints
2. **Validate webhook signatures** using the `webhookSecret` option
3. **Handle webhook failures gracefully** with retry logic
4. **Use idempotency keys** in your webhook handlers to prevent duplicate processing
5. **Log all webhook events** for debugging and audit purposes
6. **Return 200 OK quickly** from webhook handlers (process async operations in background)

## Comparison with Polar

This adapter is inspired by Polar's Express SDK approach:

| Feature | Stream SDK | Polar SDK |
|---------|-----------|-----------|
| Checkout Handler | ✅ `Checkout()` | ✅ `Checkout()` |
| Webhook Handler | ✅ `Webhooks()` | ✅ `Webhooks()` |
| Customer Portal | ❌ Not applicable | ✅ `CustomerPortal()` |
| Event Routing | ✅ Granular callbacks | ✅ Granular callbacks |
| TypeScript | ✅ Full support | ✅ Full support |

## Examples

See the [examples directory](./examples) for complete working examples:

- [express-adapter.js](./examples/express-adapter.js) - Full-featured demo with UI

## Support

- 📧 Email: support@streampay.sa
- 🐛 Issues: [GitHub Issues](https://github.com/streampayments/stream-sdk/issues)
- 📚 Docs: [Stream SDK Documentation](https://github.com/streampayments/stream-sdk)

## License

MIT
