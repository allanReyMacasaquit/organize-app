import Image from 'next/image';
import React from 'react';

interface LayoutFormProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutFormProps) => {
	return (
		<div className='flex min-h-screen'>
			<section className='bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5'>
				<div className='flex flex-col justify-center max-h-[800px] max-w-[430px] space-y-12 '>
					<Image
						src='/assets/icons/logo-new.svg'
						alt='logo'
						height={100}
						width={100}
						priority
						className='h-auto lg:w-[224px]'
					/>
					<div className='space-y-5 text-white'>
						<h1 className='h1'>Manage your files the best way</h1>
						<p className='body-1'>
							This is a place where you can safely store and save all your
							documents.
						</p>
					</div>
					<Image
						src='/assets/icons/illustration.svg'
						alt='logo'
						height={342}
						width={342}
						priority
						className='w-auto transition-all hover:rotate-2 hover:scale-105 ml-5 lg:w-[350px]'
					/>
				</div>
			</section>
			<section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
				<div className='mb-16 lg:hidden'>
					<Image
						src='/assets/icons/logo-new-login.svg'
						alt='logo'
						height={82}
						width={224}
						className='w-auto lg:w-[250px]'
						priority
					/>
				</div>
				{children}
			</section>
		</div>
	);
};
export default AuthLayout;
