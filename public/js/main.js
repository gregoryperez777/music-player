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
				newElement.appendTo(songsList);
			})

		})
		.catch(function(erro) {
			console.log(erro);
		});
}

loadSongs();