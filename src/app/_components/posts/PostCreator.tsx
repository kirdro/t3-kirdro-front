'use client';
import { DivPostCreatorWrapperSC } from '@/app/_components/posts/styles';
import { Button, Input } from '@nextui-org/react';
import { type FC, useState } from 'react';

interface IProps {
	onClick: (data: { title: string; content: string }) => void;
	isLoading: boolean;
}

export const PostCreator: FC<IProps> = (props) => {
	const { onClick, isLoading } = props;
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const _onClick = () => {
		onClick({
			title,
			content,
		});
		setTitle('');
		setContent('');
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	return (
		<DivPostCreatorWrapperSC>
			<Input
				onChange={onChangeTitle}
				label='Title'
				size={'sm'}
				type='text'
				value={title}
			/>
			<Input
				onChange={onChangeContent}
				label='Content'
				size={'sm'}
				type='text'
				value={content}
			/>
			<Button isLoading={isLoading} onPress={_onClick} size='md'>
				Send
			</Button>
		</DivPostCreatorWrapperSC>
	);
};
