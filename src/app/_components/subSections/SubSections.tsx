'use client';

import { DivWrapperSubSectionsSC } from '@/app/_components/subSections/styles';
import { api } from '@/trpc/react';
import { Section } from '@/app/_components/subSections/Section';

export const SubSections = () => {
	const { data: sections, isFetching } =
		api.section.getAllSections.useQuery();

	return (
		<DivWrapperSubSectionsSC>
			{sections?.map((section) => (
				<Section
					key={`section-${section.id}`}
					// section={section}
					sectionId={section.id}
					sectionName={section.name}
					sectionPath={section.path}
				/>
			))}
		</DivWrapperSubSectionsSC>
	);
};
