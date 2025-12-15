/**
 * Example 3: Comprehensive Webhook Testing
 *
 * This example demonstrates:
 * 1. Setting up all webhook event handlers
 * 2. Logging webhook events to console
 * 3. Testing webhook signature verification
 * 4. Simulating webhook payloads for testing
 *
 * Usage:
 * 1. export STREAM_API_KEY="your-api-key"
 * 2. export STREAM_WEBHOOK_SECRET="your-webhook-secret" (optional)
 * 3. node use-cases/03-webhook-testing.js
 * 4. Expose with ngrok: ngrok http 3003
 * 5. Configure Stream webhook to point to your ngrok URL
 */

import express from 'express';
import { Webhooks } from 'stream-sdk/express';

const app = express();
app.use(express.json());

// Store webhook events for display
const webhookLog = [];
const MAX_LOG_SIZE = 50;

function logWebhookEvent(event, data, extraInfo = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    data,
    ...extraInfo
  };

  webhookLog.unshift(logEntry);
  if (webhookLog.length > MAX_LOG_SIZE) {
    webhookLog.pop();
  }
}

// Setup comprehensive webhook handler
app.post('/webhooks/stream', Webhooks({
  apiKey: process.env.STREAM_API_KEY,
  webhookSecret: process.env.STREAM_WEBHOOK_SECRET,

  // Payment Events
  onPaymentSucceeded: async (data) => {
    console.log('\n💰 PAYMENT SUCCEEDED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Entity ID:', data.entity_id);
    console.log('Status:', data.status);
    console.log('Timestamp:', data.timestamp);
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    logWebhookEvent('PAYMENT_SUCCEEDED', data, {
      entityId: data.entity_id,
      status: data.status
    });
  },

  onPaymentFailed: async (data) => {
    console.log('\n❌ PAYMENT FAILED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Entity ID:', data.entity_id);
    console.log('Status:', data.status);
    console.log('Reason:', data.failure_reason || 'Unknown');
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    logWebhookEvent('PAYMENT_FAILED', data, {
      entityId: data.entity_id,
      reason: data.failure_reason
    });
  },

  onPaymentCanceled: async (data) => {
    console.log('\n🚫 PAYMENT CANCELED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('PAYMENT_CANCELED', data);
  },

  onPaymentRefunded: async (data) => {
    console.log('\n💸 PAYMENT REFUNDED');
    console.log('Entity ID:', data.entity_id);
    console.log('Refund Amount:', data.refund_amount);
    logWebhookEvent('PAYMENT_REFUNDED', data);
  },

  onPaymentMarkedAsPaid: async (data) => {
    console.log('\n✅ PAYMENT MARKED AS PAID');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('PAYMENT_MARKED_AS_PAID', data);
  },

  // Invoice Events
  onInvoiceCreated: async (data) => {
    console.log('\n📄 INVOICE CREATED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Entity ID:', data.entity_id);
    console.log('Status:', data.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    logWebhookEvent('INVOICE_CREATED', data, {
      entityId: data.entity_id
    });
  },

  onInvoiceSent: async (data) => {
    console.log('\n📧 INVOICE SENT');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_SENT', data);
  },

  onInvoiceAccepted: async (data) => {
    console.log('\n✅ INVOICE ACCEPTED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_ACCEPTED', data);
  },

  onInvoiceRejected: async (data) => {
    console.log('\n❌ INVOICE REJECTED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_REJECTED', data);
  },

  onInvoiceCompleted: async (data) => {
    console.log('\n✅ INVOICE COMPLETED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_COMPLETED', data);
  },

  onInvoiceCanceled: async (data) => {
    console.log('\n🚫 INVOICE CANCELED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_CANCELED', data);
  },

  onInvoiceUpdated: async (data) => {
    console.log('\n🔄 INVOICE UPDATED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('INVOICE_UPDATED', data);
  },

  // Subscription Events
  onSubscriptionCreated: async (data) => {
    console.log('\n🔄 SUBSCRIPTION CREATED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Entity ID:', data.entity_id);
    console.log('Status:', data.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    logWebhookEvent('SUBSCRIPTION_CREATED', data, {
      entityId: data.entity_id
    });
  },

  onSubscriptionUpdated: async (data) => {
    console.log('\n🔄 SUBSCRIPTION UPDATED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('SUBSCRIPTION_UPDATED', data);
  },

  onSubscriptionCanceled: async (data) => {
    console.log('\n🚫 SUBSCRIPTION CANCELED');
    console.log('Entity ID:', data.entity_id);
    logWebhookEvent('SUBSCRIPTION_CANCELED', data);
  },

  // Catch-all handler
  onWebhook: async (event, data) => {
    console.log(`\n📬 WEBHOOK EVENT: ${event}`);
    console.log('Received at:', new Date().toISOString());

    // If event wasn't handled by specific handler, log it
    if (!event.startsWith('PAYMENT_') && !event.startsWith('INVOICE_') && !event.startsWith('SUBSCRIPTION_')) {
      logWebhookEvent(event, data);
    }
  }
}));

// Test endpoint to simulate webhook (for local testing)
app.post('/webhooks/test', (req, res) => {
  console.log('\n🧪 TEST WEBHOOK RECEIVED');
  console.log('Body:', JSON.stringify(req.body, null, 2));

  logWebhookEvent('TEST_EVENT', req.body, {
    source: 'Manual Test'
  });

  res.json({ success: true, message: 'Test webhook received' });
});

// Dashboard to view webhook logs
app.get('/', (req, res) => {
  const webhookUrl = process.env.NGROK_URL
    ? `${process.env.NGROK_URL}/webhooks/stream`
    : 'http://localhost:3003/webhooks/stream (Use ngrok to expose)';

  const logHtml = webhookLog.length === 0
    ? '<p style="text-align: center; color: #94a3b8;">No webhooks received yet. Waiting for events...</p>'
    : webhookLog.map(log => `
        <div class="log-entry ${log.event.toLowerCase()}">
          <div class="log-header">
            <span class="event-badge">${log.event}</span>
            <span class="timestamp">${new Date(log.timestamp).toLocaleString()}</span>
          </div>
          <div class="log-details">
            ${log.entityId ? `<p><strong>Entity ID:</strong> ${log.entityId}</p>` : ''}
            ${log.status ? `<p><strong>Status:</strong> ${log.status}</p>` : ''}
            ${log.reason ? `<p><strong>Reason:</strong> ${log.reason}</p>` : ''}
          </div>
          <details>
            <summary>View Full Payload</summary>
            <pre>${JSON.stringify(log.data, null, 2)}</pre>
          </details>
        </div>
      `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Webhook Testing Dashboard</title>
        <meta http-equiv="refresh" content="5">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; }
          .header { background: #1e293b; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
          .header h1 { color: #3b82f6; margin-bottom: 10px; }
          .webhook-url { background: #334155; padding: 15px; border-radius: 8px; margin-top: 15px; }
          .webhook-url code { color: #60a5fa; word-break: break-all; }
          .container { max-width: 1200px; margin: 0 auto; padding: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #1e293b; padding: 20px; border-radius: 12px; text-align: center; border-left: 4px solid #3b82f6; }
          .stat-card h3 { color: #94a3b8; font-size: 14px; margin-bottom: 10px; }
          .stat-card .number { font-size: 36px; font-weight: bold; color: #60a5fa; }
          .log-container { background: #1e293b; border-radius: 12px; padding: 20px; max-height: 70vh; overflow-y: auto; }
          .log-entry { background: #334155; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #3b82f6; }
          .log-entry.payment_succeeded { border-left-color: #10b981; }
          .log-entry.payment_failed { border-left-color: #ef4444; }
          .log-entry.invoice_created { border-left-color: #f59e0b; }
          .log-entry.subscription_created { border-left-color: #8b5cf6; }
          .log-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
          .event-badge { background: #3b82f6; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; }
          .timestamp { color: #94a3b8; font-size: 14px; }
          .log-details { margin: 15px 0; }
          .log-details p { margin: 5px 0; color: #cbd5e1; }
          details { margin-top: 15px; cursor: pointer; }
          summary { color: #60a5fa; padding: 10px; background: #1e293b; border-radius: 6px; }
          summary:hover { background: #475569; }
          pre { background: #0f172a; padding: 15px; border-radius: 6px; overflow-x: auto; margin-top: 10px; font-size: 12px; color: #e2e8f0; }
          .test-button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 10px 10px 0 0; cursor: pointer; border: none; font-size: 14px; }
          .test-button:hover { background: #059669; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔔 Webhook Testing Dashboard</h1>
          <p>Real-time webhook event monitoring</p>
          <div class="webhook-url">
            <strong>Webhook URL:</strong><br>
            <code>${webhookUrl}</code>
          </div>
          <div style="margin-top: 15px;">
            <button class="test-button" onclick="sendTestWebhook()">Send Test Webhook</button>
            <button class="test-button" style="background: #ef4444;" onclick="location.reload()">Refresh Now</button>
          </div>
        </div>

        <div class="container">
          <div class="stats">
            <div class="stat-card">
              <h3>Total Events</h3>
              <div class="number">${webhookLog.length}</div>
            </div>
            <div class="stat-card">
              <h3>Payments</h3>
              <div class="number">${webhookLog.filter(l => l.event.startsWith('PAYMENT_')).length}</div>
            </div>
            <div class="stat-card">
              <h3>Invoices</h3>
              <div class="number">${webhookLog.filter(l => l.event.startsWith('INVOICE_')).length}</div>
            </div>
            <div class="stat-card">
              <h3>Subscriptions</h3>
              <div class="number">${webhookLog.filter(l => l.event.startsWith('SUBSCRIPTION_')).length}</div>
            </div>
          </div>

          <div class="log-container">
            <h2 style="margin-bottom: 20px; color: #60a5fa;">📋 Webhook Log (Auto-refreshes every 5s)</h2>
            ${logHtml}
          </div>
        </div>

        <script>
          function sendTestWebhook() {
            fetch('/webhooks/test', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event_type: 'TEST_EVENT',
                entity_type: 'test',
                entity_id: 'test_' + Date.now(),
                status: 'success',
                timestamp: new Date().toISOString(),
                data: {
                  message: 'This is a test webhook',
                  test: true
                }
              })
            }).then(() => setTimeout(() => location.reload(), 500));
          }
        </script>
      </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    webhookCount: webhookLog.length,
    webhookSecretConfigured: !!process.env.STREAM_WEBHOOK_SECRET
  });
});

// Start server
const PORT = 3003;

app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════════╗');
  console.log('║     Webhook Testing Dashboard               ║');
  console.log('╚═══════════════════════════════════════════════╝\n');
  console.log(`🌍 Dashboard: http://localhost:${PORT}/`);
  console.log(`🔔 Webhook endpoint: http://localhost:${PORT}/webhooks/stream`);
  console.log(`\n💡 Setup Instructions:`);
  console.log(`   1. Expose your local server:`);
  console.log(`      ngrok http ${PORT}`);
  console.log(`   2. Copy your ngrok URL`);
  console.log(`   3. Configure Stream webhook to point to:`);
  console.log(`      https://your-ngrok-url.ngrok.io/webhooks/stream`);
  console.log(`\n🔐 Webhook Signature: ${process.env.STREAM_WEBHOOK_SECRET ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`\n✨ Visit http://localhost:${PORT}/ to view the dashboard!`);
  console.log('\n');
});
