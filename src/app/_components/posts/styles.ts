import styled from 'styled-components';

export const DivPostsWrapperSC = styled.div`
	display: grid;
	grid-template-columns: 500px;
	grid-template-rows: 3fr 1fr;
	height: 100%;
	width: 100%;
	justify-content: space-evenly;
	gap: 10px;
`;

export const DivBoxInfoSC = styled.div`
	display: grid;
	width: max-content;
	height: max-content;
	position: absolute;
	top: 67px;
	left: 0;
	color: antiquewhite;
`;

export const DivPostCreatorWrapperSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: 100%;
	grid-auto-rows: 60px;
`;

export const DivWrapperPostsSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	overflow: auto;
	grid-template-columns: 100%;
	grid-template-rows: 100%;
`;

export const DivWrapperListSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-columns: 100%;
	grid-auto-rows: max-content;
	gap: 10px;
`;

export const DivWrapperItemListSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
`;
