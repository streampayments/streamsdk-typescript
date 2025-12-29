# Consumers

## Overview

### Available Operations

* [create](#create) - Create Consumer
* [list](#list) - Get All Consumers
* [get](#get) - Get Consumer
* [update](#update) - Update Consumer
* [delete](#delete) - Delete Consumer

## create

Create a new consumer with contact information and payment details.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Create_Consumer_api_v2_consumers_post" method="post" path="/api/v2/consumers" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.consumers.create({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    name: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { consumersCreate } from "stream-sdk/funcs/consumersCreate.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await consumersCreate(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    name: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("consumersCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.ConsumerCreate](../../models/consumercreate.md)                                                                                                                        | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.CreateConsumerApiV2ConsumersPostSecurity](../../models/operations/createconsumerapiv2consumerspostsecurity.md)                                                     | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ConsumerResponse](../../models/consumerresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## list

List all consumers with pagination, filtering, and sorting options.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_All_Consumers_api_v2_consumers_get" method="get" path="/api/v2/consumers" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.consumers.list({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { consumersList } from "stream-sdk/funcs/consumersList.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await consumersList(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("consumersList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetAllConsumersApiV2ConsumersGetRequest](../../models/operations/getallconsumersapiv2consumersgetrequest.md)                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetAllConsumersApiV2ConsumersGetSecurity](../../models/operations/getallconsumersapiv2consumersgetsecurity.md)                                                     | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.ListResourceConsumerResponse](../../models/listresourceconsumerresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## get

Retrieve detailed information about a specific consumer by their ID.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Get_Consumer_api_v2_consumers__org_consumer_id__get" method="get" path="/api/v2/consumers/{org_consumer_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.consumers.get({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "7ece117e-96ea-4bc3-9f18-b46b61fb221e",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { consumersGet } from "stream-sdk/funcs/consumersGet.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await consumersGet(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "7ece117e-96ea-4bc3-9f18-b46b61fb221e",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("consumersGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetConsumerApiV2ConsumersOrgConsumerIdGetRequest](../../models/operations/getconsumerapiv2consumersorgconsumeridgetrequest.md)                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.GetConsumerApiV2ConsumersOrgConsumerIdGetSecurity](../../models/operations/getconsumerapiv2consumersorgconsumeridgetsecurity.md)                                   | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.BaseConsumerResponse](../../models/baseconsumerresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## update

Update consumer information such as contact details or payment methods.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Update_Consumer_api_v2_consumers__org_consumer_id__put" method="put" path="/api/v2/consumers/{org_consumer_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.consumers.update({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "feadbd65-8d4e-4c15-ab2c-b9c230c897b8",
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
import { consumersUpdate } from "stream-sdk/funcs/consumersUpdate.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await consumersUpdate(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "feadbd65-8d4e-4c15-ab2c-b9c230c897b8",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("consumersUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateConsumerApiV2ConsumersOrgConsumerIdPutRequest](../../models/operations/updateconsumerapiv2consumersorgconsumeridputrequest.md)                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.UpdateConsumerApiV2ConsumersOrgConsumerIdPutSecurity](../../models/operations/updateconsumerapiv2consumersorgconsumeridputsecurity.md)                             | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.BaseConsumerResponse](../../models/baseconsumerresponse.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |

## delete

Delete a consumer from the organization.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="Delete_Consumer_api_v2_consumers__org_consumer_id__delete" method="delete" path="/api/v2/consumers/{org_consumer_id}" -->
```typescript
import { StreamSDK } from "stream-sdk";

const streamSDK = new StreamSDK();

async function run() {
  const result = await streamSDK.consumers.delete({
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "c2dbe322-5511-4c22-9d4b-e8a06071a375",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { StreamSDKCore } from "stream-sdk/core.js";
import { consumersDelete } from "stream-sdk/funcs/consumersDelete.js";

// Use `StreamSDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const streamSDK = new StreamSDKCore();

async function run() {
  const res = await consumersDelete(streamSDK, {
    jwtBearer: process.env["STREAMSDK_JWT_BEARER"] ?? "",
  }, {
    orgConsumerId: "c2dbe322-5511-4c22-9d4b-e8a06071a375",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("consumersDelete failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteConsumerApiV2ConsumersOrgConsumerIdDeleteRequest](../../models/operations/deleteconsumerapiv2consumersorgconsumeriddeleterequest.md)                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `security`                                                                                                                                                                     | [operations.DeleteConsumerApiV2ConsumersOrgConsumerIdDeleteSecurity](../../models/operations/deleteconsumerapiv2consumersorgconsumeriddeletesecurity.md)                       | :heavy_check_mark:                                                                                                                                                             | The security requirements to use for the request.                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[any](../../models/.md)\>**

### Errors

| Error Type                   | Status Code                  | Content Type                 |
| ---------------------------- | ---------------------------- | ---------------------------- |
| errors.HTTPValidationError   | 422                          | application/json             |
| errors.StreamSDKDefaultError | 4XX, 5XX                     | \*/\*                        |