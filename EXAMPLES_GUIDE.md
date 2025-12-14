# Stream SDK Examples Guide

Complete guide to the Stream SDK examples and use cases.

## 📁 Directory Structure

```
stream-sdk/
├── examples/
│   ├── use-cases/
│   │   ├── 01-create-product-checkout.js        ← Create product + checkout
│   │   ├── 02-fetch-product-create-consumer-checkout.js  ← Fetch + create + checkout
│   │   ├── 03-webhook-testing.js                ← Comprehensive webhook testing
│   │   └── README.md
│   ├── express.js                               ← Original manual implementation
│   ├── express-adapter.js                       ← Express adapter demo
│   ├── basic.mjs                                ← Basic SDK usage
│   └── package.json
└── src/
    └── adapters/
        └── express/                             ← Express adapter source
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd stream-sdk/examples
export STREAM_API_KEY="your-api-key"
export STREAM_WEBHOOK_SECRET="your-webhook-secret"  # Optional
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Examples

```bash
# Example 1: Create Product + Checkout (Port 3001)
npm run example:1

# Example 2: Fetch + Create + Checkout (Port 3002)
npm run example:2

# Example 3: Webhook Testing Dashboard (Port 3003)
npm run example:3

# OR the original demos:
npm run express              # Original manual implementation
npm run express-adapter      # Express adapter demo
```

## 📚 Example Descriptions

### Example 1: Create Product + Checkout

**File:** `use-cases/01-create-product-checkout.js`
**Port:** 3001
**Perfect for:** Learning the basics of product creation and checkout

**What you'll learn:**
- ✅ How to create a product with Stream SDK
- ✅ How to use the Checkout adapter
- ✅ How to handle webhook events
- ✅ Success/failure page handling

**Try it:**
```bash
npm run example:1
# Visit http://localhost:3001/
```

---

### Example 2: Fetch Products + Create Consumer + Checkout

**File:** `use-cases/02-fetch-product-create-consumer-checkout.js`
**Port:** 3002
**Perfect for:** Understanding customer management and existing product usage

**What you'll learn:**
- ✅ Fetching existing products from Stream
- ✅ Creating consumers (customers)
- ✅ Two different checkout approaches:
  - Express adapter with query params
  - SDK direct payment link creation

**Try it:**
```bash
npm run example:2
# Visit http://localhost:3002/
```

---

### Example 3: Comprehensive Webhook Testing

**File:** `use-cases/03-webhook-testing.js`
**Port:** 3003
**Perfect for:** Testing and monitoring all webhook events

**What you'll learn:**
- ✅ Handling ALL Stream webhook event types
- ✅ Webhook signature verification
- ✅ Real-time webhook dashboard
- ✅ Event logging and monitoring
- ✅ Testing webhooks locally

**Features:**
- 🎨 Beautiful real-time dashboard
- 📊 Event statistics
- 🔍 Full payload inspection
- 🧪 Test webhook simulator
- ⏱️ Auto-refreshes every 5 seconds

**Try it:**
```bash
npm run example:3
# Visit http://localhost:3003/
```

**For production webhook testing:**
```bash
# Expose with ngrok
ngrok http 3003
# Configure Stream webhook to: https://your-url.ngrok.io/webhooks/stream
```

---

## 🎯 Use Case Matrix

| Example | Creates Product | Fetches Products | Creates Consumer | Checkout | Webhooks | Dashboard |
|---------|----------------|------------------|------------------|----------|----------|-----------|
| Example 1 | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Example 2 | ❌ | ✅ | ✅ | ✅ (2 methods) | ✅ | ❌ |
| Example 3 | ❌ | ❌ | ❌ | ❌ | ✅ (All events) | ✅ |

## 🔥 Common Workflows

### Workflow 1: Complete Payment Flow

```bash
# Terminal 1: Run Example 1 (checkout)
npm run example:1

# Terminal 2: Run Example 3 (webhook monitoring)
npm run example:3

# Terminal 3: Expose webhooks
ngrok http 3003
```

1. Visit Example 1 at http://localhost:3001/
2. View webhook dashboard at http://localhost:3003/
3. Complete a checkout
4. Watch webhooks appear in real-time!

### Workflow 2: Testing Multiple Products

```bash
# Run Example 2
npm run example:2

# Visit http://localhost:3002/
# Try both checkout methods
```

### Workflow 3: Integration Testing

```bash
# Start all examples in different terminals
npm run example:1  # Terminal 1 (Port 3001)
npm run example:2  # Terminal 2 (Port 3002)
npm run example:3  # Terminal 3 (Port 3003)

# Use Example 3 to monitor webhooks from Examples 1 & 2
```

## 📖 Code Snippets

### Basic Checkout Setup

```javascript
import { Checkout } from 'streampay-sdk/express';

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));
```

### Complete Webhook Handler

```javascript
import { Webhooks } from 'streampay-sdk/express';

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  onPaymentSucceeded: async (data) => {
    // Handle successful payment
    await database.orders.update({
      paymentId: data.entity_id,
      status: 'paid'
    });
  },

  onInvoiceCreated: async (data) => {
    // Handle invoice creation
    await sendEmail({
      to: customer.email,
      subject: 'New Invoice',
      invoiceId: data.entity_id
    });
  },

  onWebhook: async (event, data) => {
    // Log all events
    console.log(`Event: ${event}`, data);
  }
}));
```

### Create Product + Use in Checkout

```javascript
import StreamSDK from 'streampay-sdk';

const client = StreamSDK.init(process.env.STREAM_API_KEY);

// Create product
const product = await client.createProduct({
  name: 'Premium Plan',
  price: 99.99,
  currency: 'SAR',
  type: 'ONE_OFF'
});

// Use in checkout URL
const checkoutUrl = `/checkout?products=${product.id}&customerName=John`;
```

## 🔧 Troubleshooting

### "No products found"

**Solution:** Example 2 automatically creates a sample product if none exist. You can also run Example 1 first to create a product.

### "Webhook not received"

**Checklist:**
- ✅ Is ngrok running? (`ngrok http 3003`)
- ✅ Did you configure Stream webhook URL correctly?
- ✅ Is the webhook secret correct?
- ✅ Is Example 3 running?

### "Cannot connect to Stream API"

**Check:**
- ✅ `STREAM_API_KEY` is set correctly
- ✅ `STREAM_BASE_URL` is correct (if using staging)
- ✅ Network connectivity

### "Signature verification failed"

**Solution:**
- Ensure `STREAM_WEBHOOK_SECRET` environment variable matches your Stream dashboard configuration
- Check that the webhook is being sent from Stream (not a test tool)

## 💡 Tips & Best Practices

### Development

1. **Use Example 3 as your webhook monitor** while developing
2. **Run multiple examples simultaneously** to test complete flows
3. **Check console logs** for detailed event information
4. **Use ngrok** for testing real webhooks locally

### Production

1. **Always set `webhookSecret`** for security
2. **Implement proper error handling** in webhook handlers
3. **Use a queue** for processing webhook events asynchronously
4. **Log all webhooks** for debugging and audit trails
5. **Return 200 OK quickly** from webhook handlers

### Testing

1. **Use the "Send Test Webhook" button** in Example 3 for quick tests
2. **Create real payments** to test the full flow
3. **Monitor the dashboard** to ensure webhooks are received
4. **Test with different products** and customers

## 🎓 Learning Path

### Beginner

1. Start with **Example 1** to understand basics
2. Read the code comments
3. Test the checkout flow
4. View webhook events in console

### Intermediate

1. Try **Example 2** to see product fetching and consumer creation
2. Compare the two checkout methods
3. Start **Example 3** to monitor webhooks
4. Integrate into your own Express app

### Advanced

1. Modify examples for your use case
2. Add database integration
3. Implement custom business logic in webhook handlers
4. Deploy to production with proper webhook verification

## 📝 Next Steps

After completing the examples:

1. **Read the documentation:**
   - [EXPRESS_ADAPTER.md](../EXPRESS_ADAPTER.md) - Complete API reference
   - [MIGRATION_TO_EXPRESS_ADAPTER.md](../MIGRATION_TO_EXPRESS_ADAPTER.md) - Migration guide

2. **Integrate into your app:**
   - Copy the patterns from examples
   - Add your business logic
   - Configure webhooks in production

3. **Explore advanced features:**
   - Multiple products per checkout
   - Subscription handling
   - Invoice management
   - Coupon support

## 🌟 Example Comparison

| Feature | express.js | express-adapter.js | Example 1 | Example 2 | Example 3 |
|---------|------------|-------------------|-----------|-----------|-----------|
| Manual SDK calls | ✅ | ❌ | ✅ | ✅ | ❌ |
| Checkout adapter | ❌ | ✅ | ✅ | ✅ | ❌ |
| Webhook adapter | ❌ | ✅ | ✅ | ✅ | ✅ |
| Product creation | ❌ | ❌ | ✅ | ❌ | ❌ |
| Consumer creation | ✅ | ❌ | ❌ | ✅ | ❌ |
| Web dashboard | ❌ | ✅ | ✅ | ✅ | ✅ |
| Webhook dashboard | ❌ | ❌ | ❌ | ❌ | ✅ |

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/streampayments/stream-sdk/issues)
- **Email:** support@streampay.sa
- **Docs:** [Stream Documentation](https://docs.streampay.sa/)

Happy coding! 🚀
