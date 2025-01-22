import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { uploadToS3 } from '@/app/lib/s3';

/**
 * Router for handling section-related API endpoints.
 */
export const imageRouter = createTRPCRouter({
	createPresignedUrl: protectedProcedure
		.input(
			z.object({
				contentType: z.string(),
				fileName: z.string(),
				file: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { contentType } = input;
			const buffer = Buffer.from(input.file, 'base64');
			const url = await uploadToS3(
				buffer,
				input.fileName,
				input.contentType,
			);
			return { url };
		}),
});
