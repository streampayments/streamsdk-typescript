/**
 * Example 1: Create Product + Checkout
 *
 * This example demonstrates:
 * 1. Creating a product using the Stream SDK
 * 2. Setting up a checkout handler using the Express adapter
 * 3. Using the created product in checkout flow
 *
 * Usage:
 * 1. export STREAM_API_KEY="your-api-key"
 * 2. node use-cases/01-create-product-checkout.js
 * 3. Visit http://localhost:3001/checkout?products=PRODUCT_ID&customerName=John&customerPhone=+966501234567
 */

import express from 'express';
import StreamSDK from '@streampayments/stream-sdk';
import { Checkout, Webhooks } from '@streampayments/stream-sdk/express';

const app = express();
app.use(express.json());

// Initialize Stream SDK client
const streamClient = StreamSDK.init(process.env.STREAM_API_KEY, {
  baseUrl: process.env.STREAM_BASE_URL
});

let createdProduct = null;

// Step 1: Create a product
async function createProduct() {
  console.log('\n📦 Step 1: Creating Product...');

  try {
    const product = await streamClient.createProduct({
      name: 'Premium Membership',
      description: 'One-year premium membership with exclusive benefits',
      price: 299.99,
      currency: 'SAR',
      type: 'ONE_OFF'
    });

    createdProduct = product;

    console.log('✅ Product created successfully!');
    console.log(`   ID: ${product.id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Price: ${product.price} ${product.currency}`);
    console.log(`   Type: ${product.type}`);

    return product;
  } catch (error) {
    console.error('❌ Failed to create product:', error.message);
    throw error;
  }
}

// Step 2: Setup Checkout Handler
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: 'http://localhost:3001/success',
  returnUrl: 'http://localhost:3001/cancel',
  baseUrl: process.env.STREAM_BASE_URL
}));

// Step 3: Setup Webhook Handler
app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  onPaymentSucceeded: async (data) => {
    console.log('\n💰 WEBHOOK: Payment Succeeded!');
    console.log('   Event:', data);
    console.log('   Payment ID:', data.entity_id || data.id);
    console.log('   Status:', data.status);
  },

  onPaymentFailed: async (data) => {
    console.log('\n❌ WEBHOOK: Payment Failed!');
    console.log('   Event:', data);
  },

  onWebhook: async (event, data) => {
    console.log(`\n📬 WEBHOOK: ${event}`);
    console.log('   Data:', JSON.stringify(data, null, 2));
  }
}));

// Success page
app.get('/success', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Successful</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f0f9ff; }
          .success { color: #10b981; font-size: 72px; }
          h1 { color: #1e40af; }
        </style>
      </head>
      <body>
        <div class="success">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for purchasing ${createdProduct?.name || 'our product'}!</p>
        <p>Price: ${createdProduct?.price} ${createdProduct?.currency}</p>
      </body>
    </html>
  `);
});

// Cancel page
app.get('/cancel', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Cancelled</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #fef2f2; }
          .cancel { color: #ef4444; font-size: 72px; }
          h1 { color: #991b1b; }
        </style>
      </head>
      <body>
        <div class="cancel">✗</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was cancelled. No charges were made.</p>
        <a href="/">Return Home</a>
      </body>
    </html>
  `);
});

// Home page with instructions
app.get('/', (req, res) => {
  if (!createdProduct) {
    return res.send('<h1>Loading...</h1><p>Product is being created. Refresh in a moment.</p>');
  }

  const checkoutUrl = `http://localhost:3001/checkout?products=${createdProduct.id}&customerName=John%20Doe&customerPhone=%2B966501234567`;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Example 1: Create Product + Checkout</title>
        <style>
          body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #1e40af; }
          .product-info { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .checkout-button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-size: 18px;
            margin: 20px 0;
          }
          .checkout-button:hover { background: #1d4ed8; }
          pre { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>🚀 Example 1: Create Product + Checkout</h1>

        <div class="product-info">
          <h2>✅ Product Created</h2>
          <p><strong>ID:</strong> ${createdProduct.id}</p>
          <p><strong>Name:</strong> ${createdProduct.name}</p>
          <p><strong>Price:</strong> ${createdProduct.price} ${createdProduct.currency}</p>
          <p><strong>Type:</strong> ${createdProduct.type}</p>
        </div>

        <h2>Try Checkout</h2>
        <p>Click the button below to test the checkout flow:</p>
        <a href="${checkoutUrl}" class="checkout-button">Proceed to Checkout</a>

        <h3>Checkout URL:</h3>
        <pre>${checkoutUrl}</pre>

        <h3>How it works:</h3>
        <ol>
          <li>Product is created using <code>streamClient.createProduct()</code></li>
          <li>Checkout handler is configured with <code>Checkout()</code> adapter</li>
          <li>When you visit the checkout URL, you're redirected to Stream checkout page</li>
          <li>After payment, you're redirected to success/cancel page</li>
          <li>Webhooks are received and logged in the console</li>
        </ol>

        <h3>Webhook Events:</h3>
        <p>Configure your Stream webhook to: <code>http://localhost:3001/webhooks/stream</code></p>
        <p>(Use ngrok for testing: <code>ngrok http 3001</code>)</p>
      </body>
    </html>
  `);
});

// Start server and create product
const PORT = 3001;

async function start() {
  try {
    // Create product first
    await createProduct();

    // Start server
    app.listen(PORT, () => {
      console.log('\n╔═══════════════════════════════════════════════╗');
      console.log('║   Example 1: Create Product + Checkout      ║');
      console.log('╚═══════════════════════════════════════════════╝\n');
      console.log(`🌍 Server running at: http://localhost:${PORT}`);
      console.log(`\n📍 Endpoints:`);
      console.log(`   Home:     http://localhost:${PORT}/`);
      console.log(`   Checkout: http://localhost:${PORT}/checkout?products=${createdProduct.id}&customerName=John&customerPhone=%2B966501234567`);
      console.log(`   Webhooks: http://localhost:${PORT}/webhooks/stream`);
      console.log(`\n✨ Visit http://localhost:${PORT}/ to get started!`);
      console.log('\n');
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
