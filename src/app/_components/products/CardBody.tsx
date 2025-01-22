import { Button, CardBody, useDisclosure } from '@heroui/react';
import type { ISubSection } from '@/interfaces/interfaces';
import { FC, useState } from 'react';
import { DivProductLeftSideSC } from '@/app/_components/products/styles';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { CustomModal } from '@/app/_components/products/Modal';
import { ContentModalCreate } from '@/app/_components/products/ContentModalCreate';
import { api } from '@/trpc/react';
import getImage from '@/app/tools/getImage';

interface IProps {
	subSection: ISubSection;
}

export const CardBodyCustom: FC<IProps> = (props) => {
	const { subSection } = props;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [image, setImage] = useState<File | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [preview, setPreview] = useState<string | null>(null);
	const { mutateAsync } = api.image.createPresignedUrl.useMutation();

	const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) {
			return;
		}

		setImage(selectedFile);

		getImage(selectedFile, setPreview);
	};

	const onChooseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		const selectedFiles = Array.from(e.target.files);
		selectedFiles.forEach((file: File) => {
			getImage(file, (data) => {
				setPreviews((prev) => [...prev, data]);
			});
		});

		setImages(selectedFiles);
	};

	const uploadImage = async () => {
		if (!image) {
			return;
		}
		const reader = new FileReader();
		reader.onload = async () => {
			const base64 = reader.result?.toString().split(',')[1];
			if (base64) {
				const response = await mutateAsync({
					file: base64,
					fileName: image.name,
					contentType: image.type,
				});
				console.log('Uploaded file URL:', response.url);
			}
		};
		reader.readAsDataURL(image);
	};

	const onDeleteImages = (index: number) => {
		const newPreviews = previews.filter((_, i) => i !== index);
		setPreviews(newPreviews);
	};

	const onDeleteImage = () => {
		setPreview(null);
	};

	const onSave = () => {};

	return (
		<CardBody>
			<DivProductLeftSideSC>
				<ScrollArea className='h-full w-full rounded-md border'>
					<div className='grid h-max w-full auto-rows-max p-4'>
						<Button
							startContent={<Plus />}
							color='primary'
							variant='flat'
							onPress={onOpen}
						>
							Добавить продукт
						</Button>
						{/*{tags.map((tag) => (*/}
						{/*	<>*/}
						{/*		<div key={tag} className='text-sm'>*/}
						{/*			{tag}*/}
						{/*		</div>*/}
						{/*		<Separator className='my-2' />*/}
						{/*	</>*/}
						{/*))}*/}
					</div>
				</ScrollArea>
			</DivProductLeftSideSC>
			<CustomModal
				onSave={onSave}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ContentModalCreate
					onChooseFile={onChooseFile}
					onChooseFiles={onChooseFiles}
					onDeleteImages={onDeleteImages}
					onDeleteImage={onDeleteImage}
					previews={previews}
					preview={preview}
				/>
			</CustomModal>
		</CardBody>
	);
};
