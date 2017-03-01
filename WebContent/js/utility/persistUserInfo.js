// Tallennetaan käyttäjätiedot local storageen
export function storeUserInfo(userInfo, accessToken) {
	if(typeof(Storage) !== 'undefined') {
		// localStorage.setItem('userLogin', userInfo.user.login);
		// localStorage.setItem('userAvatar', userInfo.user.avatar_url);
		localStorage.setItem('id', '5699778');
		localStorage.setItem('userLogin', 'TatuPutto');
		localStorage.setItem('userAvatar', 'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40');
		localStorage.setItem('accessToken', '');
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

// Haetaan käyttäjätiedot local storagesta
export function getUserInfoFromStorage() {
	if(typeof(Storage) !== 'undefined') {
		let userInfo = {};
		userInfo['user'] = {};

		userInfo.user['id'] = localStorage.getItem('id');
		userInfo.user['login'] = localStorage.getItem('userLogin');
		userInfo.user['avatar_url'] = localStorage.getItem('userAvatar');
		userInfo.user['accessToken'] = localStorage.getItem('accessToken');

		if(userInfo !== null) {
			return userInfo;
		}		else {
			return null;
		}
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

export function removeUserInfoFromStorage() {
	if(typeof(Storage) !== 'undefined') {
		localStorage.removeItem('userLogin');
		localStorage.removeItem('userAvatar');
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}


export function doesUserInfoCookieExist() {
	let cookies = document.cookie.split(';');

	for(let i = 0; i < cookies.length; i++) {
		let name = cookies[i].split('=')[0].trim();

		if(name === 'accesstoken') {
			return true;
		}
	}

	return false;
}

export function getUserInfoFromCookie() {
	const cookies = document.cookie.split(';');
	let userInfo = [];

	for(let i = 0; i < cookies.length; i++) {
		let key = cookies[i].split('=')[0].trim();
		let value = cookies[i].split('=')[1];

		switch(key) {
			case 'id':
				userInfo[0] = value;
				break;
			case 'login':
				userInfo[1] = value;
				break;
			case 'avatarurl':
				userInfo[2] = value.substring(1, value.length - 1);
				break;
			case 'accesstoken':
				userInfo[3] = value;
				break;
		}
	}
	
	console.log(userInfo);
	return userInfo;
}

export function storeSearchQuery(searchTerm) {
	if(typeof(Storage) !== 'undefined') {
		let searchHistory = localStorage.getItem('searchHistory');

		if(searchHistory === null) {
			localStorage.setItem('searchHistory', searchTerm);
		} else {
			if(searchHistory.toLowerCase().indexOf(searchTerm.toLowerCase() !== -1)) {
				localStorage.setItem('searchHistory', searchHistory + ';' + searchTerm);
			} else {
					console.log('Olet jo hakenut tällä termillä!');
			}
		}
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

export function getSearchQueries(value) {
	if(typeof(Storage) !== 'undefined') {
		let suggestions = [];

		console.log(localStorage.getItem('searchHistory'));
		if(value) {
		 	let searchedTerms = localStorage.getItem('searchHistory');
			if(searchedTerms !== null) {
				searchedTerms = searchedTerms.split(';');

				searchedTerms.forEach((term) => {
					let match = term.toLowerCase().indexOf(value.toLowerCase());
					if(match !== -1) {
						suggestions.push(term);
					}
				});

				return sortAlphabetically(suggestions);
			}
		}
		console.log(suggestions);

		return suggestions;
	} else {
		alert('Selaimesi ei tue HTML5 local storage toiminnallisuutta.');
	}
}

// Järjestetään ehdotukset aakkosjärjestykseen
function sortAlphabetically(suggestions) {
	const sortedSuggestions = suggestions.sort((a, b) => {
		a = a.toLowerCase();
		b = b.toLowerCase();

		if(a < b) return -1;
		if(a > b) return 1;
	});
	return sortedSuggestions;
}
