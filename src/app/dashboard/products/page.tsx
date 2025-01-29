import { cn } from '@/lib/utils';
import { api, HydrateClient } from '@/trpc/server';
import { Products } from '@/app/_components/products/Products';
import { auth } from '@/server/auth';

const Page = async () => {
	const session = await auth();
	const data = await api.subSection.getAll();
	return (
		<HydrateClient>
			<div className={cn('grid h-full w-full p-6 box-cols-rows', 'box-border')}>
				{session && <Products listSybSections={data} />}
			</div>
		</HydrateClient>
	);
};

export default Page;
