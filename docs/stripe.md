# [:credit_card: Stripe subscriptions](https://github.com/JSLancerTeam/saasgear/docs/stripe.md)
Subscription is the lifeblood for every SaaS. In SaaSgear, we use Stripe to handle subscription. In order to use Stripe, you need to have a Stripe account first and then copy and paste your Stripe API key to .env file. Follow this tutorial if you haven't done that.

## Create Stripe products and prices

In the plan table of SaaSgear, we have 3 example products: freemium, standard, and premium. While freemium is totally free, the prices of standard and premium are $12 and $24 per month. If customer selects a yearly plan, the price is discounted by 10%.

You can customize price and plan name for your own SaaS by editing the file **./api/scripts/create-products.json**

After that you need to run the command ***npm run stripe:make*** to create new Stripe products and prices. Stripe data is stored in stripe_products and stripe_prices tables.

## Stripe webhooks

The endpoint for Stripe webhooks is located at *http://api.saasgear.dev/stripe-webhooks*. Currently, this webhooks listens for these two events:

- Payment successful
- Payment failed

Upon receive Stripe notification, SaaSgear will send payment notification email to customer. Event data is stored in the **payment-events** table. You can edit the file ./api/routes/stripe-webhooks to listen to more Stripe events.
