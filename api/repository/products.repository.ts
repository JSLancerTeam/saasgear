import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
import { insertPrice, priceColumns, Price } from './prices.repository';

export type ProductData = {
  id?: number;
  name?: string;
  type?: string;
  stripe_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type FindProductAndPriceByTypeResponse = {
  id?: number;
  name: string;
  type: string;
  stripeId: string;
  createAt: string;
  updatedAt: string;
  price_id: number;
  price_type: string;
  price_stripe_id: string;
  amount?: number;
}

const TABLE = TABLES.products;

export const productColumns = {
  id: 'products.id',
  name: 'products.name',
  type: 'products.type',
  stripeId: 'products.stripe_id',
  createAt: 'products.created_at',
  updatedAt: 'products.updated_at',
};

export async function insertProduct(productData: ProductData, priceDatas: Price[] = []): Promise<boolean> {
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

export function findProductByType(type: string): Promise<ProductData> {
  return database(TABLE).where({ type }).first();
}

export function findProductInType(types: string[]): Promise<ProductData[]> {
  return database(TABLE).whereIn('type', types);
}

export function findProductAndPriceByType(productType: string, priceType: 'MONTHLY' | 'YEARLY'): Promise<FindProductAndPriceByTypeResponse> {
  return database(TABLE)
    .join(TABLES.prices, productColumns.id, priceColumns.productId)
    .select(productColumns, `${priceColumns.id} as price_id`, priceColumns.amount, `${priceColumns.type} as price_type`, `${priceColumns.stripeId} as price_stripe_id`)
    .where({ [productColumns.type]: productType, [priceColumns.type]: priceType })
    .first();
}
