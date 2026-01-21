# Sample: Plaid Web integration

## Running the sample

To run this sample please perform the following steps.

### Preparation

- Create an API key in your Gr4vy dashboard and save it as `./private_key.pem`
- Create a configuration using `cp config.json.example` and fill in the following values
  - `id` - Your Gr4vy server ID, e.g. `example`.
  - `server` - The environment to use for processing, either `production` or `sandbox`
  - `paymentServiceId` - The ID of the payment service to use for processing the payment
- Install Node `v18` or above as well as the dependencies for this project
  - Run `npm install`
- Start the server with `npm run dev`

### Running on HTTPS

Next, it's possible to run the sample on HTTPs. We recommend using a free tool like [Ngrok](https://ngrok.com).

- Expose your site over HTTPs with `ngrok`
  - Run `ngrok http 3000`
  - This exposes your site on an Ngrok domain, for example `https://40be-88-97-18-163.ngrok.io`

## Checkout

Once loaded, you should see the Plaid UI. Next, checkout using the phone number and OTP code displayed at the bottom of the screen.