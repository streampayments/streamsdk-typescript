import { Request, Response, NextFunction } from 'express';

/**
 * Configuration for the Checkout handler
 */
interface CheckoutConfig {
    /**
     * Stream API key for authentication
     */
    apiKey: string;
    /**
     * URL to redirect to after successful payment
     */
    successUrl: string;
    /**
     * URL to redirect to if payment fails or is cancelled
     */
    returnUrl?: string;
    /**
     * Base URL for Stream API (defaults to production)
     */
    baseUrl?: string;
    /**
     * Custom theme configuration (optional)
     */
    theme?: {
        primaryColor?: string;
        logoUrl?: string;
    };
}
/**
 * Query parameters for checkout
 */
interface CheckoutQuery {
    /**
     * Product ID(s) to include in checkout
     * Can be a single ID or comma-separated list
     */
    products?: string;
    /**
     * Customer ID (consumer ID in Stream)
     */
    customerId?: string;
    /**
     * Customer email
     */
    customerEmail?: string;
    /**
     * Customer name
     */
    customerName?: string;
    /**
     * Customer phone number
     */
    customerPhone?: string;
    /**
     * Additional metadata as URL-encoded JSON
     */
    metadata?: string;
}
/**
 * Configuration for the Webhook handler
 */
interface WebhookConfig {
    /**
     * Stream API key for authentication
     */
    apiKey: string;
    /**
     * Webhook secret for signature verification
     * Required for production use to verify webhook authenticity
     */
    webhookSecret?: string;
    /**
     * Payment Event Handlers
     */
    onPaymentSucceeded?: (data: any) => void | Promise<void>;
    onPaymentFailed?: (data: any) => void | Promise<void>;
    onPaymentCanceled?: (data: any) => void | Promise<void>;
    onPaymentRefunded?: (data: any) => void | Promise<void>;
    onPaymentMarkedAsPaid?: (data: any) => void | Promise<void>;
    /**
     * Invoice Event Handlers
     */
    onInvoiceCreated?: (data: any) => void | Promise<void>;
    onInvoiceSent?: (data: any) => void | Promise<void>;
    onInvoiceAccepted?: (data: any) => void | Promise<void>;
    onInvoiceRejected?: (data: any) => void | Promise<void>;
    onInvoiceCompleted?: (data: any) => void | Promise<void>;
    onInvoiceCanceled?: (data: any) => void | Promise<void>;
    onInvoiceUpdated?: (data: any) => void | Promise<void>;
    /**
     * Subscription Event Handlers
     */
    onSubscriptionCreated?: (data: any) => void | Promise<void>;
    onSubscriptionUpdated?: (data: any) => void | Promise<void>;
    onSubscriptionCanceled?: (data: any) => void | Promise<void>;
    /**
     * Catch-all handler for any webhook event
     * This handler is called for ALL events, including those with specific handlers
     */
    onWebhook?: (event: string, data: any) => void | Promise<void>;
}
/**
 * Express request with typed query params
 */
interface CheckoutRequest extends Request {
    query: CheckoutQuery & Record<string, any>;
}
/**
 * Webhook payload structure
 */
interface WebhookPayload {
    event_type: string;
    event?: string;
    entity_type?: string;
    entity_id?: string;
    status?: string;
    timestamp?: string;
    data: any;
}

/**
 * Creates an Express handler for Stream checkout flows
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { Checkout } from '@streampayments/stream-sdk/express';
 *
 * const app = express();
 *
 * app.get('/checkout', Checkout({
 *   apiKey: process.env.STREAM_API_KEY!,
 *   successUrl: 'https://myapp.com/success',
 *   returnUrl: 'https://myapp.com/cancel'
 * }));
 * ```
 *
 * Query parameters:
 * - products: Product ID(s), comma-separated for multiple
 * - customerId: Existing customer/consumer ID
 * - customerEmail: Customer email (for new customers)
 * - customerName: Customer name (for new customers)
 * - customerPhone: Customer phone (for new customers)
 * - metadata: URL-encoded JSON metadata
 */
declare function Checkout(config: CheckoutConfig): (req: CheckoutRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;

/**
 * Creates an Express handler for Stream webhooks
 *
 * @example
 * ```typescript
 * import express from 'express';
 * import { Webhooks } from '@streampayments/stream-sdk/express';
 *
 * const app = express();
 *
 * app.post('/webhooks/stream', express.json(), Webhooks({
 *   apiKey: process.env.STREAM_API_KEY!,
 *   webhookSecret: process.env.STREAM_WEBHOOK_SECRET,
 *   onPaymentSucceeded: async (data) => {
 *     console.log('Payment succeeded:', data);
 *     // Handle payment success
 *   },
 *   onInvoiceCreated: async (data) => {
 *     console.log('Invoice created:', data);
 *     // Handle invoice creation
 *   }
 * }));
 * ```
 */
declare function Webhooks(config: WebhookConfig): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;

export { Checkout, type CheckoutConfig, type CheckoutQuery, type CheckoutRequest, type WebhookConfig, type WebhookPayload, Webhooks };
