'use client';

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { avatarPlaceholder, navItems } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import FileUploader from '../header/FileUploader';
import { signOutUser } from '@/lib/actions/user-actions';

interface MobileNavigationProps {
	fullName: string;
	email: string;
	avatar?: string;
	ownerId: string;
	accountId: string;
}

const MobileNavigation = ({
	email,
	fullName,
	avatar,
}: MobileNavigationProps) => {
	const pathname = usePathname();

	const [open, setOpen] = useState(false);
	return (
		<header className='mobile-header'>
			<Image
				src='/assets/icons/logo-new-login.svg'
				alt='logo'
				width={100}
				height={100}
				className='w-[100px]'
			/>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Image
						src='/assets/icons/menu.svg'
						alt='logo'
						width={30}
						height={30}
						className='w-auto'
					/>
				</SheetTrigger>
				<SheetContent className='shad-sheet h-screen px-3'>
					<SheetTitle>
						<div className='header-user'>
							<Image
								src={avatarPlaceholder || avatar}
								alt='avatar'
								width={30}
								height={30}
								className='w-auto header-user-avatar'
							/>
							<div className='sm:hidden lg:block'>
								<p className='subtitle-2 capitalize'>{fullName}</p>
								<p className='caption'>{email}</p>
							</div>
						</div>
						<Separator className='mb-4 bg-light-200/20' />
					</SheetTitle>
					<nav className='mobile-nav'>
						<ul className='mobile-nav-list'>
							{navItems.map(({ name, url, icon }) => (
								<Link key={name} href={url} className='lg:w-full'>
									<li
										className={cn(
											'mobile-nav-item', // Base class for the navigation item
											pathname === url && 'shad-active' // Adds `shad-active` if current route matches
										)}
									>
										<Image
											className={cn(
												'nav-icon',
												pathname === url && 'nav-icon-active'
											)}
											src={icon}
											alt={name}
											width={24}
											height={24}
										/>
										<p>{name}</p>
									</li>
								</Link>
							))}
						</ul>
					</nav>
					<Separator className='my-5 bg-light-200/20' />
					<div className='flex flex-col justify-between gap-5'>
						<FileUploader />
						<Button
							onClick={async () => await signOutUser()}
							type='submit'
							className='mobile-sign-out-button'
						>
							<Image
								src='/assets/icons/logout.svg'
								alt='logo'
								height={24}
								width={24}
								priority
								className='w-auto'
							/>
							<p>Logout</p>
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};
export default MobileNavigation;
