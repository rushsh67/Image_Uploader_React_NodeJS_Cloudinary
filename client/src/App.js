import React from 'react';
import './App.css';
import UploadUI from './components/UploadUI';

function App() {
	const [BaseURL, setBaseURL] = React.useState(process.env.REACT_APP_BASE_URL)
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
			<UploadUI BaseURL={BaseURL}/>
			<h4 className='footer'>created by <a href='https://devchallenges.io/portfolio/rushsh67' target='_blank' rel='noreferrer'>rushsh67</a> - devChallenges.io</h4>
		</div>
	);
}

export default App;
