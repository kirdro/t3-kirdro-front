import { auth } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';
import { cn } from '@/lib/utils';
import { SubSections } from '@/app/_components/subSections/SubSections';

const Page = async () => {
	const session = await auth();
	if (session?.user) {
		void api.section.getAllSections.prefetch();
		void api.subSection.getAll.prefetch();
	}

	return (
		<HydrateClient>
			<div className={cn('h-full w-full')}>
				{session && <SubSections />}
			</div>
		</HydrateClient>
	);
};

export default Page;
