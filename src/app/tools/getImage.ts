const getImage = (image: File, func: (data: string) => void) => {
	const reader = new FileReader();
	reader.onload = () => {
		func(reader.result as string);
	};
	reader.readAsDataURL(image);
};

export default getImage;
