'use client';
import {
	SectionContentSC,
	SectionsSC,
} from '@/app/_components/sections/styles';
import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import { api } from '@/trpc/react';
import { useEffect } from 'react';
import { useGeneralStore } from '@/store/useGeneralStore';
import type { ISection } from '@/interfaces/interfaces';
import { ModalWrapper } from '@/app/_components/sections/Modal';

export const AcmeLogo = () => {
	return (
		<svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
			<path
				clipRule='evenodd'
				d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
				fill='currentColor'
				fillRule='evenodd'
			/>
		</svg>
	);
};

export const Sections = () => {
	const { data, isFetching } =
		api.section.getAllSections.useQuery<ISection[]>();
	const { updateGeneralStore, getGeneralStore } = useGeneralStore();
	const { sections } = getGeneralStore();

	useEffect(() => {
		updateGeneralStore({
			sections: data ? data : [],
		}).catch((err) => {
			console.log(err);
		});
	}, [data]);

	return (
		<SectionsSC>
			<SectionContentSC>
				<Navbar className={`bg-blue-900`}>
					<NavbarBrand>
						<AcmeLogo />
						<p className='font-bold text-inherit'>ACME</p>
					</NavbarBrand>
					<NavbarContent
						className='hidden gap-4 sm:flex'
						justify='center'
					>
						{sections.map((section) => {
							return (
								<NavbarItem key={`sections-${section.id}`}>
									<Button
										// as={Link}
										color='primary'
										// href='#'
										variant='flat'
									>
										{section.name}
									</Button>
								</NavbarItem>
							);
						})}
						<NavbarItem>
							<ModalWrapper />
						</NavbarItem>
					</NavbarContent>
					<NavbarContent justify='end'>
						<NavbarItem>
							<Button
								as={Link}
								color='primary'
								href='#'
								variant='flat'
							>
								Sign Up
							</Button>
						</NavbarItem>
					</NavbarContent>
				</Navbar>
			</SectionContentSC>
		</SectionsSC>
	);
};
