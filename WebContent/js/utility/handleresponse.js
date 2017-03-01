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
