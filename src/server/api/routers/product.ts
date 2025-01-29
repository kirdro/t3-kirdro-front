import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import _ from 'lodash';

/**
 * Router for handling product-related API endpoints.
 */
export const productRouter = createTRPCRouter({
	/**
	 * Endpoint to create a new product.
	 *
	 * @input {Object} input - The input object.
	 * @input {string} input.name - The name of the product.
	 * @input {string} input.description - The description of the product.
	 * @input {number} input.price - The price of the product.
	 * @input {number} input.subSectionId - The ID of the sub-section the product belongs to.
	 * @input {string} input.image - The main image URL of the product.
	 * @input {Array<string>} input.images - The array of additional image URLs of the product.
	 * @input {boolean} input.isPublished - The publication status of the product.
	 *
	 * @returns {Promise<Object>} The created product.
	 */
	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string(),
				price: z.number(),
				subSectionId: z.number(),
				image: z.string(),
				images: z.array(z.string()),
				isPublished: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.product.create({
				data: {
					name: input.name,
					description: input.description,
					price: input.price,
					subSection: { connect: { id: input.subSectionId } },
					image: input.image,
					images: { set: input.images },
					isPublished: input.isPublished,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	/**
	 * Endpoint to get all products.
	 *
	 * @returns {Promise<Array>} The list of all products.
	 */
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const products = await ctx.db.product.findMany();
		return _.sortBy(products, 'id');
	}),

	/**
	 * Endpoint to get all products by sub-section ID.
	 *
	 * @input {Object} input - The input object.
	 * @input {number} input.id - The ID of the sub-section.
	 *
	 * @returns {Promise<Array>} The list of products for the given sub-section ID.
	 */
	getAllBySubSectionId: protectedProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const products = await ctx.db.product.findMany({
				where: {
					subSectionId: input.id
				}
			});
			return _.sortBy(products, 'id');
		}),

	update: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string(),
				price: z.number(),
				image: z.string(),
				images: z.array(z.string()),
				isPublished: z.boolean(),
				id: z.number()
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.product.update({
				where: { id: input.id },
				data: {
					name: input.name,
					description: input.description,
					price: input.price,
					image: input.image,
					images: { set: input.images },
					isPublished: input.isPublished,
				},
			});
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.product.delete({ where: { id: input.id } });
		}),
});
