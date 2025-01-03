import type { IPost } from '@/interfaces/interfaces';
import type { FC } from 'react';
import {
	DivWrapperListSC,
	DivWrapperPostsSC,
} from '@/app/_components/posts/styles';
import { ItemPost } from '@/app/_components/posts/ItemPost';

interface IProps {
	posts: IPost[];
}

export const PostList: FC<IProps> = (props) => {
	const { posts } = props;

	return (
		<DivWrapperPostsSC>
			<DivWrapperListSC>
				{posts.map((item, i) => {
					return <ItemPost post={item} key={`dsfakljfsa-${i}`} />;
				})}
			</DivWrapperListSC>
		</DivWrapperPostsSC>
	);
};
