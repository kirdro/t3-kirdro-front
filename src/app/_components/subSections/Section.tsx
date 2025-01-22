'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type FC, useState } from 'react';
import { api } from '@/trpc/react';
import { Button, Spinner } from '@heroui/react';
import { cn } from '@/lib/utils';
import { Pen, Plus, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ModalWrapper } from '@/app/_components/sections/Modal';
import { useDisclosure } from '@nextui-org/react';
import { ModalCreateSubSections } from '@/app/_components/subSections/ModalCreateSubSections';
import { ModalUpdateSubSection } from '@/app/_components/subSections/ModalUpdateSubSection';
import type { ISubSection } from '@/interfaces/interfaces';
import { ModalDeleteSubsection } from '@/app/_components/subSections/ModalDeleteSubsection';

interface IProps {
	sectionId: number;
	sectionName: string;
	sectionPath: string;
}

export const Section: FC<IProps> = (props) => {
	const { sectionId, sectionName, sectionPath } = props;
	const { data: subSections, isFetching } =
		api.subSection.getSubSectionsBySectionId.useQuery({
			sectionId,
		});
	const {
		isOpen: isOpenCreateModal,
		onOpen: onOpenCreateModal,
		onOpenChange: onOpenChangeCreateModal,
		onClose: onCloseCreateModal,
	} = useDisclosure();

	const {
		isOpen: isOpenUpdateModal,
		onOpen: onOpenUpdateModal,
		onOpenChange: onOpenChangeUpdateModal,
		onClose: onCloseUpdateModal,
	} = useDisclosure();

	const {
		isOpen: isOpenDeleteModal,
		onOpen: onOpenDeleteModal,
		onOpenChange: onOpenChangeDeleteModal,
		onClose: onCloseDeleteModal,
	} = useDisclosure();

	const [isRemove, setIsRemove] = useState<boolean>(false);
	const [selectedSection, setSelectedSection] = useState<ISubSection | null>(
		null,
	);

	const onChangeChecked = (checked: boolean) => {
		setIsRemove(checked);
	};

	const onPressUpdate = (section: ISubSection) => () => {
		setSelectedSection(section);
		onOpenUpdateModal();
	};

	const onPressDelete = (section: ISubSection) => () => {
		setSelectedSection(section);
		onOpenDeleteModal();
	};

	return (
		<Card className='w-[300px]'>
			<CardHeader>
				<CardTitle>Список подразделов ({sectionName})</CardTitle>
				{/*<CardDescription>*/}
				{/*	Deploy your new project in one-click.*/}
				{/*</CardDescription>*/}
				<div className='flex items-center space-x-2'>
					<Switch
						id='airplane-mode'
						onCheckedChange={onChangeChecked}
						checked={isRemove}
					/>
					<Label htmlFor='airplane-mode'>Remove mode</Label>
				</div>
			</CardHeader>

			<CardContent>
				<div
					className={cn(
						'grid h-max w-full auto-rows-fr gap-2',
						'relative',
					)}
				>
					{isFetching ?
						<div
							className={cn(
								'absolute left-0 top-0 h-full w-full',
								'grid place-items-center',
								'bg-black opacity-50',
								'z-40',
							)}
						>
							<Spinner color='default' />
						</div>
					:	null}

					{subSections?.map((subSection) =>
						isRemove ?
							<Button
								color={'danger'}
								variant={'flat'}
								startContent={<Trash2 />}
								key={`subSection-${subSection.id}`}
								onPress={onPressDelete(subSection)}
							>
								{subSection.name}
							</Button>
						:	<Button
								color={'primary'}
								variant={'flat'}
								startContent={<Pen />}
								key={`subSection-${subSection.id}`}
								onPress={onPressUpdate(subSection)}
							>
								{subSection.name}
							</Button>,
					)}
					<Button
						color='primary'
						variant='flat'
						startContent={<Plus />}
						onPress={onOpenCreateModal}
					>
						Создать подраздел
					</Button>
				</div>
				<ModalWrapper
					isOpen={isOpenCreateModal}
					onClose={onCloseCreateModal}
					onOpenChange={onOpenChangeCreateModal}
				>
					<ModalCreateSubSections
						onClose={onCloseCreateModal}
						idSection={sectionId}
						nameSection={sectionName}
						sectionPath={sectionPath}
					/>
				</ModalWrapper>
				<ModalWrapper
					isOpen={isOpenUpdateModal}
					onClose={onCloseUpdateModal}
					onOpenChange={onOpenChangeUpdateModal}
				>
					<ModalUpdateSubSection
						onClose={onCloseUpdateModal}
						idSection={sectionId}
						nameSection={sectionName}
						sectionPath={sectionPath}
						subsection={selectedSection}
					/>
				</ModalWrapper>
				<ModalWrapper
					isOpen={isOpenDeleteModal}
					onClose={onCloseDeleteModal}
					onOpenChange={onOpenChangeDeleteModal}
				>
					<ModalDeleteSubsection
						onClose={onCloseDeleteModal}
						idSection={sectionId}
						nameSection={sectionName}
						sectionPath={sectionPath}
						subsection={selectedSection}
					/>
				</ModalWrapper>
			</CardContent>
			{/*<CardFooter className='flex justify-between'>*/}
			{/*	<Button variant='outline'>Cancel</Button>*/}
			{/*	<Button>Deploy</Button>*/}
			{/*</CardFooter>*/}
		</Card>
	);
};
