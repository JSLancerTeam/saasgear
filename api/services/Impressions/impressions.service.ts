import logger from '~/utils/logger';

import { FindAllowedSitesProps } from '~/repository/sites_allowed.repository';

import { findVisitorByIp } from '~/repository/visitors.repository';
import { findImpressionsSiteId, insertImpressions, updateImpressions, findImpressionsURL } from '~/repository/impressions.repository';

// type GetDocumentsResponse = {
//   documents: FindDocumentsResponse;
//   count: number;
// };

/**
 * Add impressions
 *
 * @param {number} siteId
 * @param {string} ipAddress
 */
export async function addImpressions(siteId: number, ipAddress: string): Promise<number[]> {
    //   const validateResult = createValidation({ name, body });
    //   if (Array.isArray(validateResult) && validateResult.length) {
    //     throw new ValidationError(validateResult.map((it) => it.message).join(','));
    //   }

    try {
        const visitor = await findVisitorByIp(ipAddress);

        if (visitor) {
            const data = {
                site_id: siteId,
                visitor_id: visitor.id
            }

            const response = await insertImpressions(data);
            return response
        }

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

/**
 * Get List Impressions
 *
 * @param {number} userId
 * @param {string} url
 *
 */

export async function findImpressionsByURL(userId: number, url: string) {
    try {
        const impressions = await findImpressionsURL(userId, url);
        return { impressions: impressions, count: impressions.length };
    }
    catch (e) {
        logger.error(e)
        throw e
    }
}

export async function findImpressionsBySiteId(siteId: number) {
    try {
        const impressions = await findImpressionsSiteId(siteId);
        return { impressions: impressions, count: impressions.length };
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}

/**
 * Add interaction in impressions
 *
 * @param {number} siteId
 * @param {string} interaction can be widgetClosed or widgetOpened
 *
 */


export async function addInteraction(siteId: number, interaction: string) {
    try {
        if (interaction !== 'widgetClosed' && interaction !== 'widgetOpened') {
            throw new Error('Invalid interaction type. Only "widgetClosed" or "widgetOpened" are acceptable.');
        }
        return await updateImpressions(siteId, interaction)
    }
    catch (e) {
        logger.error(e);
        throw e;
    }
}

