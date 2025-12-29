# Invoices

## Overview

### Available Operations

* [get](#get) - Get Invoice
* [list](#list) - List Invoices

## get

Retrieve detailed information about a specific invoice by its ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_Invoice_api_v2_invoices__invoice_id__get" method="get" path="/api/v2/invoices/{invoice_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.invoices.get({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    invoiceId: "34ac51ea-e2e8-4e82-8723-2cc444e6eaec",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { invoicesGet } from "stream-sdk/funcs/invoicesGet.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await invoicesGet(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    invoiceId: "34ac51ea-e2e8-4e82-8723-2cc444e6eaec",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("invoicesGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetInvoiceApiV2InvoicesInvoiceIdGetRequest](../../models/operations/getinvoiceapiv2invoicesinvoiceidgetrequest.md)                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetInvoiceApiV2InvoicesInvoiceIdGetSecurity](../../models/operations/getinvoiceapiv2invoicesinvoiceidgetsecurity.md)                                               | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.InvoiceDetailed](../../models/invoicedetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## list

List all invoices with pagination, filtering, and sorting options.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="List_Invoices_api_v2_invoices_get" method="get" path="/api/v2/invoices" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.invoices.list({
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
import { invoicesList } from "stream-sdk/funcs/invoicesList.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await invoicesList(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    filters: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("invoicesList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListInvoicesApiV2InvoicesGetRequest](../../models/operations/listinvoicesapiv2invoicesgetrequest.md)                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.ListInvoicesApiV2InvoicesGetSecurity](../../models/operations/listinvoicesapiv2invoicesgetsecurity.md)                                                             | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ListResourceInvoiceListItem](../../models/listresourceinvoicelistitem.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |