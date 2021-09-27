import Stripe from 'stripe';
import Sentry from '@sentry/node';
import { insertProduct, findProductInType } from '~/repository/products.repository';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2020-08-27',
});

const products = [
  { name: 'Starter', amount: 75 },
  { name: 'Professional', amount: 295 },
];

type Item = {
  name: string;
  amount: number;
}

type StripeProductData = {
  id?: string;
  name?: string;
  prices?: {
    id?: string;
    type?: Stripe.Price.Recurring.Interval;
  }[]
}

async function createProductItem(item: Item, dataStripe: StripeProductData[]): Promise<boolean> {
  const productStripe = dataStripe.find((pro) => pro.name === item.name);

  let productData = null;
  let priceData = [];
  if (productStripe) {
    productData = {
      name: item.name,
      type: item.name.toLowerCase(),
      stripe_id: productStripe.id,
    };
    priceData = [
      {
        amount: item.amount,
        type: 'monthly',
        stripe_id: productStripe.prices.find((pri) => pri.type === 'month').id,
      },
      {
        amount: item.amount * 9,
        type: 'yearly',
        stripe_id: productStripe.prices.find((pri) => pri.type === 'year').id,
      },
    ];
  } else {
    const product = await stripe.products.create({ name: item.name });
    if (!product) {
      return false;
    }

    const [priceMonth, priceYear] = await Promise.all([
      stripe.prices.create({
        unit_amount: item.amount * 100,
        currency: 'usd',
        recurring: { interval: 'month' },
        product: product.id,
      }),
      stripe.prices.create({
        unit_amount: item.amount * 9 * 100,
        currency: 'usd',
        recurring: { interval: 'year' },
        product: product.id,
      }),
    ]);

    if (!priceMonth || !priceYear) {
      return false;
    }

    productData = {
      name: item.name,
      type: item.name.toLowerCase(),
      stripe_id: product.id,
    };

    priceData = [
      {
        amount: item.amount,
        type: 'monthly',
        stripe_id: priceMonth.id,
      },
      {
        amount: item.amount * 9,
        type: 'yearly',
        stripe_id: priceYear.id,
      },
    ];
  }

  if (productData && priceData.length) {
    return insertProduct(productData, priceData);
  }

  return true;
}

async function getProductAndPriceStripe(pro: Stripe.Product): Promise<StripeProductData> {
  const { data: dataPrices } = await stripe.prices.list({ product: pro.id });
  const prices = dataPrices?.map((pri) => ({ id: pri.id, type: pri.recurring.interval }));
  return {
    id: pro.id,
    name: pro.name,
    prices,
  };
}

async function run(): Promise<true | boolean[]> {
  const { data: stripeProducts } = await stripe.products.list();
  let data: StripeProductData[] = [];
  if (stripeProducts.length) {
    data = await Promise.all(stripeProducts.map((pro) => getProductAndPriceStripe(pro)));
  }

  const productTypes = products.map((product) => product.name.toLowerCase());
  const listProducts = await findProductInType(productTypes);
  let newProducts = products;
  if (listProducts.length > 0) {
    const typesExist = listProducts.map((p) => p.type);
    newProducts = products.filter((product) => !typesExist.includes(product.name.toLowerCase()));
  }
  if (newProducts.length > 0) {
    return Promise.all(newProducts.map((productItem) => createProductItem(productItem, data)));
  }
  return true;
}

run().then(() => console.log('insert successfully')).then(() => process.exit()).catch((err) => Sentry.captureException(err));
