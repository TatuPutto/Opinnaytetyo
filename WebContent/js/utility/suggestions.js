const languages = require('../../static/colors.json');

export function setSuggestions(value) {
	let suggestions = [];

	if(value) {
		for(let key in languages) {
			if(languages.hasOwnProperty(key)) {
				let match = key.toLowerCase().indexOf(value.toLowerCase());

				if(match !== -1) {
					suggestions.push(key);
				}
			}
		}
		return sortAlphabetically(suggestions);
	}
	return suggestions;
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
