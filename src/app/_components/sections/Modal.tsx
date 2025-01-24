'use client';
import { Modal, ModalContent } from '@nextui-org/react';
import { FC } from 'react';

interface IProps {
	isOpen: boolean;
	onOpenChange: () => void;
	onClose: () => void;
	children?: React.ReactNode;
}

export const ModalWrapper: FC<IProps> = (props) => {
	const { isOpen, onOpenChange, onClose, children } = props;

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>{(onClose) => children}</ModalContent>
			</Modal>
		</>
	);
};
