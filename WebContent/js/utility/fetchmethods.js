import {accessToken} from '../actions/useractions';

// Muodostetaan pyyntö ilman sisältöä.
export function sendRequest(url, httpMethod) {
	const fetchInit = {
		method: httpMethod,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'token ' + accessToken,
		},
	};

	// Lähetetään pyyntö.
	return fetch(url, fetchInit);
}


// Muodostetaan pyynnöön otsikot sekä sisältö ja lähetetään pyyntö.
export function sendRequestWithContent(url, httpMethod, content = null) {
	const fetchInit = {
		method: httpMethod,
		body: content,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Content-length': content.length,
			'Authorization': 'token ' + accessToken,
		},
	};

	return fetch(url, fetchInit);
}


// Tarkistetaan onnistuiko pyyntö.
export function checkStatus(response) {
	if(response.ok) {
		return Promise.resolve(response);
	} else {
		throw new Error(response.status + ' ' + response.statusText);
	}
}

// Luetaan vastauksen sisältö.
export function readJson(response) {
	return response.json();
}
