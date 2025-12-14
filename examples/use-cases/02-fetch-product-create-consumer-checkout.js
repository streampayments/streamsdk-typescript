/**
 * Example 2: Fetch Products + Create Consumer + Checkout
 *
 * This example demonstrates:
 * 1. Fetching existing products from Stream
 * 2. Creating a consumer (customer)
 * 3. Setting up checkout with the fetched product and created consumer
 *
 * Usage:
 * 1. export STREAM_API_KEY="your-api-key"
 * 2. node use-cases/02-fetch-product-create-consumer-checkout.js
 * 3. Visit http://localhost:3002/
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

let selectedProduct = null;
let createdConsumer = null;

// Step 1: Fetch Products
async function fetchProducts() {
  console.log('\n📦 Step 1: Fetching Products...');

  try {
    const result = await streamClient.listProducts({ page: 1, size: 10 });

    if (!result.data || result.data.length === 0) {
      console.log('⚠️  No products found. Creating a sample product...');

      // Create a sample product if none exist
      const product = await streamClient.createProduct({
        name: 'School Semester Fee',
        description: 'First semester registration fee',
        price: 3500.00,
        currency: 'SAR',
        type: 'ONE_OFF'
      });

      selectedProduct = product;
      console.log('✅ Sample product created!');
    } else {
      // Use the most recent product
      selectedProduct = result.data[0];
      console.log(`✅ Found ${result.data.length} product(s)`);
      console.log(`   Using latest product: ${selectedProduct.name}`);
    }

    console.log(`   ID: ${selectedProduct.id}`);
    console.log(`   Name: ${selectedProduct.name}`);
    console.log(`   Price: ${selectedProduct.price} ${selectedProduct.currency}`);

    return selectedProduct;
  } catch (error) {
    console.error('❌ Failed to fetch products:', error.message);
    throw error;
  }
}

// Step 2: Create Consumer
async function createConsumer() {
  console.log('\n👤 Step 2: Creating Consumer...');

  try {
    const consumer = await streamClient.createConsumer({
      name: 'Fatima Ahmad',
      phone_number: '+966501234568',
      email: 'fatima.ahmad@example.com'
    });

    createdConsumer = consumer;

    console.log('✅ Consumer created successfully!');
    console.log(`   ID: ${consumer.id}`);
    console.log(`   Name: ${consumer.name}`);
    console.log(`   Phone: ${consumer.phone_number}`);
    console.log(`   Email: ${consumer.email || 'N/A'}`);

    return consumer;
  } catch (error) {
    console.error('❌ Failed to create consumer:', error.message);
    throw error;
  }
}

// Step 3: Setup Checkout Handler
app.get('/checkout', Checkout({
  apiKey: process.env.STREAM_API_KEY,
  successUrl: 'http://localhost:3002/success',
  returnUrl: 'http://localhost:3002/cancel',
  baseUrl: process.env.STREAM_BASE_URL
}));

// Alternative: Checkout with pre-created consumer
app.get('/checkout-with-consumer', async (req, res) => {
  try {
    // Create payment link with specific consumer
    const paymentLink = await streamClient.createPaymentLink({
      name: `Order for ${createdConsumer.name}`,
      items: [{
        product_id: selectedProduct.id,
        quantity: 1
      }],
      organization_consumer_id: createdConsumer.id,
      coupons: [],
      success_redirect_url: 'http://localhost:3002/success',
      failure_redirect_url: 'http://localhost:3002/cancel'
    });

    const paymentUrl = streamClient.getPaymentUrl(paymentLink);

    if (!paymentUrl) {
      return res.status(500).json({ error: 'Failed to generate payment URL' });
    }

    res.redirect(paymentUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Setup Webhook Handler
app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  onPaymentSucceeded: async (data) => {
    console.log('\n💰 WEBHOOK: Payment Succeeded!');
    console.log('   Payment ID:', data.entity_id || data.id);
    console.log('   Consumer:', createdConsumer?.name);
    console.log('   Product:', selectedProduct?.name);
  },

  onPaymentFailed: async (data) => {
    console.log('\n❌ WEBHOOK: Payment Failed!');
    console.log('   Reason:', data.failure_reason || 'Unknown');
  },

  onInvoiceCreated: async (data) => {
    console.log('\n📄 WEBHOOK: Invoice Created!');
    console.log('   Invoice ID:', data.entity_id || data.id);
  },

  onWebhook: async (event, data) => {
    console.log(`\n📬 WEBHOOK: ${event}`);
    console.log('   Timestamp:', new Date().toISOString());
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
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 500px; }
        </style>
      </head>
      <body>
        <div class="success">✓</div>
        <h1>Payment Successful!</h1>
        <div class="details">
          <p><strong>Product:</strong> ${selectedProduct?.name}</p>
          <p><strong>Price:</strong> ${selectedProduct?.price} ${selectedProduct?.currency}</p>
          <p><strong>Customer:</strong> ${createdConsumer?.name}</p>
          <p><strong>Email:</strong> ${createdConsumer?.email || 'N/A'}</p>
        </div>
        <a href="/">Back to Home</a>
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

// Home page
app.get('/', (req, res) => {
  if (!selectedProduct || !createdConsumer) {
    return res.send('<h1>Loading...</h1><p>Resources are being created. Refresh in a moment.</p>');
  }

  const checkoutUrl1 = `http://localhost:3002/checkout?products=${selectedProduct.id}&customerId=${createdConsumer.id}`;
  const checkoutUrl2 = `http://localhost:3002/checkout-with-consumer`;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Example 2: Fetch + Create + Checkout</title>
        <style>
          body { font-family: Arial; max-width: 900px; margin: 50px auto; padding: 20px; }
          h1 { color: #1e40af; }
          .resource-box { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .checkout-button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px 10px 10px 0;
          }
          .checkout-button:hover { background: #1d4ed8; }
          .checkout-button.secondary { background: #059669; }
          .checkout-button.secondary:hover { background: #047857; }
          pre { background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>🚀 Example 2: Fetch Product + Create Consumer + Checkout</h1>

        <div class="resource-box">
          <h2>📦 Selected Product</h2>
          <p><strong>ID:</strong> ${selectedProduct.id}</p>
          <p><strong>Name:</strong> ${selectedProduct.name}</p>
          <p><strong>Price:</strong> ${selectedProduct.price} ${selectedProduct.currency}</p>
        </div>

        <div class="resource-box">
          <h2>👤 Created Consumer</h2>
          <p><strong>ID:</strong> ${createdConsumer.id}</p>
          <p><strong>Name:</strong> ${createdConsumer.name}</p>
          <p><strong>Phone:</strong> ${createdConsumer.phone_number}</p>
          <p><strong>Email:</strong> ${createdConsumer.email || 'N/A'}</p>
        </div>

        <h2>Try Checkout</h2>
        <p><strong>Method 1:</strong> Using Checkout adapter (with query params)</p>
        <a href="${checkoutUrl1}" class="checkout-button">Checkout via Adapter</a>

        <p><strong>Method 2:</strong> Using SDK directly (pre-linked consumer)</p>
        <a href="${checkoutUrl2}" class="checkout-button secondary">Checkout via SDK</a>

        <h3>Method 1 URL:</h3>
        <pre>${checkoutUrl1}</pre>

        <h3>Method 2 Endpoint:</h3>
        <pre>${checkoutUrl2}</pre>

        <h3>How it works:</h3>
        <ol>
          <li>Existing products are fetched using <code>streamClient.listProducts()</code></li>
          <li>A consumer is created using <code>streamClient.createConsumer()</code></li>
          <li><strong>Method 1:</strong> Uses Checkout adapter with customerId query param</li>
          <li><strong>Method 2:</strong> Creates payment link directly with SDK</li>
        </ol>

        <h3>Webhook Events:</h3>
        <p>Configure webhook to: <code>http://localhost:3002/webhooks/stream</code></p>
      </body>
    </html>
  `);
});

// Start server
const PORT = 3002;

async function start() {
  try {
    // Fetch products and create consumer
    await fetchProducts();
    await createConsumer();

    // Start server
    app.listen(PORT, () => {
      console.log('\n╔═══════════════════════════════════════════════╗');
      console.log('║  Example 2: Fetch + Create + Checkout       ║');
      console.log('╚═══════════════════════════════════════════════╝\n');
      console.log(`🌍 Server running at: http://localhost:${PORT}`);
      console.log(`\n✨ Visit http://localhost:${PORT}/ to get started!`);
      console.log('\n');
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
