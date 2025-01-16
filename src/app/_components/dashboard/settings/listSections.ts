import type { ISectionsSidebar } from '@/interfaces/interfaces';
import { Inbox, Users } from 'lucide-react';

/**
 * List of sections for the sidebar in the dashboard.
 * Each section contains a key, href, title, and icon.
 *
 * @type {ISectionsSidebar[]}
 */

const listSections: ISectionsSidebar[] = [
	{
		key: '1',
		href: '/dashboard/users',
		title: 'Users',
		icon: Users,
	},
	{
		key: '2',
		href: '/dashboard/sections',
		title: 'Sections',
		icon: Inbox,
	},
];

export default listSections;
