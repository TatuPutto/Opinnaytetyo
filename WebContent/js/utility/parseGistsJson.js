export function parseSingleGistJson(gistJson) {
	let gist = Object.assign({}, gistJson, {
		files: parseFilesWithSource(gistJson.files),
		formattedTime: formatTime(gistJson.updated_at),
	});

	return gist;
}

export function parseMultipleGistsJson(gistsJson) {
	let gists = [];

	gistsJson.forEach((gist, i) => {
		let files = parseFiles(gist.files);
		let gistOwner = parseOwnerInfo(gist.owner);

		if(files != null && gistOwner.login != null) {
			/* gists.push(Object.assign({}, gist, {
				files: parseFiles(gist.files),
				owner: parseOwnerInfo(gist.owner),
				//formattedTime: formatTime(gist.updated_at),
				formattedTime: formatTime(gist.created_at),
			}));*/

			gists.push({
				id: gist.id,
				description: gist.description,
				formattedTime: formatTime(gist.created_at),
				files: parseFiles(gist.files),
				owner: parseOwnerInfo(gist.owner),
			});
		}
	});

	return gists;
}


function parseFiles(json) {
	let files = [];

	for(let key in json) {
		let singleFile = {};
		singleFile['filename'] = json[key].filename;
		singleFile['language'] = json[key].language;

		files.push(singleFile);
	}

	return files;
}


function parseFilesWithSource(json) {
	let files = [];

	for (let key in json) {
		let file = {};
		file['filename'] = json[key].filename;
		file['description'] = json[key].language;
		file['content'] = json[key].content;

		files.push(file);
	}

	return files;
}


function parseOwnerInfo(ownerJson) {
	let owner = {};

	try {
		if(ownerJson == null) {
		} else {
			owner['id'] = ownerJson.id;
			owner['login'] = ownerJson.login;
			owner['avatarUrl'] = ownerJson.avatar_url;

			return owner;
		}
	} finally {
		return owner;
	}
}


function formatTime(time) {
	let date = new Date(time);

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	return day + '.' + month + '.' + year;

	// return day + '.' + month + '.' + year +
	//		', ' + hours + ':' + minutes;
}
