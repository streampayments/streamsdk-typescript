"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/adapters/express/index.ts
var express_exports = {};
__export(express_exports, {
  Checkout: () => Checkout,
  Webhooks: () => Webhooks
});
module.exports = __toCommonJS(express_exports);

// src/http.ts
var StreamSDKError = class extends Error {
  status;
  requestId;
  body;
  constructor(message, opts) {
    super(message);
    this.name = "StreamSDKError";
    this.status = opts.status;
    if (opts.requestId !== void 0) {
      this.requestId = opts.requestId;
    }
    if (opts.body !== void 0) {
      this.body = opts.body;
    }
  }
};
function joinUrl(baseUrl, path) {
  return `${baseUrl.replace(/\/+$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}
var HttpClient = class {
  baseUrl;
  fetchFn;
  userAgent;
  auth;
  constructor(opts) {
    this.baseUrl = opts.baseUrl;
    this.fetchFn = opts.fetchFn ?? fetch;
    this.userAgent = opts.userAgent ?? "stream-sdk/0.1.0";
    this.auth = opts.auth;
  }
  setAuth(auth) {
    this.auth = auth;
  }
  async request(opts) {
    const url = new URL(joinUrl(this.baseUrl, opts.path));
    if (opts.query) {
      for (const [k, v] of Object.entries(opts.query)) {
        if (v === void 0 || v === null) continue;
        url.searchParams.set(k, String(v));
      }
    }
    const headers = {
      "accept": "application/json",
      "content-type": "application/json",
      "user-agent": this.userAgent
    };
    if (this.auth.kind === "apiKey") {
      headers["x-api-key"] = this.auth.apiKey;
    } else if (this.auth.kind === "bearer") {
      headers["authorization"] = `Bearer ${this.auth.token}`;
    }
    const fetchOptions = {
      method: opts.method,
      headers
    };
    if (opts.body !== void 0) {
      fetchOptions.body = JSON.stringify(opts.body);
    }
    const res = await this.fetchFn(url.toString(), fetchOptions);
    const requestId = res.headers.get("x-request-id") ?? void 0;
    const text = await res.text();
    const maybeJson = text ? safeJsonParse(text) : void 0;
    if (!res.ok) {
      const msg = maybeJson && typeof maybeJson === "object" && maybeJson && "detail" in maybeJson && String(maybeJson.detail) || `HTTP ${res.status} calling ${opts.method} ${opts.path}`;
      const errorOpts = { status: res.status };
      if (requestId !== void 0) {
        errorOpts.requestId = requestId;
      }
      if (maybeJson !== void 0) {
        errorOpts.body = maybeJson;
      } else {
        errorOpts.body = text;
      }
      throw new StreamSDKError(msg, errorOpts);
    }
    return maybeJson ?? void 0;
  }
};
function safeJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return void 0;
  }
}

// src/sdk.ts
var DEFAULT_BASE_URL = "https://stream-app-service.streampay.sa";
var StreamSDK = class {
  static init(apiKey, opts = {}) {
    const auth = opts.bearerToken ? { kind: "bearer", token: opts.bearerToken } : apiKey ? { kind: "apiKey", apiKey } : { kind: "none" };
    const httpOptions = {
      baseUrl: opts.baseUrl ?? DEFAULT_BASE_URL,
      auth,
      userAgent: "stream-sdk/0.1.0"
    };
    if (opts.fetchFn !== void 0) {
      httpOptions.fetchFn = opts.fetchFn;
    }
    const http = new HttpClient(httpOptions);
    return new StreamClient(http);
  }
};
var StreamClient = class {
  constructor(http) {
    this.http = http;
  }
  /**
   * Helper to build request options with optional query params
   */
  buildGetRequest(path, query) {
    const opts = {
      method: "GET",
      path
    };
    if (query !== void 0) {
      opts.query = query;
    }
    return opts;
  }
  // ===========================
  // CONSUMERS
  // ===========================
  /**
   * Create a new consumer
   * POST /api/v2/consumers
   */
  createConsumer(input) {
    return this.http.request({
      method: "POST",
      path: "/api/v2/consumers",
      body: input
    });
  }
  /**
   * @deprecated Use createConsumer instead
   */
  createUser(input) {
    return this.createConsumer(input);
  }
  /**
   * List all consumers with pagination
   * GET /api/v2/consumers
   */
  listConsumers(params) {
    const opts = {
      method: "GET",
      path: "/api/v2/consumers"
    };
    if (params !== void 0) {
      opts.query = params;
    }
    return this.http.request(opts);
  }
  /**
   * Get a specific consumer by ID
   * GET /api/v2/consumers/{consumer_id}
   */
  getConsumer(consumerId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/consumers/${consumerId}`
    });
  }
  /**
   * Update a consumer
   * PUT /api/v2/consumers/{org_consumer_id}
   */
  updateConsumer(consumerId, input) {
    return this.http.request({
      method: "PUT",
      path: `/api/v2/consumers/${consumerId}`,
      body: input
    });
  }
  /**
   * Delete a consumer
   * DELETE /api/v2/consumers/{org_consumer_id}
   */
  deleteConsumer(consumerId) {
    return this.http.request({
      method: "DELETE",
      path: `/api/v2/consumers/${consumerId}`
    });
  }
  // ===========================
  // PRODUCTS
  // ===========================
  /**
   * Create a new product
   * POST /api/v2/products
   */
  createProduct(input) {
    return this.http.request({
      method: "POST",
      path: "/api/v2/products",
      body: input
    });
  }
  /**
   * List all products with pagination
   * GET /api/v2/products
   */
  listProducts(params) {
    return this.http.request(this.buildGetRequest("/api/v2/products", params));
  }
  /**
   * Get a specific product by ID
   * GET /api/v2/products/{product_id}
   */
  getProduct(productId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/products/${productId}`
    });
  }
  /**
   * Update a product
   * PUT /api/v2/products/{product_id}
   */
  updateProduct(productId, input) {
    return this.http.request({
      method: "PUT",
      path: `/api/v2/products/${productId}`,
      body: input
    });
  }
  /**
   * Delete a product
   * DELETE /api/v2/products/{product_id}
   */
  deleteProduct(productId) {
    return this.http.request({
      method: "DELETE",
      path: `/api/v2/products/${productId}`
    });
  }
  // ===========================
  // COUPONS
  // ===========================
  /**
   * Create a new coupon
   * POST /api/v2/coupons
   */
  createCoupon(input) {
    return this.http.request({
      method: "POST",
      path: "/api/v2/coupons",
      body: input
    });
  }
  /**
   * List all coupons with pagination
   * GET /api/v2/coupons
   */
  listCoupons(params) {
    return this.http.request(this.buildGetRequest("/api/v2/coupons", params));
  }
  /**
   * Get a specific coupon by ID
   * GET /api/v2/coupons/{coupon_id}
   */
  getCoupon(couponId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/coupons/${couponId}`
    });
  }
  /**
   * Update a coupon
   * PUT /api/v2/coupons/{coupon_id}
   */
  updateCoupon(couponId, input) {
    return this.http.request({
      method: "PUT",
      path: `/api/v2/coupons/${couponId}`,
      body: input
    });
  }
  /**
   * Delete a coupon
   * DELETE /api/v2/coupons/{coupon_id}
   */
  deleteCoupon(couponId) {
    return this.http.request({
      method: "DELETE",
      path: `/api/v2/coupons/${couponId}`
    });
  }
  // ===========================
  // INVOICES
  // ===========================
  /**
   * List all invoices with pagination
   * GET /api/v2/invoices
   */
  listInvoices(params) {
    return this.http.request(this.buildGetRequest("/api/v2/invoices", params));
  }
  /**
   * Get a specific invoice by ID
   * GET /api/v2/invoices/{invoice_id}
   */
  getInvoice(invoiceId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/invoices/${invoiceId}`
    });
  }
  // ===========================
  // PAYMENTS
  // ===========================
  /**
   * List all payments with optional invoice filter
   * GET /api/v2/payments
   */
  listPayments(params) {
    return this.http.request(this.buildGetRequest("/api/v2/payments", params));
  }
  /**
   * Get a specific payment by ID
   * GET /api/v2/payments/{payment_id}
   */
  getPayment(paymentId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/payments/${paymentId}`
    });
  }
  /**
   * Refund a payment
   * POST /api/v2/payments/{payment_id}/refund
   */
  refundPayment(paymentId, input) {
    return this.http.request({
      method: "POST",
      path: `/api/v2/payments/${paymentId}/refund`,
      body: input
    });
  }
  // ===========================
  // SUBSCRIPTIONS
  // ===========================
  /**
   * Create a new subscription
   * POST /api/v2/subscriptions
   */
  createSubscription(input) {
    return this.http.request({
      method: "POST",
      path: "/api/v2/subscriptions",
      body: input
    });
  }
  /**
   * List all subscriptions with pagination
   * GET /api/v2/subscriptions
   */
  listSubscriptions(params) {
    return this.http.request(this.buildGetRequest("/api/v2/subscriptions", params));
  }
  /**
   * Get a specific subscription by ID
   * GET /api/v2/subscriptions/{subscription_id}
   */
  getSubscription(subscriptionId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/subscriptions/${subscriptionId}`
    });
  }
  /**
   * Update a subscription
   * PUT /api/v2/subscriptions/{subscription_id}
   */
  updateSubscription(subscriptionId, input) {
    return this.http.request({
      method: "PUT",
      path: `/api/v2/subscriptions/${subscriptionId}`,
      body: input
    });
  }
  /**
   * Cancel a subscription
   * POST /api/v2/subscriptions/{subscription_id}/cancel
   */
  cancelSubscription(subscriptionId, input) {
    return this.http.request({
      method: "POST",
      path: `/api/v2/subscriptions/${subscriptionId}/cancel`,
      body: input
    });
  }
  /**
   * Freeze a subscription (pause invoice generation)
   * POST /api/v2/subscriptions/{subscription_id}/freeze
   */
  freezeSubscription(subscriptionId, input) {
    return this.http.request({
      method: "POST",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze`,
      body: input
    });
  }
  /**
   * List all freeze periods for a subscription
   * GET /api/v2/subscriptions/{subscription_id}/freeze
   */
  listSubscriptionFreezes(subscriptionId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze`
    });
  }
  /**
   * Update a subscription freeze period
   * PUT /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
   */
  updateSubscriptionFreeze(subscriptionId, freezeId, input) {
    return this.http.request({
      method: "PUT",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze/${freezeId}`,
      body: input
    });
  }
  /**
   * Delete a subscription freeze period
   * DELETE /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
   */
  deleteSubscriptionFreeze(subscriptionId, freezeId) {
    return this.http.request({
      method: "DELETE",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze/${freezeId}`
    });
  }
  // ===========================
  // PAYMENT LINKS
  // ===========================
  /**
   * Create a payment link (simplified interface)
   * POST /api/v2/payment_links
   */
  async createLink(input) {
    const dto = {
      name: input.name,
      description: input.description ?? null,
      // Required by schema: items[]
      items: [
        {
          // openapi types will enforce the correct keys; commonly it's product_id + quantity
          product_id: input.productId,
          quantity: input.quantity ?? 1
        }
      ],
      coupons: input.coupons ?? [],
      max_number_of_payments: input.maxNumberOfPayments ?? null,
      valid_until: toIsoOrNull(input.validUntil),
      success_redirect_url: input.successRedirectUrl ?? null,
      failure_redirect_url: input.failureRedirectUrl ?? null,
      organization_consumer_id: input.consumerId ?? null,
      custom_metadata: input.customMetadata ?? null,
      contact_information_type: input.contactInformationType ?? null
    };
    return this.http.request({
      method: "POST",
      path: "/api/v2/payment_links",
      body: dto
    });
  }
  /**
   * Create a payment link (full interface with raw DTO)
   * POST /api/v2/payment_links
   */
  createPaymentLink(input) {
    return this.http.request({
      method: "POST",
      path: "/api/v2/payment_links",
      body: input
    });
  }
  /**
   * List all payment links with pagination
   * GET /api/v2/payment_links
   */
  listPaymentLinks(params) {
    return this.http.request(this.buildGetRequest("/api/v2/payment_links", params));
  }
  /**
   * Get a specific payment link by ID
   * GET /api/v2/payment_links/{payment_link_id}
   */
  getPaymentLink(paymentLinkId) {
    return this.http.request({
      method: "GET",
      path: `/api/v2/payment_links/${paymentLinkId}`
    });
  }
  /**
   * SDK helper: returns a best-effort "pay URL" if the API returns one.
   * (Field name can vary; we keep it defensive.)
   */
  getPaymentUrl(link) {
    const anyLink = link;
    return anyLink?.payment_url ?? anyLink?.paymentUrl ?? anyLink?.url ?? anyLink?.link ?? anyLink?.redirect_url ?? anyLink?.checkout_url ?? null;
  }
  // ===========================
  // SIMPLIFIED PAYMENT LINK CREATION
  // ===========================
  /**
   * Simplified one-step payment link creation with smart resource matching.
   *
   * This method handles:
   * 1. Smart consumer matching: Searches for existing consumer by email/phone before creating
   * 2. Smart product matching: Searches for existing products by name and price before creating
   * 3. Creating payment link with the matched or newly created resources
   * 4. Returning payment URL directly
   *
   * Resource Matching:
   * - Consumer: Matched by phone (primary) or email (secondary) - Only ONE consumer per link
   * - Products: Matched by name AND price (both must match) - Supports MULTIPLE products
   * - Use `consumer.id` or `product.id` to skip matching and use specific resource
   * - Use `options.forceCreate: true` to always create new resources
   *
   * @example
   * ```typescript
   * // Single product (reuses existing consumer/product if found)
   * const result = await client.createSimplePaymentLink({
   *   name: "Order #1234",
   *   amount: 99.99,
   *   consumer: {
   *     email: "customer@example.com",
   *     name: "John Doe"
   *   },
   *   product: {
   *     name: "Premium Subscription",
   *     price: 99.99
   *   },
   *   successRedirectUrl: "https://example.com/success"
   * });
   *
   * // Multiple products
   * const result = await client.createSimplePaymentLink({
   *   name: "Shopping Cart #5678",
   *   consumer: {
   *     phone: "+966501234567",
   *     name: "Jane Smith"
   *   },
   *   products: [
   *     { name: "Product A", price: 50.00, quantity: 2 },
   *     { name: "Product B", price: 75.00, quantity: 1 }
   *   ],
   *   successRedirectUrl: "https://example.com/success"
   * });
   *
   * // Force creation of new resources
   * const result = await client.createSimplePaymentLink({
   *   name: "Order #1234",
   *   amount: 99.99,
   *   consumer: { email: "customer@example.com", name: "John Doe" },
   *   product: { name: "Premium Subscription", price: 99.99 },
   *   options: { forceCreate: true }
   * });
   *
   * // Use specific existing resources by ID
   * const result = await client.createSimplePaymentLink({
   *   name: "Order #1234",
   *   consumer: { id: "cons_123" },
   *   products: [
   *     { id: "prod_456", quantity: 1 },
   *     { id: "prod_789", quantity: 2 }
   *   ]
   * });
   * ```
   */
  async createSimplePaymentLink(input) {
    let consumerId;
    const productIds = [];
    const forceCreate = input.options?.forceCreate ?? false;
    if (input.consumer) {
      if (input.consumer.id) {
        consumerId = input.consumer.id;
      } else if (input.consumer.email || input.consumer.phone || input.consumer.name) {
        let existingConsumer = null;
        if (!forceCreate) {
          try {
            const consumers = await this.listConsumers({ page: 1, size: 100 });
            if (consumers.data && consumers.data.length > 0) {
              existingConsumer = consumers.data.find((c) => {
                if (input.consumer?.phone && c.phone_number === input.consumer.phone) {
                  return true;
                }
                if (input.consumer?.email && c.email === input.consumer.email) {
                  return true;
                }
                return false;
              }) || null;
            }
          } catch (error) {
          }
        }
        if (existingConsumer) {
          consumerId = existingConsumer.id;
        } else {
          const consumerData = {};
          if (input.consumer.name !== void 0) {
            consumerData.name = input.consumer.name;
          }
          if (input.consumer.email !== void 0) {
            consumerData.email = input.consumer.email;
          }
          if (input.consumer.phone !== void 0) {
            consumerData.phone_number = input.consumer.phone;
          }
          if (consumerData.name || consumerData.email || consumerData.phone_number) {
            const consumer = await this.createConsumer(consumerData);
            consumerId = consumer.id;
          }
        }
      }
    }
    const productsToProcess = input.products || (input.product ? [input.product] : []);
    if (productsToProcess.length === 0) {
      throw new Error("At least one product must be provided (via 'product' or 'products')");
    }
    for (const productInput of productsToProcess) {
      let productId;
      if (productInput.id) {
        productId = productInput.id;
      } else {
        const productName = productInput.name || input.name;
        const productPrice = productInput.price || input.amount;
        if (!productPrice) {
          throw new Error("Product price must be provided either in product object or as 'amount'");
        }
        let existingProduct = null;
        if (!forceCreate) {
          try {
            const products = await this.listProducts({ page: 1, size: 100 });
            if (products.data && products.data.length > 0) {
              existingProduct = products.data.find((p) => {
                const priceMatch = parseFloat(String(p.price)) === parseFloat(String(productPrice));
                const nameMatch = p.name === productName;
                return nameMatch && priceMatch;
              }) || null;
            }
          } catch (error) {
          }
        }
        if (existingProduct) {
          productId = existingProduct.id;
        } else {
          const productData = {
            name: productName,
            price: productPrice,
            type: "ONE_OFF",
            // Default to one-time purchase
            currency: productInput.currency || input.currency || "SAR"
            // Default to SAR
          };
          if (productInput.description !== void 0) {
            productData.description = productInput.description;
          }
          const product = await this.createProduct(productData);
          productId = product.id;
        }
      }
      productIds.push(productId);
    }
    const items = productsToProcess.map((productInput, index) => ({
      product_id: productIds[index],
      quantity: productInput.quantity || input.quantity || 1
    }));
    const linkData = {
      name: input.name,
      items,
      coupons: input.coupons ?? [],
      max_number_of_payments: input.maxNumberOfPayments ?? null,
      valid_until: toIsoOrNull(input.validUntil),
      success_redirect_url: input.successRedirectUrl ?? null,
      failure_redirect_url: input.failureRedirectUrl ?? null,
      organization_consumer_id: consumerId ?? null,
      custom_metadata: input.customMetadata ?? null,
      contact_information_type: input.contactInformationType ?? null
    };
    if (input.description !== void 0) {
      linkData.description = input.description;
    }
    const paymentLink = await this.http.request({
      method: "POST",
      path: "/api/v2/payment_links",
      body: linkData
    });
    const paymentUrl = this.getPaymentUrl(paymentLink);
    if (!paymentUrl) {
      throw new Error("Payment link created but no payment URL was returned from the API");
    }
    const response = {
      paymentLink,
      paymentUrl,
      productIds,
      productId: productIds[0],
      // First product for backward compatibility
      consumerId
    };
    return response;
  }
};
function toIsoOrNull(v) {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  return v;
}

// src/adapters/express/checkout.ts
function Checkout(config) {
  const initOptions = {};
  if (config.baseUrl) {
    initOptions.baseUrl = config.baseUrl;
  }
  const streamClient = StreamSDK.init(config.apiKey, initOptions);
  return async (req, res, next) => {
    try {
      const {
        products,
        name,
        customerId,
        customerEmail,
        customerName,
        customerPhone,
        metadata
      } = req.query;
      const productIds = products ? products.split(",").map((id) => id.trim()) : [];
      if (productIds.length === 0) {
        return res.status(400).json({
          error: "At least one product ID is required"
        });
      }
      const paymentLinkName = name || config.defaultName || `Checkout ${Date.now()}`;
      const paymentLinkData = {
        name: paymentLinkName,
        items: productIds.map((id) => ({
          product_id: id,
          quantity: 1
        })),
        success_redirect_url: config.successUrl,
        failure_redirect_url: config.returnUrl || config.successUrl,
        coupons: []
      };
      let consumerId = customerId;
      if (!consumerId && (customerPhone || customerEmail)) {
        if (customerPhone) {
          const consumers = await streamClient.listConsumers({ page: 1, size: 100 });
          const existingConsumer = consumers.data?.find((c) => c.phone_number === customerPhone);
          if (existingConsumer) {
            consumerId = existingConsumer.id;
          } else if (customerName) {
            const consumerData = {
              phone_number: customerPhone,
              name: customerName || "Customer"
            };
            if (customerEmail) {
              consumerData.email = customerEmail;
            }
            const newConsumer = await streamClient.createConsumer(consumerData);
            consumerId = newConsumer.id;
          }
        }
      }
      if (consumerId) {
        paymentLinkData.organization_consumer_id = consumerId;
      }
      if (metadata) {
        try {
          const parsedMetadata = JSON.parse(decodeURIComponent(metadata));
          paymentLinkData.metadata = parsedMetadata;
        } catch (e) {
        }
      }
      const paymentLink = await streamClient.createPaymentLink(paymentLinkData);
      const paymentUrl = streamClient.getPaymentUrl(paymentLink);
      if (!paymentUrl) {
        return res.status(500).json({
          error: "Failed to generate payment URL"
        });
      }
      res.redirect(paymentUrl);
    } catch (error) {
      next(error);
    }
  };
}

// src/adapters/express/webhooks.ts
var import_crypto = require("crypto");
function Webhooks(config) {
  return async (req, res, next) => {
    try {
      if (config.webhookSecret) {
        const signatureHeader = req.headers["x-webhook-signature"];
        if (!signatureHeader) {
          return res.status(401).json({
            error: "Missing webhook signature"
          });
        }
        const rawBody = JSON.stringify(req.body);
        const isValid = verifySignature(rawBody, signatureHeader, config.webhookSecret);
        if (!isValid) {
          return res.status(401).json({
            error: "Invalid webhook signature"
          });
        }
      }
      const payload = req.body;
      const eventType = payload.event_type || payload.event || "unknown";
      const data = payload.data || payload;
      switch (eventType) {
        // Payment Events
        case "PAYMENT_SUCCEEDED":
          if (config.onPaymentSucceeded) {
            await config.onPaymentSucceeded(data);
          }
          break;
        case "PAYMENT_FAILED":
          if (config.onPaymentFailed) {
            await config.onPaymentFailed(data);
          }
          break;
        case "PAYMENT_CANCELED":
          if (config.onPaymentCanceled) {
            await config.onPaymentCanceled(data);
          }
          break;
        case "PAYMENT_REFUNDED":
          if (config.onPaymentRefunded) {
            await config.onPaymentRefunded(data);
          }
          break;
        case "PAYMENT_MARKED_AS_PAID":
          if (config.onPaymentMarkedAsPaid) {
            await config.onPaymentMarkedAsPaid(data);
          }
          break;
        // Invoice Events
        case "INVOICE_CREATED":
          if (config.onInvoiceCreated) {
            await config.onInvoiceCreated(data);
          }
          break;
        case "INVOICE_SENT":
          if (config.onInvoiceSent) {
            await config.onInvoiceSent(data);
          }
          break;
        case "INVOICE_ACCEPTED":
          if (config.onInvoiceAccepted) {
            await config.onInvoiceAccepted(data);
          }
          break;
        case "INVOICE_REJECTED":
          if (config.onInvoiceRejected) {
            await config.onInvoiceRejected(data);
          }
          break;
        case "INVOICE_COMPLETED":
          if (config.onInvoiceCompleted) {
            await config.onInvoiceCompleted(data);
          }
          break;
        case "INVOICE_CANCELED":
          if (config.onInvoiceCanceled) {
            await config.onInvoiceCanceled(data);
          }
          break;
        case "INVOICE_UPDATED":
          if (config.onInvoiceUpdated) {
            await config.onInvoiceUpdated(data);
          }
          break;
        // Subscription Events
        case "SUBSCRIPTION_CREATED":
          if (config.onSubscriptionCreated) {
            await config.onSubscriptionCreated(data);
          }
          break;
        case "SUBSCRIPTION_UPDATED":
          if (config.onSubscriptionUpdated) {
            await config.onSubscriptionUpdated(data);
          }
          break;
        case "SUBSCRIPTION_CANCELED":
          if (config.onSubscriptionCanceled) {
            await config.onSubscriptionCanceled(data);
          }
          break;
        default:
          break;
      }
      if (config.onWebhook) {
        await config.onWebhook(eventType, data);
      }
      res.status(200).json({ received: true });
    } catch (error) {
      next(error);
    }
  };
}
function verifySignature(rawBody, signatureHeader, secret) {
  try {
    const parts = signatureHeader.split(",");
    const timestamp = parts.find((p) => p.startsWith("t="))?.substring(2);
    const signature = parts.find((p) => p.startsWith("v1="))?.substring(3);
    if (!timestamp || !signature) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1e3);
    const timeDiff = currentTime - parseInt(timestamp);
    if (timeDiff > 300) {
      console.warn("Webhook signature timestamp too old:", timeDiff, "seconds");
      return false;
    }
    const signedPayload = `${timestamp}.${rawBody}`;
    const expectedSignature = (0, import_crypto.createHmac)("sha256", secret).update(signedPayload).digest("hex");
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return (0, import_crypto.timingSafeEqual)(signatureBuffer, expectedBuffer);
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkout,
  Webhooks
});
//# sourceMappingURL=index.cjs.map