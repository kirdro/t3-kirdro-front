'use client';
import { ProductsWrapperSC } from '@/app/_components/products/styles';
import { Card, Tab, Tabs } from '@heroui/react';
import type { ISubSection } from '@/interfaces/interfaces';
import type { FC } from 'react';
import { CardBodyCustom } from '@/app/_components/products/CardBody';
import { cn } from '@/lib/utils';

interface IProps {
	listSybSections: ISubSection[];
}

export const Products: FC<IProps> = (props) => {
	const { listSybSections } = props;
	// const data = await api.subSection.getAll();
	console.log('>>>>><><>>', listSybSections);

	return (
		<ProductsWrapperSC>
			<Tabs aria-label='Options'>
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
