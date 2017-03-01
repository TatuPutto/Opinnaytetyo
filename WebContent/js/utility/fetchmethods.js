let defaultParams = {};

export function setAcccessToken(accessToken) {
	defaultParams = {
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json',
			'Authorization': 'token ' + accessToken,

		},
	}
}

export function create(url, content) {
	return fetch(url, {
		...defaultParams,
		method: 'POST',
		body: JSON.stringify(content),
	});
}

export function read(url) {
	return fetch(url, {
		...defaultParams,
		method: 'GET',
	});
}

export function patch(url, content) {
	return fetch(url, {
		...defaultParams,
		method: 'PATCH',
		body: JSON.stringify(content),
	});
}

export function update(url, content) {
	return fetch(url, {
		...defaultParams,
		method: 'PUT',
		body: JSON.stringify(content),
	});
}

export function destroy(url) {
	return fetch(url, {
		...defaultParams,
		method: 'DELETE',
	});
}
