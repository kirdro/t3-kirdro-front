import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
} from '@nextui-org/react';
import type { IPost } from '@/interfaces/interfaces';
import type { FC } from 'react';

interface IProps {
	post: IPost;
}

export const UserPost: FC<IProps> = (props) => {
	const { post } = props;

	return (
		<Card className='max-w-[340px]'>
			<CardHeader className='justify-between'>
				<div className='flex gap-5'>
					<Avatar
						isBordered
						radius='full'
						size='md'
						src={post.userImg}
					/>
					<div className='flex flex-col items-start justify-center gap-1'>
						<h4 className='text-small font-semibold leading-none text-default-600'>
							{post.name}
						</h4>
						<h5 className='text-small tracking-tight text-default-400'>
							@{post.userName}
						</h5>
					</div>
				</div>
			</CardHeader>
			<CardBody className='px-3 py-0 text-small text-default-400'>
				{post.content}
			</CardBody>
			<CardFooter className='gap-3'>
				<div className='flex gap-1'>
					<p className='text-small font-semibold text-default-400'>
						0
					</p>
					<p className='text-small text-default-400'>Following</p>
				</div>
				<div className='flex gap-1'>
					<p className='text-small font-semibold text-default-400'>
						0
					</p>
					<p className='text-small text-default-400'>Followers</p>
				</div>
			</CardFooter>
		</Card>
	);
};
