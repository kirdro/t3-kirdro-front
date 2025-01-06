'use client';
import {
	BoxTextAndTimeSC,
	DivBoxMessageRightSC,
	SpanDateTimeSC,
	TextMessageSC,
} from '@/app/_components/chat/styles';
import { Avatar } from '@nextui-org/react';
import type { FC } from 'react';
import { DateTime } from 'luxon';

interface IProps {
	text: string;
	dateTime: Date;
	img: string;
}

export const Message: FC<IProps> = (props) => {
	const { text, dateTime, img } = props;

	return (
		<DivBoxMessageRightSC>
			<Avatar isBordered color='default' src={img} />
			<BoxTextAndTimeSC>
				<SpanDateTimeSC>
					{DateTime.fromJSDate(new Date(dateTime)).toFormat('FF')}
				</SpanDateTimeSC>
				<TextMessageSC>{text}</TextMessageSC>
			</BoxTextAndTimeSC>
		</DivBoxMessageRightSC>
	);
};
