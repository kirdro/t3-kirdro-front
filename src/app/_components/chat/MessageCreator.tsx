'use client';

import { DivWrapperCreatorSC } from '@/app/_components/chat/styles';
import { Button, Textarea } from '@nextui-org/react';
import { FC, useState } from 'react';

interface IProps {
	onClick: (data: { text: string }) => void;
	isLoading: boolean;
}

export const MessageCreator: FC<IProps> = (props) => {
	const { onClick, isLoading } = props;
	const [text, setText] = useState<string>('');

	const onPress = () => {
		if (Boolean(text)) {
			onClick({ text });
			setText('');
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	return (
		<DivWrapperCreatorSC>
			<Textarea
				onChange={onChange}
				value={text}
				label='Message'
				minRows={2}
				placeholder='Message'
				variant={'bordered'}
			/>
			<Button
				isLoading={isLoading}
				onPress={onPress}
				color='primary'
				variant='ghost'
			>
				Send
			</Button>
		</DivWrapperCreatorSC>
	);
};
