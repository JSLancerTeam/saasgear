import database from '~/config/database.config';
import { DEFAULT_LIMIT, TABLES } from '~/constants/database.constant';
import { usersColumns } from './user.repository';
import { siteColumns } from './sites_allowed.repository';

const TABLE = TABLES.visitors;

export const visitorColumns = {
  id: 'unique_visitors.id',
  site_id: 'unique_visitors.site_id',
  ip_address: 'unique_visitors.ip_address',
  city: 'unique_visitors.city',
  country: 'unique_visitors.country',
  zipcode: 'unique_visitors.zipcode',
  continent: 'unique_visitors.continent',
  first_visit: 'unique_visitors.first_visit'
};

export type VisitorInfo = {
  id?: number;
  site_id?: number;
  ip_address?: string;
  city?: string;
  country?: string;
  zipcode?: string;
  continent?: string;
  first_visit?: string;
};

export type FindVisitorsBySiteId = {
  id: number;
  siteId: number;
  ipAddress: string;
  city: string;
  country: string;
  zipcode: string;
  continent: string;
  firstVisit: string;
};

export type FindVisitorsResponse = FindVisitorsBySiteId[] & {
  count: number;
};

/**
 * Insert Document
 *
 * @param {object} data
 *
 * @returns {Array}
 */
export async function insertVisitor(data: VisitorInfo): Promise<number[]> {
  const exisitingVisitors = await database(TABLE).select(visitorColumns).where({ [visitorColumns.ip_address]: data.ip_address, [visitorColumns.site_id]: data.site_id }).first();
  if (exisitingVisitors !== undefined) return [0];
  else return database(TABLE).insert(data).onConflict(['unique_visitors.ip_address', 'unique_visitors.site_id']).ignore();
}

/**
 * Find Document By Id
 *
 * @param {number} id
 *
 * @return {number}
 */
export async function findVisitorBySiteId(id: number) {
  const visitors = await database(TABLE)
    .join(TABLES.allowed_sites, visitorColumns.site_id, siteColumns.id)
    .select(visitorColumns, `${siteColumns.url} as site`)
    .where({ [visitorColumns.site_id]: id });
  return visitors.map(visitor => ({
    id: visitor.id,
    siteId: visitor.site_id, // Mapping from 'site_id' to 'siteId'
    ipAddress: visitor.ip_address, // Mapping from 'ip_address' to 'ipAddress'
    city: visitor.city,
    country: visitor.country,
    zipcode: visitor.zipcode,
    continent: visitor.continent,
    firstVisit: visitor.first_visit // Mapping from 'first_visit' to 'firstVisit'
  }));
}

/**
 * Find Documents
 *
 * @export
 * @param {string} ip_address
 * @return {object}
 *
 */
export async function findVisitorByIp(ip_address: string) {
  const visitor = await database(TABLE)
    .select(visitorColumns)
    .where({ [visitorColumns.ip_address]: ip_address })
    .first();

  return {
    id: visitor.id,
    siteId: visitor.site_id, // Mapping from 'site_id' to 'siteId'
    ipAddress: visitor.ip_address, // Mapping from 'ip_address' to 'ipAddress'
    city: visitor.city,
    country: visitor.country,
    zipcode: visitor.zipcode,
    continent: visitor.continent,
    firstVisit: visitor.first_visit
  }
}

/**
 * Update Document By Id
 *
 * @param {number} id
 * @param {object} data
 *
 */
export function updateVisitorByIp(ip_address: string, data: VisitorInfo): Promise<number> {
  return database(TABLE).where({ [visitorColumns.ip_address]: ip_address }).update(data);
}

export function deleteVisitorId(id: number): Promise<any> {
  return database(TABLE).where({ [visitorColumns.id]: id }).del();
}
export function deleteVisitorIp(ip_address: string): Promise<any> {
  return database(TABLE).where({ [visitorColumns.ip_address]: ip_address }).del();
}
