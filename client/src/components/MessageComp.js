import React from 'react';

function MessageComp({ msg, setMessage }) {
	return (
		<div className='message__container'>
			{msg !== '' ? (
				<>
					<h4 className='error__message'>{msg}</h4>
					<span
						className='remove__message'
						onClick={() => {
							setMessage('');
						}}
					>
						x
					</span>
				</>
			) : null}
		</div>
	);
}

export default MessageComp;
