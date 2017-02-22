// Käsittelijä-funktio gistien suodattamille.
export function filters(state = {languages: []}, action) {
	switch(action.type) {
		case 'ADD_FILTER':
			return {
				languages: state.languages.concat(action.language)
			};
			break;
		case 'REMOVE_FILTER':
			console.log(action.language);
			console.log(state.languages);
			console.log(state.languages.filter(function (language) {
				console.log('Parametri:' + language + ', tyyppi: ' + typeof language);
				console.log('Action:' + action.language + ', tyyppi: ' + typeof action.language);
				console.log(language === action.language);
				return language !== action.language;
			}));

			return {
				languages: state.languages.filter((language) => language !== action.language)
			};
			break;

		/*
		case 'SORT_OLDEST_TO_NEWEST':
			return {
				...state,
				chronologicalOrder: true
			};
			break;
		case 'SORT_NEWEST_TO_OLDEST':
			return {
				...state,
				chronologicalOrder: false
			};
			break;*/
		// Palautetaan vakioarvot tai nykyinen tila gistien osalta,
		// jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
