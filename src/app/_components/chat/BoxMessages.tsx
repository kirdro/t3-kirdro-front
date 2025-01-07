'use client';

import { DivBoxListSC, DivBoxMessagesSC } from '@/app/_components/chat/styles';
import { Message } from '@/app/_components/chat/Message';
import type { FC } from 'react';
import type { IMessage, IUserAut } from '@/interfaces/interfaces';

interface IProps {
	messages: IMessage[];
	user: IUserAut;
}

export const BoxMessages: FC<IProps> = (props) => {
	const { messages, user } = props;

	return (
		<DivBoxMessagesSC>
			<DivBoxListSC>
				{messages.map((item, i) => {
					return (
						<Message
							key={`fasfdsdf${i}`}
							text={item.text}
							dateTime={item.createdAt}
							img={item.userImg}
							isLeft={item.userId === user.id}
						/>
					);
				})}
			</DivBoxListSC>
		</DivBoxMessagesSC>
	);
};
