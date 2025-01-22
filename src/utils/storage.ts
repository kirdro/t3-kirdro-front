import { S3Client } from '@aws-sdk/client-s3';
// import * as process from 'node:process';

// import { env } from "../env/server.mjs";

export const s3Client = new S3Client({
	endpoint: 'https://s3.timeweb.cloud',
	region: 'ru-1',
	credentials: {
		accessKeyId: process.env.STORAGE_ID,
		secretAccessKey: process.env.STORAGE_SECRET,
	},
	logger: console,
});
