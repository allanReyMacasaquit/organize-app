'use server';

import { revalidatePath } from 'next/cache';
import { appwriteConfig } from '../appwrite/config';
import { constructFileUrl, getFileType, parseStringify } from '../utils';
import { createAdminClient } from '../appwrite';
import { ID } from 'node-appwrite';
import { getCurrentUser } from './user-actions';
import { InputFile } from 'node-appwrite/file';

const handleError = (error: unknown, message: string) => {
	console.log(error, message);
	throw error;
};

export const uploadFile = async ({ file, ownerId, path }: UploadFileProps) => {
	const { storage, databases } = await createAdminClient();

	try {
		// Fetch current user to get accountId
		const currentUser = await getCurrentUser();
		if (!currentUser || !currentUser.accountId) {
			throw new Error('accountId is required but is missing');
		}

		const inputFile = InputFile.fromBuffer(file, file.name);

		const bucketFile = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			inputFile
		);

		// Prepare the file document with accountId from the currentUser
		const fileDocument = {
			type: getFileType(bucketFile.name).type,
			name: bucketFile.name,
			url: constructFileUrl(bucketFile.$id),
			extension: getFileType(bucketFile.name).extension,
			size: bucketFile.sizeOriginal,
			owner: ownerId,
			accountId: currentUser.accountId, // Use accountId from currentUser
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
			.catch(async (error) => {
				await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
				handleError(error, 'Failed to create file document');
			});

		revalidatePath(path);
		return parseStringify(newFile);
	} catch (error) {
		handleError(error, 'Failed to upload file');
	}
};
