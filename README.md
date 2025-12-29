# @streamsdk/typescript · Official Stream SDK for TypeScript

<div align="center">
  <img src="https://app.streampay.sa/media/logos/dark-logo.svg" alt="Stream Logo" width="200"/>

Official Node.js/TypeScript SDK for Stream API

[![npm version](https://img.shields.io/npm/v/@streamsdk/typescript.svg)](https://www.npmjs.com/package/@streamsdk/typescript)
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
- [Examples](#examples)
- [Express.js Integration](#expressjs-integration)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Overview

The Stream SDK provides a complete TypeScript/JavaScript interface to the Stream payment platform. Process payments, manage subscriptions, create invoices, and handle customer data with full type safety and modern JavaScript features.

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

```bash
npm install @streamsdk/typescript
```

**Or install from GitHub:**

```bash
npm install github:streampayments/streamsdk-typescript#v1.0.0
```

### Add to package.json

```json
{
  "dependencies": {
    "@streamsdk/typescript": "^1.0.0"
  }
}
```

---

## Quick Start

```typescript
import StreamSDK from "@streamsdk/typescript";

// Initialize the SDK
const client = StreamSDK.init(process.env.STREAM_API_KEY!);

// Create a payment link
const result = await client.createSimplePaymentLink({
  name: "Monthly Subscription",
  amount: 99.99,
  consumer: {
    email: "customer@example.com",
    name: "Ahmad Ali",
    phone: "+966501234567",
  },
  product: {
    name: "Premium Plan",
    price: 99.99,
  },
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure",
});

console.log("Payment URL:", result.paymentUrl);
```

---

## SDK Features

### Core Capabilities

| Feature            | Description                                |
| ------------------ | ------------------------------------------ |
| **Authentication** | API Key and Bearer Token support           |
| **Consumers**      | Create, update, list, and delete customers |
| **Products**       | Manage your product catalog                |
| **Payment Links**  | Generate secure payment links              |
| **Subscriptions**  | Handle recurring payments                  |
| **Invoices**       | Create and manage invoices                 |
| **Coupons**        | Discount and promotion management          |
| **Webhooks**       | Real-time event notifications              |

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

For detailed usage examples and API documentation, please refer to the [API Documentation](#api-documentation) section below.

### Authentication

Initialize the SDK with your API key:

```typescript
import StreamSDK from "@streamsdk/typescript";

const client = StreamSDK.init(process.env.STREAM_API_KEY!);
```

For more authentication options and detailed examples for each resource, see the documentation links in the [Available Resources and Operations](#available-resources-and-operations) section.

---

## Examples

Explore complete TypeScript SDK examples in the [examples directory](./examples):

- **[basic.mjs](./examples/basic.mjs)** - Basic SDK usage
- **[comprehensive.mjs](./examples/comprehensive.mjs)** - Advanced features
- **[multiple-products.mjs](./examples/multiple-products.mjs)** - Multiple products guide

**[View All Examples →](./examples/README.md)**

For Express.js examples, see **[streamsdk-express](https://github.com/streampayments/streamsdk-express)**

---

## Express.js Integration

For Express.js applications, we provide a separate adapter package with declarative handlers for checkout and webhooks:

**[streamsdk-express →](https://github.com/streampayments/streamsdk-express)**

---

## API Documentation

### Available Resources and Operations

<details open>
<summary>Available methods</summary>

#### [Consumers](docs/sdks/consumers/README.md)

* [create](docs/sdks/consumers/README.md#create) - Create Consumer
* [list](docs/sdks/consumers/README.md#list) - Get All Consumers
* [get](docs/sdks/consumers/README.md#get) - Get Consumer
* [update](docs/sdks/consumers/README.md#update) - Update Consumer
* [delete](docs/sdks/consumers/README.md#delete) - Delete Consumer

#### [Coupons](docs/sdks/coupons/README.md)

* [list](docs/sdks/coupons/README.md#list) - List Coupons
* [create](docs/sdks/coupons/README.md#create) - Create Coupon
* [update](docs/sdks/coupons/README.md#update) - Update Coupon
* [get](docs/sdks/coupons/README.md#get) - Get Coupon
* [delete](docs/sdks/coupons/README.md#delete) - Delete Coupon

#### [Invoices](docs/sdks/invoices/README.md)

* [get](docs/sdks/invoices/README.md#get) - Get Invoice
* [list](docs/sdks/invoices/README.md#list) - List Invoices

#### [PaymentLinks](docs/sdks/paymentlinks/README.md)

* [get](docs/sdks/paymentlinks/README.md#get) - Get Payment Link
* [create](docs/sdks/paymentlinks/README.md#create) - Create Payment Link
* [list](docs/sdks/paymentlinks/README.md#list) - List Payment Links

#### [Payments](docs/sdks/payments/README.md)

* [list](docs/sdks/payments/README.md#list) - List Payments
* [get](docs/sdks/payments/README.md#get) - Get Payment
* [refund](docs/sdks/payments/README.md#refund) - Refund Payment

#### [Products](docs/sdks/products/README.md)

* [list](docs/sdks/products/README.md#list) - List Products
* [create](docs/sdks/products/README.md#create) - Create Product
* [get](docs/sdks/products/README.md#get) - Get Product
* [update](docs/sdks/products/README.md#update) - Update Product
* [delete](docs/sdks/products/README.md#delete) - Delete Product

#### [Subscriptions](docs/sdks/subscriptions/README.md)

* [get](docs/sdks/subscriptions/README.md#get) - Get Subscription
* [update](docs/sdks/subscriptions/README.md#update) - Update Subscription
* [list](docs/sdks/subscriptions/README.md#list) - List Subscriptions
* [create](docs/sdks/subscriptions/README.md#create) - Create Subscription
* [cancel](docs/sdks/subscriptions/README.md#cancel) - Cancel Subscription
* [freeze](docs/sdks/subscriptions/README.md#freeze) - Freeze Subscription
* [listFreezes](docs/sdks/subscriptions/README.md#listfreezes) - List Subscription Freezes
* [updateFreeze](docs/sdks/subscriptions/README.md#updatefreeze) - Update Subscription Freeze

#### [Subscriptions.Freeze](docs/sdks/freeze/README.md)

* [delete](docs/sdks/freeze/README.md#delete) - Delete Subscription Freeze

</details>

> Click on each resource above to see detailed documentation with code examples, parameters, and response types.

---

## Error Handling

The SDK throws errors for failed requests:

```typescript
try {
  const consumer = await client.createConsumer({
    name: "Ahmad Ali",
    email: "invalid-email",
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
git clone https://github.com/streampayments/streamsdk-typescript.git
cd streamsdk-typescript

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
- **[OpenAPI Specification](https://stream-app-service.streampay.sa/openapi.json)**
- **[Examples](./examples/README.md)**
- **[Express Adapter](https://github.com/streampayments/streamsdk-express)**
- **[Multiple Products Guide](./MULTIPLE_PRODUCTS_GUIDE.md)**
- **[Framework Support](./FRAMEWORK_SUPPORT.md)**

### Help & Issues

- **📧 Email:** support@streampay.sa
- **🐛 Issues:** [GitHub Issues](https://github.com/streampayments/streamsdk-typescript/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/streampayments/streamsdk-typescript/discussions)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://streampay.sa">Stream</a></p>
  <p>
    <a href="https://streampay.sa">Website</a> •
    <a href="https://docs.streampay.sa">Documentation</a> •
    <a href="https://github.com/streampayments">GitHub</a>
  </p>
</div>
