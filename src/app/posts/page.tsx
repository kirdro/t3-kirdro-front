import { PostsWrapper } from '@/app/_components/posts/PostsWrapper';
import { auth } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import { IUser } from '@/interfaces/interfaces';

const Page = async () => {
	const session = await auth();
	return (
		<HydrateClient>
			<div className={'grid-row-100 grid h-dvh w-dvw bg-black'}>
				{session?.user && (
					<PostsWrapper user={session?.user as IUser} />
				)}
			</div>
		</HydrateClient>
	);
};

export default Page;
