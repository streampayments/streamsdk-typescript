# stream-sdk

<div align="center">
  <img src="https://streampay.sa/logo.png" alt="StreamPay Logo" width="200"/>

  Official Node.js/TypeScript SDK for StreamPay API

  [![npm version](https://img.shields.io/npm/v/stream-sdk.svg)](https://www.npmjs.com/package/stream-sdk)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
</div>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [SDK Features](#sdk-features)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Consumers](#consumers)
  - [Products](#products)
  - [Payment Links](#payment-links)
  - [Subscriptions](#subscriptions)
  - [Invoices](#invoices)
  - [Coupons](#coupons)
- [Examples](#examples)
- [Express.js Integration](#expressjs-integration)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Overview

The Stream SDK provides a complete TypeScript/JavaScript interface to the StreamPay payment platform. Process payments, manage subscriptions, create invoices, and handle customer data with full type safety and modern JavaScript features.

**Key Features:**
- 🔐 Secure API Key authentication
- 👥 Customer (Consumer) management
- 📦 Product catalog management
- 💳 Payment link creation
- 🔄 Subscription handling
- 🧾 Invoice generation
- 🎟️ Coupon & discount management
- 📝 Full TypeScript support
- ⚡ ES Modules and CommonJS compatible

---

## Installation

### NPM (Coming Soon)

```bash
npm install stream-sdk
```

### GitHub

```bash
npm install github:streampayments/stream-sdk#v1.0.0
```

### Add to package.json

```json
{
  "dependencies": {
    "stream-sdk": "github:streampayments/stream-sdk#v1.0.0"
  }
}
```

---

## Quick Start

```typescript
import StreamSDK from "stream-sdk";

// Initialize the SDK
const client = StreamSDK.init(process.env.STREAM_API_KEY!);

// Create a payment link
const result = await client.createSimplePaymentLink({
  name: "Monthly Subscription",
  amount: 99.99,
  consumer: {
    email: "customer@example.com",
    name: "John Doe",
    phone: "+966501234567"
  },
  product: {
    name: "Premium Plan",
    price: 99.99
  },
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure"
});

console.log("Payment URL:", result.paymentUrl);
```

---

## SDK Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Authentication** | API Key and Bearer Token support |
| **Consumers** | Create, update, list, and delete customers |
| **Products** | Manage your product catalog |
| **Payment Links** | Generate secure payment links |
| **Subscriptions** | Handle recurring payments |
| **Invoices** | Create and manage invoices |
| **Coupons** | Discount and promotion management |
| **Webhooks** | Real-time event notifications |

### Supported Features

- ✅ Single or multiple products per payment
- ✅ Guest checkout (no consumer required)
- ✅ Smart resource matching (automatic deduplication)
- ✅ SAR currency (default)
- ✅ Custom metadata support
- ✅ Full TypeScript type definitions
- ✅ ESM and CommonJS support

---

## Usage

### Authentication

Initialize the SDK with your API key:

```typescript
import StreamSDK from "stream-sdk";

// Option 1: Direct initialization
const client = StreamSDK.init("your-api-key");

// Option 2: With configuration
const client = StreamSDK.init("your-api-key", {
  baseUrl: "https://stream-app-service.streampay.sa"
});

// Option 3: Using environment variable
const client = StreamSDK.init(process.env.STREAM_API_KEY!);
```

---

### Consumers

Manage your customers (consumers):

#### Create a Consumer

```typescript
const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com",
  phone_number: "+966501234567",
  preferred_language: "en"
});
```

#### List Consumers

```typescript
const consumers = await client.listConsumers({
  page: 1,
  size: 10
});
```

#### Update a Consumer

```typescript
const updated = await client.updateConsumer("consumer_id", {
  name: "John Smith",
  email: "johnsmith@example.com"
});
```

#### Delete a Consumer

```typescript
await client.deleteConsumer("consumer_id");
```

---

### Products

Manage your product catalog:

#### Create a Product

```typescript
const product = await client.createProduct({
  name: "Premium Subscription",
  price: 99.99,
  currency: "SAR",
  type: "ONE_OFF",
  description: "Monthly premium subscription"
});
```

#### List Products

```typescript
const products = await client.listProducts({
  page: 1,
  size: 20
});
```

#### Update a Product

```typescript
const updated = await client.updateProduct("product_id", {
  price: 89.99,
  description: "Updated description"
});
```

#### Delete a Product

```typescript
await client.deleteProduct("product_id");
```

---

### Payment Links

Create payment links for your customers:

#### Simple Payment Link (Recommended)

The SDK handles consumer and product creation automatically:

```typescript
const result = await client.createSimplePaymentLink({
  name: "Order #1234",
  amount: 250.00,
  consumer: {
    email: "customer@example.com",
    name: "Jane Doe",
    phone: "+966501234567"
  },
  product: {
    name: "Premium Package",
    price: 250.00
  },
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure"
});

console.log("Payment URL:", result.paymentUrl);
console.log("Consumer ID:", result.consumerId);
console.log("Product ID:", result.productId);
```

#### Multiple Products

```typescript
const result = await client.createSimplePaymentLink({
  name: "Bundle Order",
  consumer: {
    name: "John Doe",
    phone: "+966501234567"
  },
  products: [
    { name: "Product A", price: 50.00, quantity: 2 },
    { name: "Product B", price: 75.00, quantity: 1 }
  ],
  currency: "SAR",
  successRedirectUrl: "https://yourapp.com/success"
});

console.log("Product IDs:", result.productIds);
```

#### Guest Checkout

Create a payment without requiring customer details:

```typescript
const result = await client.createSimplePaymentLink({
  name: "Guest Order",
  amount: 49.99,
  product: {
    name: "One-time Purchase",
    price: 49.99
  },
  // No consumer - phone collected at checkout
  successRedirectUrl: "https://yourapp.com/success"
});
```

#### Advanced Payment Link

For more control, create resources separately:

```typescript
// Create consumer
const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com",
  phone_number: "+966501234567"
});

// Create product
const product = await client.createProduct({
  name: "Premium Plan",
  price: 99.99,
  currency: "SAR"
});

// Create payment link
const paymentLink = await client.createPaymentLink({
  name: "Payment",
  organization_consumer_id: consumer.id,
  items: [{ product_id: product.id, quantity: 1 }],
  success_redirect_url: "https://yourapp.com/success",
  failure_redirect_url: "https://yourapp.com/failure"
});

const paymentUrl = client.getPaymentUrl(paymentLink);
```

---

### Subscriptions

Handle recurring payments:

#### Create a Subscription

```typescript
const subscription = await client.createSubscription({
  organization_consumer_id: "consumer_id",
  organization_product_id: "product_id",
  billing_cycle: "MONTHLY",
  start_date: new Date().toISOString()
});
```

#### List Subscriptions

```typescript
const subscriptions = await client.listSubscriptions({
  page: 1,
  size: 10
});
```

#### Cancel a Subscription

```typescript
await client.cancelSubscription("subscription_id");
```

---

### Invoices

Create and manage invoices:

#### Create an Invoice

```typescript
const invoice = await client.createInvoice({
  organization_consumer_id: "consumer_id",
  items: [
    { product_id: "product_id", quantity: 1 }
  ],
  due_date: "2024-12-31",
  notes: "Payment due within 30 days"
});
```

#### List Invoices

```typescript
const invoices = await client.listInvoices({
  page: 1,
  size: 10
});
```

---

### Coupons

Manage discounts and promotions:

#### Create a Coupon

```typescript
const coupon = await client.createCoupon({
  code: "SUMMER2024",
  discount_type: "PERCENTAGE",
  discount_value: 20,
  valid_from: "2024-06-01",
  valid_to: "2024-08-31"
});
```

#### List Coupons

```typescript
const coupons = await client.listCoupons({
  page: 1,
  size: 10
});
```

---

## Examples

Explore complete examples in the [examples directory](./examples):

### TypeScript SDK Examples

- **[basic.mjs](./examples/basic.mjs)** - Basic SDK usage
- **[comprehensive.mjs](./examples/comprehensive.mjs)** - Advanced features
- **[multiple-products.mjs](./examples/multiple-products.mjs)** - Multiple products guide

### Express.js Examples

- **[express.js](./examples/express.js)** - Express with SDK routes
- **[express-adapter.js](./examples/express-adapter.js)** - Express adapter demo
- **[use-cases/](./examples/use-cases/)** - Real-world use cases

**[View All Examples →](./examples/README.md)**

---

## Express.js Integration

For Express.js applications, we provide a separate adapter package for simplified integration:

### stream-sdk-express

```bash
npm install stream-sdk-express
```

```typescript
import { Checkout, Webhooks } from 'stream-sdk-express';

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY!,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY!,
  onPaymentCompleted: async (data) => {
    console.log('Payment completed:', data);
  }
}));
```

**[Learn More →](https://github.com/streampayments/stream-sdk-express)**

---

## API Documentation

### Available Methods

| Method | Description |
|--------|-------------|
| `createConsumer(data)` | Create a new consumer |
| `listConsumers(params)` | List all consumers |
| `updateConsumer(id, data)` | Update a consumer |
| `deleteConsumer(id)` | Delete a consumer |
| `createProduct(data)` | Create a new product |
| `listProducts(params)` | List all products |
| `updateProduct(id, data)` | Update a product |
| `deleteProduct(id)` | Delete a product |
| `createSimplePaymentLink(data)` | Create payment link (recommended) |
| `createPaymentLink(data)` | Create payment link (advanced) |
| `listPaymentLinks(params)` | List all payment links |
| `getPaymentUrl(link)` | Get payment URL from link |
| `createSubscription(data)` | Create a subscription |
| `listSubscriptions(params)` | List all subscriptions |
| `cancelSubscription(id)` | Cancel a subscription |
| `createInvoice(data)` | Create an invoice |
| `listInvoices(params)` | List all invoices |
| `createCoupon(data)` | Create a coupon |
| `listCoupons(params)` | List all coupons |

**[Full API Reference →](./API_REFERENCE.md)**

---

## Error Handling

The SDK throws errors for failed requests:

```typescript
try {
  const consumer = await client.createConsumer({
    name: "John Doe",
    email: "invalid-email"
  });
} catch (error) {
  console.error("Error creating consumer:", error.message);
  console.error("Status:", error.status);
  console.error("Response:", error.response);
}
```

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/streampayments/stream-sdk.git
cd stream-sdk

# Install dependencies
npm install

# Build the SDK
npm run build

# Run examples
npm run example
```

---

## Support

### Documentation

- **[API Documentation](https://docs.streampay.sa/)**
- **[Examples](./examples/README.md)**
- **[Express Adapter](https://github.com/streampayments/stream-sdk-express)**
- **[Multiple Products Guide](./MULTIPLE_PRODUCTS_GUIDE.md)**
- **[Framework Support](./FRAMEWORK_SUPPORT.md)**

### Help & Issues

- **📧 Email:** support@streampay.sa
- **🐛 Issues:** [GitHub Issues](https://github.com/streampayments/stream-sdk/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/streampayments/stream-sdk/discussions)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://streampay.sa">StreamPay</a></p>
  <p>
    <a href="https://streampay.sa">Website</a> •
    <a href="https://docs.streampay.sa">Documentation</a> •
    <a href="https://github.com/streampayments">GitHub</a>
  </p>
</div>
