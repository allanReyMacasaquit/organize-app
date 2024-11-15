import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

interface OtpModalProps {
	email: string;
	accountId: number;
}

const OtpModal = ({ accountId, email }: OtpModalProps) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsLoading(true);

		console.log({ accountId, password });

		try {
			// const sessionId = await verifySecret({ accountId, password });
			// console.log({ sessionId });
			// if (sessionId) router.push('/');
		} catch (error) {
			console.log('Failed to verify OTP', error);
		}

		setIsLoading(false);
	};

	const handleResendOtp = async () => {
		// await sendEmailOTP({ email });
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
			<AlertDialogContent className='shad-alert-dialog'>
				<AlertDialogHeader className='relative flex justify-center'>
					<AlertDialogTitle className='h2 text-center'>
						Enter your OTP
						<Image
							src='/assets/icons/close-dark.svg'
							height={20}
							width={20}
							alt='close'
							onClick={() => setIsOpen(false)}
							className='lg:w-7 otp-close-button'
						/>
					</AlertDialogTitle>
					<AlertDialogDescription className='subtitle-2 text-center text-light-100'>
						We&apos;ve sent a code to
						<span className='pl-1 text-brand'>{email}@Email.com</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<InputOTP maxLength={6} value={password} onChange={setPassword}>
					<InputOTPGroup className='shad-otp'>
						<InputOTPSlot index={0} className='shad-otp-slot' />
						<InputOTPSlot index={1} className='shad-otp-slot' />
						<InputOTPSlot index={2} className='shad-otp-slot' />
						<InputOTPSlot index={3} className='shad-otp-slot' />
						<InputOTPSlot index={4} className='shad-otp-slot' />
						<InputOTPSlot index={5} className='shad-otp-slot' />
					</InputOTPGroup>
				</InputOTP>

				<AlertDialogFooter>
					<div className='flex w-full flex-col gap-4'>
						<AlertDialogAction
							type='button'
							onClick={handleSubmit}
							className='shad-submit-btn h-12'
						>
							Submit
							{isLoading && (
								<Image
									src='/assets/icons/loader.svg'
									height={24}
									width={24}
									alt='loader'
									className='lg:w-8 ml-2 animate-spin'
								/>
							)}
						</AlertDialogAction>
						<div className='subtitle-2 mt-2 text-center text-light-100'>
							Didn&apos;t get a code?
							<Button
								onClick={handleResendOtp}
								type='button'
								variant='link'
								className='pl-1 text-brand-100'
							>
								Click to resend
							</Button>
						</div>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
export default OtpModal;
