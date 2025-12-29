# Payments

## Overview

### Available Operations

* [list](#list) - List Payments
* [get](#get) - Get Payment
* [refund](#refund) - Refund Payment

## list

List all payments for a specific invoice.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="List_Payments_api_v2_payments_get" method="get" path="/api/v2/payments" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.payments.list({
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    invoiceId: "ad4f42db-8d4a-4ac4-b3e9-cfe42d747e4c",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentsList } from "stream-sdk/funcs/paymentsList.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentsList(streamSDK, {
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    invoiceId: "ad4f42db-8d4a-4ac4-b3e9-cfe42d747e4c",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListPaymentsApiV2PaymentsGetRequest](../../models/operations/listpaymentsapiv2paymentsgetrequest.md)                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.ListPaymentsApiV2PaymentsGetSecurity](../../models/operations/listpaymentsapiv2paymentsgetsecurity.md)                                                             | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaymentListResponse](../../models/paymentlistresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## get

Retrieve detailed information about a specific payment by its ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_Payment_api_v2_payments__payment_id__get" method="get" path="/api/v2/payments/{payment_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.payments.get({
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    paymentId: "852175f4-11e6-4823-b1c4-1948d4844143",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentsGet } from "stream-sdk/funcs/paymentsGet.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentsGet(streamSDK, {
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    paymentId: "852175f4-11e6-4823-b1c4-1948d4844143",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetPaymentApiV2PaymentsPaymentIdGetRequest](../../models/operations/getpaymentapiv2paymentspaymentidgetrequest.md)                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetPaymentApiV2PaymentsPaymentIdGetSecurity](../../models/operations/getpaymentapiv2paymentspaymentidgetsecurity.md)                                               | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaymentResponse](../../models/paymentresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## refund

Process a refund for a payment.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Refund_Payment_api_v2_payments__payment_id__refund_post" method="post" path="/api/v2/payments/{payment_id}/refund" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.payments.refund({
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    paymentId: "b777c2d7-fa36-4137-8cf8-5eff650791f4",
    body: {
      refundReason: "REQUESTED_BY_CUSTOMER",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentsRefund } from "stream-sdk/funcs/paymentsRefund.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentsRefund(streamSDK, {
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    paymentId: "b777c2d7-fa36-4137-8cf8-5eff650791f4",
    body: {
      refundReason: "REQUESTED_BY_CUSTOMER",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentsRefund failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.RefundPaymentApiV2PaymentsPaymentIdRefundPostRequest](../../models/operations/refundpaymentapiv2paymentspaymentidrefundpostrequest.md)                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.RefundPaymentApiV2PaymentsPaymentIdRefundPostSecurity](../../models/operations/refundpaymentapiv2paymentspaymentidrefundpostsecurity.md)                           | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaymentResponse](../../models/paymentresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |