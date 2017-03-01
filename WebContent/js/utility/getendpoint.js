export default function determineEndpoint(fetchMethod, page = 1) {
	let url;
	if(fetchMethod === 'gists') {
		url = 'https://api.github.com/gists';
	}	else if(fetchMethod === 'starred') {
		url = 'https://api.github.com/gists/starred';
	}	else if(fetchMethod === 'discover') {
		url = 'https://api.github.com/gists/public?page=' + page + '&per_page=100';
	}	else {
		url = 'https://api.github.com/gists';
	}

    return url;
}
