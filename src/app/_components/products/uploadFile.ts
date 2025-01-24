const uploadFile = async (
	file: File | null,
	asyncFunc: (params: {
		contentType: string;
		fileName: string;
		file: string;
	}) => Promise<{ url: string }>,
): Promise<string | null> => {
	if (!file) {
		return null;
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = async () => {
			try {
				if (typeof reader.result === 'string') {
					const base64 = reader.result.split(',')[1];
					if (base64) {
						const response = await asyncFunc({
							file: base64,
							fileName: file.name,
							contentType: file.type,
						});
						// console.log('Uploaded file URL:', response.url);
						resolve(response.url); // Возвращаем URL результата
					} else {
						resolve(null); // В случае отсутствия данных
					}
				} else {
					resolve(null); // В случае отсутствия данных
				}
			} catch (error) {
				reject(
					new Error('Ошибка чтения файла' + JSON.stringify(error)),
				); // Обработка ошибок
			}
		};

		reader.onerror = () => {
			reject(new Error('Ошибка чтения файла'));
		};

		reader.readAsDataURL(file); // Запускаем чтение файла
	});
};

export default uploadFile;
