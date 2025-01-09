'use client';
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import type { ISession } from '@/interfaces/interfaces';
import { usePathname } from 'next/navigation';

const arrayPaths: { name: string; path: string }[] = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Posts',
		path: '/posts',
	},
	{
		name: 'Chat',
		path: '/chat',
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
	},
];

export const Nav: FC<{ session: ISession | null }> = (props) => {
	const { session } = props;
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
		// className={'bg-black text-blue-300'}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<p className='font-bold text-inherit'>Kirdro</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden gap-4 sm:flex' justify='center'>
				{arrayPaths.map((item, i) => {
					return (
						<NavbarItem
							isActive={item.path === pathname}
							key={`asdfasdf${i}`}
						>
							<Link color='foreground' href={item.path}>
								{item.name}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>

			{session ?
				<NavbarContent as='div' justify='end'>
					<Dropdown
						className={'bg-black text-amber-50'}
						placement='bottom-end'
					>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								color='success'
								name={session.user.name}
								size='sm'
								src={session.user.image}
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem key='profile' className='h-14 gap-2'>
								<p className='font-semibold'>Signed in as</p>
								<p className='font-semibold'>
									{session.user.email}
								</p>
							</DropdownItem>
							<DropdownItem key='settings'>
								My Settings
							</DropdownItem>
							<DropdownItem key='team_settings'>
								Team Settings
							</DropdownItem>
							<DropdownItem key='analytics'>
								Analytics
							</DropdownItem>
							<DropdownItem key='system'>System</DropdownItem>
							<DropdownItem key='configurations'>
								Configurations
							</DropdownItem>
							<DropdownItem key='help_and_feedback'>
								Help & Feedback
							</DropdownItem>
							<DropdownItem key='logout' color='danger'>
								<Link href={'/api/auth/signout'}>Log Out</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>
			:	<NavbarContent justify='end'>
					{session ? null : (
						<NavbarItem className='hidden lg:flex'>
							<Link href='#'>Login</Link>
						</NavbarItem>
					)}
					<NavbarItem>
						<Button
							as={Link}
							color='primary'
							href={'/api/auth/signin'}
							variant='ghost'
						>
							Sign in
						</Button>
					</NavbarItem>
				</NavbarContent>
			}
			<NavbarMenu>
				{arrayPaths.map((item, index) => (
					<NavbarMenuItem key={`${item.name}-${index}`}>
						<Link
							className='w-full'
							color={
								index === 2 ? 'primary'
								: index === arrayPaths.length - 1 ?
									'danger'
								:	'foreground'
							}
							href={item.path}
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};
