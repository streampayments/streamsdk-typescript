/**
 * Multiple Products Payment Link Example
 *
 * This example demonstrates how to create payment links with multiple products.
 * The SDK now supports:
 * - Single consumer (optional)
 * - Multiple products with individual quantities
 * - Smart resource matching (reuses existing products/consumers)
 */

import StreamSDK from '@streamsdk/typescript';

const apiKey = process.env.STREAM_API_KEY;
const baseUrl = process.env.STREAM_BASE_URL || 'https://stream-app-service.streampay.sa';

if (!apiKey) {
  console.error('Error: STREAM_API_KEY environment variable is required');
  console.error('Usage: STREAM_API_KEY=your_api_key node examples/multiple-products.mjs');
  process.exit(1);
}

const client = StreamSDK.init(apiKey, { baseUrl });

async function runExamples() {
  try {
    console.log('='.repeat(60));
    console.log('@streamsdk/typescript - Multiple Products Examples');
    console.log('='.repeat(60));

    // Example 1: Shopping cart with multiple products
    console.log('\n📦 Example 1: Shopping Cart with Multiple Products\n');
    const cart = await client.createSimplePaymentLink({
      name: 'Shopping Cart #12345',
      description: 'Multi-item order from online store',
      consumer: {
        name: 'Ahmed Ali',
        phone: '+966501234567',
        email: 'ahmed@example.com'
      },
      products: [
        {
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse',
          price: 89.99,
          quantity: 2
        },
        {
          name: 'USB-C Cable',
          description: '2m USB-C charging cable',
          price: 29.99,
          quantity: 3
        },
        {
          name: 'Laptop Stand',
          description: 'Adjustable aluminum laptop stand',
          price: 149.99,
          quantity: 1
        }
      ],
      currency: 'SAR',
      successRedirectUrl: 'https://example.com/order/success',
      failureRedirectUrl: 'https://example.com/order/failed'
    });

    console.log('✅ Shopping cart payment link created:');
    console.log('   Payment URL:', cart.paymentUrl);
    console.log('   Consumer ID:', cart.consumerId);
    console.log('   Product IDs:', cart.productIds);
    console.log('   Total Products:', cart.productIds.length);

    // Example 2: Event registration with multiple ticket types
    console.log('\n🎫 Example 2: Event Registration (Multiple Ticket Types)\n');
    const eventTickets = await client.createSimplePaymentLink({
      name: 'Tech Conference 2025 - Registration',
      description: 'Multiple ticket types for Tech Conference',
      consumer: {
        name: 'Fatima Hassan',
        email: 'fatima@example.com',
        phone: '+966509876543'
      },
      products: [
        {
          name: 'VIP Pass',
          description: 'Full access with VIP perks',
          price: 999.00,
          quantity: 1
        },
        {
          name: 'Workshop Ticket',
          description: 'Access to specific workshops',
          price: 299.00,
          quantity: 2
        }
      ],
      currency: 'SAR',
      maxNumberOfPayments: 1,
      successRedirectUrl: 'https://conference.com/tickets/confirmed'
    });

    console.log('✅ Event tickets payment link created:');
    console.log('   Payment URL:', eventTickets.paymentUrl);
    console.log('   Consumer ID:', eventTickets.consumerId);
    console.log('   Product IDs:', eventTickets.productIds);

    // Example 3: Using existing product IDs
    console.log('\n🔄 Example 3: Payment Link with Existing Product IDs\n');

    // First, create some products
    const product1 = await client.createProduct({
      name: 'Monthly Subscription',
      price: 99.99,
      type: 'RECURRING',
      is_one_time: false,
      recurring_interval: 'MONTHLY',
      recurring_interval_count: 1
    });

    const product2 = await client.createProduct({
      name: 'Setup Fee',
      price: 49.99,
      type: 'ONE_OFF',
      is_one_time: true,
      recurring_interval_count: 1
    });

    console.log('   Created products:', product1.id, product2.id);

    // Now create payment link using existing product IDs
    const subscription = await client.createSimplePaymentLink({
      name: 'Subscription + Setup',
      consumer: {
        email: 'customer@example.com',
        name: 'Mohammad Al-Saudi'
      },
      products: [
        { id: product1.id, quantity: 1 },
        { id: product2.id, quantity: 1 }
      ]
    });

    console.log('✅ Subscription payment link created:');
    console.log('   Payment URL:', subscription.paymentUrl);
    console.log('   Consumer ID:', subscription.consumerId);
    console.log('   Used existing product IDs:', subscription.productIds);

    // Example 4: Guest checkout (no consumer) with multiple products
    console.log('\n👤 Example 4: Guest Checkout (Multiple Products)\n');
    const guestOrder = await client.createSimplePaymentLink({
      name: 'Guest Order #98765',
      description: 'Order without pre-existing customer',
      products: [
        {
          name: 'Digital Course - React',
          price: 299.00,
          quantity: 1
        },
        {
          name: 'Digital Course - Node.js',
          price: 249.00,
          quantity: 1
        }
      ],
      currency: 'SAR',
      successRedirectUrl: 'https://example.com/downloads'
    });

    console.log('✅ Guest checkout payment link created:');
    console.log('   Payment URL:', guestOrder.paymentUrl);
    console.log('   Consumer ID:', guestOrder.consumerId || 'None (guest)');
    console.log('   Product IDs:', guestOrder.productIds);

    // Example 5: Backward compatibility - single product (old format still works)
    console.log('\n🔙 Example 5: Single Product (Backward Compatible)\n');
    const singleProduct = await client.createSimplePaymentLink({
      name: 'Single Item Purchase',
      amount: 199.99,
      consumer: {
        name: 'Sara Ibrahim',
        phone: '+966503456789'
      },
      product: {
        name: 'Premium Package',
        price: 199.99
      },
      quantity: 1,
      currency: 'SAR'
    });

    console.log('✅ Single product payment link created:');
    console.log('   Payment URL:', singleProduct.paymentUrl);
    console.log('   Consumer ID:', singleProduct.consumerId);
    console.log('   Product ID (legacy):', singleProduct.productId);
    console.log('   Product IDs (new):', singleProduct.productIds);

    console.log('\n' + '='.repeat(60));
    console.log('✨ All examples completed successfully!');
    console.log('='.repeat(60));

    console.log('\n📝 Key Features Demonstrated:');
    console.log('   ✅ Multiple products in a single payment link');
    console.log('   ✅ Individual quantities per product');
    console.log('   ✅ Smart consumer matching (reuses existing)');
    console.log('   ✅ Smart product matching (reuses existing)');
    console.log('   ✅ Using existing product IDs');
    console.log('   ✅ Guest checkout (no consumer)');
    console.log('   ✅ Backward compatibility with single product');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the examples
runExamples();
