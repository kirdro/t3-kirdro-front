import styled from 'styled-components';

export const DivWrapperUsersSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	overflow: auto;
	padding: 20px;
	box-sizing: border-box;
	grid-template-rows: 100%;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;
export const DivWrapperMessageScrollSC = styled.div`
	display: grid;
	height: 100%;
	width: 100%;
	overflow: auto;
`;

export const DivBoxPostsUserPostsSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	overflow: auto;
	grid-template-columns: 100%;
	grid-auto-rows: max-content;
	gap: 10px;
`;

export const DivWrapperMessageUserSC = styled.div`
	display: grid;
	width: max-content;
	max-width: 300px;
	grid-template-rows: max-content;
	grid-template-columns: 60px auto;
`;

export const DivWrapperTextMessageUserSC = styled.div`
	display: grid;
	width: max-content;
	max-width: 100%;
	height: max-content;
`;

export const DivWrapperUserInfoSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-columns: 100%;
	grid-auto-rows: max-content;
`;
