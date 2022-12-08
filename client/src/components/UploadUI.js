import React, { useEffect } from 'react';
import axios from 'axios';
import ChooseFile from './ChooseFile';
import LoadingView from './Loading';
import UploadView from './UploadView';
import MessageComp from './MessageComp';

function UploadUI({ BaseURL,msg, setMessage }) {
	let [isLoading, setIsLoading] = React.useState(false);
	let [uploadedImage, setUploadedImage] = React.useState(null);
	let [image, setImage] = React.useState(null);

	async function handleFile() {
		setIsLoading(true);
		setMessage('');
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await axios.post(`${BaseURL}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const { fileName, filePath, message } = res.data;
			if (message) setMessage(message);
			setUploadedImage({ fileName, filePath });
			setIsLoading(false);
		} catch (error) {
			setMessage(error.response.data.message);
			setIsLoading(false);
		}
	}
	useEffect(() => {
		if (image === null) return;
		setIsLoading(true);
		handleFile();
	}, [image]);

	if (isLoading) {
		return <LoadingView />;
	}

	return (
		<>
		<MessageComp msg={msg} setMessage={setMessage} />
			{uploadedImage ? (
				<UploadView
					uploadedImage={uploadedImage}
					setUploadedImage={setUploadedImage}
					setMessage={setMessage}
				/>
			) : (
				<ChooseFile setImage={setImage} />
			)}
		</>
	);
}

export default UploadUI;
