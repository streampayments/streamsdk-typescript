# PaymentLinks

## Overview

### Available Operations

* [get](#get) - Get Payment Link
* [create](#create) - Create Payment Link
* [list](#list) - List Payment Links

## get

Retrieve detailed information about a specific payment link by its ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_Payment_Link_api_v2_payment_links__payment_link_id__get" method="get" path="/api/v2/payment_links/{payment_link_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.paymentLinks.get({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    paymentLinkId: "4f0363ba-de89-46d3-b151-61eb67db9814",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentLinksGet } from "stream-sdk/funcs/paymentLinksGet.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentLinksGet(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    paymentLinkId: "4f0363ba-de89-46d3-b151-61eb67db9814",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentLinksGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetPaymentLinkApiV2PaymentLinksPaymentLinkIdGetRequest](../../models/operations/getpaymentlinkapiv2paymentlinkspaymentlinkidgetrequest.md)                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetPaymentLinkApiV2PaymentLinksPaymentLinkIdGetSecurity](../../models/operations/getpaymentlinkapiv2paymentlinkspaymentlinkidgetsecurity.md)                       | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaymentLinkDetailed](../../models/paymentlinkdetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## create

Create a new payment link for collecting payments.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Create_Payment_Link_api_v2_payment_links_post" method="post" path="/api/v2/payment_links" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.paymentLinks.create({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    name: "<value>",
    items: [],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentLinksCreate } from "stream-sdk/funcs/paymentLinksCreate.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentLinksCreate(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    name: "<value>",
    items: [],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentLinksCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.CreatePaymentLinkDto](../../models/createpaymentlinkdto.md)                                                                                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.CreatePaymentLinkApiV2PaymentLinksPostSecurity](../../models/operations/createpaymentlinkapiv2paymentlinkspostsecurity.md)                                         | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaymentLinkDetailed](../../models/paymentlinkdetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## list

List all payment links with pagination, filtering, and sorting options.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="List_Payment_Links_api_v2_payment_links_get" method="get" path="/api/v2/payment_links" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.paymentLinks.list({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    filters: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { paymentLinksList } from "stream-sdk/funcs/paymentLinksList.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await paymentLinksList(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    filters: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("paymentLinksList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListPaymentLinksApiV2PaymentLinksGetRequest](../../models/operations/listpaymentlinksapiv2paymentlinksgetrequest.md)                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.ListPaymentLinksApiV2PaymentLinksGetSecurity](../../models/operations/listpaymentlinksapiv2paymentlinksgetsecurity.md)                                             | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ListResourcePaymentLinkDetailed](../../models/listresourcepaymentlinkdetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |