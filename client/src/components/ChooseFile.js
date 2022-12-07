import React from 'react';
import { DragAndDrop } from './DragAndDrop';

function ChooseFile({setImage}) {
	const fileUpload = React.useRef(null);

	function handleClick(e) {
		e.preventDefault();
		fileUpload.current.click();
	}

	function handleUpload(e) {
		e.preventDefault();
		const files = e.target.files[0];
		setImage(files);
	}

	return (
		<div className='container'>
			<h2 className='container__heading'>Upload your image</h2>
			<h5 className='container__subheading'>File should be Jpeg, Png,...</h5>
			<DragAndDrop setImage={setImage} />
			<p className='container__or'>OR</p>
			<>
				<button
					className='container__uploadBtn'
					onClick={handleClick}
				>
					Choose a file
				</button>
				<input
					type='file'
					ref={fileUpload}
					onChange={handleUpload}
					style={{ display: 'none' }}
					accept='image/jpeg, image/png'
				/>
			</>
		</div>
	);
}

export default ChooseFile;
