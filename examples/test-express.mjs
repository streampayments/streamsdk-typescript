import StreamSDK from '@streampayments/stream-sdk';

const API_KEY = process.env.STREAM_API_KEY;
const BASE_URL = process.env.STREAM_BASE_URL || 'https://stream-app-service.streampay.sa';
const EXPRESS_SERVER = 'http://localhost:3000';

if (!API_KEY) {
  console.error('❌ Error: STREAM_API_KEY environment variable is required');
  console.log('\nUsage:');
  console.log('  export STREAM_API_KEY="your-api-key"');
  console.log('  npm run test:express');
  process.exit(1);
}

console.log('🚀 StreamPay Express.js Example Tester\n');
console.log(`API Base URL: ${BASE_URL}`);
console.log(`Express Server: ${EXPRESS_SERVER}\n`);

const client = StreamSDK.init(API_KEY, { baseUrl: BASE_URL });

// Helper function to make API calls to Express server
async function callExpressAPI(endpoint, data) {
  const response = await fetch(`${EXPRESS_SERVER}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.error || response.statusText}`);
  }

  return response.json();
}

// Test 1: Create a product first (for test 3)
console.log('📦 Step 1: Creating a test product...');
try {
  const product = await client.createProduct({
    name: 'Test Product',
    price: 199.99,
    currency: 'SAR',
    description: 'Product for Express.js testing',
    type: 'ONE_OFF'
  });
  console.log(`✅ Product created: ${product.id} - ${product.name} (${product.price} SAR)\n`);

  // Test 2: Simple payment with new consumer and product
  console.log('💳 Step 2: Testing /api/create-payment (creates new consumer and product)...');
  try {
    const result1 = await callExpressAPI('/api/create-payment', {
      name: 'Express Test Order #1',
      amount: 99.99,
      customerPhone: '+966501234567',
      customerName: 'Express Test User',
      productName: 'Express Test Product',
      description: 'Testing Express.js integration'
    });

    console.log('✅ Payment link created successfully!');
    console.log(`   Payment URL: ${result1.paymentUrl}`);
    console.log(`   Consumer ID: ${result1.consumerId}`);
    console.log(`   Product ID: ${result1.productId}\n`);
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
  }

  // Test 3: Payment with existing product
  console.log('🛍️  Step 3: Testing /api/create-payment-with-product (single product)...');
  try {
    const result2 = await callExpressAPI('/api/create-payment-with-product', {
      name: 'Express Test Order #2',
      productIds: [product.id],
      customerPhone: '+966501234568',
      customerName: 'Express Test User 2'
    });

    console.log('✅ Payment link created successfully!');
    console.log(`   Payment URL: ${result2.paymentUrl}`);
    console.log(`   Total Amount: ${result2.totalAmount} SAR`);
    console.log(`   Products: ${result2.products.length} item(s)\n`);
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
  }

  // Test 4: Create another product for multi-product test
  console.log('📦 Step 4: Creating second test product...');
  const product2 = await client.createProduct({
    name: 'Test Add-on',
    price: 49.99,
    currency: 'SAR',
    description: 'Add-on for testing',
    type: 'ONE_OFF'
  });
  console.log(`✅ Product created: ${product2.id} - ${product2.name} (${product2.price} SAR)\n`);

  // Test 5: Payment with multiple products
  console.log('🛒 Step 5: Testing /api/create-payment-with-product (multiple products)...');
  try {
    const result3 = await callExpressAPI('/api/create-payment-with-product', {
      name: 'Express Bundle Order #3',
      productIds: [product.id, product2.id],
      customerPhone: '+966501234569'
    });

    console.log('✅ Payment link created successfully!');
    console.log(`   Payment URL: ${result3.paymentUrl}`);
    console.log(`   Total Amount: ${result3.totalAmount} SAR`);
    console.log(`   Products:`);
    result3.products.forEach(p => {
      console.log(`     - ${p.name}: ${p.price} SAR`);
    });
    console.log();
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
  }

  // Test 6: Guest payment
  console.log('👤 Step 6: Testing /api/create-guest-payment (no consumer)...');
  try {
    const result4 = await callExpressAPI('/api/create-guest-payment', {
      name: 'Guest Order #4',
      amount: 29.99,
      productName: 'Guest Product',
      description: 'One-time guest purchase'
    });

    console.log('✅ Guest payment link created successfully!');
    console.log(`   Payment URL: ${result4.paymentUrl}\n`);
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
  }

  // Test 7: List resources
  console.log('📋 Step 7: Testing resource listing endpoints...');
  try {
    const consumersResp = await fetch(`${EXPRESS_SERVER}/api/consumers?page=1&size=5`);
    const consumers = await consumersResp.json();
    console.log(`✅ Consumers endpoint: ${consumers.data?.length || 0} consumers found`);

    const productsResp = await fetch(`${EXPRESS_SERVER}/api/products?page=1&size=5`);
    const products = await productsResp.json();
    console.log(`✅ Products endpoint: ${products.data?.length || 0} products found`);

    const linksResp = await fetch(`${EXPRESS_SERVER}/api/payment-links?page=1&size=5`);
    const links = await linksResp.json();
    console.log(`✅ Payment links endpoint: ${links.data?.length || 0} links found\n`);
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
  }

  console.log('✨ All tests completed!\n');
  console.log('💡 Test the payment URLs in your browser to complete the flow.');
  console.log('   Or visit: http://localhost:3000/payment/success');

} catch (error) {
  console.error('❌ Setup Error:', error.message);
  console.log('\n💡 Make sure the Express server is running:');
  console.log('   Terminal 1: npm run express');
  console.log('   Terminal 2: npm run test:express');
  process.exit(1);
}
