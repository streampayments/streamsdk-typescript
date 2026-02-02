#!/usr/bin/env node

/**
 * @streamsdk/typescript - Comprehensive CRUD Examples
 *
 * This example demonstrates complete CRUD (Create, Read, Update, Delete) operations
 * for all SDK resources: Consumers, Products, Coupons, Payment Links, Subscriptions,
 * Invoices, and Payments.
 *
 * Usage:
 *   export STREAM_API_KEY="your-api-key"
 *   node examples/comprehensive.mjs
 */

import StreamSDK from "@streamsdk/typescript";

// Initialize the SDK
const apiKey = process.env.STREAM_API_KEY;
if (!apiKey) {
  console.error("❌ Error: STREAM_API_KEY environment variable is not set");
  console.error("   Please set it with: export STREAM_API_KEY='your-api-key'");
  process.exit(1);
}

const client = StreamSDK.init(apiKey);

// ============================================================================
// CONSUMERS (Users) - Full CRUD
// ============================================================================

async function consumerExamples() {
  console.log("\n" + "=".repeat(70));
  console.log("👥 CONSUMERS (Users) - CRUD Operations");
  console.log("=".repeat(70));

  // CREATE
  console.log("\n📝 CREATE Consumer:");
  const consumer = await client.createConsumer({
    name: "Fatima Ahmed",
    phone_number: "+966501234567",
    email: "fatima.ahmed@example.com",
    preferred_language: "en",
    metadata: {
      source: "web_signup",
      customer_tier: "premium"
    }
  });
  console.log(`✅ Created consumer ID: ${consumer.id}`);
  console.log(`   Name: ${consumer.name}`);
  console.log(`   Email: ${consumer.email}`);
  console.log(`   Phone: ${consumer.phone_number}`);

  // READ (Get single)
  console.log("\n📖 READ Consumer by ID:");
  const fetchedConsumer = await client.getConsumer(consumer.id);
  console.log(`✅ Fetched consumer: ${fetchedConsumer.name}`);
  console.log(`   Status: ${fetchedConsumer.status || "ACTIVE"}`);
  console.log(`   Created: ${fetchedConsumer.created_at || "N/A"}`);

  // READ (List all with pagination)
  console.log("\n📋 LIST Consumers:");
  const consumersList = await client.listConsumers({
    page: 1,
    size: 10,
    sort: "created_at:desc"
  });
  console.log(`✅ Total consumers: ${consumersList.pagination.total_count}`);
  console.log(`   Current page: ${consumersList.pagination.page}`);
  console.log(`   Page size: ${consumersList.pagination.size}`);
  consumersList.data.slice(0, 3).forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name} (${c.email})`);
  });

  // UPDATE
  console.log("\n✏️  UPDATE Consumer:");
  const updatedConsumer = await client.updateConsumer(consumer.id, {
    name: "Fatima Ahmed",
    phone_number: "+966509876543",
    preferred_language: "ar",
    metadata: {
      source: "web_signup",
      customer_tier: "vip",
      updated_reason: "customer_request"
    }
  });
  console.log(`✅ Updated consumer: ${updatedConsumer.name}`);
  console.log(`   New phone: ${updatedConsumer.phone_number}`);
  console.log(`   New language: ${updatedConsumer.preferred_language}`);

  // DELETE (We'll delete at the end)
  console.log("\n🗑️  DELETE Consumer: (deferred to cleanup)");

  return consumer;
}

// ============================================================================
// PRODUCTS - Full CRUD
// ============================================================================

async function productExamples() {
  console.log("\n" + "=".repeat(70));
  console.log("📦 PRODUCTS - CRUD Operations");
  console.log("=".repeat(70));

  // CREATE
  console.log("\n📝 CREATE Product:");
  const product = await client.createProduct({
    name: "Premium Cloud Storage",
    description: "100GB cloud storage with advanced features",
    price: 149.99,
    type: "RECURRING",
    is_one_time: false,
    recurring_interval: "MONTHLY",
    recurring_interval_count: 1
  });
  console.log(`✅ Created product ID: ${product.id}`);
  console.log(`   Name: ${product.name}`);
  console.log(`   Price: ${product.price} SAR`);
  console.log(`   Type: ${product.type}`);

  // CREATE another product
  console.log("\n📝 CREATE Another Product:");
  const product2 = await client.createProduct({
    name: "Basic Plan",
    description: "Starter plan with essential features",
    price: 49.99,
    type: "RECURRING",
    is_one_time: false,
    recurring_interval: "MONTHLY",
    recurring_interval_count: 1
  });
  console.log(`✅ Created product ID: ${product2.id}`);

  // READ (Get single)
  console.log("\n📖 READ Product by ID:");
  const fetchedProduct = await client.getProduct(product.id);
  console.log(`✅ Fetched product: ${fetchedProduct.name}`);
  console.log(`   Description: ${fetchedProduct.description}`);
  console.log(`   Recurring: ${fetchedProduct.recurring || false}`);

  // READ (List all)
  console.log("\n📋 LIST Products:");
  const productsList = await client.listProducts({
    page: 1,
    size: 20,
    sort: "price:desc"
  });
  console.log(`✅ Total products: ${productsList.pagination.total_count}`);
  productsList.data.slice(0, 5).forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} - ${p.price} SAR`);
  });

  // UPDATE
  console.log("\n✏️  UPDATE Product:");
  const updatedProduct = await client.updateProduct(product.id, {
    name: "Premium Cloud Storage Pro",
    description: "200GB cloud storage with premium features - Limited offer!",
    price: 199.99,
    metadata: {
      category: "storage",
      features: "200GB, 2FA, encryption, priority_support",
      promotion: "winter_sale"
    }
  });
  console.log(`✅ Updated product: ${updatedProduct.name}`);
  console.log(`   New price: ${updatedProduct.price} SAR`);
  console.log(`   New description: ${updatedProduct.description}`);

  // DELETE (We'll delete at the end)
  console.log("\n🗑️  DELETE Product: (deferred to cleanup)");

  return { product, product2 };
}

// ============================================================================
// COUPONS - Full CRUD
// ============================================================================

async function couponExamples() {
  console.log("\n" + "=".repeat(70));
  console.log("🎟️  COUPONS - CRUD Operations");
  console.log("=".repeat(70));

  // CREATE - Percentage discount
  console.log("\n📝 CREATE Coupon (Percentage):");
  const percentageCoupon = await client.createCoupon({
    code: "WINTER25",
    discount_type: "PERCENTAGE",
    discount_value: 25,
    active: true,
    max_redemptions: 100,
    valid_from: new Date().toISOString(),
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    metadata: {
      campaign: "winter_sale_2024",
      target: "all_customers"
    }
  });
  console.log(`✅ Created coupon: ${percentageCoupon.code}`);
  console.log(`   Discount: ${percentageCoupon.discount_value}%`);
  console.log(`   Max redemptions: ${percentageCoupon.max_redemptions}`);

  // CREATE - Fixed amount discount
  console.log("\n📝 CREATE Coupon (Fixed Amount):");
  const fixedCoupon = await client.createCoupon({
    code: "SAVE50SAR",
    discount_type: "FIXED_AMOUNT",
    discount_value: 50,
    currency: "SAR",
    active: true,
    max_redemptions: 50,
    minimum_purchase_amount: 200
  });
  console.log(`✅ Created coupon: ${fixedCoupon.code}`);
  console.log(`   Discount: ${fixedCoupon.discount_value} ${fixedCoupon.currency || "SAR"}`);
  console.log(`   Min purchase: ${fixedCoupon.minimum_purchase_amount || 0}`);

  // READ (Get single)
  console.log("\n📖 READ Coupon by ID:");
  const fetchedCoupon = await client.getCoupon(percentageCoupon.id);
  console.log(`✅ Fetched coupon: ${fetchedCoupon.code}`);
  console.log(`   Type: ${fetchedCoupon.discount_type}`);
  console.log(`   Active: ${fetchedCoupon.active}`);
  console.log(`   Redemptions: ${fetchedCoupon.redemption_count || 0}/${fetchedCoupon.max_redemptions}`);

  // READ (List all)
  console.log("\n📋 LIST Coupons:");
  const couponsList = await client.listCoupons({
    page: 1,
    size: 10
  });
  console.log(`✅ Total coupons: ${couponsList.pagination.total_count}`);
  couponsList.data.forEach((c, i) => {
    const discount = c.discount_type === "PERCENTAGE"
      ? `${c.discount_value}%`
      : `${c.discount_value} ${c.currency || "SAR"}`;
    console.log(`   ${i + 1}. ${c.code} - ${discount} (${c.active ? "Active" : "Inactive"})`);
  });

  // UPDATE
  console.log("\n✏️  UPDATE Coupon:");
  const updatedCoupon = await client.updateCoupon(percentageCoupon.id, {
    discount_value: 30,
    max_redemptions: 200,
    metadata: {
      campaign: "winter_sale_2024_extended",
      target: "all_customers",
      updated: new Date().toISOString()
    }
  });
  console.log(`✅ Updated coupon: ${updatedCoupon.code}`);
  console.log(`   New discount: ${updatedCoupon.discount_value}%`);
  console.log(`   New max redemptions: ${updatedCoupon.max_redemptions}`);

  // DELETE (We'll delete at the end)
  console.log("\n🗑️  DELETE Coupon: (deferred to cleanup)");

  return { percentageCoupon, fixedCoupon };
}

// ============================================================================
// PAYMENT LINKS - Full CRUD
// ============================================================================

async function paymentLinkExamples(consumer, product, coupon) {
  console.log("\n" + "=".repeat(70));
  console.log("💳 PAYMENT LINKS - CRUD Operations");
  console.log("=".repeat(70));

  // CREATE - Simple payment link
  console.log("\n📝 CREATE Payment Link (Simple):");
  const simpleLink = await client.createLink({
    name: "Premium Subscription Payment",
    description: "Pay for your premium cloud storage subscription",
    productId: product.id,
    quantity: 1,
    consumerId: consumer.id,
    successRedirectUrl: "https://example.com/success",
    failureRedirectUrl: "https://example.com/failure"
  });
  console.log(`✅ Created payment link ID: ${simpleLink.id}`);
  console.log(`   Name: ${simpleLink.name}`);
  const simpleUrl = client.getPaymentUrl(simpleLink);
  if (simpleUrl) {
    console.log(`   URL: ${simpleUrl}`);
  }

  // CREATE - Payment link with coupon
  console.log("\n📝 CREATE Payment Link (with Coupon):");
  const discountedLink = await client.createLink({
    name: "Premium Subscription - Special Offer",
    description: "Premium subscription with winter discount",
    productId: product.id,
    quantity: 1,
    coupons: [coupon.code],
    consumerId: consumer.id,
    successRedirectUrl: "https://example.com/success?promo=winter",
    failureRedirectUrl: "https://example.com/failure",
    metadata: {
      campaign: "winter_sale",
      source: "email"
    }
  });
  console.log(`✅ Created payment link with coupon: ${discountedLink.id}`);
  console.log(`   Applied coupon: ${coupon.code}`);
  const discountUrl = client.getPaymentUrl(discountedLink);
  if (discountUrl) {
    console.log(`   URL: ${discountUrl}`);
  }

  // CREATE - Alternative method (createPaymentLink)
  console.log("\n📝 CREATE Payment Link (Alternative Method):");
  const altLink = await client.createPaymentLink({
    name: "Quick Payment",
    description: "One-time payment",
    productId: product.id,
    quantity: 1,
    consumerId: consumer.id
  });
  console.log(`✅ Created via createPaymentLink: ${altLink.id}`);

  // READ (Get single)
  console.log("\n📖 READ Payment Link by ID:");
  const fetchedLink = await client.getPaymentLink(simpleLink.id);
  console.log(`✅ Fetched payment link: ${fetchedLink.name}`);
  console.log(`   Status: ${fetchedLink.status || "ACTIVE"}`);
  console.log(`   Created: ${fetchedLink.created_at || "N/A"}`);

  // READ (List all)
  console.log("\n📋 LIST Payment Links:");
  const linksList = await client.listPaymentLinks({
    page: 1,
    size: 10,
    sort: "created_at:desc"
  });
  console.log(`✅ Total payment links: ${linksList.pagination.total_count}`);
  linksList.data.slice(0, 3).forEach((l, i) => {
    console.log(`   ${i + 1}. ${l.name} - ${l.status || "ACTIVE"}`);
  });

  // Note: Payment links typically don't have UPDATE endpoint
  console.log("\n⚠️  UPDATE Payment Link: Not supported (create new link instead)");

  // Note: Payment links typically don't have DELETE endpoint
  console.log("⚠️  DELETE Payment Link: Not supported (links expire automatically)");

  return { simpleLink, discountedLink };
}

// ============================================================================
// SUBSCRIPTIONS - Full Lifecycle
// ============================================================================

async function subscriptionExamples(consumer, product) {
  console.log("\n" + "=".repeat(70));
  console.log("🔄 SUBSCRIPTIONS - Full Lifecycle");
  console.log("=".repeat(70));

  console.log("\nℹ️  Note: Subscription creation requires payment method setup.");
  console.log("   The following examples show the API structure.\n");

  // Example structure for CREATE
  console.log("📝 CREATE Subscription (Example Structure):");
  console.log(`
  const subscription = await client.createSubscription({
    organization_consumer_id: "${consumer.id}",
    items: [{
      product_id: "${product.id}",
      quantity: 1
    }],
    billing_cycle: "MONTHLY",
    start_date: new Date().toISOString(),
    trial_days: 7,
    payment_method: {
      type: "CARD",
      // Payment method details here
    },
    metadata: {
      plan_type: "premium",
      source: "web"
    }
  });
  `);

  // List subscriptions (if any exist)
  console.log("📋 LIST Subscriptions:");
  try {
    const subscriptionsList = await client.listSubscriptions({
      page: 1,
      size: 10
    });
    console.log(`✅ Total subscriptions: ${subscriptionsList.pagination.total_count}`);

    if (subscriptionsList.data.length > 0) {
      subscriptionsList.data.slice(0, 3).forEach((s, i) => {
        console.log(`   ${i + 1}. ${s.id} - Status: ${s.status}`);
      });

      // If we have a subscription, show other operations
      const exampleSub = subscriptionsList.data[0];

      // READ (Get single)
      console.log("\n📖 READ Subscription by ID:");
      const fetchedSub = await client.getSubscription(exampleSub.id);
      console.log(`✅ Fetched subscription: ${fetchedSub.id}`);
      console.log(`   Status: ${fetchedSub.status}`);
      console.log(`   Billing cycle: ${fetchedSub.billing_cycle}`);

      // UPDATE example
      console.log("\n✏️  UPDATE Subscription (Example Structure):");
      console.log(`
  const updated = await client.updateSubscription("${exampleSub.id}", {
    items: [{
      product_id: "${product.id}",
      quantity: 2  // Increase quantity
    }],
    metadata: {
      updated_reason: "customer_upgrade"
    }
  });
      `);

      // FREEZE example
      console.log("\n❄️  FREEZE Subscription (Example Structure):");
      console.log(`
  const freeze = await client.freezeSubscription("${exampleSub.id}", {
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    reason: "CUSTOMER_REQUEST"
  });
      `);

      // UNFREEZE example
      console.log("🔥 UNFREEZE Subscription (Example Structure):");
      console.log(`
  const unfreeze = await client.unfreezeSubscription("${exampleSub.id}");
      `);

      // GET FREEZE example
      console.log("❄️  GET FREEZE Status (Example Structure):");
      console.log(`
  const freezeStatus = await client.getSubscriptionFreeze("${exampleSub.id}");
      `);

      // DELETE FREEZE example
      console.log("🗑️  DELETE FREEZE (Example Structure):");
      console.log(`
  await client.deleteSubscriptionFreeze("${exampleSub.id}");
      `);

      // CANCEL subscription
      console.log("🚫 CANCEL Subscription (Example Structure):");
      console.log(`
  await client.deleteSubscription("${exampleSub.id}");
      `);
    } else {
      console.log("   No subscriptions found");
    }
  } catch (error) {
    console.log(`⚠️  Could not list subscriptions: ${error.message}`);
  }
}

// ============================================================================
// INVOICES - Read Operations
// ============================================================================

async function invoiceExamples() {
  console.log("\n" + "=".repeat(70));
  console.log("🧾 INVOICES - Read Operations");
  console.log("=".repeat(70));

  console.log("\nℹ️  Note: Invoices are automatically generated by the system.");
  console.log("   Only read operations are available.\n");

  // LIST invoices
  console.log("📋 LIST Invoices:");
  try {
    const invoicesList = await client.listInvoices({
      page: 1,
      size: 10,
      sort: "created_at:desc"
    });
    console.log(`✅ Total invoices: ${invoicesList.pagination.total_count}`);

    if (invoicesList.data.length > 0) {
      invoicesList.data.slice(0, 5).forEach((inv, i) => {
        console.log(`   ${i + 1}. ${inv.id} - ${inv.status} - ${inv.total_amount} ${inv.currency}`);
      });

      // READ (Get single)
      const firstInvoice = invoicesList.data[0];
      console.log("\n📖 READ Invoice by ID:");
      const fetchedInvoice = await client.getInvoice(firstInvoice.id);
      console.log(`✅ Fetched invoice: ${fetchedInvoice.id}`);
      console.log(`   Status: ${fetchedInvoice.status}`);
      console.log(`   Amount: ${fetchedInvoice.total_amount} ${fetchedInvoice.currency}`);
      console.log(`   Due date: ${fetchedInvoice.due_date || "N/A"}`);
      console.log(`   Items: ${fetchedInvoice.items?.length || 0}`);
    } else {
      console.log("   No invoices found");
    }
  } catch (error) {
    console.log(`⚠️  Could not list invoices: ${error.message}`);
  }
}

// ============================================================================
// PAYMENTS - Read and Refund Operations
// ============================================================================

async function paymentExamples() {
  console.log("\n" + "=".repeat(70));
  console.log("💰 PAYMENTS - Read and Refund Operations");
  console.log("=".repeat(70));

  console.log("\nℹ️  Note: Payments are created when customers complete payment links.");
  console.log("   You can read and refund payments.\n");

  // LIST payments
  console.log("📋 LIST Payments:");
  try {
    const paymentsList = await client.listPayments();
    console.log(`✅ Total payments: ${paymentsList.data.length}`);

    if (paymentsList.data.length > 0) {
      paymentsList.data.slice(0, 5).forEach((pay, i) => {
        console.log(`   ${i + 1}. ${pay.id} - ${pay.status} - ${pay.amount} ${pay.currency}`);
      });

      // READ (Get single)
      const firstPayment = paymentsList.data[0];
      console.log("\n📖 READ Payment by ID:");
      const fetchedPayment = await client.getPayment(firstPayment.id);
      console.log(`✅ Fetched payment: ${fetchedPayment.id}`);
      console.log(`   Status: ${fetchedPayment.status}`);
      console.log(`   Amount: ${fetchedPayment.amount} ${fetchedPayment.currency}`);
      console.log(`   Method: ${fetchedPayment.payment_method || "N/A"}`);
      console.log(`   Created: ${fetchedPayment.created_at || "N/A"}`);

      // REFUND example (only if payment is successful)
      if (fetchedPayment.status === "COMPLETED" || fetchedPayment.status === "SUCCESS") {
        console.log("\n💸 REFUND Payment (Example Structure):");
        console.log(`
  const refund = await client.refundPayment("${fetchedPayment.id}", {
    amount: ${fetchedPayment.amount}, // Full or partial refund
    reason: "CUSTOMER_REQUEST",
    note: "Customer not satisfied with service"
  });
  console.log(\`✅ Refund processed: \${refund.id}\`);
        `);
        console.log("⚠️  Uncomment to actually process refund");
      } else {
        console.log(`\n⚠️  Cannot refund payment with status: ${fetchedPayment.status}`);
      }
    } else {
      console.log("   No payments found");
    }
  } catch (error) {
    console.log(`⚠️  Could not list payments: ${error.message}`);
  }
}

// ============================================================================
// CLEANUP - Delete created resources
// ============================================================================

async function cleanup(consumer, products, coupons) {
  console.log("\n" + "=".repeat(70));
  console.log("🧹 CLEANUP - Deleting Test Data");
  console.log("=".repeat(70));

  try {
    // Delete coupons
    if (coupons.percentageCoupon) {
      await client.deleteCoupon(coupons.percentageCoupon.id);
      console.log(`✅ Deleted coupon: ${coupons.percentageCoupon.code}`);
    }
    if (coupons.fixedCoupon) {
      await client.deleteCoupon(coupons.fixedCoupon.id);
      console.log(`✅ Deleted coupon: ${coupons.fixedCoupon.code}`);
    }

    // Delete products
    if (products.product) {
      await client.deleteProduct(products.product.id);
      console.log(`✅ Deleted product: ${products.product.name}`);
    }
    if (products.product2) {
      await client.deleteProduct(products.product2.id);
      console.log(`✅ Deleted product: ${products.product2.name}`);
    }

    // Delete consumer
    if (consumer) {
      await client.deleteConsumer(consumer.id);
      console.log(`✅ Deleted consumer: ${consumer.name}`);
    }

    console.log("\n✨ Cleanup completed successfully!");
  } catch (error) {
    console.error(`⚠️  Error during cleanup: ${error.message}`);
  }
}

// ============================================================================
// MAIN - Run all examples
// ============================================================================

async function main() {
  try {
    console.log("╔" + "═".repeat(68) + "╗");
    console.log("║" + " ".repeat(8) + "🚀 @streamsdk/typescript - Comprehensive Examples" + " ".repeat(8) + "║");
    console.log("╚" + "═".repeat(68) + "╝");

    // Run all examples
    const consumer = await consumerExamples();
    const products = await productExamples();
    const coupons = await couponExamples();

    await paymentLinkExamples(consumer, products.product, coupons.percentageCoupon);
    await subscriptionExamples(consumer, products.product);
    await invoiceExamples();
    await paymentExamples();

    // Cleanup
    await cleanup(consumer, products, coupons);

    console.log("\n" + "=".repeat(70));
    console.log("✨ All comprehensive examples completed successfully!");
    console.log("=".repeat(70));

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    if (error.requestId) {
      console.error(`   Request ID: ${error.requestId}`);
    }
    if (error.body) {
      console.error(`   Details:`, JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

// Run the examples
main();
