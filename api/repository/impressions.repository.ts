import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
import { siteColumns } from './sites_allowed.repository';

const TABLE = TABLES.impressions;

export const impressionsColumns = {
	id: 'impressions.id',
	site_id: 'impressions.site_id',
	visitor_id: 'impressions.visitor_id',
	widget_opened: 'impressions.widget_opened',
	widget_closed: 'impressions.widget_closed',
	createAt: 'impressions.created_at',

};

type impressionsProps = {
	id?: number,
	site_id?: number,
	visitor_id?: number,
	widget_opened?: boolean,
	widget_closed?: boolean,
	createAt?: string
};


export async function findImpressionsByURL(user_id: number, site_url: string): Promise<impressionsProps[]> {
	return database(TABLE)
		.join(TABLES.allowed_sites, impressionsColumns.site_id, siteColumns.id)
		.select(impressionsColumns, `${siteColumns.url} as url`)
		.where({ [siteColumns.url]: site_url, [siteColumns.user_id]: user_id });
}

export async function findImpressionsBySiteId(site_id: number): Promise<impressionsProps[]> {
	return database(TABLE)
		.select(impressionsColumns)
		.where('site_id', site_id);
}

export async function updateImpressions(id: number, interaction: string): Promise<number> {
	let field;
	if (interaction === 'widgetClosed') {
		field = 'widget_closed';
	}
	else if (interaction === 'widgetOpened') {
		field = 'widget_opened';
	}
	return database(TABLE)
		.where('id', id)
		.update({
			field: true
		});
}

export async function insertImpressions(data: impressionsProps) {
	const insertedIds = await database(TABLE).insert(data)
	if (insertedIds.length === 0) {
		return { success: false, message: 'Successfully inserted an impression!'};
	}
	else {
		return { success: true, message: 'Impression could not be inserted in the database.'};
	}

}
