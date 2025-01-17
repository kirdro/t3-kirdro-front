import { z } from 'zod';

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	// create: protectedProcedure
	// 	.input(
	// 		z.object({
	// 			name: z.string().min(1),
	// 			content: z.string(),
	// 		}),
	// 	)
	// 	.mutation(async ({ ctx, input }) => {
	// 		return ctx.db.post.create({
	// 			data: {
	// 				name: input.name,
	// 				userImg:ctx.session.user.image ? ctx.session.user.image : '',
	// 				userName: ctx.session.user.name ? ctx.session.user.name : '',
	// 				content: input.content,
	// 				createdBy: { connect: { id: ctx.session.user.id } },
	// 			},
	// 		});
	// 	}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const users = await ctx.db.user.findMany({});
		return users;
	}),

	// getLatest: protectedProcedure.query(async ({ ctx }) => {
	// 	const post = await ctx.db.post.findFirst({
	// 		orderBy: { createdAt: 'desc' },
	// 		where: { createdBy: { id: ctx.session.user.id } },
	// 	});
	//
	// 	return post ?? null;
	// }),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});
