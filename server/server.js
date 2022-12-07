const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
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
	'origin':'https://file-upload-client.vercel.app',
	'methods': 'POST',
	'allowedHeaders': ['Content-Type']
}

app.post('/upload', cors(corsOptions), (req, res) => {
	if (req.files === null) {
		res.status(400).send({ message: `File Not Uploaded` });
	}

	if (req.files.file.size > 5000000) {
		res
			.status(404)
			.send({
				message: `File size too Large please upload smaller size Image`,
			});
	}

	const file = req.files.file;
	file.name = file.name.replaceAll(' ', '_');
	file.name = Date.now().toString() + file.name;

	const img = `data:image/png;base64,${file.data.toString('base64')}`;

	try {
		cloudinary.uploader
			.upload(img, {
				resource_type: 'raw',
				format: 'jpg',
				use_filename: true,
				tags: ['devChallanges.io'],
			})
			.then((result) => {
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
