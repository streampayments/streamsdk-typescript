# Installation Guide

## Install from GitHub

```bash
npm install github:streampayments/stream-sdk#v1.0.0
```

Or add to `package.json`:

```json
{
  "dependencies": {
    "@streampayments/stream-sdk": "github:streampayments/stream-sdk#v1.0.0"
  }
}
```

## Usage

```typescript
import StreamSDK from '@streampayments/stream-sdk';

const client = StreamSDK.init(process.env.STREAM_API_KEY);

const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com"
});
```

## Verification

After installation, verify the SDK works:

```bash
cat > test-sdk.mjs << 'EOF'
import StreamSDK from '@streampayments/stream-sdk';
console.log('Stream SDK loaded:', typeof StreamSDK.init);
EOF

node test-sdk.mjs
```

Expected output: `Stream SDK loaded: function`

## Upgrading

Update to the latest version:

```bash
npm install github:streampayments/stream-sdk#latest
```

Or specific version:

```bash
npm install github:streampayments/stream-sdk#v1.1.0
```

Check current version:

```bash
npm list @streampayments/stream-sdk
```

## Requirements

- Node.js 18 or higher
- npm or yarn

## Environment Variables

```bash
# Required
export STREAM_API_KEY="your-api-key"

# Optional: Override base URL
export STREAM_BASE_URL="https://staging.streampay.sa"
```

## CI/CD Setup

### GitHub Actions

```yaml
name: Test

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
        env:
          STREAM_API_KEY: ${{ secrets.STREAM_API_KEY }}
```

### GitLab CI

```yaml
test:
  image: node:18
  script:
    - npm install
    - npm test
  variables:
    STREAM_API_KEY: $STREAM_API_KEY
```

## Troubleshooting

### Import Error

Ensure you're using Node.js 18 or higher:

```bash
node --version
```

### Network Error

Check your internet connection and firewall settings.

### 401 Unauthorized

Verify your API key is correct and active.

## Support

- **Email**: support@streampay.sa
- **Developer**: ibtisam@streampay.sa
- **Issues**: https://github.com/streampayments/stream-sdk/issues
