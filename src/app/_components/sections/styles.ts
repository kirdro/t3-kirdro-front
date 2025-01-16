import styled from 'styled-components';

export const SectionsSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 100%;
	grid-template-rows: 100%;
`;

export const SectionContentSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: max-content;
	grid-template-rows: max-content;
	justify-content: space-evenly;
	padding: 10px;
	box-sizing: border-box;
`;
