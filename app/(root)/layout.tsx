import Header from '@/components/header/Header';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import Sidebar from '@/components/sidebar/Sidebar';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

import React from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
	const currentUser = await getCurrentUser();
	console.log(currentUser);

	if (!currentUser) redirect('/sign-in');
	return (
		<main className='flex h-screen'>
			<Sidebar {...currentUser} />
			<section className='flex flex-1 flex-col h-full'>
				<MobileNavigation {...currentUser} />
				<Header />
				<div className='main-content'>{children}</div>
			</section>
		</main>
	);
};
export default RootLayout;
