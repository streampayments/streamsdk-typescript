# Multiple Products & Multiple Consumers Guide

## Overview

The Stream SDK has been updated to support **multiple products** in a single payment link. This guide explains the capabilities and limitations.

## What's Supported

### ✅ Multiple Products
- **YES** - You can add multiple products to a single payment link
- Each product can have its own quantity
- Products are matched by name and price (or use existing product IDs)
- Perfect for bundles and multi-item orders

### ❌ Multiple Consumers
- **NO** - The Stream API only supports **ONE consumer per payment link**
- This is an API limitation, not an SDK limitation
- The consumer field is `organization_consumer_id` (singular string)

## Use Cases

### ✅ Supported Use Cases

1. **Multiple Products** - One customer buying multiple products
   ```typescript
   const result = await client.createSimplePaymentLink({
     name: "Order #12345",
     consumer: { name: "Mohammad Ahmad", phone: "+966501234567" },  // ONE consumer
     products: [  // MULTIPLE products
       { name: "Product A", price: 50.00, quantity: 2 },
       { name: "Product B", price: 75.00, quantity: 1 }
     ]
   });
   ```

2. **Event Registration** - One person buying multiple ticket types
   ```typescript
   const result = await client.createSimplePaymentLink({
     name: "Conference Registration",
     consumer: { name: "Fatima", email: "fatima@example.com" },
     products: [
       { name: "VIP Pass", price: 999.00, quantity: 1 },
       { name: "Workshop Ticket", price: 299.00, quantity: 2 }
     ]
   });
   ```

3. **Subscription + Add-ons** - One customer with multiple items
   ```typescript
   const result = await client.createSimplePaymentLink({
     name: "Subscription Package",
     consumer: { phone: "+966501234567", name: "Mohammad" },
     products: [
       { name: "Monthly Subscription", price: 99.99 },
       { name: "Setup Fee", price: 49.99 },
       { name: "Premium Support", price: 29.99 }
     ]
   });
   ```

### ❌ NOT Supported Use Cases

1. **Group Purchase** - Multiple people paying together
   ```typescript
   // ❌ This is NOT possible - only one consumer per payment link
   const result = await client.createSimplePaymentLink({
     name: "Group Trip",
     consumers: [  // ❌ NOT SUPPORTED - API doesn't accept array
       { name: "Person 1", phone: "+966501111111" },
       { name: "Person 2", phone: "+966502222222" }
     ],
     products: [{ name: "Trip Package", price: 500.00 }]
   });
   ```

2. **Split Payment** - Different people paying for different items
   ```typescript
   // ❌ This is NOT possible
   const result = await client.createSimplePaymentLink({
     name: "Split Bill",
     items: [
       { product: "Item A", consumer: "Person 1" },  // ❌ Can't assign different consumers
       { product: "Item B", consumer: "Person 2" }
     ]
   });
   ```

## Workarounds for Multiple Payers

If you need multiple people to pay:

### Option 1: Create Separate Payment Links (Recommended)
```typescript
// Create individual payment link for each person
const links = await Promise.all([
  client.createSimplePaymentLink({
    name: "Group Trip - Person 1",
    consumer: { name: "Mohammad Ahmad", phone: "+966501111111" },
    product: { name: "Trip Share", price: 250.00 }
  }),
  client.createSimplePaymentLink({
    name: "Group Trip - Person 2",
    consumer: { name: "Fatima Ahmad", phone: "+966502222222" },
    product: { name: "Trip Share", price: 250.00 }
  })
]);

// Send each person their own payment link
console.log("Person 1 pays:", links[0].paymentUrl);
console.log("Person 2 pays:", links[1].paymentUrl);
```

### Option 2: Use Guest Checkout
```typescript
// One payment link, no consumer - everyone can use it
const result = await client.createSimplePaymentLink({
  name: "Group Event - Open Registration",
  products: [
    { name: "Event Ticket", price: 100.00 }
  ]
  // No consumer = guest checkout
  // Phone number collected at checkout page
});

// Share this link with everyone
console.log("Anyone can pay:", result.paymentUrl);
```

## API Response

### Single Product Response
```typescript
{
  paymentLink: {...},
  paymentUrl: "https://checkout.streampay.sa/pay/link_abc123",
  productId: "prod_123",      // First product ID
  productIds: ["prod_123"],   // Array of all products
  consumerId: "cons_456"
}
```

### Multiple Products Response
```typescript
{
  paymentLink: {...},
  paymentUrl: "https://checkout.streampay.sa/pay/link_abc123",
  productId: "prod_123",              // First product
  productIds: ["prod_123", "prod_456", "prod_789"],  // All products
  consumerId: "cons_999"              // ONE consumer only
}
```

### Guest Checkout Response (No Consumer)
```typescript
{
  paymentLink: {...},
  paymentUrl: "https://checkout.streampay.sa/pay/link_abc123",
  productId: "prod_123",
  productIds: ["prod_123"],
  consumerId: undefined  // No consumer for guest checkout
}
```

## Key Points

1. **Multiple Products**: ✅ Fully supported
   - Add as many products as needed
   - Each with individual quantity
   - Perfect for bundles and multi-item orders

2. **Single Consumer**: ⚠️ API limitation
   - Only ONE consumer per payment link
   - This is an API constraint
   - Consumer is optional (guest checkout available)

3. **Flexible API**: ✅ Supported
   - Use `product` (singular) for single product
   - Use `products` (array) for multiple products
   - Response includes both `productId` and `productIds`

4. **Smart Matching**: ✅ Available
   - Reuses existing consumers by phone/email
   - Reuses existing products by name+price
   - Set `options.forceCreate: true` to override

## Examples

See the following files for complete examples:
- **[examples/multiple-products.mjs](./examples/multiple-products.mjs)** - Comprehensive examples
- **[examples/express.js](./examples/express.js)** - Express.js integration with multiple products endpoint
- **[README.md](./README.md)** - Quick start guide

## Questions?

- **Q: Can I have multiple consumers?**
  - A: No, the API only supports one `organization_consumer_id` field

- **Q: Can I have multiple products?**
  - A: Yes! Use the `products` array

- **Q: What if I need multiple people to pay?**
  - A: Create separate payment links for each person, or use guest checkout

- **Q: Can I use both `product` and `products`?**
  - A: Yes! Use `product` (singular) for single items, `products` (array) for multiple items
