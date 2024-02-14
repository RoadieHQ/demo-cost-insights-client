const express = require('express');
const bodyParser = require('body-parser');
const sampleData = require('../data/dummy-data.json');

const router = express.Router();

const apiTimeout = 120 * 1000;
router
  .use(bodyParser.json())
  .use((req, res, next) => {
    // Set the timeout for all HTTP requests
    req.setTimeout(apiTimeout, () => {
      console.log('Failed to process request. Timed out.');
      let err = new Error('Request Timeout');
      err.status = 408;
      next(err);
    });
    // Set the server response timeout for all HTTP requests
    res.setTimeout(apiTimeout, () => {
      console.log('Failed to process request. Timed out.');
      let err = new Error('Service Unavailable');
      err.status = 503;
      next(err);
    });
    next();
  })
  .get('/last-completed-billing-date', function (req, res, next) {
    res.status(200).send({ lastCompletedBillingDate: '2023-12-12' });
  })
  .get('/group-daily-cost/:group', async (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.status(200).send({ groupDailyCost: sampleData });
  })
  .get('/product-insights/:product', async (req, res) => {
    const { product } = req.params;
    const { project } = req.query;
    console.log(req.query);
    console.log(req.params);
    res.status(200).send({ productInsights: sampleData });
  });

module.exports = router;
