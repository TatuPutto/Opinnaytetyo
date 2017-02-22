export function filterByLanguage(languages, gists) {
	if(languages.length === 0) {
		return gists;
	}

	let filteredGists = [];

	gists.forEach((gist) => {
		let match = false;

		gist.files.forEach((file) => {
			if(file.language) {
				languages.forEach((language) => {
					if(file.language.toLowerCase() === language.toLowerCase()) {
						match = true;
					}
				});
			}
		});

		if(match) {
			filteredGists.push(gist);
		}
	});

	return filteredGists;
}
