/* eslint linebreak-style: ["error", "windows"]*/

//import {store} from '../createStore';


let accessToken;

// Haetaan access token välimuistista
export function getAccessToken(token) {
	accessToken = token;
}


// Muodostetaan pyyntö ilman sisältöä (GET, DELETE)
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


// Muodostetaan pyynnöön otsikot sekä sisältö ja lähetetään pyyntö (POST, PATCH, PUT)
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


//Tarkistetaan onnistuiko pyyntö.
export function checkStatus(response) {
	if(response.ok) {
		return Promise.resolve(response);
	} else {
		throw new Error(response.status + ' ' + response.statusText);
	}
}

//Luetaan vastauksen sisältö.
export function readJson(response) {
	return response.json();
}
/*
export function sendRequest(url, httpMethod, content = null) {
	let fetchInit;

	//Määritellään pyynnön otsikot ja sisältö (POST, PATCH, PUT).
	if(content) {
		fetchInit = {
			method: httpMethod,
			body: content,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-length': content.length,
				'Authorization': 'token ' + accessToken,
			},
		};
	//Määritellään pyynnön otsikot, kun pyynnöllä ei ole sisältöä (GET, DELETE).
	} else {
		method: httpMethod,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'token ' + accessToken,
		},
	}

	//Lähetetään pyyntö.
	return fetch(url, fetchInit);
}
*/
