'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
interface Props {
	ownerId: string;
	accountId: string;
	className: string;
}

const FileUploader = ({ accountId, className, ownerId }: Props) => {
	const [files, setfiles] = useState<File[]>([]);

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setfiles(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const handleRemoveFile = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
		fileName: string
	) => {
		e.stopPropagation();
		setfiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
	};

	return (
		<div {...getRootProps()} className='cursor-pointer'>
			<input {...getInputProps()} />
			<Button type='button' className={cn('uploader-button', className)}>
				<Image
					src='/assets/icons/upload.svg'
					alt='upload'
					height={24}
					width={24}
					priority
					className='w-auto'
				/>
				<p>Upload</p>
			</Button>
			{files.length > 0 && (
				<ul className='uploader-preview-list'>
					<h4 className='h4 text-light-100'>Uploading...</h4>
					{files.map((file, index) => {
						const { type, extension } = getFileType(file.name);
						return (
							<li
								key={`${file.name}=${index}`}
								className='uploader-preview-item'
							>
								<div className='flex items-center gap-3'>
									<Thumbnail
										type={type}
										extension={extension}
										url={convertFileToUrl(file)}
									/>
									<div className='preview-item-name'>
										{file.name}
										<Image
											src='/assets/icons/file-loader.gif'
											alt='loader'
											height={80}
											width={80}
											priority
											className='w-auto'
										/>
									</div>
								</div>
								<Image
									onClick={(e) => handleRemoveFile(e, file.name)}
									src='/assets/icons/remove.svg'
									alt='remove'
									height={24}
									width={24}
									priority
									className='w-auto'
								/>
							</li>
						);
					})}
				</ul>
			)}
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>
					Drag &lsquo;n&lsquo; drop some files here, or click to select files
				</p>
			)}
		</div>
	);
	return <div>FileUploader</div>;
};
export default FileUploader;
