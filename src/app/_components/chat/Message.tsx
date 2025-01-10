'use client';
import {
	BoxTextAndTimeSC,
	DivBoxMessageLeftSC,
	DivBoxMessageRightSC,
	SpanDateTimeSC,
	TextMessageCurrentUserSC,
	TextMessageSC,
} from '@/app/_components/chat/styles';
import { Avatar } from '@nextui-org/react';
import type { FC } from 'react';
import getDateTime from '@/app/tools/getDateTime';

interface IProps {
	text: string;
	dateTime: Date;
	img: string;
	isLeft: boolean;
}

export const Message: FC<IProps> = (props) => {
	const { text, dateTime, img, isLeft } = props;

	if (isLeft) {
		return (
			<DivBoxMessageLeftSC>
				<BoxTextAndTimeSC>
					<SpanDateTimeSC>
						{getDateTime(dateTime, 'FF')}
					</SpanDateTimeSC>
					<TextMessageCurrentUserSC>{text}</TextMessageCurrentUserSC>
				</BoxTextAndTimeSC>
				<Avatar isBordered color='default' src={img} />
			</DivBoxMessageLeftSC>
		);
	}

	return (
		<DivBoxMessageRightSC>
			<Avatar isBordered color='default' src={img} />
			<BoxTextAndTimeSC>
				<SpanDateTimeSC>{getDateTime(dateTime, 'FF')}</SpanDateTimeSC>
				<TextMessageSC>{text}</TextMessageSC>
			</BoxTextAndTimeSC>
		</DivBoxMessageRightSC>
	);
};
