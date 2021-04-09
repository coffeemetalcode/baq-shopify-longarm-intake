const express = require('express');
// const https = require('https');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use((req, res, next) => {
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
});

app.get('/', (req, res, next) => {
  res.send('<h1>BAQ Longarm Intake Shopify App v1.0</h1>');
});

module.exports = app;
