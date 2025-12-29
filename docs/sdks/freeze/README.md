# Subscriptions.Freeze

## Overview

### Available Operations

* [delete](#delete) - Delete Subscription Freeze

## delete

Remove a freeze period from a subscription.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Delete_Subscription_Freeze_api_v2_subscriptions__subscription_id__freeze__freeze_id__delete" method="delete" path="/api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.freeze.delete({
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    subscriptionId: "1fea6d4a-2626-46ad-b4df-40a9041a730c",
    freezeId: "e9ab8b18-9b85-4e4d-996c-da675ac1ad7a",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { subscriptionsFreezeDelete } from "stream-sdk/funcs/subscriptionsFreezeDelete.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsFreezeDelete(streamSDK, {
    xApiKey: process.env["STREAM_API_KEY"] ?? "",
  }, {
    subscriptionId: "1fea6d4a-2626-46ad-b4df-40a9041a730c",
    freezeId: "e9ab8b18-9b85-4e4d-996c-da675ac1ad7a",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsFreezeDelete failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                                                          | Type                                                                                                                                                                                                               | Required                                                                                                                                                                                                           | Description                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                                                          | [operations.DeleteSubscriptionFreezeApiV2SubscriptionsSubscriptionIdFreezeFreezeIdDeleteRequest](../../models/operations/deletesubscriptionfreezeapiv2subscriptionssubscriptionidfreezefreezeiddeleterequest.md)   | :heavy_check_mark:                                                                                                                                                                                                 | The request object to use for the request.                                                                                                                                                                         |
| `security`                                                                                                                                                                                                         | [operations.DeleteSubscriptionFreezeApiV2SubscriptionsSubscriptionIdFreezeFreezeIdDeleteSecurity](../../models/operations/deletesubscriptionfreezeapiv2subscriptionssubscriptionidfreezefreezeiddeletesecurity.md) | :heavy_check_mark:                                                                                                                                                                                                 | The security requirements to use for the request.                                                                                                                                                                  |
| `options`                                                                                                                                                                                                          | RequestOptions                                                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                                                                 | Used to set various options for making HTTP requests.                                                                                                                                                              |
| `options.fetchOptions`                                                                                                                                                                                             | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                                                            | :heavy_minus_sign:                                                                                                                                                                                                 | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.                                     |
| `options.retries`                                                                                                                                                                                                  | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                                                 | Enables retrying HTTP requests under certain failure conditions.                                                                                                                                                   |

### Response

**Promise\<[any](../../models/.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |