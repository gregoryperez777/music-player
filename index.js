const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/songs', function(req, res) {
	fs.readFile(path.join(__dirname, 'songs.json'), 'utf8', function(error, songs) {
		if (error) throw error;

		res.json(JSON.parse(songs));
	});
});

app.listen(3001, function() {
	console.log('app corriendo');
});