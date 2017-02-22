export function determineEndpoint(fetchMethod, page, user) {
	let url;

	if(fetchMethod === 'gists') {
		url = 'https://api.github.com/gists';
	}
	else if(fetchMethod === 'starred') {
		url = 'https://api.github.com/gists/starred';
	}
	else if(fetchMethod === 'discover') {
		url = 'https://api.github.com/gists/public?page=' + page + '&per_page=100';
	}
	else if(fetchMethod === 'search') {
		url = 'https://api.github.com/users/' + user + '/gists';
	}
	else {
		url = 'https://api.github.com/gists';
	}

	return url;
}
