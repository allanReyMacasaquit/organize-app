'use server';
import { ID } from 'appwrite';
import { appwriteConfig } from '../appwrite/config';
import { createAdminClient } from '../appwrite';
import { getFileType } from '../utils';

export const uploadFile = async ({
	file,
	ownerId,
	accountId,
	path,
}: UploadFileProps) => {
	const { storage, databases } = await createAdminClient();

	try {
		const inputFile = InputFile.fromBuffer(file, file.name);

		const bucketFile = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			inputFile
		);

		const fileDocument = {
			type: getFileType(bucketFile.name).type,
			name: bucketFile.name,
			url: constructFileUrl(bucketFile.$id),
			extension: getFileType(bucketFile.name).extension,
			size: bucketFile.sizeOriginal,
			owner: ownerId,
			accountId,
			users: [],
			bucketFileId: bucketFile.$id,
		};

		const newFile = await databases
			.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.filesCollectionId,
				ID.unique(),
				fileDocument
			)
			.catch(async (error: unknown) => {
				await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
				handleError(error, 'Failed to create file document');
			});

		revalidatePath(path);
		return parseStringify(newFile);
	} catch (error) {
		handleError(error, 'Failed to upload file');
	}
};
