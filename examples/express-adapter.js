/**
 * Stream SDK Express Adapter Example
 *
 * This example demonstrates the new Polar-style Express adapter for Stream SDK.
 * The adapter provides clean, declarative handlers for checkout flows and webhooks.
 *
 * Prerequisites:
 * 1. Set your Stream API key:
 *    export STREAM_API_KEY="your-api-key"
 *
 * 2. Install dependencies:
 *    cd examples
 *    npm install
 *
 * 3. Run the server:
 *    npm run express-adapter
 *    or
 *    node express-adapter.js
 *
 * Usage:
 * - Checkout: http://localhost:3000/checkout?products=prod_123&customerPhone=+966501234567&customerName=John
 * - Webhooks will be received at: POST http://localhost:3000/webhooks/stream
 */

import express from 'express';
import { Checkout, Webhooks } from '@streampayments/stream-sdk/express';

const app = express();

// Parse JSON for webhooks
app.use(express.json());

/**
 * Checkout Handler
 *
 * Creates a payment link and redirects the user to the Stream checkout page.
 *
 * Query Parameters:
 * - products: Product ID(s), comma-separated for multiple (required)
 * - customerId: Existing customer/consumer ID (optional)
 * - customerEmail: Customer email for new customers (optional)
 * - customerName: Customer name for new customers (optional)
 * - customerPhone: Customer phone for new customers (optional)
 * - metadata: URL-encoded JSON metadata (optional)
 *
 * Examples:
 * - Single product: /checkout?products=prod_123&customerPhone=+966501234567&customerName=John
 * - Multiple products: /checkout?products=prod_123,prod_456&customerPhone=+966501234567
 * - With metadata: /checkout?products=prod_123&metadata=%7B%22orderId%22%3A%22ORD-123%22%7D
 */
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/payment/success`,
  returnUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/payment/cancelled`,
  baseUrl: process.env.STREAM_BASE_URL
}));

/**
 * Webhook Handler
 *
 * Processes webhook events from Stream.
 * Supports both specific event handlers and a catch-all handler.
 */
app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  // Specific event handlers
  onPaymentCompleted: async (data) => {
    console.log('💰 Payment completed!');
    console.log('  Payment ID:', data.id);
    console.log('  Amount:', data.amount, data.currency);
    console.log('  Consumer:', data.consumer_id);

    // TODO: Update your database, send confirmation email, etc.
  },

  onPaymentFailed: async (data) => {
    console.log('❌ Payment failed!');
    console.log('  Payment ID:', data.id);
    console.log('  Reason:', data.failure_reason);

    // TODO: Notify customer, update order status, etc.
  },

  onSubscriptionCreated: async (data) => {
    console.log('🔄 Subscription created!');
    console.log('  Subscription ID:', data.id);
    console.log('  Product:', data.product_id);
    console.log('  Consumer:', data.consumer_id);

    // TODO: Activate subscription features, send welcome email, etc.
  },

  onSubscriptionCancelled: async (data) => {
    console.log('🛑 Subscription cancelled!');
    console.log('  Subscription ID:', data.id);
    console.log('  Cancelled at:', data.cancelled_at);

    // TODO: Deactivate subscription features, send cancellation email, etc.
  },

  onInvoicePaid: async (data) => {
    console.log('📄 Invoice paid!');
    console.log('  Invoice ID:', data.id);
    console.log('  Amount:', data.amount);

    // TODO: Mark invoice as paid in your system, etc.
  },

  // Catch-all handler for any webhook event
  onWebhook: async (event, data) => {
    console.log(`📬 Webhook received: ${event}`);
    console.log('  Data:', JSON.stringify(data, null, 2));

    // TODO: Log to your monitoring system, etc.
  }
}));

/**
 * Success page
 */
app.get('/payment/success', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Successful</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
          }
          .checkmark {
            font-size: 72px;
            color: #4caf50;
            margin-bottom: 20px;
          }
          h1 {
            color: #333;
            margin: 0 0 10px 0;
          }
          p {
            color: #666;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. Your order has been confirmed.</p>
        </div>
      </body>
    </html>
  `);
});

/**
 * Cancelled/Failed page
 */
app.get('/payment/cancelled', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Cancelled</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          .container {
            background: white;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
          }
          .cross {
            font-size: 72px;
            color: #f44336;
            margin-bottom: 20px;
          }
          h1 {
            color: #333;
            margin: 0 0 10px 0;
          }
          p {
            color: #666;
            font-size: 18px;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.3s;
          }
          a:hover {
            background: #764ba2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="cross">✗</div>
          <h1>Payment Cancelled</h1>
          <p>Your payment was cancelled. No charges were made.</p>
          <a href="/">Return to Home</a>
        </div>
      </body>
    </html>
  `);
});

/**
 * Home page with usage instructions
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Stream SDK Express Adapter Demo</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #667eea;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
          }
          h2 {
            color: #764ba2;
            margin-top: 30px;
          }
          code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
          }
          pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
          }
          .example {
            margin: 20px 0;
          }
          a {
            color: #667eea;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Stream SDK Express Adapter Demo</h1>
          <p>This demo showcases the new Polar-style Express adapter for Stream SDK.</p>

          <h2>📖 Quick Start</h2>
          <div class="example">
            <h3>1. Checkout Flow</h3>
            <p>To create a checkout session, navigate to:</p>
            <pre>/checkout?products=PRODUCT_ID&customerPhone=PHONE&customerName=NAME</pre>
            <p><strong>Required Parameters:</strong></p>
            <ul>
              <li><code>products</code> - One or more product IDs (comma-separated)</li>
            </ul>
            <p><strong>Optional Parameters:</strong></p>
            <ul>
              <li><code>customerId</code> - Existing consumer ID</li>
              <li><code>customerPhone</code> - Phone number (for new customers)</li>
              <li><code>customerName</code> - Customer name (for new customers)</li>
              <li><code>customerEmail</code> - Email address</li>
              <li><code>metadata</code> - URL-encoded JSON metadata</li>
            </ul>
          </div>

          <div class="example">
            <h3>2. Webhook Events</h3>
            <p>Configure your Stream webhook to point to:</p>
            <pre>${process.env.BASE_URL || 'http://localhost:3000'}/webhooks/stream</pre>
            <p><strong>Supported Events:</strong></p>
            <ul>
              <li>payment.created</li>
              <li>payment.completed / payment.paid</li>
              <li>payment.failed</li>
              <li>subscription.created</li>
              <li>subscription.updated</li>
              <li>subscription.cancelled</li>
              <li>invoice.created</li>
              <li>invoice.paid</li>
            </ul>
          </div>

          <h2>💡 Example Code</h2>
          <pre>
import { Checkout, Webhooks } from '@streampayments/stream-sdk/express';

app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: 'https://myapp.com/success',
  returnUrl: 'https://myapp.com/cancel'
}));

app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  onPaymentCompleted: async (data) => {
    console.log('Payment completed!', data);
  }
}));
          </pre>

          <h2>📚 Documentation</h2>
          <p>For more information, check out the <a href="https://github.com/streampayments/stream-sdk">Stream SDK documentation</a>.</p>
        </div>
      </body>
    </html>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════════╗');
  console.log('║   Stream SDK Express Adapter Demo Server    ║');
  console.log('╚═══════════════════════════════════════════════╝\n');
  console.log(`🌍 Server running at: http://localhost:${PORT}`);
  console.log(`\n📍 Endpoints:`);
  console.log(`   Home:     http://localhost:${PORT}/`);
  console.log(`   Checkout: http://localhost:${PORT}/checkout?products=PRODUCT_ID&customerPhone=PHONE`);
  console.log(`   Webhooks: http://localhost:${PORT}/webhooks/stream`);
  console.log(`\n✨ Example checkout URL:`);
  console.log(`   http://localhost:${PORT}/checkout?products=prod_123&customerPhone=%2B966501234567&customerName=John%20Doe`);
  console.log('\n');
});
