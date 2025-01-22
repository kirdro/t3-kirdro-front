import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';
import { type FC } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IProps {
	isOpen: boolean;
	onOpenChange: () => void;
	children: React.ReactNode;
	onSave: () => void;
}

export const CustomModal: FC<IProps> = (props) => {
	const { isOpen, onOpenChange, children, onSave } = props;

	return (
		<Modal size={'5xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Создание продукта
						</ModalHeader>
						<ModalBody>
							<ScrollArea className='box-border h-[600px] w-full rounded-md border p-1'>
								{children}
							</ScrollArea>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='light'
								onPress={onClose}
							>
								Отмена
							</Button>
							<Button color='primary' onPress={onSave}>
								Создать
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
