'use client';
import type { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Nav } from '@/app/_components/navBar/Nav';
import { DivWrapperLayoutClientSC } from '@/app/styles';
import type { ISession } from '@/interfaces/interfaces';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const LayoutClient: FC<{
	children: ReactNode;
	session: ISession | null;
}> = ({ children, session }) => {
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
