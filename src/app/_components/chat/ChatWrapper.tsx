'use client';
import { DivWrapperChatSC } from '@/app/_components/chat/styles';
import { type FC, useEffect, useState } from 'react';
import type { IMessage, IUserAut } from '@/interfaces/interfaces';
import { socket } from '@/utils/socket';
import { DivBoxInfoSC } from '@/app/_components/posts/styles';
import { BoxMessages } from '@/app/_components/chat/BoxMessages';
import { MessageCreator } from '@/app/_components/chat/MessageCreator';

interface IProps {
	user: IUserAut;
}

export const ChatWrapper: FC<IProps> = (props) => {
	const { user } = props;
	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		// if (socket.connected) {
		// 	onConnect();
		// }
		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);
			socket.io.engine.on('upgrade', (transport) => {
				setTransport(transport.name);
			});

			socket.emit('events', { test: 'test' });
			// socket.emit('identity', 0, (response) =>
			// 	console.log('Identity:', response),
			// );
		}
		setTransport(socket.io.engine.transport.name);
		setIsConnected(socket.connected);
		function onDisconnect() {
			setIsConnected(false);
			setTransport('N/A');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('createMessage', (value: IMessage[]) => {
			setIsLoading(false);
			setMessages(value);
		});

		socket.emit('getAllMessage', 0, (value: IMessage[]) => {
			setMessages(value);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, []);

	const send = (data: { text: string }) => {
		socket.emit('createMessage', {
			text: data.text,
			id: user.id,
		});
		setIsLoading(true);
	};
	return (
		<DivWrapperChatSC>
			<DivBoxInfoSC>
				<p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
				<p>Transport: {transport}</p>
				{/*<button onClick={onClick}>click</button>*/}
			</DivBoxInfoSC>

			<BoxMessages messages={messages} user={user} />
			<MessageCreator onClick={send} />
		</DivWrapperChatSC>
	);
};
