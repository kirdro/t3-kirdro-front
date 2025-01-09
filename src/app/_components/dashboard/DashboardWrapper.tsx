'use client';

import { DivWrapperDashboardSC } from '@/app/_components/dashboard/styles';
import type { FC } from 'react';

export const DashboardWrapper: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <DivWrapperDashboardSC>{children}</DivWrapperDashboardSC>;
};
