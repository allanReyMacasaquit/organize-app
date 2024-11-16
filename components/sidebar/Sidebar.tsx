'use client';

import { avatarPlaceholder, navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
	fullName: string;
	email: string;
	avatar?: string;
}

const Sidebar = ({ fullName, email, avatar }: SidebarProps) => {
	const pathname = usePathname();
	return (
		<aside className='sidebar'>
			<Link href='/' className='flex justify-center'>
				<Image
					src='/assets/icons/logo-new-login.svg'
					alt='logo'
					height={120}
					width={120}
					priority
					className='w-auto lg:w-[150px] hidden lg:block'
				/>
				<Image
					src='/assets/icons/logo-brand-new.svg'
					alt='logo'
					height={50}
					width={50}
					priority
					className='w-[50px] lg:hidden'
				/>
			</Link>
			<nav className='sidebar-nav'>
				<ul className='flex flex-1 flex-col gap-6'>
					{navItems.map(({ name, url, icon }) => (
						<Link key={name} href={url} className='lg:w-full'>
							<li
								className={cn(
									'sidebar-nav-item', // Base class for the navigation item
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
								<p className='hidden lg:block'>{name}</p>
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<div className='sidebar-user-info'>
				<Image
					src='/assets/icons/illustration.svg'
					alt='files'
					width={100}
					height={100}
					priority
					className='w-[100px] transition-all hover:rotate-2 hover:scale-105'
				/>
				<p className='text-brand h2 hidden lg:flex'>Files</p>
			</div>
			<div className='sidebar-user-info'>
				<Image
					src={avatarPlaceholder || avatar}
					alt='avatar'
					width={100}
					height={100}
					className='w-full sidebar-user-avatar'
				/>
				<div className='hidden lg:block'>
					<p className='subtitle-2 capitalize'>{fullName}</p>
					<p className='caption'>{email}</p>
				</div>
			</div>
		</aside>
	);
};
export default Sidebar;
