import { Users } from '@/app/_components/users/Users';
import { auth } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';

const Page = async () => {
	const session = await auth();
	if (session?.user) {
		void api.user.getAll.prefetch();
	}
	return (
		<HydrateClient>
			<div>
				{session?.user ?
					<Users />
				:	null}
			</div>
		</HydrateClient>
	);
};

export default Page;
