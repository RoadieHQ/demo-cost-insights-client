const express = require('express');
const bodyParser = require('body-parser');
const sampleData = require('../data/sampledata.json');

const router = express.Router();

router
  .use(bodyParser.json())
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
