import { type FC, useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import {
	Button,
	Input,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import type { ISubSection } from '@/interfaces/interfaces';

interface IProps {
	onClose: () => void;
	idSection: number;
	nameSection: string;
	sectionPath: string;
	// id: number;
	subsection: ISubSection | null;
}

export const ModalUpdateSubSection: FC<IProps> = (props) => {
	const { onClose, idSection, nameSection, sectionPath, subsection } = props;

	const [Name, setName] = useState<string>('');
	const [path, setPath] = useState<string>('/');
	const [keyName, setKeyName] = useState<string>('');
	const [sortedId, setSortedId] = useState<number>(0);
	const utils = api.useUtils();
	const { mutate, isPending } = api.subSection.updateSubSection.useMutation({
		onSuccess: async () => {
			onClose();
			await utils.section.invalidate();
			await utils.subSection.invalidate();
			setName('');
			setPath('');
			setKeyName('');
		},
	});

	useEffect(() => {
		if (subsection) {
			setPath(subsection?.path);
			setName(subsection?.name);
			setKeyName(subsection?.keyName);
			setSortedId(subsection?.sortId);
		}
	}, [subsection]);

	const onChageName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangePath = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPath(e.target.value);
	};

	const onChangeKeyName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyName(e.target.value);
	};

	const onChangeSortedId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSortedId(Number(e.target.value));
	};

	const onSaveSection = () => {
		mutate({
			name: Name,
			path,
			keyName,
			sortId: sortedId,
			id: subsection ? subsection.id : 0,
		});
	};

	return (
		<>
			<ModalHeader className='flex flex-col gap-1'>
				Обновление подраздела {nameSection} ({idSection})
			</ModalHeader>
			<ModalBody>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-1 items-center gap-4'>
						<Input
							// key={placement}
							description={'outside-left'}
							label='Name'
							labelPlacement={'inside'}
							placeholder='Введите имя секции'
							type='text'
							value={Name}
							isInvalid={Name === ''}
							onChange={onChageName}
						/>
					</div>
					<div className='grid grid-cols-1 items-center gap-4'>
						<Input
							// key={placement}
							description={'outside-left'}
							label='Path'
							labelPlacement={'inside'}
							placeholder='Введите путь для размещения страницы этой секции'
							type='text'
							value={path}
							isInvalid={path === ''}
							onChange={onChangePath}
						/>
					</div>
					<div className='grid grid-cols-1 items-center gap-4'>
						<Input
							// key={placement}
							description={'outside-left'}
							label='Key name'
							labelPlacement={'inside'}
							placeholder='Введите ключевое название'
							type='text'
							value={keyName}
							isInvalid={keyName === ''}
							onChange={onChangeKeyName}
						/>
					</div>
					<div className='grid grid-cols-1 items-center gap-4'>
						<Input
							// key={placement}
							description={'outside-left'}
							label='Sorted ID'
							labelPlacement={'inside'}
							placeholder='Введите ID для сортировки'
							type='number'
							value={String(sortedId)}
							isInvalid={sortedId === 0}
							onChange={onChangeSortedId}
						/>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button
					onPress={onSaveSection}
					isDisabled={!Name || !path || !keyName || sortedId === 0}
					isLoading={isPending}
				>
					Save changes
				</Button>
			</ModalFooter>
		</>
	);
};
