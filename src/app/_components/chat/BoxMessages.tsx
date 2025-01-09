'use client';

import { DivBoxListSC, DivBoxMessagesSC } from '@/app/_components/chat/styles';
import { Message } from '@/app/_components/chat/Message';
import type { FC } from 'react';
import type { IMessage, IUserAut } from '@/interfaces/interfaces';
import useScrollToBottom from '@/app/hooks/useScrollToBottom';

interface IProps {
	messages: IMessage[];
	user: IUserAut;
}

export const BoxMessages: FC<IProps> = (props) => {
	const { messages, user } = props;
	const refChat = useScrollToBottom(messages);
	return (
		<DivBoxMessagesSC>
			<DivBoxListSC>
				<div ref={refChat}>
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
				</div>
			</DivBoxListSC>
		</DivBoxMessagesSC>
	);
};
