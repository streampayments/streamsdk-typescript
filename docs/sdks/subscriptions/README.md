# Subscriptions

## Overview

### Available Operations

* [get](#get) - Get Subscription
* [update](#update) - Update Subscription
* [list](#list) - List Subscriptions
* [create](#create) - Create Subscription
* [cancel](#cancel) - Cancel Subscription
* [freeze](#freeze) - Freeze Subscription
* [listFreezes](#listfreezes) - List Subscription Freezes
* [updateFreeze](#updatefreeze) - Update Subscription Freeze

## get

Retrieve detailed information about a specific subscription by its ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_Subscription_api_v2_subscriptions__subscription_id__get" method="get" path="/api/v2/subscriptions/{subscription_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.get({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "e0712d06-bf48-4d11-b03a-690f471633e5",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { subscriptionsGet } from "stream-sdk/funcs/subscriptionsGet.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsGet(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "e0712d06-bf48-4d11-b03a-690f471633e5",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetSubscriptionApiV2SubscriptionsSubscriptionIdGetRequest](../../models/operations/getsubscriptionapiv2subscriptionssubscriptionidgetrequest.md)                   | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetSubscriptionApiV2SubscriptionsSubscriptionIdGetSecurity](../../models/operations/getsubscriptionapiv2subscriptionssubscriptionidgetsecurity.md)                 | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SubscriptionDetailed](../../models/subscriptiondetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## update

Update subscription items, coupons, description, auto-cancel cycles, or payment methods.

**Important:** Updates take effect on the next invoice. Changes will not be applied to the current invoice.

While updating the subscription, you are only allowed to update:
- Items
- Coupons
- Description
- After how many cycles the subscription auto cancel
- Payment Methods Overrides

To change anything else, you will have to cancel and create a new subscription.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Update_Subscription_api_v2_subscriptions__subscription_id__put" method="put" path="/api/v2/subscriptions/{subscription_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.update({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "9146adfc-2851-4f4b-969d-7e5b7011ed49",
    body: {
      items: [
        {
          productId: "<value>",
          quantity: 87597,
        },
      ],
      coupons: [
        "<value 1>",
      ],
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
import { subscriptionsUpdate } from "stream-sdk/funcs/subscriptionsUpdate.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsUpdate(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "9146adfc-2851-4f4b-969d-7e5b7011ed49",
    body: {
      items: [
        {
          productId: "<value>",
          quantity: 87597,
        },
      ],
      coupons: [
        "<value 1>",
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateSubscriptionApiV2SubscriptionsSubscriptionIdPutRequest](../../models/operations/updatesubscriptionapiv2subscriptionssubscriptionidputrequest.md)             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.UpdateSubscriptionApiV2SubscriptionsSubscriptionIdPutSecurity](../../models/operations/updatesubscriptionapiv2subscriptionssubscriptionidputsecurity.md)           | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SubscriptionDetailed](../../models/subscriptiondetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## list

List all subscriptions with pagination, filtering, and sorting options.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="List_Subscriptions_api_v2_subscriptions_get" method="get" path="/api/v2/subscriptions" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.list({
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
import { subscriptionsList } from "stream-sdk/funcs/subscriptionsList.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsList(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    filters: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListSubscriptionsApiV2SubscriptionsGetRequest](../../models/operations/listsubscriptionsapiv2subscriptionsgetrequest.md)                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.ListSubscriptionsApiV2SubscriptionsGetSecurity](../../models/operations/listsubscriptionsapiv2subscriptionsgetsecurity.md)                                         | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ListResourceSubscriptionDetailed](../../models/listresourcesubscriptiondetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## create

Create a new subscription with items, coupons, and payment methods.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Create_Subscription_api_v2_subscriptions_post" method="post" path="/api/v2/subscriptions" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.create({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    items: [
      {
        productId: "<value>",
        quantity: 691182,
      },
    ],
    organizationConsumerId: "<value>",
    periodStart: new Date("2025-04-12T17:45:44.378Z"),
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { subscriptionsCreate } from "stream-sdk/funcs/subscriptionsCreate.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsCreate(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    items: [
      {
        productId: "<value>",
        quantity: 691182,
      },
    ],
    organizationConsumerId: "<value>",
    periodStart: new Date("2025-04-12T17:45:44.378Z"),
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.SubscriptionCreate](../../models/subscriptioncreate.md)                                                                                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.CreateSubscriptionApiV2SubscriptionsPostSecurity](../../models/operations/createsubscriptionapiv2subscriptionspostsecurity.md)                                     | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.SubscriptionDetailed](../../models/subscriptiondetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## cancel

Cancel a subscription and optionally handle related invoices.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Cancel_Subscription_api_v2_subscriptions__subscription_id__cancel_post" method="post" path="/api/v2/subscriptions/{subscription_id}/cancel" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.cancel({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "a9781421-b12f-46fc-8d28-8850f0b04508",
    body: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { subscriptionsCancel } from "stream-sdk/funcs/subscriptionsCancel.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsCancel(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "a9781421-b12f-46fc-8d28-8850f0b04508",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsCancel failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                          | Type                                                                                                                                                                               | Required                                                                                                                                                                           | Description                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                                                                                                                                                                          | [operations.CancelSubscriptionApiV2SubscriptionsSubscriptionIdCancelPostRequest](../../models/operations/cancelsubscriptionapiv2subscriptionssubscriptionidcancelpostrequest.md)   | :heavy_check_mark:                                                                                                                                                                 | The request object to use for the request.                                                                                                                                         |
| `security`                                                                                                                                                                         | [operations.CancelSubscriptionApiV2SubscriptionsSubscriptionIdCancelPostSecurity](../../models/operations/cancelsubscriptionapiv2subscriptionssubscriptionidcancelpostsecurity.md) | :heavy_check_mark:                                                                                                                                                                 | The security requirements to use for the request.                                                                                                                                  |
| `options`                                                                                                                                                                          | RequestOptions                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                                 | Used to set various options for making HTTP requests.                                                                                                                              |
| `options.fetchOptions`                                                                                                                                                             | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                            | :heavy_minus_sign:                                                                                                                                                                 | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.     |
| `options.retries`                                                                                                                                                                  | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                 | Enables retrying HTTP requests under certain failure conditions.                                                                                                                   |

### Response

**Promise\<[models.SubscriptionDetailed](../../models/subscriptiondetailed.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## freeze

Freeze a subscription to pause invoice generation for a specific period.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Freeze_Subscription_api_v2_subscriptions__subscription_id__freeze_post" method="post" path="/api/v2/subscriptions/{subscription_id}/freeze" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.freeze({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "3c939eaa-f4dd-47a0-82d3-607de6352145",
    body: {
      freezeStartDatetime: new Date("2023-02-11T15:24:27.408Z"),
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
import { subscriptionsFreeze } from "stream-sdk/funcs/subscriptionsFreeze.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsFreeze(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "3c939eaa-f4dd-47a0-82d3-607de6352145",
    body: {
      freezeStartDatetime: new Date("2023-02-11T15:24:27.408Z"),
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsFreeze failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                          | Type                                                                                                                                                                               | Required                                                                                                                                                                           | Description                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                                                                                                                                                                          | [operations.FreezeSubscriptionApiV2SubscriptionsSubscriptionIdFreezePostRequest](../../models/operations/freezesubscriptionapiv2subscriptionssubscriptionidfreezepostrequest.md)   | :heavy_check_mark:                                                                                                                                                                 | The request object to use for the request.                                                                                                                                         |
| `security`                                                                                                                                                                         | [operations.FreezeSubscriptionApiV2SubscriptionsSubscriptionIdFreezePostSecurity](../../models/operations/freezesubscriptionapiv2subscriptionssubscriptionidfreezepostsecurity.md) | :heavy_check_mark:                                                                                                                                                                 | The security requirements to use for the request.                                                                                                                                  |
| `options`                                                                                                                                                                          | RequestOptions                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                                 | Used to set various options for making HTTP requests.                                                                                                                              |
| `options.fetchOptions`                                                                                                                                                             | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                            | :heavy_minus_sign:                                                                                                                                                                 | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.     |
| `options.retries`                                                                                                                                                                  | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                 | Enables retrying HTTP requests under certain failure conditions.                                                                                                                   |

### Response

**Promise\<[models.FreezeSubscriptionBase](../../models/freezesubscriptionbase.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## listFreezes

List all freeze periods for a specific subscription.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="List_Subscription_Freezes_api_v2_subscriptions__subscription_id__freeze_get" method="get" path="/api/v2/subscriptions/{subscription_id}/freeze" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.listFreezes({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "4b9792a6-dad4-41d5-8e26-38a29c774f48",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { subscriptionsListFreezes } from "stream-sdk/funcs/subscriptionsListFreezes.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsListFreezes(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "4b9792a6-dad4-41d5-8e26-38a29c774f48",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsListFreezes failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                                  | Type                                                                                                                                                                                       | Required                                                                                                                                                                                   | Description                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                                  | [operations.ListSubscriptionFreezesApiV2SubscriptionsSubscriptionIdFreezeGetRequest](../../models/operations/listsubscriptionfreezesapiv2subscriptionssubscriptionidfreezegetrequest.md)   | :heavy_check_mark:                                                                                                                                                                         | The request object to use for the request.                                                                                                                                                 |
| `security`                                                                                                                                                                                 | [operations.ListSubscriptionFreezesApiV2SubscriptionsSubscriptionIdFreezeGetSecurity](../../models/operations/listsubscriptionfreezesapiv2subscriptionssubscriptionidfreezegetsecurity.md) | :heavy_check_mark:                                                                                                                                                                         | The security requirements to use for the request.                                                                                                                                          |
| `options`                                                                                                                                                                                  | RequestOptions                                                                                                                                                                             | :heavy_minus_sign:                                                                                                                                                                         | Used to set various options for making HTTP requests.                                                                                                                                      |
| `options.fetchOptions`                                                                                                                                                                     | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                                    | :heavy_minus_sign:                                                                                                                                                                         | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.             |
| `options.retries`                                                                                                                                                                          | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                              | :heavy_minus_sign:                                                                                                                                                                         | Enables retrying HTTP requests under certain failure conditions.                                                                                                                           |

### Response

**Promise\<[models.ListResourceFreezeSubscriptionBase](../../models/listresourcefreezesubscriptionbase.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## updateFreeze

Update an existing subscription freeze period.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Update_Subscription_Freeze_api_v2_subscriptions__subscription_id__freeze__freeze_id__put" method="put" path="/api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.subscriptions.updateFreeze({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "033c1a47-537e-4fb5-840f-7e845b73adc2",
    freezeId: "2827f92b-2fad-4922-bd87-dcb11eda1b00",
    body: {
      freezeStartDatetime: new Date("2025-07-18T14:36:20.223Z"),
      freezeEndDatetime: null,
      notes: "<value>",
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
import { subscriptionsUpdateFreeze } from "stream-sdk/funcs/subscriptionsUpdateFreeze.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await subscriptionsUpdateFreeze(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    subscriptionId: "033c1a47-537e-4fb5-840f-7e845b73adc2",
    freezeId: "2827f92b-2fad-4922-bd87-dcb11eda1b00",
    body: {
      freezeStartDatetime: new Date("2025-07-18T14:36:20.223Z"),
      freezeEndDatetime: null,
      notes: "<value>",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("subscriptionsUpdateFreeze failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                                                    | Type                                                                                                                                                                                                         | Required                                                                                                                                                                                                     | Description                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                                                    | [operations.UpdateSubscriptionFreezeApiV2SubscriptionsSubscriptionIdFreezeFreezeIdPutRequest](../../models/operations/updatesubscriptionfreezeapiv2subscriptionssubscriptionidfreezefreezeidputrequest.md)   | :heavy_check_mark:                                                                                                                                                                                           | The request object to use for the request.                                                                                                                                                                   |
| `security`                                                                                                                                                                                                   | [operations.UpdateSubscriptionFreezeApiV2SubscriptionsSubscriptionIdFreezeFreezeIdPutSecurity](../../models/operations/updatesubscriptionfreezeapiv2subscriptionssubscriptionidfreezefreezeidputsecurity.md) | :heavy_check_mark:                                                                                                                                                                                           | The security requirements to use for the request.                                                                                                                                                            |
| `options`                                                                                                                                                                                                    | RequestOptions                                                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                                                                           | Used to set various options for making HTTP requests.                                                                                                                                                        |
| `options.fetchOptions`                                                                                                                                                                                       | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                                                      | :heavy_minus_sign:                                                                                                                                                                                           | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed.                               |
| `options.retries`                                                                                                                                                                                            | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                                           | Enables retrying HTTP requests under certain failure conditions.                                                                                                                                             |

### Response

**Promise\<[models.FreezeSubscriptionBase](../../models/freezesubscriptionbase.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |