'use client';
import { type FC, type ReactNode, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Nav } from '@/app/_components/navBar/Nav';
import { DivWrapperLayoutClientSC } from '@/app/styles';
import type { ISession } from '@/interfaces/interfaces';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { HeroUIProvider } from '@heroui/react';

export const LayoutClient: FC<{
	children: ReactNode;
	session: ISession | null;
}> = ({ children, session }) => {
	const pathname = usePathname();
	useEffect(() => {
		if (!session && pathname !== '/') {
			redirect('/');
		} else if (session?.user.role === 'USER' && pathname !== '/') {
			redirect('/');
		}
		console.log('>>>>>>>>>>>>>>>>>>>>>>>', session);
	}, [session, pathname]);

	return (
		<NextUIProvider>
			<HeroUIProvider>
				<DivWrapperLayoutClientSC>
					<NextThemesProvider defaultTheme='dark'>
						<Nav session={session} />
						{children}
					</NextThemesProvider>
				</DivWrapperLayoutClientSC>
			</HeroUIProvider>
		</NextUIProvider>
	);
};
