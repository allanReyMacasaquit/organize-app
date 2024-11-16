'use server';

import { ID, Query } from 'appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';
import { avatarPlaceholder } from '@/constants';

const getUserByEmail = async (email: string) => {
	const { databases } = await createAdminClient();

	const result = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal('email', [email])]
	);

	return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
	console.log(error, message);
	throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailToken(ID.unique(), email);

		return session.userId;
	} catch (error) {
		handleError(error, 'Failed to send email OTP');
	}
};

export const createAccount = async ({
	fullName,
	email,
}: {
	fullName: string;
	email: string;
}) => {
	const existingUser = await getUserByEmail(email);

	const accountId = await sendEmailOTP({ email });
	if (!accountId) throw new Error('Failed to send an OTP');

	if (!existingUser) {
		const { databases } = await createAdminClient();

		await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			{
				fullName,
				email,
				avatar: avatarPlaceholder,
				accountId,
			}
		);
	}

	return parseStringify({ accountId });
};

interface VerifySecretProps {
	accountId: string;
	password: string;
}
export const verifySecret = async ({
	accountId,
	password,
}: VerifySecretProps) => {
	try {
		const { account } = await createAdminClient();

		const session = await account.createSession(accountId, password);

		(await cookies()).set('appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		return parseStringify({ sessionId: session.$id });
	} catch (error) {
		handleError(error, 'Failed to verify OTP');
	}
};
export const getCurrentUser = async () => {
	const { databases, account } = await createSessionClient();

	// Fetch the currently authenticated user's account
	const result = await account.get();

	// Query the database for the user's document based on their account ID
	const user = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal('accountId', result.$id)] // Query filters for accountId match
	);

	// Return `null` if no user document is found
	if (user.total <= 0) return null;

	// Return the first user document found, parsed into a string if needed
	return parseStringify(user.documents[0]);
};
