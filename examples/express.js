import express from 'express';
import StreamSDK from '@streampayments/stream-sdk';

const app = express();
app.use(express.json());

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

/**
 * Simple payment link creation
 * POST /api/create-payment
 *
 * Body: {
 *   name: "Order #1234",
 *   amount: 99.99,
 *   customerPhone: "+966501234567",
 *   customerName: "John Doe",
 *   productName: "Premium Subscription",
 *   description: "Monthly premium subscription"
 * }
 */
app.post('/api/create-payment', async (req, res) => {
  try {
    const { name, amount, customerPhone, customerName, productName, description } = req.body;

    const paymentData = {
      name: name || `Order ${Date.now()}`,
      description: description || 'Payment',
      amount,
      currency: 'SAR',
      product: {
        name: productName || 'Product',
        price: amount,
        currency: 'SAR'
      },
      successRedirectUrl: `${req.protocol}://${req.get('host')}/payment/success`,
      failureRedirectUrl: `${req.protocol}://${req.get('host')}/payment/failed`
    };

    // Add consumer only if both phone and name are provided (optional for guest checkout)
    if (customerPhone && customerName) {
      paymentData.consumer = {
        phone: customerPhone,
        name: customerName
      };
    }

    const result = await streamClient.createSimplePaymentLink(paymentData);

    const response = {
      success: true,
      paymentUrl: result.paymentUrl,
      productId: result.productId
    };

    // Only include consumerId if consumer was created
    if (result.consumerId) {
      response.consumerId = result.consumerId;
    }

    res.json(response);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create payment with existing product(s)
 * POST /api/create-payment-with-product
 *
 * Body: {
 *   name: "Order for Premium Package",
 *   productIds: ["prod_123", "prod_456"],  // Single or multiple products
 *   customerPhone: "+966501234567",
 *   customerName: "John Doe"
 * }
 */
app.post('/api/create-payment-with-product', async (req, res) => {
  try {
    const { name, productIds, customerPhone, customerName } = req.body;

    // Ensure productIds is an array
    const ids = Array.isArray(productIds) ? productIds : [productIds];

    // Fetch product details to calculate total amount
    const products = await Promise.all(
      ids.map(id => streamClient.getProduct(id))
    );

    // Calculate total amount from products
    const totalAmount = products.reduce((sum, product) => {
      return sum + parseFloat(String(product.price));
    }, 0);

    // For multiple products, use the advanced createPaymentLink method
    const linkData = {
      name: name || `Order ${Date.now()}`,
      items: ids.map(id => ({
        product_id: id,
        quantity: 1
      })),
      organization_consumer_id: null,
      coupons: [],
      success_redirect_url: `${req.protocol}://${req.get('host')}/payment/success`,
      failure_redirect_url: `${req.protocol}://${req.get('host')}/payment/failed`
    };

    // Add consumer if provided
    if (customerPhone) {
      // Find or create consumer
      const consumers = await streamClient.listConsumers({ page: 1, size: 100 });
      let consumer = consumers.data?.find(c => c.phone_number === customerPhone);

      if (!consumer && customerName) {
        consumer = await streamClient.createConsumer({
          phone_number: customerPhone,
          name: customerName
        });
      }

      if (consumer) {
        linkData.organization_consumer_id = consumer.id;
      }
    }

    const paymentLink = await streamClient.createPaymentLink(linkData);
    const paymentUrl = streamClient.getPaymentUrl(paymentLink);

    res.json({
      success: true,
      paymentUrl,
      totalAmount,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price
      }))
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create payment without consumer (guest checkout)
 * POST /api/create-guest-payment
 *
 * Body: {
 *   name: "Guest Order #5678",
 *   amount: 49.99,
 *   productName: "One-time Purchase",
 *   description: "Single item purchase"
 * }
 */
app.post('/api/create-guest-payment', async (req, res) => {
  try {
    const { name, amount, productName, description } = req.body;

    const result = await streamClient.createSimplePaymentLink({
      name: name || `Order ${Date.now()}`,
      description,
      amount,
      currency: 'SAR',
      product: {
        name: productName || 'Product',
        price: amount,
        currency: 'SAR'
      },
      successRedirectUrl: `${req.protocol}://${req.get('host')}/payment/success`,
      failureRedirectUrl: `${req.protocol}://${req.get('host')}/payment/failed`
      // No consumer - guest checkout (phone collected at checkout)
    });

    res.json({
      success: true,
      paymentUrl: result.paymentUrl
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create payment link with multiple products (shopping cart)
 * POST /api/create-cart-payment
 *
 * Body: {
 *   name: "Shopping Cart #5678",
 *   customerPhone: "+966501234567",
 *   customerName: "Jane Smith",
 *   products: [
 *     { name: "Product A", price: 50.00, quantity: 2 },
 *     { name: "Product B", price: 75.00, quantity: 1 }
 *   ]
 * }
 */
app.post('/api/create-cart-payment', async (req, res) => {
  try {
    const { name, customerPhone, customerName, products, description } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Products array is required and must not be empty'
      });
    }

    const paymentData = {
      name: name || `Cart ${Date.now()}`,
      description: description || 'Multi-product payment',
      products: products.map(p => ({
        name: p.name,
        price: p.price,
        quantity: p.quantity || 1,
        currency: p.currency || 'SAR'
      }))
    };

    // Add consumer only if both phone and name are provided (optional for guest checkout)
    if (customerPhone && customerName) {
      paymentData.consumer = {
        phone: customerPhone,
        name: customerName
      };
    }

    const result = await streamClient.createSimplePaymentLink(paymentData);

    const response = {
      success: true,
      paymentUrl: result.paymentUrl,
      productIds: result.productIds,
      totalProducts: result.productIds.length
    };

    // Only include consumerId if consumer was created
    if (result.consumerId) {
      response.consumerId = result.consumerId;
    }

    res.json(response);
  } catch (error) {
    console.error('Cart payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Success page
 */
app.get('/payment/success', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: green;">✓ Payment Successful</h1>
        <p>Thank you for your payment!</p>
      </body>
    </html>
  `);
});

/**
 * Failure page
 */
app.get('/payment/failed', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: red;">✗ Payment Failed</h1>
        <p>Your payment could not be processed. Please try again.</p>
      </body>
    </html>
  `);
});

/**
 * List all consumers
 */
app.get('/api/consumers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listConsumers({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * List all products
 */
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listProducts({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * List all payment links
 */
app.get('/api/payment-links', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listPaymentLinks({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StreamPay Express server running on port ${PORT}`);
  console.log(`\nTest the API:`);
  console.log(`\n1. Simple payment (creates new product):`);
  console.log(`curl -X POST http://localhost:${PORT}/api/create-payment \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"name": "Order #1234", "amount": 99.99, "customerPhone": "+966501234567", "customerName": "John Doe", "productName": "Premium Plan"}'`);
  console.log(`\n2. Payment with existing product(s):`);
  console.log(`curl -X POST http://localhost:${PORT}/api/create-payment-with-product \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"name": "Order #5678", "productIds": ["prod_123"], "customerPhone": "+966501234567"}'`);
});
