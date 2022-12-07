import React from 'react';
import { ReactComponent as ImageSVG } from '../assets/image.svg';

export const DragAndDrop = ({setImage}) => {

	function handleDrag(e) {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.add('drag__active')
	}
	function handleDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		setImage(e.dataTransfer.files[0]);
	}
	return (
		<div
			className='container__dragDropBox'
			onDrop={handleDrop}
			onDragOver={handleDrag}
			// onDragEnd={(e)=>e.target.classList.remove('drag__active')}
			onDragLeave={(e)=>{
				if(e.target !== e.currentTarget) return;
				e.target.classList.remove('drag__active')
			}}
		>
			<div className='container__dragDropBox__vector1'>
				<ImageSVG />
			</div>
			<div className='container__dragDropBox__upload-text'>
				Drag & Drop your image here
			</div>
		</div>
	);
};
