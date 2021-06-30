const express = require('express');
const dotenv = require('dotenv');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const app = express();
dotenv.config();

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_products';
const forwardingAddress = 'https://60321ddfd3c5.ngrok.io';

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET',
  );
  next();
}); */

app.get('/', (req, res) => {
  res.send('<h1>BAQ Longarm Intake Shopify App v1.0</h1>');
});

app.get('/shopify', (req, res) => {
  const { shop } = req.query;

  if (shop) {
    const state = nonce();
    const redirectUri = `${forwardingAddress}/shopify/callback`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Shop not recognized. Please use format ?shop=your-shopify-shop-name.myshopify.com');
  }
});

app.get('/shopify/callback', (req, res) => {
  const {
    shop, hmac, code, state,
  } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state.toString();
  console.log('state cookie', stateCookie);

  if (state !== stateCookie) {
    return res.status(403).send('Error: Request origin failed verification');
  }

  if (shop && hmac && code) {
    // const map = Object.assign({}, req.query);
    const map = { ...req.query };
    // eslint-disable-next-line dot-notation
    delete map['hmac'];
    const message = querystring.stringify(map);
    const generatedHash = crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex');

    if (generatedHash !== hmac) {
      return res.status(400).send('HMAC validation failed');
    }

    // return res.status(200).send('HMAC validated');
    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.access_token;
        const requestUrl = `https://${shop}/admin/products.json`;
        const requestHeader = {
          'X-Shopify-Access-Token': accessToken,
        };

        request.get(requestUrl, { headers: requestHeader })
          .then((response) => {
            res.end(response);
          })
          .catch((err) => {
            console.error(err);
            res.status(err.statusCode).send(err.error.error_description);
          });
        // res.status(200).send('Access token granted');
      })
      .catch((err) => {
        console.error(err);
        res.status(err.statusCode).send(err.error.error_description);
      });
  } else {
    return res.status(400).send('Invalid or missing parameters');
  }
});

module.exports = app;
