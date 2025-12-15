# Installation Guide

## Install from GitHub

```bash
npm install github:streampayments/streamsdk-typescript#v1.0.0
```

Or add to `package.json`:

```json
{
  "dependencies": {
    "@streamsdk/typescript": "github:streampayments/streamsdk-typescript#v1.0.0"
  }
}
```

## Usage

```typescript
import StreamSDK from '@streamsdk/typescript';

const client = StreamSDK.init(process.env.STREAM_API_KEY);

const consumer = await client.createConsumer({
  name: "Ahmad Ali",
  email: "john@example.com"
});
```

## Verification

```bash
cat > test-sdk.mjs << 'EOF'
import StreamSDK from '@streamsdk/typescript';
console.log('Stream SDK loaded:', typeof StreamSDK.init);
EOF

node test-sdk.mjs
```

Expected output: `Stream SDK loaded: function`

## Upgrading

```bash
npm install github:streampayments/streamsdk-typescript#latest
```

Or specific version:

```bash
npm install github:streampayments/streamsdk-typescript#v1.1.0
```

Check current version:

```bash
npm list @streamsdk/typescript
```

## Requirements

- Node.js 18 or higher
- npm or yarn

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
- **Issues**: https://github.com/streampayments/streamsdk-typescript/issues
