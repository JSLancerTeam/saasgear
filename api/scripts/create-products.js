import Stripe from 'stripe';
import { insertProduct, findProductInType } from '~/repository/products.repository';

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const products = [
  { name: 'Starter', amount: 75 },
  { name: 'Professional', amount: 295 },
];

async function createProductItem(item) {
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

  const productData = {
    name: item.name,
    type: item.name.toLowerCase(),
    stripe_id: product.id,
  };

  const priceData = [
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

  return insertProduct(productData, priceData);
}

async function run() {
  const productTypes = products.map((product) => product.name.toLowerCase());
  const listProducts = await findProductInType(productTypes);
  let newProducts = products;
  if (listProducts.length > 0) {
    const typesExist = listProducts.map((p) => p.type);
    newProducts = products.filter((product) => !typesExist.includes(product.name.toLowerCase()));
  }
  if (newProducts.length > 0) {
    return Promise.all(newProducts.map((productItem) => createProductItem(productItem)));
  }
  return true;
}

run().then(() => console.log('insert successfully')).then(() => process.exit()).catch((err) => console.log(err));
