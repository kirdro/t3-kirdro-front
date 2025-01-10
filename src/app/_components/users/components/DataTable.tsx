'use client';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

interface DataTableProps<TData extends { id: string }, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onSelect: (id: string | undefined) => Promise<void>;
}

export function DataTable<TData extends { id: string }, TValue>({
	columns,
	data,
	onSelect,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	useEffect(() => {
		if (table.getSelectedRowModel().rows.length > 0) {
			// console.log(
			// 	'asddfasfsadfasdf',
			// 	table.getSelectedRowModel().rows[0]?.original.id,
			// );

			onSelect(table.getSelectedRowModel().rows[0]?.original.id).catch(
				(err) => {
					console.log(err);
				},
			);
		} else {
			onSelect('').catch((err) => {
				console.log(err);
			});
		}
	}, [table.getSelectedRowModel().rows, onSelect]);

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ?
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					:	<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'
							>
								No results.
							</TableCell>
						</TableRow>
					}
				</TableBody>
			</Table>
		</div>
	);
}
