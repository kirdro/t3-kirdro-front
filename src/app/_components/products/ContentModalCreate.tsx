import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type FC } from 'react';
import { CustomImage } from '@/app/_components/CustomImage/CustomImage';
import { Input as InputHero, Textarea } from '@heroui/react';

interface IProps {
	onChooseFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChooseFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDeleteImages: (index: number) => void;
	onDeleteImage: () => void;
	previews: string[];
	preview: string | null;
}

export const ContentModalCreate: FC<IProps> = (props) => {
	const {
		onChooseFile,
		onChooseFiles,
		onDeleteImages,
		onDeleteImage,
		previews,
		preview,
	} = props;

	return (
		<div className='grid w-full auto-rows-max items-center justify-items-center gap-1.5'>
			<InputHero
				// key={placement}
				// description={placement}
				label='Название'
				labelPlacement={'inside'}
				type='text'
				isRequired
			/>
			<Separator className='my-4' />
			<InputHero
				// key={placement}
				// description={placement}
				label='Цена'
				labelPlacement={'inside'}
				type='number'
				placeholder='0.00'
				isRequired
			/>
			<Separator className='my-4' />
			<Textarea
				// className={cn('max-w-xs', 'grid w-full')}
				label='Описание'
				placeholder='Введите описание'
				isRequired={true}
				fullWidth={true}
				// disableAutosize={true}
			/>
			<Separator className='my-4' />
			{preview && (
				<CustomImage
					alt='HeroUI hero Image with delay'
					height={200}
					src={preview}
					index={0}
					onDelete={onDeleteImage}
					// width={300}
				/>
			)}
			<Label htmlFor='image'>Image</Label>
			<Input onChange={onChooseFile} id='image' type='file' />

			<Separator className='my-4' />
			<ScrollArea className='h-80 w-full rounded-md border'>
				<div className='grid justify-items-center gap-2 p-4'>
					{previews.map((item, i) => {
						return (
							<CustomImage
								key={`dafasdfw${i}`}
								src={item}
								alt='HeroUI hero Image with delay'
								height={200}
								index={i}
								onDelete={onDeleteImages}
							/>
						);
					})}
				</div>
			</ScrollArea>

			<Label htmlFor='images'>Images</Label>
			<Input
				onChange={onChooseFiles}
				id='images'
				type='file'
				multiple={true}
				// value={previews}
			/>
		</div>
	);
};
