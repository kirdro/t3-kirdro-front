'use client';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/trpc/react';

export const ModalWrapper = () => {
	const [Name, setName] = useState<string>('');
	const [path, setPath] = useState<string>('/');
	const [keyName, setKeyName] = useState<string>('');
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const utils = api.useUtils();
	const { mutate } = api.section.create.useMutation({
		onSuccess: async () => {
			onClose();
			await utils.section.invalidate();
			setName('');
		},
	});

	const onChageName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangePath = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPath(e.target.value);
	};

	const onChangeKeyName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyName(e.target.value);
	};

	const onSaveSection = () => {
		mutate({ name: Name, path, keyName });
	};

	return (
		<>
			<Button
				// as={Link}
				color='primary'
				// href='#'
				variant='flat'
				startContent={<Plus />}
				onPress={onOpen}
			>
				Создать секцию
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Создать секцию
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
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									onPress={onSaveSection}
									isDisabled={!Name || !path || !keyName}
								>
									Save changes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			{/*<Dialog>*/}
			{/*	<DialogTrigger asChild>*/}
			{/*		<Button*/}
			{/*			// as={Link}*/}
			{/*			color='primary'*/}
			{/*			// href='#'*/}
			{/*			variant='flat'*/}
			{/*			startContent={<Plus />}*/}
			{/*		>*/}
			{/*			Создать секцию*/}
			{/*		</Button>*/}
			{/*	</DialogTrigger>*/}
			{/*	<DialogContent className='sm:max-w-[425px]'>*/}
			{/*		<DialogHeader>*/}
			{/*			<DialogTitle>Создание секции</DialogTitle>*/}
			{/*			<DialogDescription>*/}
			{/*				Создание секции сайта*/}
			{/*			</DialogDescription>*/}
			{/*		</DialogHeader>*/}
			{/*		<div className='grid gap-4 py-4'>*/}
			{/*			<div className='grid grid-cols-1 items-center gap-4'>*/}
			{/*				<Input*/}
			{/*					// key={placement}*/}
			{/*					description={'outside-left'}*/}
			{/*					label='Name'*/}
			{/*					labelPlacement={'inside'}*/}
			{/*					placeholder='Enter your email'*/}
			{/*					type='email'*/}
			{/*					value={Name}*/}
			{/*					isInvalid={Name === ''}*/}
			{/*					onChange={onChageName}*/}
			{/*				/>*/}
			{/*			</div>*/}
			{/*			<div className='grid grid-cols-1 items-center gap-4'>*/}
			{/*				<Input*/}
			{/*					// key={placement}*/}
			{/*					description={'outside-left'}*/}
			{/*					label='Path'*/}
			{/*					labelPlacement={'inside'}*/}
			{/*					placeholder='Enter your email'*/}
			{/*					type='email'*/}
			{/*					value={path}*/}
			{/*					isInvalid={path === ''}*/}
			{/*					onChange={onChangePath}*/}
			{/*				/>*/}
			{/*			</div>*/}
			{/*			<div className='grid grid-cols-1 items-center gap-4'>*/}
			{/*				<Input*/}
			{/*					// key={placement}*/}
			{/*					description={'outside-left'}*/}
			{/*					label='Key name'*/}
			{/*					labelPlacement={'inside'}*/}
			{/*					placeholder='Enter your email'*/}
			{/*					type='email'*/}
			{/*					value={keyName}*/}
			{/*					isInvalid={keyName === ''}*/}
			{/*					onChange={onChangeKeyName}*/}
			{/*				/>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<DialogFooter>*/}
			{/*			<Button*/}
			{/*				onPress={onSaveSection}*/}
			{/*				isDisabled={!Name || !path || !keyName}*/}
			{/*			>*/}
			{/*				Save changes*/}
			{/*			</Button>*/}
			{/*		</DialogFooter>*/}
			{/*	</DialogContent>*/}
			{/*</Dialog>*/}
		</>
	);
};
