import styled from 'styled-components';

export const DivWrapperDashboardSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-columns: max-content auto;
	grid-template-rows: 100%;
`;

export const DivWrapperDashboardContentSC = styled.div`
	display: grid;
	width: 100%;
	height: calc(100vh - 64px);
`;
