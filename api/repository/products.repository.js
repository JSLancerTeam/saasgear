import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';
import { insertPrice, priceColumns } from './prices.repository';

const TABLE = TABLES.products;

export const productColumns = {
  id: 'products.id',
  name: 'products.name',
  type: 'products.type',
  stripeId: 'products.stripe_id',
  createAt: 'products.created_at',
  updatedAt: 'products.updated_at',
};

export async function insertProduct(productData, priceDatas = []) {
  let t;
  try {
    t = await database.transaction();
    const [productId] = await database(TABLE).transacting(t).insert(productData);
    await insertPrice(priceDatas.map((priceItem) => ({
      ...priceItem,
      product_id: productId,
    })), t);
    await t.commit();
    return true;
  } catch (error) {
    if (t) t.rollback();
    return false;
  }
}

export function findProductByType(type) {
  return database(TABLE).where({ type }).first();
}

export function findProductInType(types) {
  return database(TABLE).whereIn('type', types);
}

export function findProductAndPriceByType(productType, priceType) {
  return database(TABLE)
    .join(TABLES.prices, productColumns.id, priceColumns.product_id)
    .select(productColumns, `${priceColumns.id} as price_id`, priceColumns.amount, `${priceColumns.type} as price_type`, `${priceColumns.stripeId} as price_stripe_id`)
    .where({ [productColumns.type]: productType, [priceColumns.type]: priceType })
    .first();
}
