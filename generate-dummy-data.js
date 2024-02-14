const fs = require('fs');

/**
 * Applicable categories

 *  'AI and Machine Learning'
 *  'Analytics'
 *  'Application Integration'
 *  'Blockchain'
 *  'Business Applications'
 *  'Cloud Financial Management'
 *  'Compute'
 *  'Containers'
 *  'Databases'
 *  'Developer Tools'
 *  'End User Computing'
 *  'Identity'
 *  'Integration'
 *  'Internet of Things'
 *  'Machine Learning'
 *  'Management and Governance'
 *  'Media'
 *  'Migration'
 *  'Networking'
 *  'Robotics'
 *  'Satellite'
 *  'Security'
 *  'Storage'
 *  'Web'
 *  'Other'
 */

const skeletonShape = (date, service, category, amount, id) => ({
  AvailabilityZone: '',
  BillingAccountId: 123456789012,
  BillingCurrency: 'USD',
  BillingPeriodEnd: '2024-01-01 00:00:00.000',
  BillingPeriodStart: '2023-12-01 00:00:00.000',
  ChargeDescription: 'Description of the charge..',
  ChargeFrequency: 'Recurring',
  ChargePeriodEnd: `${date} 23:59:59.000`,
  ChargePeriodStart: `${date} 00:00:00.000`,
  InvoiceIssuer: 'Amazon Web Services EMEA SARL',
  ListUnitPrice: 1.11,
  PricingUnit: 'GB',
  Provider: 'AWS',
  Region: 'eu-west-1',
  ResourceId: `arn:aws:${service}:eu-west-1:123456789012:${id}`,
  ServiceName: service,
  SkuId: '123',
  UsageQuantity: 0,
  UsageUnit: 'GB',
  ServiceCategory: category,
  ChargeType: 'Usage',
  BilledCost: amount,
  ChargeSubcategory: 'On-Demand',
  CommitmentDiscountCategory: null,
  CommitmentDiscountId: null,
  CommitmentDiscountType: null,
  EffectiveCost: 0,
  ListCost: 0,
  PricingQuantity: null,
  SkuPriceId: 'FSEU4E6BRE95JTX8',
});

const services = [
  {
    service: 'rds',
    category: 'Databases',
  },
  {
    service: 'ec2',
    category: 'Compute',
  },
  {
    service: 'lambda',
    category: 'Compute',
  },
  {
    service: 'cloudwatch',
    category: 'Monitoring',
  },
  {
    service: 'xray',
    category: 'Monitoring',
  },
  {
    service: 'bedrock',
    category: 'AI and Machine Learning',
  },
  {
    service: 's3',
    category: 'Storage',
  },
];

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Array of dates from 2023-12-01 to 2023-12-31.
const dateRange = Array.from(
  { length: 31 },
  (_, i) => new Date(2023, 11, i + 1).toISOString().split('T')[0],
);

// Generate cost data for each service
const generateCostData = () => {
  const costData = [];
  services.forEach(({ service, category }) => {
    dateRange.forEach((date, idx) => {
      const amount = Math.round(getRandomArbitrary(1, 10)); // rounded the amount to nearest integer
      costData.push(
        skeletonShape(date, service, category, amount, `${service}_${idx}`),
      );
    });
  });
  return costData;
};

console.log('Generating cost data into: ./data/dummy-data.json');
fs.writeFileSync(
  './data/dummy-data.json',
  JSON.stringify(generateCostData(), null, 2),
);
