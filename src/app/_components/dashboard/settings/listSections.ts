import type { ISectionsSidebar } from '@/interfaces/interfaces';
import { LayoutPanelTop, Package, TableOfContents, Users } from 'lucide-react';

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
		icon: TableOfContents,
	},
	{
		key: '3',
		href: '/dashboard/subSections',
		title: 'Sub sections',
		icon: LayoutPanelTop,
	},
	{
		key: '4',
		href: '/dashboard/products',
		title: 'Продукты',
		icon: Package,
	},
];

export default listSections;
