import {
  StreamSDK
} from "../../chunk-LGWP24GS.js";

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
      const paymentLinkData = {
        name: `Checkout ${Date.now()}`,
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
import { createHmac, timingSafeEqual } from "crypto";
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
    const expectedSignature = createHmac("sha256", secret).update(signedPayload).digest("hex");
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch (error) {
    console.error("Webhook signature verification error:", error);
    return false;
  }
}
export {
  Checkout,
  Webhooks
};
//# sourceMappingURL=index.js.map