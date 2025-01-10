import { DashboardWrapper } from '@/app/_components/dashboard/DashboardWrapper';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarWrapper } from '@/app/_components/dashboard/Sidebar';
import { cn } from '@/lib/utils';
import { DivWrapperDashboardContentSC } from '@/app/_components/dashboard/styles';

const DashboardLayout = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<DashboardWrapper>
			<SidebarProvider>
				<SidebarWrapper />
				<div className={cn('DivWrapperDashboardContentSC')}>
					<SidebarTrigger />
				</div>
			</SidebarProvider>
			{children}
		</DashboardWrapper>
	);
};

export default DashboardLayout;
