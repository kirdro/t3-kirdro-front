import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

/**
 * Router for handling section-related API endpoints.
 */
export const sectionRouter = createTRPCRouter({
	/**
	 * Endpoint to create a new section.
	 *
	 * @input {Object} input - The input object.
	 * @input {string} input.name - The name of the section.
	 * @input {string} input.keyName - The key name of the section.
	 * @input {string} input.path - The path of the section.
	 *
	 * @returns {Promise<Object>} The created section.
	 */
	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				keyName: z.string(),
				path: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.section.create({
				data: {
					name: input.name,
					keyName: input.keyName,
					path: input.path,
				},
			});
		}),

	/**
	 * Endpoint to get all sections.
	 *
	 * @returns {Promise<Array>} The list of all sections.
	 */
	getAllSections: protectedProcedure.query(async ({ ctx }) => {
		const sections = await ctx.db.section.findMany();
		return sections;
	}),

	// findPostsByUserId: protectedProcedure
	// 	.input(
	// 		z.object({
	// 			userId: z.string(),
	// 		}),
	// 	)
	// 	.query(async ({ ctx, input }) => {
	// 		if (input.userId !== '') {
	// 			const posts = await ctx.db.post.findMany({
	// 				where: { createdBy: { id: input.userId } },
	// 			});
	// 			return posts;
	// 		}
	// 		return [];
	// 	}),
	//
	// getLatest: protectedProcedure.query(async ({ ctx }) => {
	// 	if (ctx.session.user.id !== '') {
	// 		const post = await ctx.db.post.findFirst({
	// 			orderBy: { createdAt: 'desc' },
	// 			where: { createdBy: { id: ctx.session.user.id } },
	// 		});
	//
	// 		return post ?? null;
	// 	}
	// }),
	//
	// getSecretMessage: protectedProcedure.query(() => {
	// 	return 'you can now see this secret message!';
	// }),
});
