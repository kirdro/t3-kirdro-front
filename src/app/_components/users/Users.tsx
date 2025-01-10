'use client';
import { DivWrapperUsersSC } from '@/app/_components/users/styles';
import { api } from '@/trpc/react';
import { UserTable } from '@/app/_components/users/components/UserTable';
import type { IUser } from '@/interfaces/interfaces';
import { UserDetail } from '@/app/_components/users/components/UserDetail';
import { useGeneralStore } from '@/store/useGeneralStore';
import { useEffect } from 'react';

export const Users = () => {
	const utils = api.useUtils();
	const [users] = api.user.getAll.useSuspenseQuery<IUser[]>();
	const { updateGeneralStore } = useGeneralStore();

	const onChangeUsers = () => {
		updateGeneralStore({
			users: users,
		}).then();
	};

	useEffect(() => {
		onChangeUsers();
	}, [users]);

	return (
		<DivWrapperUsersSC>
			<UserTable users={users} />
			<UserDetail />
		</DivWrapperUsersSC>
	);
};
