import React from 'react';
import { ReactComponent as DoneSVG } from '../assets/done.svg';

function UploadView({uploadedImage}) {
	let { fileName, filePath } = uploadedImage;


	return (
		<div className='uploaded__container'>
			<div className='uploaded__container__icon'>
				<div className='uploaded__container__icon__check'>
					<DoneSVG />
				</div>
			</div>
			<div className='uploaded__container__text'>
			Uploaded Successfully!
			</div>
			<div className='uploaded__container__image'>
			<img src={filePath} alt={fileName}/>
			</div>
			<div className='uploaded__container__link'>
				<div className='uploaded__container__link__url'>{filePath}</div>
				<button className='uploaded__container__link__copy-btn' onClick={(e)=>{
					navigator.clipboard.writeText(filePath)
					e.target.innerHTML = 'Copied';
					e.target.disabled = true;
					console.log("clicked");
				}}>Copy Link</button>
			</div>
		</div>
	);
}

export default UploadView;
