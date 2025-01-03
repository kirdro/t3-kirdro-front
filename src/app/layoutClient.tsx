'use client';
import type { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export const LayoutClient: FC<{ children: ReactNode }> = ({ children }) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};
