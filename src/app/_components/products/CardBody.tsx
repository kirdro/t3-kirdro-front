import { Button, CardBody, useDisclosure } from '@heroui/react';
import type { IProduct, ISubSection } from '@/interfaces/interfaces';
import { type FC, useState } from 'react';
import {
	DivProductLeftSideSC,
	DivProductRightSideSC,
	DivWrapperProductSC,
} from '@/app/_components/products/styles';
import { Plus } from 'lucide-react';
import { CustomModal } from '@/app/_components/products/Modal';
import { ContentModalCreate } from '@/app/_components/products/ContentModalCreate';
import { api } from '@/trpc/react';
import getImage from '@/app/tools/getImage';
import uploadFile from '@/app/_components/products/uploadFile';
import { CardBodyProduct } from '@/app/_components/products/CardBodyProduct';
import { useGeneralStore } from '@/store/useGeneralStore';
import { CardItemProduct } from '@/app/_components/products/CardItemProduct';

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
	const [isCheckedPublished, setIsCheckedPublished] =
		useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { mutateAsync } = api.image.createPresignedUrl.useMutation();
	const { mutate, isPending } = api.product.create.useMutation();
	const { data = [] } = api.product.getAllBySubSectionId.useQuery<IProduct[]>(
		{
			id: subSection.id,
		},
	);

	const { updateGeneralStore, getGeneralStore } = useGeneralStore();

	const { selectedProduct } = getGeneralStore();

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

	const onDeleteImages = (index: number) => {
		const newPreviews = previews.filter((_, i) => i !== index);
		setPreviews(newPreviews);
	};

	const onDeleteImage = () => {
		setPreview(null);
	};

	const onSave = async () => {
		const array: string[] = [];

		const strImage = await uploadFile(image, mutateAsync);
		setIsLoading(true);
		for (const file of images) {
			try {
				const url = await uploadFile(file, mutateAsync); // Ждет результат
				if (url) {
					array.push(url);
				}
			} catch (error) {
				console.error('Ошибка при загрузке файла:', error);
			}
		}

		// console.log('Массив URL:', array, strImage);

		mutate({
			name: name,
			description: description,
			price: price,
			subSectionId: subSection.id,
			image: strImage ? strImage : '',
			images: array,
			isPublished: isCheckedPublished,
		});
		setIsLoading(false);

		setPreviews([]);
		setPreview(null);
		setImages([]);
		onOpenChange();
	};

	const onChecked = (isChecked: boolean) => {
		setIsCheckedPublished(isChecked);
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};
	const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(e.target.value));
	};

	const onSelectProduct = (id: number) => {
		updateGeneralStore({
			selectedProduct:
				selectedProduct?.id === id ?
					null
				:	data.find((item) => item.id === id),
		}).catch((err: Error) => {
			console.log('><<>>>>>>', err.message);
		});
	};

	return (
		<CardBody>
			<DivWrapperProductSC>
				<DivProductLeftSideSC>
					<div className='grid h-max w-full auto-rows-max gap-2 p-4'>
						<Button
							startContent={<Plus />}
							color='primary'
							variant='flat'
							onPress={onOpen}
							isLoading={isPending}
						>
							Добавить продукт
						</Button>
						{data.map((item, i) => {
							return (
								<CardBodyProduct
									key={`product-${i}`}
									product={item}
									onSelect={onSelectProduct}
									isSelected={
										selectedProduct?.id === item.id
									}
								/>
							);
						})}
					</div>
				</DivProductLeftSideSC>
				<DivProductRightSideSC>
					{selectedProduct && (
						<CardItemProduct product={selectedProduct} />
					)}
				</DivProductRightSideSC>
			</DivWrapperProductSC>

			<CustomModal
				onSave={onSave}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isLoading={isLoading}
			>
				<ContentModalCreate
					onChooseFile={onChooseFile}
					onChooseFiles={onChooseFiles}
					onDeleteImages={onDeleteImages}
					onDeleteImage={onDeleteImage}
					previews={previews}
					preview={preview}
					onChangeChecked={onChecked}
					onChangeName={onChangeName}
					onChangeDescription={onChangeDesc}
					onChangePrice={onChangePrice}
				/>
			</CustomModal>
		</CardBody>
	);
};
