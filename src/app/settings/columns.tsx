'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { TRole } from '@/interfaces/interfaces';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface IUserTable {
	createdAt: Date;
	id: string;
	name: string;
	email: string;
	image: string | null;
	role: TRole;
}

export const columns: ColumnDef<IUserTable>[] = [
	{
		id: 'select',
		cell: ({ row, table }) => {
			const onClick = () => {
				table.toggleAllPageRowsSelected(false);
				row.toggleSelected(!row.getIsSelected());
			};

			return (
				<Button onClick={onClick} variant={'ghost'}>
					Select
				</Button>
			);
		},
	},
	{
		accessorKey: 'id',
		header: 'id',
	},
	{
		accessorKey: 'createdAt',
		header: 'CreatedAt',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => {
			const image: string = row.getValue('image');
			return image === '---' ?
					<div className='text-right font-medium'>{image}</div>
				:	<Avatar>
						<AvatarImage src={image} />
						<AvatarFallback>Image</AvatarFallback>
					</Avatar>;
		},
	},
	{
		accessorKey: 'role',
		header: 'Role',
	},
];
