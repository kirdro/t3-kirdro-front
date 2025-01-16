'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import listSections from '@/app/_components/dashboard/settings/listSections';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * List of sections for the sidebar in the dashboard.
 * Each section contains a key, href, title, and icon.
 *
 * @type {ISectionsSidebar[]}
 */

export const SidebarWrapper = () => {
	const pathname = usePathname();

	return (
		<div className={'bg-gray-800'}>
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Application</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{listSections.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											isActive={pathname === item.href}
											asChild
										>
											<Link href={item.href}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</div>
	);
};
