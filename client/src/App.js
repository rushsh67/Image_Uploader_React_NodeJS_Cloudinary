import React from 'react';
import './App.css';
import UploadUI from './components/UploadUI';

function App() {
	const [msg, setMessage] = React.useState('');
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
			
			<UploadUI
				BaseURL={process.env.REACT_APP_LOCALHOST_URL}
				msg={msg}
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
