# Roadie Cost Insights

Roadie exposes cost insights functionality based on schemas defined by the [FOCUS](https://focus.finops.org/) technical specification, which is an open standard for cloud cost, usage, and billing data across all major cloud service providers. The specification is managed by the FinOps Foundation, and defined together with the most used cloud providers like [AWS](https://www.forrester.com/blogs/aws-silent-nod-to-finops/), [Google](https://cloud.google.com/blog/topics/cost-management/working-with-finops-foundation-on-open-cloud-billing-data) and [Microsoft](https://azure.microsoft.com/en-us/blog/focus-a-new-specification-for-cloud-cost-transparency/).

## Demo Backend

This demo client contains an example _node.js_ _express_ server which exposes needed endpoints to configure your own Cost Insights backend, compatible to the Roadie Cost Insights.

### Endpoints

Within the [`routes/index.js`](./routes/index.js) file you can find slimmed down endpoints providing an example how the response payload should look like and what it should contain. 

The endpoints are the following:
* `/last-completed-billing-date`
  * The purpose of this item is to identify the end date for which data  is available. This can be identified by latest entry based on `ChargePeriod` on the FOCUS cost data.
* `/group-daily-cost/:group`
  * This returns cost data for **Cost Overview** section of the Cost Insights plugin
  * The return type of the data from this endpoint should be aggregated by day. The expected data shape is following the FOCUS schema  
  * The `group` parameter _can_ be further used to slim down the returnable results to identify cost overviews for single teams only
* `/product-insights/:product`
  * This returns cost data for **Products** section of the Cost Insights plugin
  * The return type of the data from this endpoint should be aggregated by day. The expected data shape is following the FOCUS schema  
  * The `product` _must_ be used to slim down the correct products and their costs that are wanted to be displayed on Roadie

### OpenAPI spec 

The OpenAPI spec for the endpoints, with correct expected data types, can be found from the file [openapi-schema.yaml](./openapi-schema.yaml).

### Best practices and developing this client further

For expediency, this demo backend is created using **`node.js`** which **is not the best environment to handle potentially large amounts of cost data** . It is likely preferable to create a solution using environments more suited handling _parquet_ files directly and capable of sorting, aggregating and managing big datasets. Alternatively data manipulation can be done on other environments more suited to it, like Google's BigQuery or AWS Athena.

This repository contains a sample dataset which is directly exposed through the demo endpoints without further modifications. In real world scenario the data is filtered down to expose only needed items (based on `product` configuration for example) and aggregated to expose only daily aggregates of the data, since that is the granularity that the Cost Insights plugin visualizes.

### Running the demo backend

1. Ensure you have `node.js` and `NPM` installed.
2. Install dependencies
   - Run `npm i` from the root of the repository
3. Start the server
   - Run `npm start`, the server will start on port `3333` 


## Obtaining cost data

Most cloud providers expose their cost data through their UI with an option to export the underlying rows either as parquet files into a blob storage or to another big data handling solution. These cloud provider specific cost data items can be converted in FOCUS schema compatible using _converters_ provided by the FOCUS working group. The providers can be found from a GitHub repository https://github.com/finopsfoundation/focus_converters, and they provide solutions for AWS, Azure, GCP as well as other providers.


## Additional information

* FOCUS specification open source repository: https://github.com/FinOps-Open-Cost-and-Usage-Spec/FOCUS_Spec
* The FinOps foundation: https://www.finops.org/
* FOCUS schema converters repository: https://github.com/finopsfoundation/focus_converters
* Roadie documentation for Cost Insights: https://roadie.io/docs/cost-insights/overview
