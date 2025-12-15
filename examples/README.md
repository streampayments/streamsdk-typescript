# StreamPay SDK Examples

This directory contains example implementations demonstrating both the **TypeScript SDK** and **Express Adapter**.

## Setup

1. Install dependencies:
```bash
cd examples
npm install
```

2. Set your API key:
```bash
export STREAM_API_KEY="your_api_key_here"
```

---

## 📦 TypeScript SDK Examples

Pure TypeScript SDK usage examples - use these for maximum flexibility and control.

### 1. Basic Usage (`basic.mjs`)

Learn the fundamentals of the StreamPay SDK.

**Run:**
```bash
node basic.mjs
```

**What it demonstrates:**
- SDK initialization
- Creating consumers (customers)
- Creating products
- Creating payment links
- Listing resources

### 2. Comprehensive Examples (`comprehensive.mjs`)

Advanced SDK features and patterns.

**Run:**
```bash
node comprehensive.mjs
```

**What it demonstrates:**
- Consumer management (create, update, list, delete)
- Product management
- Payment link creation with various options
- Subscriptions
- Invoices
- Coupons
- Error handling

### 3. Multiple Products (`multiple-products.mjs`)

How to work with multiple products in a single payment.

**Run:**
```bash
node multiple-products.mjs
```

**What it demonstrates:**
- Creating multiple products
- Single payment with multiple products
- Product bundles
- Smart consumer matching

---

## 🚀 Express Integration Examples

Express.js server examples showing different integration approaches.

### Option 1: TypeScript SDK with Express Routes (`express.js`)

Direct SDK usage with Express routes - full control over the flow.

**Run:**
```bash
npm run express
```

**Test:**
```bash
npm run test:express
```

**What it demonstrates:**
- Express server setup with SDK
- Manual route handlers
- Creating payments with SDK methods
- Consumer and product management
- Multiple products support
- Guest checkout

**Key Endpoints:**
```bash
POST /api/create-payment              # Create payment with new consumer & product
POST /api/create-payment-with-product # Use existing product IDs
POST /api/create-guest-payment        # Guest checkout (no consumer)
GET  /api/consumers                   # List consumers
GET  /api/products                    # List products
GET  /api/payment-links               # List payment links
```

### Option 2: Express Adapter (`express-adapter.js`)

Declarative Express handlers - quickest way to integrate.

**Run:**
```bash
npm run express-adapter
```

**What it demonstrates:**
- Express Checkout handler
- Express Webhooks handler
- Declarative configuration
- Minimal boilerplate

**Example Usage:**
```typescript
import { Checkout, Webhooks } from 'stream-sdk/express';

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: '/success',
  returnUrl: '/cancel'
}));

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  onPaymentCompleted: async (data) => {
    console.log('Payment completed:', data);
  }
}));
```

### Option 3: Use Cases (`use-cases/`)

Real-world scenarios with Express adapter.

**Run:**
```bash
npm run example:1  # Create product + checkout (Port 3001)
npm run example:2  # Fetch products + create consumer (Port 3002)
npm run example:3  # Webhook testing dashboard (Port 3003)
```

**What it demonstrates:**
- Complete checkout flows
- Webhook handling
- Real-time webhook dashboard
- Success/failure pages
- Production patterns

📚 **[See use-cases/README.md for detailed documentation](./use-cases/README.md)**

---

## 🎯 Which Example Should I Use?

### Use TypeScript SDK Examples If:
- ✅ Building a custom integration
- ✅ Not using Express.js
- ✅ Need full control over every step
- ✅ Want to understand the SDK deeply

**Start with:** `basic.mjs` → `comprehensive.mjs`

### Use Express with SDK Routes If:
- ✅ Using Express.js
- ✅ Need custom business logic in routes
- ✅ Want to build custom API endpoints
- ✅ Need fine-grained control

**Start with:** `express.js`

### Use Express Adapter If:
- ✅ Using Express.js
- ✅ Want the quickest setup
- ✅ Need declarative checkout & webhooks
- ✅ Prefer minimal configuration

**Start with:** `express-adapter.js` or `use-cases/01-create-product-checkout.js`

---

## 📖 API Examples

### TypeScript SDK

**Create a simple payment:**
```typescript
import StreamSDK from 'stream-sdk';

const client = StreamSDK.init(process.env.STREAM_API_KEY);

const result = await client.createSimplePaymentLink({
  name: "Order #1234",
  amount: 99.99,
  consumer: {
    email: "customer@example.com",
    name: "Mohammad Ahmad",
    phone: "+966501234567"
  },
  product: {
    name: "Premium Plan",
    price: 99.99
  },
  successRedirectUrl: "https://yourapp.com/success"
});

console.log("Payment URL:", result.paymentUrl);
```

### Express Routes

**Create payment endpoint:**
```bash
curl -X POST http://localhost:3000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Order #1234",
    "amount": 99.99,
    "customerPhone": "+966501234567",
    "customerName": "Mohammad Ahmad",
    "productName": "Premium Plan"
  }'
```

### Express Adapter

**Checkout URL:**
```
http://localhost:3000/checkout?products=prod_123&customerPhone=%2B966501234567&customerName=Mohammad%20Ahmad
```

---

## 🔧 Testing

### Test Express Server
```bash
npm run express        # Start server
npm run test:express   # Run automated tests
```

### Test Use Cases
```bash
# Run all examples simultaneously (different ports)
npm run example:1  # Port 3001
npm run example:2  # Port 3002
npm run example:3  # Port 3003
```

---

## 📝 Response Examples

**Simple Payment (with consumer):**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "consumerId": "cons_xyz789",
  "productId": "prod_def456"
}
```

**Multiple Products:**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "totalAmount": 299.97,
  "productIds": ["prod_123", "prod_456"],
  "consumerId": "cons_xyz789"
}
```

**Guest Checkout:**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "productId": "prod_def456"
}
```

---

## 📚 Documentation

- [Main SDK Documentation](../README.md)
- [Express Adapter Documentation](../EXPRESS_ADAPTER.md)
- [Multiple Products Guide](../MULTIPLE_PRODUCTS_GUIDE.md)
- [Framework Support](../FRAMEWORK_SUPPORT.md)

## 💡 Support

- **Issues:** [GitHub Issues](https://github.com/streampayments/stream-sdk/issues)
- **Email:** support@streampay.sa
- **API Docs:** https://docs.streampay.sa/
