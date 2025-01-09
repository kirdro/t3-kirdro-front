'use client';
import { type FC, ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Nav } from '@/app/_components/navBar/Nav';
import { DivWrapperLayoutClientSC } from '@/app/styles';
import type { ISession } from '@/interfaces/interfaces';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';

export const LayoutClient: FC<{
	children: ReactNode;
	session: ISession | null;
}> = ({ children, session }) => {
	const pathname = usePathname();
	useEffect(() => {
		if (!session && pathname !== '/') {
			redirect('/');
		}
	}, [session, pathname]);

	return (
		<NextUIProvider>
			<DivWrapperLayoutClientSC>
				<NextThemesProvider defaultTheme='dark'>
					<Nav session={session} />
					{children}
				</NextThemesProvider>
			</DivWrapperLayoutClientSC>
		</NextUIProvider>
	);
};
