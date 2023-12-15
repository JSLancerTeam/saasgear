import { ApolloError, ValidationError } from 'apollo-server-express';

import logger from '~/utils/logger';
import { insertDocument, findDocumentById, findDocuments, updateDocumentById, deleteDocumentById, FindDocumentsResponse, FindDocumentById } from '~/repository/documents.repository';
import { FindAllowedSitesProps, deleteSiteByURL, findSiteByURL, findSitesByUserId, insertSite, updateAllowedSiteURL} from '~/repository/sites_allowed.repository';
import { createValidation } from '~/validations/document.validation';
import { getCityAndCountry } from '~/helpers/uniqueVisitor.helper';
import { FindVisitorsResponse, VisitorInfo, deleteVisitorId, deleteVisitorIp, findVisitorByIp, findVisitorBySiteId, insertVisitor, updateVisitorByIp } from '~/repository/visitors.repository';


/**
 * Create Document
 *
 * @param {number} userId
 * @param {string} url
 */
export async function addNewVisitor(ipAddress: string, siteId: number): Promise<number[]> {
//   const validateResult = createValidation({ name, body });
//   if (Array.isArray(validateResult) && validateResult.length) {
//     throw new ValidationError(validateResult.map((it) => it.message).join(','));
//   }

  try {
    let data:any = await getCityAndCountry(ipAddress);
    data.ip_address = ipAddress;
    data.site_id = siteId;
    const response = await insertVisitor(data);
    return response
    
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

export async function getSiteVisitors(siteId:number){
    try{
        const visitors = await findVisitorBySiteId(siteId);
        return {visitors: visitors, count: visitors.length}
    }
    catch(e){
        logger.error(e)
        throw e
    }
}
export async function getVisitorByIp(ipAddress: string){
    try{
        const visitor = await findVisitorByIp(ipAddress);
        return visitor;
    }
    catch(e){
        logger.error(e)
        throw e
    }
}



export async function deleteVisitorByIp(ipAddress: string) {
    try{
        const deletedRecs = await deleteVisitorIp(ipAddress)
        return deletedRecs;
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}
export async function deleteVisitorById(siteId: number) {
    try{
        const deletedRecs = await deleteVisitorId(siteId)
        return deletedRecs;
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}

export async function updateVisitorDetails(ipAddress: string, data: VisitorInfo) {
    try{
        const x = await updateVisitorByIp(ipAddress, data);
        if (x > 0) return 'Successfully updated URL'
        else return 'Could not change URL'
    }
    catch (e){
        logger.error(e);
        throw e;
    }
}

