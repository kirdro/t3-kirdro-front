'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { api } from '@/trpc/react';
import { useGeneralStore } from '@/store/useGeneralStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPosts } from '@/app/_components/users/components/UserPosts';
import type { IMessage, IPost } from '@/interfaces/interfaces';
import { UserMessages } from '@/app/_components/users/components/UserMessages';
import { InfoUser } from '@/app/_components/users/components/infoUser';

export const UserDetail = () => {
	const { getGeneralStore } = useGeneralStore();

	const { selectedUserId } = getGeneralStore();

	const { data = [], isFetching } = api.post.findPostsByUserId.useQuery<
		IPost[]
	>({
		userId: selectedUserId,
	});
	const { data: messageData = [], isFetching: isFetchingMessages } =
		api.message.findMessageByUserId.useQuery<IMessage[]>({
			userId: selectedUserId,
		});

	return (
		<Card className='h-[max-content] w-[100%]'>
			<CardHeader>
				<CardTitle>Детальная информация по пользователю</CardTitle>
				<CardDescription>
					Click select user for more information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='posts' className='w-[100%]'>
					<TabsList>
						<TabsTrigger value='posts'>Посты</TabsTrigger>
						<TabsTrigger value='messages'>Сообщения</TabsTrigger>
						<TabsTrigger value='info'>Информация</TabsTrigger>
					</TabsList>
					<TabsContent value='posts'>
						<UserPosts posts={data} isFetching={isFetching} />
					</TabsContent>
					<TabsContent value='messages'>
						<UserMessages
							isFetching={isFetchingMessages}
							messages={messageData}
						/>
					</TabsContent>
					<TabsContent value='info'>
						<InfoUser />
					</TabsContent>
				</Tabs>
			</CardContent>
			{/*<CardFooter className='flex justify-between'>*/}
			{/*	<Button variant='outline'>Cancel</Button>*/}
			{/*	<Button>Deploy</Button>*/}
			{/*</CardFooter>*/}
		</Card>
	);
};
