import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '@/utils/storage';

export const uploadToS3 = async (
	file: Buffer,
	key: string,
	contentType: string,
) => {
	const bucketName = process.env.AWS_BUCKET_NAME!;

	const params = {
		Bucket: bucketName,
		Key: key,
		Body: file,
		ContentType: contentType,
	};

	const command = new PutObjectCommand(params);
	await s3Client.send(command);

	return `https://s3.timeweb.cloud/${bucketName}/${key}`;
};
