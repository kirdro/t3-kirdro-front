import { Sections } from '@/app/_components/sections/Sections';
import { cn } from '@/lib/utils';
import { api, HydrateClient } from '@/trpc/server';
import { auth } from '@/server/auth';

const Page = async () => {
	const session = await auth();
	if (session?.user) {
		void api.section.getAllSections.prefetch();
	}
	return (
		<HydrateClient>
			<div className={cn('h-full w-full')}>
				<Sections />
			</div>
		</HydrateClient>
	);
};

export default Page;
