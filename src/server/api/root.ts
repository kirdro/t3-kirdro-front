import { postRouter } from '@/server/api/routers/post';
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { userRouter } from '@/server/api/routers/user';
import { messageRouter } from '@/server/api/routers/message';
import { sectionRouter } from '@/server/api/routers/section';
import { subSectionRouter } from '@/server/api/routers/subSection';
import { imageRouter } from '@/server/api/routers/image';
import { productRouter } from '@/server/api/routers/product';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	post: postRouter,
	user: userRouter,
	message: messageRouter,
	section: sectionRouter,
	subSection: subSectionRouter,
	image: imageRouter,
	product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
