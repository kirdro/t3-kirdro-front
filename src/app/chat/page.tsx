import { ChatWrapper } from '@/app/_components/chat/ChatWrapper';
import { auth } from '@/server/auth';
import type { IUserAut } from '@/interfaces/interfaces';

const Page = async () => {
	const session = await auth();
	return (
		<div className={'w-dvw bg-blue-900'}>
			{session?.user && <ChatWrapper user={session.user as IUserAut} />}
		</div>
	);
};

export default Page;
