import styled from 'styled-components';

export const DivWrapperChatSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: calc(100% - 220px) 200px;
	grid-template-columns: 600px;
	justify-content: center;
	gap: 20px;
`;

export const DivBoxMessagesSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	border: 1px solid rgb(28, 51, 140);
	overflow: auto;
`;

export const DivBoxListSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-columns: 100%;
	grid-template-rows: max-content;
`;

export const DivBoxMessageRightSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-rows: 100%;
	grid-template-columns: 45px 3fr;
	padding: 10px;
	box-sizing: border-box;
`;
export const DivBoxMessageLeftSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-rows: 100%;
	grid-template-columns: 3fr 1fr;
`;

export const TextMessageSC = styled.div`
	display: grid;
	width: max-content;
	height: max-content;
	background: #012d2d;
	border: 1px solid rgb(1, 11, 52);
	border-radius: 10px;
	padding: 5px;
`;

export const BoxTextAndTimeSC = styled.div`
	display: grid;
	width: 100%;
	height: max-content;
	grid-template-columns: 100%;
	grid-template-rows: 20px auto;
`;

export const SpanDateTimeSC = styled.span`
	font-size: 12px;
	color: #838585;
`;

export const DivWrapperCreatorSC = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 100%;
`;
