import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DivBoxPostsUserPostsSC,
	DivWrapperMessageScrollSC,
} from '@/app/_components/users/styles';
import type { IMessage } from '@/interfaces/interfaces';
import type { FC } from 'react';
import { Message } from '@/app/_components/chat/Message';

interface IProps {
	messages: IMessage[];
	isFetching: boolean;
}

export const UserMessages: FC<IProps> = (props) => {
	const { isFetching, messages } = props;

	return (
		<Card className='h-100vh_-_320px grid-card grid w-[100%]'>
			<CardHeader>
				<CardTitle>
					Сообщения пользователя ({messages.length} шт.)
				</CardTitle>
				{/*<CardDescription>*/}
				{/*	Deploy your new project in one-click.*/}
				{/*</CardDescription>*/}
			</CardHeader>
			<CardContent className={cn('h-full')}>
				{isFetching ?
					<div className='flex flex-col space-y-3'>
						<Skeleton className='h-[125px] w-[250px] rounded-xl' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</div>
					</div>
				:	<DivWrapperMessageScrollSC>
						<DivBoxPostsUserPostsSC>
							{messages.map((item, i) => {
								return (
									<Message
										key={`fasfdsdf${i}`}
										text={item.text}
										dateTime={item.createdAt}
										img={item.userImg}
										isLeft={false}
									/>
								);
							})}
						</DivBoxPostsUserPostsSC>
					</DivWrapperMessageScrollSC>
				}
			</CardContent>
			<CardFooter className='flex justify-between'></CardFooter>
		</Card>
	);
};
