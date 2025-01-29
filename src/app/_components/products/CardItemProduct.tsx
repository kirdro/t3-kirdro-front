'use client';
import {
	DivProductItemSC,
	DivScrollWrapperSC,
} from '@/app/_components/products/styles';
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Chip,
	Divider,
	Link,
} from '@heroui/react';
import { cn } from '@/lib/utils';
import type { IProduct } from '@/interfaces/interfaces';
import { type FC, useEffect, useState } from 'react';
import getDateTime from '@/app/tools/getDateTime';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomImage } from '@/app/_components/CustomImage/CustomImage';

interface IProps {
	product: IProduct;
}

export const CardItemProduct: FC<IProps> = (props) => {
	const { product } = props;
	const [height, setHeight] = useState<number>(0);

	useEffect(() => {
		const bodyCardElement = document.getElementById('bodyCard');
		if (bodyCardElement) {
			setHeight(bodyCardElement.getBoundingClientRect().height);
		}
	}, []);


	const onDelete = (index: number) => {
		console.log('><><>');
	};

	const onCheck = (e:boolean) => {

	}

	return (
		<DivProductItemSC>
			<Card className={cn('w-[100%]')}>
				<CardHeader className='flex gap-3'>
					<div className='flex flex-col'>
						<p className='text-md'>{product.name}</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody id={'bodyCard'}>
					{height > 0 && (
						<DivScrollWrapperSC
							height={height}

							// orientation='horizontal'
						>
							<div className={cn('grid h-max w-full gap-2')}>
								<Chip>Описание</Chip>
								<p>{product.description}</p>
								<Divider className='my-4' />
								<Chip>Id</Chip>
								<p>{product.id}</p>
								<Divider className='my-4' />
								<Chip>Цена</Chip>
								<p>{product.price} руб</p>
								<Divider className='my-4' />
								<Chip>Created at</Chip>
								<p>
									{getDateTime(
										new Date(product.createdAt),
										'FF',
									)}
								</p>
								<Divider className='my-4' />
								<Chip>Updated at</Chip>
								<p>
									{getDateTime(
										new Date(product.updatedAt),
										'FF',
									)}
								</p>
								<Divider className='my-4' />
								<Chip>Subsection id</Chip>
								<p>{product.subSectionId}</p>
								<Divider className='my-4' />
								<Chip>Is published</Chip>
								<Checkbox
									onValueChange={onCheck}
									isSelected={product.isPublished}
									// defaultChecked={product.isPublished}
								></Checkbox>
								<Divider className='my-4' />
								<Chip>Image</Chip>
								<ScrollArea className='box-border h-[250px] w-full rounded-md border p-1'>
									<CustomImage
										src={product.image}
										height={200}
										index={0}
										onDelete={onDelete}
									/>
								</ScrollArea>
								<Divider className='my-4' />
								<Chip>Images</Chip>
								<ScrollArea className='box-border grid h-[300px] w-full rounded-md border p-1'>
									<div>
										{product.images.map((item, i) => {
											return (
												<CustomImage
													key={`images-item-${i}`}
													src={item}
													height={200}
													index={i}
													onDelete={onDelete}
												/>
											);
										})}
									</div>
								</ScrollArea>
								<Divider className='my-4' />
								<Chip>Create by id</Chip>
								<p>{product.createdById}</p>
								<Divider className='my-4' />
							</div>
						</DivScrollWrapperSC>
					)}
				</CardBody>
				<Divider />
				<CardFooter>
					<Link
						isExternal
						showAnchorIcon
						href='https://github.com/heroui-inc/heroui'
					>
						Visit source code on GitHub.
					</Link>
				</CardFooter>
			</Card>
		</DivProductItemSC>
	);
};
