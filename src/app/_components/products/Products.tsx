'use client';
import { ProductsWrapperSC } from '@/app/_components/products/styles';
import { Card, Tab, Tabs } from '@heroui/react';
import type { ISubSection } from '@/interfaces/interfaces';
import type { FC } from 'react';
import { CardBodyCustom } from '@/app/_components/products/CardBody';
import { cn } from '@/lib/utils';
import { useGeneralStore } from '@/store/useGeneralStore';

interface IProps {
	listSybSections: ISubSection[];
}

export const Products: FC<IProps> = (props) => {
	const { listSybSections } = props;
	// const data = await api.subSection.getAll();
	// console.log('>>>>><><>>', listSybSections);
	const { updateGeneralStore } = useGeneralStore();
	const onSelectionChange = (key: React.Key) => {
		updateGeneralStore({
			selectedProduct: null,
		}).catch((err: Error) => {
			console.log(err.message);
		});
	};

	return (
		<ProductsWrapperSC>
			<Tabs aria-label='Options' onSelectionChange={onSelectionChange}>
				{listSybSections.map((subSection) => (
					<Tab
						key={`product-${subSection.id}`}
						title={subSection.name}
					>
						<Card className={cn('h-full')}>
							<CardBodyCustom subSection={subSection} />
						</Card>
					</Tab>
				))}
			</Tabs>
		</ProductsWrapperSC>
	);
};
