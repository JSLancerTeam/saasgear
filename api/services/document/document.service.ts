import { ApolloError, ValidationError } from 'apollo-server-express';

import logger from '~/utils/logger';
import { insertDocument, findDocumentById, findDocuments, updateDocumentById, deleteDocumentById, FindDocumentsResponse, FindDocumentById } from '~/repository/documents.repository';
import { createValidation } from '~/validations/document.validation';

type GetDocumentsResponse = {
  documents: FindDocumentsResponse;
  count: number;
}

/**
 * Create Document
 *
 * @param {number} userId
 * @param {string} name
 * @param {string} body
 */
export async function createDocument(userId: number, name: string, body: string): Promise<FindDocumentById> {
  const validateResult = createValidation({ name, body });
  if (Array.isArray(validateResult) && validateResult.length) {
    throw new ValidationError(validateResult.map((it) => it.message).join(','));
  }

  try {
    const data = await insertDocument({ name, body, user_id: userId });
    const newDocumentId = data.shift();
    const document = await findDocumentById(newDocumentId);
    return document;
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
export async function getDocuments(offset: number, limit: number): Promise<GetDocumentsResponse> {
  try {
    const [documents, { count }] = await findDocuments(offset, limit);
    return {
      documents,
      count,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

/**
 * Get Document Detail
 *
 * @param {number} id
 *
 */
export async function getDocumentDetail(id: number): Promise<FindDocumentById> {
  try {
    const document = await findDocumentById(id);
    return document;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

/**
 * Update Document
 *
 * @export
 * @param {number} id
 * @param {string} name
 * @param {string} body
 */
export async function updateDocument(id: number, name: string, body: string): Promise<ApolloError | FindDocumentById> {
  try {
    const document = await findDocumentById(id);
    if (!document) {
      return new ApolloError('Can not find any document');
    }

    await updateDocumentById(id, { name, body });

    return {
      ...document,
      name,
      body,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
/**
 * Delete Document
 *
 * @param {*} id
 */
export async function deleteDocument(id: number): Promise<true | ApolloError> {
  try {
    const document = await findDocumentById(id);
    if (!document) {
      return new ApolloError('Can not find any document');
    }

    await deleteDocumentById(id);

    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
