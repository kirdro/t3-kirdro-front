'use client';

import { type FC, useEffect, useState } from 'react';
import { socket } from '@/utils/socket';
import {
	DivBoxInfoSC,
	DivPostsWrapperSC,
} from '@/app/_components/posts/styles';
import { PostCreator } from '@/app/_components/posts/PostCreator';
import type { IPost, IUser } from '@/interfaces/interfaces';
import { PostList } from '@/app/_components/posts/PostList';

interface IProps {
	user: IUser;
}

export const PostsWrapper: FC<IProps> = (props) => {
	const { user } = props;
	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');
	const [posts, setPosts] = useState<IPost[]>([]);
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
		socket.on('createPost', (value: IPost[]) => {
			setIsLoading(false);
			setPosts(value);
		});

		socket.emit('getAllPosts', 0, (value: IPost[]) => {
			setPosts(value);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, []);

	const send = (data: { title: string; content: string }) => {
		socket.emit('createPost', {
			title: data.title,
			content: data.content,
			id: user.id,
			userImg: user.image ? user.image : '',
			userName: user.name ? user.name : '',
		});
		setIsLoading(true);
	};

	// const onClick = () => {
	// 	socket.emit('createPost', {
	// 		title: 'fddxzczXasdf',
	// 		content: 'dfsafZXZdasdfsfasd',
	// 		authorEmail: 'kirdro@yandex.ru',
	// 	});
	// };

	return (
		<DivPostsWrapperSC>
			<DivBoxInfoSC>
				<p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
				<p>Transport: {transport}</p>
				{/*<button onClick={onClick}>click</button>*/}
			</DivBoxInfoSC>
			<PostList posts={posts} />
			<PostCreator isLoading={isLoading} onClick={send} />
		</DivPostsWrapperSC>
	);
};
