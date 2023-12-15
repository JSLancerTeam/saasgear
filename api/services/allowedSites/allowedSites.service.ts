import { ApolloError, ValidationError } from 'apollo-server-express';

import logger from '~/utils/logger';
import { insertDocument, findDocumentById, findDocuments, updateDocumentById, deleteDocumentById, FindDocumentsResponse, FindDocumentById } from '~/repository/documents.repository';
import { FindAllowedSitesProps, deleteSiteByURL, findSiteByURL, findSitesByUserId, insertSite, updateAllowedSiteURL} from '~/repository/sites_allowed.repository';
import { createValidation } from '~/validations/document.validation';

// type GetDocumentsResponse = {
//   documents: FindDocumentsResponse;
//   count: number;
// };

/**
 * Create Document
 *
 * @param {number} userId
 * @param {string} url
 */
export async function addSite(userId: number, url: string): Promise<string> {
//   const validateResult = createValidation({ name, body });
//   if (Array.isArray(validateResult) && validateResult.length) {
//     throw new ValidationError(validateResult.map((it) => it.message).join(','));
//   }

  try {
    const data = {
        user_id: userId,
        url: url
    }
    const response = await insertSite(data);
    return response
    
    // const data = await insertDocument({ name, body, user_id: userId });
    // const newDocumentId = data.shift();
    // const document = await findDocumentById(newDocumentId);
    // return document;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

/**
 * Get List Documents
 *
 * @param {number} offset
 * @param {number} limit
 *
 */

export async function findUserSites(userId:number): Promise<FindAllowedSitesProps[]> {
    try{
        const sites = await findSitesByUserId(userId);
        return sites;
    }
    catch(e){
        logger.error(e)
        throw e
    }
}

export async function findSite(userId: number, url: string){
    try{
        const site = await findSiteByURL(userId, url);
        return site;
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}

export async function deleteSite(userId:number, url:string) {
    try{
        const deletedRecs = await deleteSiteByURL(url, userId);
        return deletedRecs;
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}

export async function changeURL(siteId: number, userId: number ,url: string) {
    try{
        const x = await updateAllowedSiteURL(siteId, url, userId);
        if (x > 0) return 'Successfully updated URL'
        else return 'Could not change URL'
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}

