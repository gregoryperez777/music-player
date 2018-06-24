const fs = require('fs');
const path = require('path');
const express = require('express');
const mediaserver = require('mediaserver');
const multer = require('multer');
const app = express();

const optionsMulter = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname,'songs'));
	},

	filename: function (res, file, cb) {
		cb(null, file.originalname);
	}
}); 

const upload = multer({
	storage: optionsMulter,
});

app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

console.log(path.join(__dirname, 'public', 'css'));


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/songs', function(req, res) {
	fs.readFile(path.join(__dirname, 'songs.json'), 'utf8', function(error, songs) {
		if (error) throw error;

		res.json(JSON.parse(songs));
	});
});

app.get('/songs/:name', function(req, res) {
	const song = path.join(__dirname, 'songs', req.params.name);
	mediaserver.pipe(req, res, song);

});

app.post('/songs', upload.single('song'), function(req, res) {
	const name = req.file.originalname;
	const route = path.join(__dirname, 'songs.json');
	
	fs.readFile(route, 'utf8', function(err, file) {
		if (err) throw err;

		const songslist = JSON.parse(file);
		songslist.push({ name });

		fs.writeFile(route, JSON.stringify(songslist), function(err) {
			if (err) throw err;
			res.sendFile(path.join(__dirname,'/index.html'));
		});
	});
});

app.listen(3001, function() {
	console.log('app corriendo');
});