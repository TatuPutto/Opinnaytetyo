// Käsittelijä-funktio gistien suodattamille.
export function filters(state = {languages: []}, action) {
	switch(action.type) {
		case 'ADD_FILTER':
			return {languages: state.languages.concat(action.language)};
			break;
		case 'REMOVE_FILTER':
			return {
				languages: state.languages.filter((language) =>
						language !== action.language),
			};
			break;
		default:
			return state;
	}
}
