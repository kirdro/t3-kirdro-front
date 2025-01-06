import styled from 'styled-components';

export const DivWrapperLayoutClientSC = styled.div`
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 64px calc(100% - 64px);
`;
