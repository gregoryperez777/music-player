const audio = $('audio');

function play(event, ) {
	audio[0].pause();
	audio.attr('src', `/songs/${event.data.name}`);
	audio[0].play();
}

function loadSongs () {
	const query = '/songs';
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	fetch(query,options)
		.then(function(response) {
			return response.json();
		})
		.then(function(response) {
			const songsList = $('.songs-list');
			songsList.empty();

			response.map(function(song) {
				const newElement = $(`<li class="song">${song.name}</li>`);
				newElement
					.on('click', song, play)
					.appendTo(songsList);
			})

		})
		.catch(function(erro) {
			console.log(erro);
		});
}

loadSongs();

new SiriWave({
	width: 640,
	height: 100,
	speed: 0.05,
	container: document.getElementById('ecualizer'),
	autostart: true,
});
