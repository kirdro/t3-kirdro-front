import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import _ from 'lodash';

/**
 * Router for handling sub-section-related API endpoints.
 */
export const subSectionRouter = createTRPCRouter({
	/**
	 * Endpoint to create a new sub-section.
	 *
	 * @input {Object} input - The input object.
	 * @input {string} input.name - The name of the sub-section.
	 * @input {string} input.keyName - The key name of the sub-section.
	 * @input {string} input.path - The path of the sub-section.
	 * @input {number} input.sortId - The sort ID of the sub-section.
	 * @input {number} input.sectionId - The ID of the parent section.
	 *
	 * @returns {Promise<Object>} The created sub-section.
	 */
	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				keyName: z.string(),
				path: z.string(),
				sortId: z.number(),
				sectionId: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.subSection.create({
				data: {
					name: input.name,
					keyName: input.keyName,
					path: input.path,
					sortId: input.sortId,
					section: { connect: { id: input.sectionId } },
				},
			});
		}),

	/**
	 * Endpoint to get all sub-sections.
	 *
	 * @returns {Promise<Array>} The list of all sub-sections.
	 */
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const subSections = await ctx.db.subSection.findMany({});
		return _.sortBy(subSections, 'sortId');
	}),

	/**
	 * Endpoint to get sub-sections by section ID.
	 *
	 * @input {Object} input - The input object.
	 * @input {number} input.sectionId - The ID of the parent section.
	 *
	 * @returns {Promise<Array>} The list of sub-sections for the given section ID.
	 */
	getSubSectionsBySectionId: protectedProcedure
		.input(
			z.object({
				sectionId: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const subSections = await ctx.db.subSection.findMany({
				where: { sectionId: input.sectionId },
			});
			return _.sortBy(subSections, 'sortId');
		}),

	/**
	 * Endpoint to update an existing sub-section.
	 *
	 * @input {Object} input - The input object.
	 * @input {number} input.id - The ID of the sub-section to update.
	 * @input {string} input.name - The new name of the sub-section.
	 * @input {string} input.keyName - The new key name of the sub-section.
	 * @input {string} input.path - The new path of the sub-section.
	 * @input {number} input.sortId - The new sort ID of the sub-section.
	 *
	 * @returns {Promise<Object>} The updated sub-section.
	 */
	updateSubSection: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string().min(1),
				keyName: z.string(),
				path: z.string(),
				sortId: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.subSection.update({
				where: { id: input.id },
				data: {
					name: input.name,
					keyName: input.keyName,
					path: input.path,
					sortId: input.sortId,
				},
			});
		}),

	/**
	 * Endpoint to delete a sub-section.
	 *
	 * @input {Object} input - The input object.
	 * @input {number} input.id - The ID of the sub-section to delete.
	 *
	 * @returns {Promise<Object>} The deleted sub-section.
	 */
	deleteSubSection: protectedProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.subSection.delete({
				where: { id: input.id },
			});
		}),
});
