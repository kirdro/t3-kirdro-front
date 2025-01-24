import { S3Client } from '@aws-sdk/client-s3';

if (!process.env.STORAGE_ID || !process.env.STORAGE_SECRET) {
throw new Error('Storage credentials are not configured');
}

export const s3Client = new S3Client({
endpoint: 'https://s3.timeweb.cloud',
region: 'ru-1',
credentials: {
    accessKeyId: process.env.STORAGE_ID,
    secretAccessKey: process.env.STORAGE_SECRET,
},
logger: console,
});
