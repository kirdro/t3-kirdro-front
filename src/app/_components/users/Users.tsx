'use client';
import { DivWrapperUsersSC } from '@/app/_components/users/styles';
import { api } from '@/trpc/react';
import { UserTable } from '@/app/_components/users/components/UserTable';
import type { IUser } from '@/interfaces/interfaces';
import { UserDetail } from '@/app/_components/users/components/UserDetail';
import { useGeneralStore } from '@/store/useGeneralStore';
import { useEffect } from 'react';

export const Users = () => {
	// const utils = api.useUtils();
	const [users] = api.user.getAll.useSuspenseQuery<IUser[]>();
	const { updateGeneralStore } = useGeneralStore();

	useEffect(() => {
		updateGeneralStore({
			users: users,
		}).catch((err) => {
			console.log(err);
		});
	}, [users, updateGeneralStore]);

	return (
		<DivWrapperUsersSC>
			<UserTable users={users} />
			<UserDetail />
		</DivWrapperUsersSC>
	);
};
