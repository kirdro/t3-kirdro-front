import { z } from 'zod';

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';

export const postRouter = createTRPCRouter({
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

	findPostsByUserId: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			if (input.userId !== '') {
				const posts = await ctx.db.post.findMany({
					where: { createdBy: { id: input.userId } },
				});
				return posts;
			}
			return [];
		}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		if (ctx.session.user.id !== '') {
			const post = await ctx.db.post.findFirst({
				orderBy: { createdAt: 'desc' },
				where: { createdBy: { id: ctx.session.user.id } },
			});

			return post ?? null;
		}
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});
