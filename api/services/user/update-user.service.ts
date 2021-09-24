import { createWriteStream } from 'fs';
import { join } from 'path';
import { ApolloError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { findUser, updateUser, UserProfile } from '~/repository/user.repository';
import logger from '~/utils/logger';
import { FOLDER_PATHS } from '~/utils/folder-path';

type ChangeUserAvatarResponse = {
  url: string;
}

export async function updateProfile(id: number, name: string, company: string, position: string): Promise<true | ApolloError> {
  try {
    const user = await findUser({ id });
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

export async function changeUserAvatar(fileData: FileUpload, user: UserProfile): Promise<ChangeUserAvatarResponse> {
  try {
    const file = await fileData;
    const fileName = `avatar-${user.id}-new-${new Date().getTime()}-${file.filename}`;
    const stream = file.createReadStream();
    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(join(FOLDER_PATHS.avatarDir, fileName));
      writeStream.on('finish', () => resolve());
      writeStream.on('error', async (error) => reject(error));
      stream.on('error', (error) => writeStream.destroy(error));
      stream.pipe(writeStream);
    });
    await updateUser(user.id, { avatar_url: fileName });
    return { url: fileName };
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
