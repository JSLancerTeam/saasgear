import database from '~/config/database.config';
import { DEFAULT_LIMIT, TABLES } from '~/constants/database.constant';
import formatDateDB from '~/utils/format-date-db';
import { usersColumns } from './user.repository';

const TABLE = TABLES.documents;

export const documentColumns = {
  id: 'documents.id',
  name: 'documents.name',
  body: 'documents.body',
  userId: 'documents.user_id',
  createdAt: 'documents.created_at',
  updatedAt: 'documents.updated_at',
  deletedAt: 'documents.deleted_at',
};

export type DocumentInfo = {
  id?: number;
  user_id?: number;
  name?: string;
  body?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type FindDocumentById = {
  id: number;
  name: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdBy?: string;
}

export type FindDocumentsResponse = FindDocumentById[] & {
  count: number;
}

/**
 * Insert Document
 *
 * @param {object} data
 *
 * @returns {Array}
 */
export function insertDocument(data: DocumentInfo): Promise<number[]> {
  return database(TABLE).insert(data);
}

/**
 * Find Document By Id
 *
 * @param {number} id
 *
 * @return {object}
 */
export function findDocumentById(id: number): Promise<FindDocumentById> {
  return database(TABLE)
    .join(TABLES.users, documentColumns.userId, usersColumns.id)
    .select(documentColumns, `${usersColumns.name} as createdBy`)
    .where({ [documentColumns.id]: id })
    .whereNull(documentColumns.deletedAt)
    .first();
}

/**
 * Find Documents
 *
 * @export
 * @param {number} offset
 * @param {number} limit
 *
 */
export function findDocuments(offset = 0, limit = DEFAULT_LIMIT): Promise<FindDocumentsResponse[]> {
  return Promise.all([
    database(TABLE)
      .join(TABLES.users, documentColumns.userId, usersColumns.id)
      .select(documentColumns, `${usersColumns.name} as createdBy`)
      .whereNull(documentColumns.deletedAt)
      .limit(limit)
      .offset(offset),
    database(TABLE).count({ count: '*' }).whereNull(documentColumns.deletedAt).first(),
  ]);
}

/**
 * Update Document By Id
 *
 * @param {number} id
 * @param {object} data
 *
 */
export function updateDocumentById(id: number, data: DocumentInfo): Promise<number> {
  return database(TABLE).where({ [documentColumns.id]: id }).update(data);
}

export function deleteDocumentById(id: number): Promise<number> {
  return database(TABLE).where({ [documentColumns.id]: id }).update({ [documentColumns.deletedAt]: formatDateDB() });
}
