import { Button, Image } from '@heroui/react';
import { type FC } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface IProps {
	src: string;
	alt?: string;
	height: number;
	onDelete: (index: number) => void;
	index: number;
}

export const CustomImage: FC<IProps> = (props) => {
	const { src, alt = '', height, onDelete, index } = props;

	const onClick = () => {
		onDelete(index);
	};

	return (
		<div className={cn('h-max w-max', 'relative', 'grid')}>
			<Image src={src} alt={alt} height={height} />
			<Button
				className={cn(
					'absolute',
					'right-0 top-0',
					'z-20',
					'opacity-65',
				)}
				onPress={onClick}
				isIconOnly
				aria-label='Like'
				size={'sm'}
				color='default'
			>
				<X />
			</Button>
		</div>
	);
};
