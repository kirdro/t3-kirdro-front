import { useEffect, useRef } from 'react';

const useScrollToBottom = (data: unknown) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			// ref.current.scroll({ top: ref.current.scrollHeight });
			// ref.current.scrollTop = ref.current.scrollHeight;
			ref.current.scrollIntoView({ block: 'end' });
		}

		// window.scrollTo(0, 0);
	}, [data]);

	return ref;
};

export default useScrollToBottom;
