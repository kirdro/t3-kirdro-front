'use client';
import {
	SectionContentSC,
	SectionsSC,
} from '@/app/_components/sections/styles';
import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	useDisclosure,
} from '@nextui-org/react';
import { api } from '@/trpc/react';
import { useEffect, useState } from 'react';
import { useGeneralStore } from '@/store/useGeneralStore';
import type { ISection } from '@/interfaces/interfaces';
import { ModalWrapper } from '@/app/_components/sections/Modal';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Pen, Plus, Trash2 } from 'lucide-react';
import { ModalContentCreateSection } from '@/app/_components/sections/ModalContentCreateSection';
import { ModalContentUpdateSection } from '@/app/_components/sections/ModalContentUpdateSection';
import { ModalContentDeleteSection } from '@/app/_components/sections/ModalContentDeleteSection';

export const AcmeLogo = () => {
	return (
		<svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
			<path
				clipRule='evenodd'
				d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
				fill='currentColor'
				fillRule='evenodd'
			/>
		</svg>
	);
};

export const Sections = () => {
	const { data, isFetching } =
		api.section.getAllSections.useQuery<ISection[]>();
	const { updateGeneralStore, getGeneralStore } = useGeneralStore();
	const { sections } = getGeneralStore();
	const [isRemove, setIsRemove] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<number>(0);
	const {
		isOpen: isOpenCreateModal,
		onOpen: onOpenCreateModal,
		onOpenChange: onOpenChangeCreateModal,
		onClose: onCloseCreateModal,
	} = useDisclosure();
	const {
		isOpen: isOpenDeleteModal,
		onOpen: onOpenDeleteModal,
		onOpenChange: onOpenChangeDeleteModal,
		onClose: onCloseDeleteModal,
	} = useDisclosure();
	const {
		isOpen: isOpenUpdateModal,
		onOpen: onOpenUpdateModal,
		onOpenChange: onOpenChangeUpdateModal,
		onClose: onCloseUpdateModal,
	} = useDisclosure();

	useEffect(() => {
		updateGeneralStore({
			sections: data ? data : [],
		}).catch((err) => {
			console.log(err);
		});
	}, [data]);

	const onChangeChecked = (checked: boolean) => {
		setIsRemove(checked);
	};

	const onClickButton = (id: number, status: 'delete' | 'update') => () => {
		setSelectedId(id);
		if (status === 'delete') {
			onOpenDeleteModal();
		} else {
			onOpenUpdateModal();
		}
	};

	return (
		<SectionsSC>
			<SectionContentSC>
				<Navbar className={`bg-blue-900`}>
					<NavbarBrand>
						<AcmeLogo />
						<p className='font-bold text-inherit'>ACME</p>
					</NavbarBrand>
					<NavbarContent
						className='hidden gap-4 sm:flex'
						justify='center'
					>
						{sections.map((section) => {
							return (
								<NavbarItem key={`sections-${section.id}`}>
									{isRemove ?
										<Button
											// as={Link}
											color='danger'
											// href='#'
											variant='flat'
											startContent={<Trash2 />}
											onPress={onClickButton(
												section.id,
												'delete',
											)}
										>
											{section.name}
										</Button>
									:	<Button
											// as={Link}
											color='primary'
											// href='#'
											variant='flat'
											startContent={<Pen />}
											onPress={onClickButton(
												section.id,
												'update',
											)}
										>
											{section.name}
										</Button>
									}
								</NavbarItem>
							);
						})}
						<ModalWrapper
							isOpen={isOpenUpdateModal}
							onClose={onCloseUpdateModal}
							onOpenChange={onOpenChangeUpdateModal}
						>
							<ModalContentUpdateSection
								onClose={onCloseUpdateModal}
								nameSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.name ?? ''
								}
								keyNameSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.keyName ?? ''
								}
								pathSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.path ?? ''
								}
								sortId={
									sections.find(
										(section) => section.id === selectedId,
									)?.sortId ?? 0
								}
								idSection={selectedId}
							/>
						</ModalWrapper>
						<ModalWrapper
							isOpen={isOpenDeleteModal}
							onClose={onCloseDeleteModal}
							onOpenChange={onOpenChangeDeleteModal}
						>
							<ModalContentDeleteSection
								onClose={onCloseDeleteModal}
								nameSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.name ?? ''
								}
								keyNameSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.keyName ?? ''
								}
								pathSection={
									sections.find(
										(section) => section.id === selectedId,
									)?.path ?? ''
								}
								sortId={
									sections.find(
										(section) => section.id === selectedId,
									)?.sortId ?? 0
								}
								idSection={selectedId}
							/>
						</ModalWrapper>
						<NavbarItem>
							<Button
								// as={Link}
								color='primary'
								// href='#'
								variant='flat'
								startContent={<Plus />}
								onPress={onOpenCreateModal}
							>
								Создать секцию
							</Button>
							<ModalWrapper
								isOpen={isOpenCreateModal}
								onClose={onCloseCreateModal}
								onOpenChange={onOpenChangeCreateModal}
							>
								<ModalContentCreateSection
									onClose={onCloseCreateModal}
								/>
							</ModalWrapper>
						</NavbarItem>
					</NavbarContent>
					<NavbarContent justify='end'>
						<NavbarItem>
							<Button
								as={Link}
								color='primary'
								href='#'
								variant='flat'
							>
								Sign Up
							</Button>
						</NavbarItem>
					</NavbarContent>
					<NavbarContent>
						<div className='flex items-center space-x-2'>
							<Switch
								id='airplane-mode'
								onCheckedChange={onChangeChecked}
								checked={isRemove}
							/>
							<Label htmlFor='airplane-mode'>Remove mode</Label>
						</div>
					</NavbarContent>
				</Navbar>
			</SectionContentSC>
		</SectionsSC>
	);
};
