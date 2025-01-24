import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import type { IProduct } from '@/interfaces/interfaces';
import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface IProps {
	product: IProduct;
	isSelected: boolean;
	onSelect: (id: number) => void;
}

export const CardBodyProduct: FC<IProps> = (props) => {
	const {
		product: { name, price, image, id },
		isSelected,
		onSelect,
	} = props;

	const onPress = () => {
		onSelect(id);
	};

	return (
		<Card
			isPressable
			shadow='sm'
			onPress={onPress}
			className={cn(isSelected && 'bg-[rgba(255,255,255,.2)]')}
		>
			<CardBody className='overflow-visible p-0'>
				<Image
					alt={name}
					className='w-full object-cover'
					radius='lg'
					shadow='sm'
					src={image}
					width='100%'
				/>
			</CardBody>
			<CardFooter className='justify-between text-small'>
				<b>{name}</b>
				<p className='text-default-500'>{price} руб</p>
			</CardFooter>
		</Card>
	);
};
