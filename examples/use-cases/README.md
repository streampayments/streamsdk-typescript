# Stream SDK Use Case Examples

This directory contains practical, real-world examples demonstrating how to use the Stream SDK Express adapter in various scenarios.

## Prerequisites

```bash
export STREAM_API_KEY="your-stream-api-key"
export STREAM_WEBHOOK_SECRET="your-webhook-secret"  # Optional, for webhook verification
```

## Examples

### Example 1: Create Product + Checkout

**What it demonstrates:**
- Creating a product using the Stream SDK
- Setting up checkout handler with the Express adapter
- Processing webhook events
- Success/failure page handling

**Run:**
```bash
cd examples
npm run example:1
```

**Test:**
- Visit: `http://localhost:3001/`
- Click the checkout button
- Complete payment on Stream checkout page
- View webhook events in console

**Ports:** 3001

---

### Example 2: Fetch Products + Create Consumer + Checkout

**What it demonstrates:**
- Fetching existing products from Stream
- Creating a consumer (customer)
- Two checkout methods:
  - Using Express adapter with query params
  - Using SDK directly with pre-linked consumer

**Run:**
```bash
cd examples
npm run example:2
```

**Test:**
- Visit: `http://localhost:3002/`
- Try both checkout methods
- Compare the different approaches

**Ports:** 3002

---

### Example 3: Comprehensive Webhook Testing

**What it demonstrates:**
- Setting up handlers for ALL webhook event types
- Real-time webhook dashboard
- Webhook signature verification
- Testing webhooks locally
- Event logging and monitoring

**Run:**
```bash
cd examples
npm run example:3
```

**Setup for Production Webhooks:**
1. Install ngrok: `brew install ngrok` (or download from ngrok.com)
2. Expose your local server:
   ```bash
   ngrok http 3003
   ```
3. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
4. Configure Stream webhook to: `https://abc123.ngrok.io/webhooks/stream`

**Test:**
- Visit: `http://localhost:3003/`
- View real-time webhook dashboard
- Click "Send Test Webhook" to simulate events
- Create actual payments to see real webhooks

**Supported Events:**
- ✅ PAYMENT_SUCCEEDED
- ❌ PAYMENT_FAILED
- 🚫 PAYMENT_CANCELED
- 💸 PAYMENT_REFUNDED
- ✅ PAYMENT_MARKED_AS_PAID
- 📄 INVOICE_CREATED
- 📧 INVOICE_SENT
- ✅ INVOICE_ACCEPTED
- ❌ INVOICE_REJECTED
- ✅ INVOICE_COMPLETED
- 🚫 INVOICE_CANCELED
- 🔄 INVOICE_UPDATED
- 🔄 SUBSCRIPTION_CREATED
- 🔄 SUBSCRIPTION_UPDATED
- 🚫 SUBSCRIPTION_CANCELED

**Ports:** 3003

---

## Quick Reference

### Checkout Adapter Usage

```javascript
import { Checkout } from 'streampay-sdk/express';

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel',
  baseUrl: process.env.STREAM_BASE_URL  // Optional
}));
```

**Query Parameters:**
- `products` - Product ID(s), comma-separated
- `customerId` - Existing consumer ID (optional)
- `customerEmail` - Email for new customer (optional)
- `customerName` - Name for new customer (optional)
- `customerPhone` - Phone for new customer (optional)
- `metadata` - URL-encoded JSON metadata (optional)

### Webhook Handler Usage

```javascript
import { Webhooks } from 'streampay-sdk/express';

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,  // Optional but recommended

  onPaymentSucceeded: async (data) => {
    console.log('Payment succeeded:', data);
  },

  onWebhook: async (event, data) => {
    console.log('Any webhook:', event, data);
  }
}));
```

## Environment Variables

Create a `.env` file in the `examples` directory:

```bash
# Required
STREAM_API_KEY=your_stream_api_key

# Optional
STREAM_WEBHOOK_SECRET=your_webhook_secret
STREAM_BASE_URL=https://stream-app-service.streampay.sa
NGROK_URL=https://your-ngrok-url.ngrok.io
```

## Tips

### Testing Webhooks Locally

1. **Use ngrok:**
   ```bash
   ngrok http 3003
   ```

2. **Configure Stream:**
   - Go to Stream Dashboard → Webhooks
   - Set URL to: `https://your-ngrok-url.ngrok.io/webhooks/stream`
   - Copy your webhook secret to `.env`

3. **Test:**
   - Create a payment
   - Watch webhooks appear in real-time on the dashboard

### Running Multiple Examples

Each example runs on a different port, so you can run them all simultaneously:

```bash
# Terminal 1
npm run example:1

# Terminal 2
npm run example:2

# Terminal 3
npm run example:3
```

### Debugging

All webhook events are logged to the console with detailed information. For Example 3, you also get a web dashboard showing all events in real-time.

## Common Issues

**Issue:** "No products found"
- **Solution:** Example 2 will automatically create a sample product if none exist

**Issue:** "Webhook signature verification failed"
- **Solution:** Ensure `STREAM_WEBHOOK_SECRET` matches your Stream dashboard configuration

**Issue:** "Cannot connect to Stream API"
- **Solution:** Check your `STREAM_API_KEY` and `STREAM_BASE_URL` are correct

## Next Steps

After trying these examples, you can:

1. Integrate the Express adapter into your own application
2. Customize webhook handlers for your business logic
3. Add database integration for storing webhook events
4. Implement email notifications on payment success
5. Build a customer dashboard using the SDK

## Documentation

- [Main SDK Docs](../../README.md)
- [Express Adapter Docs](../../EXPRESS_ADAPTER.md)
- [Multiple Products Guide](../../MULTIPLE_PRODUCTS_GUIDE.md)
- [Stream API Docs](https://docs.streampay.sa/)

## Support

- Issues: [GitHub Issues](https://github.com/streampayments/stream-sdk/issues)
- Email: support@streampay.sa
