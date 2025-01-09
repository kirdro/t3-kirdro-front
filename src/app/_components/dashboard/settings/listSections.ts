import type { ISectionsSidebar } from '@/interfaces/interfaces';
import { Home, Inbox } from 'lucide-react';

const listSections: ISectionsSidebar[] = [
	{
		key: '1',
		href: '/dashboard/users',
		title: 'Users',
		icon: Home,
	},
	{
		key: '2',
		href: '#anchor-demo-static',
		title: 'Static demo',
		icon: Inbox,
	},
];

export default listSections;
