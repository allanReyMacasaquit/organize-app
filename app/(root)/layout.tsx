import Header from '@/components/header/Header';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

import React from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
	const currentUser = await getCurrentUser();
	if (!currentUser) return redirect('/sign-in');
	return (
		<main className='flex h-screen'>
			<Sidebar {...currentUser} />
			<section className='flex flex-1 flex-col h-full'>
				<MobileNavigation {...currentUser} />
				<Header userId={currentUser.$id} accountId={currentUser.accountId} />
				<div className='main-content'>{children}</div>
			</section>
			<Toaster />
		</main>
	);
};
export default RootLayout;
