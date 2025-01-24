'use client';
import styled from 'styled-components';

export const ProductsWrapperSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: max-content auto;
	grid-template-columns: 100%;
`;

export const DivWrapperProductSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100%;
	gap: 8px;
`;

export const DivProductLeftSideSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 100%;
	grid-template-rows: 100%;
`;

export const DivProductRightSideSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 100%;
	grid-template-rows: 100%;
`;

export const DivProductItemSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
`;

export const DivScrollWrapperSC = styled.div<{
	height: number;
}>`
	display: grid;
	width: 100%;
	height: ${({ height }) => height}px;
	overflow: auto;
`;
