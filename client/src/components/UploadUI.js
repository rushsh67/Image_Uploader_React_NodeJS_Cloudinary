import React, { useEffect } from 'react';
import axios from 'axios';
import ChooseFile from './ChooseFile';
import LoadingView from './Loading';
import UploadView from './UploadView';

function UploadUI({ BaseURL }) {
	let [isLoading, setIsLoading] = React.useState(false);
	let [uploadedImage, setUploadedImage] = React.useState(null);
	let [image, setImage] = React.useState(null);

	async function handleFile() {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await axios.post(`${BaseURL}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const { fileName, filePath } = res.data;
			setUploadedImage({ fileName, filePath });
		} catch (error) {
			if (error.response.status === 500) {
				console.log('There was problem with server');
			} else {
				console.log(error.response.data.message);
			}
		}
	}
	useEffect(() => {
		if (image === null) return;
		setIsLoading(true);
		handleFile();
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, [image]);

	if (isLoading) {
		return <LoadingView />;
	}

	return (
		<>
			{uploadedImage ? (
				<UploadView uploadedImage={uploadedImage} />
			) : (
				<ChooseFile setImage={setImage} />
			)}
		</>
	);
}

export default UploadUI;
