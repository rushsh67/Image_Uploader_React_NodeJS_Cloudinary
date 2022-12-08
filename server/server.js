const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');

//For using cloudinary create your cloudinary account
var cloudinary = require('cloudinary').v2;

cloudinary.config({
	//for configuring cloudinary add your CLOUD_NAME, API_KEY
	//and API_SECRET as environment variables in .env file
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

const PORT = 5000;
const app = express();
app.use(cors());
app.use(fileUpload());

app.get('/', (req, res) => {
	res.status(200).send({ message: `Server Staerted at Port :${PORT}` });
});

const corsOptions = {
	//add your frontend localhost url if you want to restrict any other origin
	origin: ['http://localhost:3000', 'https://file-upload-client.vercel.app'],
	methods: 'POST',
	allowedHeaders: ['Content-Type'],
};

app.post('/upload', cors(corsOptions), (req, res) => {
	if (req.files === null) {
		res.status(400).send({ message: `Image were Not Uploaded` });
	}

	if (req.files.file.size > 1000000) {
		res.status(404).send({
			message: `File size too Large. Upto 1 MB allowed`,
		});
	}

	//Changing file name to be unique
	const file = req.files.file;
	file.name = file.name.replaceAll(' ', '_');
	file.name = Date.now().toString() + file.name;

	//This is important step We get data in Buffer array format.(No URL or File Path)
	//We have to convert it into raw foramt which is required for cloudinary.
	//Below we converting Buffer data to base64 string with prefix 'data:image/png;base64'.
	//Prefix allow cloudinary to read string data as raw data and process it.
	const img = `data:image/png;base64,${file.data.toString('base64')}`;

	try {
		cloudinary.uploader
			.upload(img, {
				resource_type: 'raw',
				use_filename: true,
				public_id: file.name,
				tags: ['devChallanges.io'],
			})
			.then((result) => {
				//returning response to uploadUI
				// from where request is made to this server
				res.status(201).send({
					fileName: file.name,
					filePath: result.url,
				});
			});
	} catch (err) {
		res.status(500).send({ message: 'Intenal server Error' });
	}

	// res.status(201).send(img);
});

// setInterval(() => {
// cloudinary.api
// 	.delete_all_resources({ type: "upload" })
// 	.then((result) => console.log(result));
// }, 600000);
//

app.delete('/destroy', (req, res) => {
	if (req.type === null) {
		res.status(400).send({ message: `Bad Request` });
	}

	try {
		cloudinary.api
			.delete_all_resources({
				resource_type: 'raw',
				all: true,
				type: 'upload',
			})
			.then((result) => res.status(201).send(result));
	} catch (error) {
		res
			.status(500)
			.send({ message: 'Failed To delete...\nIntenal server Error' });
	}
});

app.listen(PORT, () => {
	console.log('Server Staerted at Port :' + PORT);
});
