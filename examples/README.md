# Stream SDK Examples

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

Learn the fundamentals of the Stream SDK.

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

## 🚀 Express.js Integration

For Express.js integration, use the separate **stream-sdk-express** package:

**[stream-sdk-express →](https://github.com/streampayments/stream-sdk-express)**

The Express adapter provides:
- ✅ Drop-in middleware for checkout and webhooks
- ✅ Declarative configuration
- ✅ Complete examples and documentation
- ✅ Production-ready patterns

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
