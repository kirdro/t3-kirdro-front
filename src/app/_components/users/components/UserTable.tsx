'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/app/_components/users/components/DataTable';
import { columns } from '@/app/settings/columns';
import { type FC, useEffect, useState } from 'react';
import type { IUser, IUserTable } from '@/interfaces/interfaces';
import { DateTime } from 'luxon';
import { useGeneralStore } from '@/store/useGeneralStore';

export const UserTable: FC<{ users: IUser[] }> = ({ users }) => {
	const [processedUsers, setProcessedUsers] = useState<IUserTable[]>([]);

	const { updateGeneralStore, getGeneralStore } = useGeneralStore();

	useEffect(() => {
		const tempList: IUserTable[] = users.map((item) => {
			return {
				...item,
				createdAt: DateTime.fromJSDate(
					new Date(item.createdAt),
				).toFormat('FF'),
				image: item.image ? item.image : '---',
				name: item.name ? item.name : '---',
			};
		});

		setProcessedUsers(tempList);
	}, [users]);

	const onSelection = async (id: string) => {
		const foundUser = users.find((item) => item.id === id);
		await updateGeneralStore({
			selectedUserId: id,
			selectedUser: foundUser ? foundUser : null,
		});
	};

	return (
		<Card className='h-[max-content] w-[100%]'>
			<CardHeader>
				<CardTitle>Users Table</CardTitle>
				<CardDescription>
					Click select user for more information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					onSelect={onSelection}
					columns={columns}
					data={processedUsers}
				/>
			</CardContent>
			{/*<CardFooter className='flex justify-between'>*/}
			{/*	<Button variant='outline'>Cancel</Button>*/}
			{/*	<Button>Deploy</Button>*/}
			{/*</CardFooter>*/}
		</Card>
	);
};
