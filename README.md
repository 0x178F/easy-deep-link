# Easy Deep Link

This package facilitates the creation of deep links that redirect users to a mobile app based on their device type (iOS or Android), redirect to app stores if the app is not installed, and provide a fallback URL for unsupported devices.

## Installation

Install the package using npm,yarn or pnpm:

```javascript
npm install easy-deep-link
```

## Usage

First, import the `deepLink` function from the package:

```javascript
import { deepLink } from 'easy-deep-link';
```

## Configuring Options

The `deepLink` function requires an options object to configure the URLs and optional HTML content.

| Option         | Type     | Description                                                |
|----------------|----------|------------------------------------------------------------|
| `urls`         | object   | An object containing the following properties:             |
| `iosApp`       | string   | The URL scheme for the iOS app.                            |
| `androidApp`   | string   | The URL scheme for the Android app.                        |
| `iosStore`     | string   | The URL for the iOS App Store.                             |
| `androidStore` | string   | The URL for the Google Play Store.                         |
| `fallback`     | string   | The fallback URL if the app and store URLs fail.           |
| `pageTitle`    | string   | The title of the generated HTML page. (optional)           |
| `headingText`  | string   | The heading text to be displayed on the generated HTML page. (optional) |

### Generating HTML
Here's an example configuration:

```javascript
const { deepLink } = require('easy-deep-link');

const options = {
  urls: {
    iosApp: 'your-ios-app-url',
    androidApp: 'your-android-app-url',
    iosStore: 'your-ios-store-url',
    androidStore: 'your-android-store-url',
    fallback: 'your-fallback-url'
  },
  pageTitle: 'Deep Link Redirect',
  headingText: 'Redirecting you to the app...'
};

const htmlContent = deepLink(options);

// Use the HTML content as needed, e.g., save it to a file or serve it via an HTTP server.
```

## Using with Express

Create a app file (e.g., app.js) and set up an endpoint to serve the deep link HTML:

```javascript
const express = require('express');
const { deepLink } = require('easy-deep-link');

const app = express();
const port = 3000;

app.get('/deep-link', (req, res) => {
  const options = {
    urls: {
      iosApp: 'your-ios-app-url',
      androidApp: 'your-android-app-url',
      iosStore: 'your-ios-store-url',
      androidStore: 'your-android-store-url',
      fallback: 'your-fallback-url'
    },
    pageTitle: 'Deep Link Redirect',
    headingText: 'Redirecting you to the app...'
  };

  const htmlContent = deepLink(options);
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Using with Fastify

Create a app file (e.g., app.js) and set up an endpoint to serve the deep link HTML:

```javascript
const fastify = require('fastify')({ logger: true });
const { deepLink } = require('easy-deep-link');

fastify.get('/deep-link', (request, reply) => {
  const options = {
    urls: {
      iosApp: 'your-ios-app-url',
      androidApp: 'your-android-app-url',
      iosStore: 'your-ios-store-url',
      androidStore: 'your-android-store-url',
      fallback: 'your-fallback-url'
    },
    pageTitle: 'Deep Link Redirect',
    headingText: 'Redirecting you to the app...'
  };

  const htmlContent = deepLink(options);
  reply.type('text/html').send(htmlContent);
});

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on ${address}`);
});
```
