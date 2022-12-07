import React from 'react';
import './App.css';
import UploadUI from './components/UploadUI';

function App() {
	const [message, setMessage] = React.useState('');
	function handleDrop(e) {
		e.preventDefault();
	}
	function handleDrag(e) {
		e.preventDefault();
	}

	return (
		<div
			className='App'
			onDrop={handleDrop}
			onDragOver={handleDrag}
		>
			{message !== '' ? (
				<div className='message__container'>
					<h4 className='error__message'>
						{message}
						{/* <span
							className='remove__message'
							onClick={() => {
								setMessage('');
							}}
						>
							x
						</span> */}
					</h4>
				</div>
			) : null}
			<UploadUI
				BaseURL={process.env.REACT_APP_LOCALHOST_URL}
				setMessage={setMessage}
			/>
			<h4 className='footer'>
				created by{' '}
				<a
					href='https://devchallenges.io/portfolio/rushsh67'
					target='_blank'
					rel='noreferrer'
				>
					Rushikesh P.
				</a>{' '}
				- devChallenges.io
			</h4>
		</div>
	);
}

export default App;
