import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';

const TABLE = TABLES.allowed_sites;

export const siteColumns = {
	id: 'allowed_sites.id',
	user_id: 'allowed_sites.user_id',
	url: 'allowed_sites.url',
	createAt: 'allowed_sites.created_at',
	updatedAt: 'allowed_sites.updated_at',

};

export type FindAllowedSitesProps = {
	id?: number;
	user_id?: number
	url?: string,
	createAt?: string,
	updatedAt?: string,
};

export type allowedSites = {
	id?: number;
	user_id?: number
	url?: string,
};

export async function findSitesByUserId(id: number): Promise<FindAllowedSitesProps[]> {
	return database(TABLE)
		.select(siteColumns).where({ [siteColumns.user_id]: id });
}

export async function findSiteByURL(userId: number, url: string): Promise<FindAllowedSitesProps> {
	return database(TABLE)
		.select(siteColumns)
		.where({ [siteColumns.url]: url , [siteColumns.user_id]: userId})
		.first();
}

export async function insertSite(data: allowedSites): Promise<string> {
	return database(TABLE).insert(data).onConflict('site_url').ignore()
		.then((result) => {
			if (result.length === 0) {
				return 'You have already added this site.';
			} else {
				return 'The site was successfully added.';
			}
		})
		.catch((error) => {
			return `insert failed: ${error.message}`;
		});
}

export function deleteSiteByURL(url: string, user_id: number): Promise<number> {
	return database(TABLE).where({ 'user_id': user_id, 'url': url }).del()
}

export function updateAllowedSiteURL(site_id: number, url: string, user_id: number): Promise<number> {
	return database(TABLE).where({'allowed_sites.user_id': user_id, 'allowed_sites.id': site_id} ).update({
		'url': url
	});
}
