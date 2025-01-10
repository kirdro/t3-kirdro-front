import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { DivBoxPostsUserPostsSC } from '@/app/_components/users/styles';
import { IPost } from '@/interfaces/interfaces';
import { FC } from 'react';
import { UserPost } from '@/app/_components/users/components/UserPost';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface IProps {
	posts: IPost[];
	isFetching: boolean;
}

export const UserPosts: FC<IProps> = (props) => {
	const { posts, isFetching } = props;

	return (
		<Card className='h-100vh_-_320px grid-card grid w-[100%]'>
			<CardHeader>
				<CardTitle>Посты пользователя ({posts.length} шт.)</CardTitle>
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
				:	<DivBoxPostsUserPostsSC>
						{posts.map((item, i) => {
							return (
								<UserPost
									post={item}
									key={`sfdgsdfgsdfg${i}`}
								/>
							);
						})}
					</DivBoxPostsUserPostsSC>
				}
			</CardContent>
			<CardFooter className='flex justify-between'></CardFooter>
		</Card>
	);
};
