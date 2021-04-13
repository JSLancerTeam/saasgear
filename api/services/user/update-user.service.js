import { createWriteStream } from 'fs';
import { join } from 'path';
import { ApolloError } from 'apollo-server-express';
import { findUser, updateUser } from '../../repository/user.repository';
import logger from '~/utils/logger';
import { FOLDER_PATHS } from '~/utils/folder-path';

export async function updateProfile(id, name, company, position) {
  try {
    const user = await findUser(id);
    if (!user) {
      return new ApolloError('Can not find any user');
    }

    await updateUser(id, { name, position, company });
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function changeUserAvatar(fileData, user) {
  try {
    const file = await fileData;
    const fileName = `avatar-${user.id}-new-${new Date().getTime()}-${file.filename}`;
    const stream = file.createReadStream();
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(join(FOLDER_PATHS.avatarDir, fileName));
      writeStream.on('finish', () => {
        console.log('Go here');
        return resolve();
      });
      writeStream.on('error', async (error) => {
        reject(error);
      });

      // stream.on('error', (error) => writeStream.destroy(error));
      stream.pipe(writeStream);
    });
    return { fileName };
  } catch (error) {
    console.log(error);
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
