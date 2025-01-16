'use client';

import { useGeneralStore } from '@/store/useGeneralStore';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DivWrapperUserInfoSC } from '@/app/_components/users/styles';
import { Chip, Divider, Image } from '@nextui-org/react';
import getDateTime from '@/app/tools/getDateTime';

export const InfoUser = () => {
	const { getGeneralStore } = useGeneralStore();

	const { selectedUser } = getGeneralStore();

	if (!selectedUser) {
		return null;
	}

	return (
		<Card className='h-100vh_-_320px grid-card grid w-[100%]'>
			<CardHeader>
				<CardTitle>
					Информация пользователя ({selectedUser?.name})
				</CardTitle>
				{/*<CardDescription>*/}
				{/*	Deploy your new project in one-click.*/}
				{/*</CardDescription>*/}
			</CardHeader>
			<CardContent className={cn('h-full')}>
				<DivWrapperUserInfoSC>
					<div className='space-y-1'>
						<Chip size='sm'>Имя</Chip>
						<p className='text-small text-default-400'>
							{selectedUser?.name}
						</p>
					</div>
					<Divider className='my-4' />
					<div className='space-y-1'>
						<Chip size='sm'>Дата создания</Chip>
						<p className='text-small text-default-400'>
							{getDateTime(selectedUser.createdAt, 'FF')}
						</p>
					</div>
					<Divider className='my-4' />
					<div className='space-y-1'>
						<Chip size='sm'>Id</Chip>
						<p className='text-small text-default-400'>
							{selectedUser.id}
						</p>
					</div>
					<Divider className='my-4' />
					<div className='space-y-1'>
						<Chip size='sm'>Email</Chip>
						<p className='text-small text-default-400'>
							{selectedUser.email}
						</p>
					</div>
					<Divider className='my-4' />
					<div className='space-y-1'>
						<Chip size='sm'>Фото</Chip>
						<Image
							isBlurred
							alt='Avatar'
							className='m-5'
							src={selectedUser.image}
							width={140}
						/>
					</div>
					<Divider className='my-4' />
				</DivWrapperUserInfoSC>
			</CardContent>
			<CardFooter className='flex justify-between'></CardFooter>
		</Card>
	);
};
